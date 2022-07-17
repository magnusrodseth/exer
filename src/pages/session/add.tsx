import { useRouter } from 'next/router';
import { trpc } from '~/utils/trpc';

const AddSessionPage: React.FC = () => {
  const router = useRouter();
  const addSessionMutation = trpc.useMutation(['session.add']);
  addSessionMutation.mutate(
    { date: new Date() },
    {
      onSuccess(input) {
        router.replace(`/session/${input.id}`);
      },
    },
  );

  return null;
};

export default AddSessionPage;
