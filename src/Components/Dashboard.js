import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";


function Dashboard(props) {

  const [task, setTask] = useState('');
  const [description, setDescription] = useState('');
  const [tasksList, setTasksList] = useState([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasksList(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasksList));
  }, [tasksList]);

  const handleAddTask = () => {
    if (task && description) {
      setTasksList([...tasksList, { task, description }]);
      setTask('');
      setDescription('');
    }
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasksList];
    updatedTasks.splice(index, 1);
    setTasksList(updatedTasks);
  };

  const handleUpdateTask = (index, newTask, newDescription) => {
    if (newTask && newDescription) {
      const updatedTasks = [...tasksList];
      updatedTasks[index] = { task: newTask, description: newDescription };
      setTasksList(updatedTasks);
    }
  };


    return (
        <>
           <div>
      <h1>Task Dashboard</h1>
      <div>
        <input
          type="text"
          placeholder="Enter Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={handleAddTask}>ADD Task</button>
      </div>
      <div>
        <ul>
          {tasksList.map((taskItem, index) => (
            <li key={index}>
              <span>{taskItem.task}</span>
              <span>{taskItem.description}</span>
              <button onClick={() => handleUpdateTask(index, prompt('Update Task', taskItem.task), prompt('Update Description', taskItem.description))}>Update</button>
              <button onClick={() => handleDeleteTask(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
        </>
    )
}

export default Dashboard
