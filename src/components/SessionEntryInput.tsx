import { trpc } from '~/utils/trpc';
import SetInput from './SetInput';

const SessionEntryInput = () => {
  const allExercisesQuery = trpc.useQuery(['exercise.all']);

  return (
    <div>
      {/* Dropdown */}
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

      <SetInput />
    </div>
  );
};

export default SessionEntryInput;
