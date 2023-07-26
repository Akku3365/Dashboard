import React from "react";

const TaskList = ({ taskList, role, taskEditFunction, taskInputDelete, openModal }) => {
  return (
    <div>
      <ol className="list-group">
        {taskList.map((taskItem) => (
          <li className="list-group-item" key={taskItem.id}>
            <p>
              <span className="fs-4">Task:</span> {taskItem.t}
            </p>
            <p>
              <span className="fs-4">Description:</span> {taskItem.de}
            </p>
            {taskItem.answer && (
              <p>
                <span className="fs-4">Answer:</span> {taskItem.answer}
              </p>
            )}
            {role && (
              <>
                <span>
                  <button className="btn btn-warning" onClick={() => taskEditFunction(taskItem)}>
                    Edit Task
                  </button>
                </span>
                <span>
                  <button className="btn btn-danger" onClick={() => taskInputDelete(taskItem.id)}>
                    Delete task
                  </button>
                </span>
              </>
            )}
            {!role && !taskItem.answer && (
              <button className="btn btn-primary" onClick={() => openModal(taskItem.id)}>
                Answer
              </button>
            )}
            {!role && taskItem.answer && (
              <button className="btn btn-primary" onClick={() => openModal(taskItem.id)}>
                Edit Answer
              </button>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default TaskList;
