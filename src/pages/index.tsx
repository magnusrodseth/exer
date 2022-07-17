import Link from 'next/link';
import { useRouter } from 'next/router';
import { trpc } from '~/utils/trpc';

const IndexPage = () => {
  const router = useRouter();
  const addSessionMutation = trpc.useMutation('session.add');

  const handleOnClick = () => {
    addSessionMutation.mutate(
      { date: new Date() },
      {
        onSuccess(data) {
          router.push(`/session/${data.id}`);
        },
      },
    );
  };

  return (
    <div>
      <button onClick={handleOnClick}>new session</button>

      <div>{JSON.stringify(addSessionMutation.data)}</div>

      <Link href={`/session/${30}`}>goto session</Link>
    </div>
  );
};

export default IndexPage;

/**
 * If you want to statically render this page
 * - Export `appRouter` & `createContext` from [trpc].ts
 * - Make the `opts` object optional on `createContext()`
 *
 * @link https://trpc.io/docs/ssg
 */
// export const getStaticProps = async (
//   context: GetStaticPropsContext<{ filter: string }>,
// ) => {
//   const ssg = createSSGHelpers({
//     router: appRouter,
//     ctx: await createContext(),
//   });
//
//   await ssg.fetchQuery('post.all');
//
//   return {
//     props: {
//       trpcState: ssg.dehydrate(),
//       filter: context.params?.filter ?? 'all',
//     },
//     revalidate: 1,
//   };
// };
