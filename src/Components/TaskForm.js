import React from "react";

const TaskForm = ({ tasks, handOnchangeFn, taskInputSubmit, editTasks }) => {
  return (
    <div>
      <label htmlFor="task">Tasks</label>
      <input type="text" value={tasks.t} name="t" onChange={handOnchangeFn} placeholder="Enter tasks" />
      <label htmlFor="task">Description</label>
      <input type="text" value={tasks.de} name="de" onChange={handOnchangeFn} placeholder="Description" />
      {editTasks !== null ? (
        <button className="btn btn-dark" onClick={taskInputSubmit}>
          Update Task
        </button>
      ) : (
        <button className="btn btn-success mt-2" onClick={taskInputSubmit}>
          Add Task
        </button>
      )}
    </div>
  );
};

export default TaskForm;
