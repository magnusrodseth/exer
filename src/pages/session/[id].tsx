import { GetServerSideProps } from 'next';
import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { AddSession } from '~/types/forms';
import { createSSGHelpers } from '@trpc/react/ssg';
import { appRouter } from '~/server/routers/_app';
import superjson from 'superjson';
import { trpc } from '~/utils/trpc';
import dateToDDMMYYYY from '~/utils/dateToDDMMYYYY';

type SessionPageProps = {
  id: number;
};

const SessionPage: React.FC<SessionPageProps> = (props) => {
  const { id } = props;
  const sessionQuery = trpc.useQuery(['session.byId', { id }]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isValidating },
  } = useForm<AddSession>();

  const onSubmit: SubmitHandler<AddSession> = (data) => {
    console.log(data);
  };

  const data = watch();

  useEffect(() => {
    if (isValid && !isValidating) {
      onSubmit(data);
    }
  }, [data, isValid, isValidating]);

  return (
    <div>
      {sessionQuery.data ? (
        <div>
          <h1 className="text-4xl">{dateToDDMMYYYY(sessionQuery.data.date)}</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="date"
              {...register('date')}
              // TODO: Refactor
              value={dateToDDMMYYYY(sessionQuery.data.date)}
            />
            <input type="submit" className="hidden" />
          </form>
        </div>
      ) : (
        <></>
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
  const id = parseInt(idFromParams);

  if (!id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  // Prefetch
  await ssg.fetchQuery('session.byId', { id });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
  };
};
export default SessionPage;
