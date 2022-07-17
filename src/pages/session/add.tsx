import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AddSession } from '~/types/forms';

const AddSessionPage: React.FC = () => {
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

export default AddSessionPage;
