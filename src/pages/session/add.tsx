import { SessionItem } from '@prisma/client';
import { useForm } from 'react-hook-form';

const AddSessionPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SessionItem>();

  return <></>;
};

export default AddSessionPage;
