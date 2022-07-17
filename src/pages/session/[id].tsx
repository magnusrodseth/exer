import { GetServerSideProps } from 'next';
import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { AddSession } from '~/types/forms';
import { createSSGHelpers } from '@trpc/react/ssg';
import { appRouter } from '~/server/routers/_app';
import superjson from 'superjson';
import { trpc } from '~/utils/trpc';
import dateToDDMMYYYY from '~/utils/dateToDDMMYYYY';
import { Dropdown } from 'react-daisyui';

type SessionPageProps = {
  id: number;
};

const SessionPage: React.FC<SessionPageProps> = (props) => {
  const { id } = props;
  const sessionQuery = trpc.useQuery(['session.byId', { id }], {
    onError(err) {
      // TODO
      console.log(err);
    },
  });
  const allExercisesQuery = trpc.useQuery(['exercise.all']);
  const updateSessionMutation = trpc.useMutation(['session.update']);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isValidating },
  } = useForm<AddSession>();

  const data = watch();

  useEffect(() => {
    if (isValid && !isValidating) {
      onSubmit(data);
    }
  }, [data, isValid, isValidating]);

  const onSubmit: SubmitHandler<AddSession> = (data) => {
    console.log(data);
  };

  const handleNewSessionEntry = () => { };

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
              value={dateToDDMMYYYY(sessionQuery.data.date)}
            />
            <input type="submit" className="hidden" />
          </form>

          <button onClick={handleNewSessionEntry}>new entry</button>

          {/* TODO: Hide this behind clicking the button */}
          <div className="dropdown">
            <label tabIndex={0} className="btn m-1">
              Select exercise
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              {allExercisesQuery.data?.map((exercise) => (
                <li key={exercise.id}>
                  <span>{exercise.name}</span>
                </li>
              ))}
            </ul>
          </div>
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
