import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { AddSession } from '~/types/forms';
import { Session } from '~/types/session';
import { createSSGHelpers } from '@trpc/react/ssg';
import { appRouter } from '~/server/routers/_app';
import superjson from 'superjson';
import { trpc } from '~/utils/trpc';

type SessionPageProps = {
  id: number;
};

const SessionPage: React.FC<SessionPageProps> = (props) => {
  const { id } = props;
  const sessionQuery = trpc.useQuery(['session.byId', { id }]);

  console.log(sessionQuery.data);

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="date" {...register('date')} />
        <input type="submit" className="hidden" />
      </form>
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
