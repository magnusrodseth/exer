const SetInput = () => {
  return (
    <div>
      <div>
        <h2>set 1</h2>
        <label htmlFor="">reps</label>
        <input type="number" />

        <label htmlFor="">weight / minutes</label>
        <input type="number" />
      </div>

      <button className="btn btn-square btn-accent text-2xl">+</button>
      <button className="btn btn-square text-2xl">🗑️</button>
    </div>
  );
};

export default SetInput;
