import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { AddSession } from '~/types/forms';
import { createSSGHelpers } from '@trpc/react/ssg';
import { appRouter } from '~/server/routers/_app';
import superjson from 'superjson';
import { trpc } from '~/utils/trpc';
import dateToDDMMYYYY from '~/utils/dateToDDMMYYYY';
import { CompleteSessionEntry } from '~/schemas';
import { Exercise } from '@prisma/client';
import SessionEntryInput from '~/components/SessionEntryInput';

type SessionPageProps = {
  sessionId: number;
};

const SessionPage: React.FC<SessionPageProps> = (props) => {
  const { sessionId } = props;
  const sessionQuery = trpc.useQuery(['session.byId', { id: sessionId }], {
    onError(err) {
      // TODO
      console.log(err);
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isValidating },
  } = useForm<AddSession>();

  const [sessionEntries, setSessionEntries] = useState<
    (CompleteSessionEntry | null)[]
  >([]);

  const data = watch();

  useEffect(() => {
    if (isValid && !isValidating) {
      onSubmit(data);
    }
  }, [data, isValid, isValidating]);

  const onSubmit: SubmitHandler<AddSession> = (data) => {
    console.log(data);
  };

  const handleNewSessionEntry = () => {
    setSessionEntries([...sessionEntries, null]);
  };

  return (
    <div>
      {sessionQuery.data && (
        <div>
          <h1 className="text-4xl">{dateToDDMMYYYY(sessionQuery.data.date)}</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="date"
              {...register('date')}
              // TODO: Refactor
              value={sessionQuery.data.date.toISOString().substring(0, 10)}
            />
            <input type="submit" className="hidden" />
          </form>

          <button
            onClick={handleNewSessionEntry}
            className="btn btn-primary m-2"
          >
            + session entry
          </button>

          {sessionEntries.map((entry, index) => (
            <SessionEntryInput key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const ssg = await createSSGHelpers({
    router: appRouter,
    ctx: {},
    transformer: superjson,
  });

  const idFromParams = context.params?.id as string;
  const sessionId = parseInt(idFromParams);

  if (!sessionId) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  // Prefetch
  await ssg.fetchQuery('session.byId', { id: sessionId });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      sessionId,
    },
  };
};
export default SessionPage;
