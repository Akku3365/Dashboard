// /** @format */

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.css";
// import Modal from "react-modal";

// Modal.setAppElement("#root");

// function Dashboard(props) {
//     const { role } = props;

//     const initialInput = {
//         t: "",
//         de: "",
//         answer: "",
//     };

//     const [tasks, setTasks] = useState(initialInput);
//     const [taskList, setTaskList] = useState(() => {
//         const storedItems = localStorage.getItem("Task");
//         return storedItems ? JSON.parse(storedItems) : [];
//     });
//     const [editTasks, setEditTasks] = useState(null);
//     const [modalIsOpen, setModalIsOpen] = useState(false);
//     const [currentTaskId, setCurrentTaskId] = useState(null);

//     useEffect(() => {
//         localStorage.setItem("Task", JSON.stringify(taskList));
//     }, [taskList]);

//     const handOnchangeFn = (e) => {
//         const { name, value } = e.target;
//         setTasks({ ...tasks, [name]: value });
//     };

//     const taskInputSubmit = () => {
//         if (editTasks !== null) {
//             const taskIndex = taskList.findIndex((task) => task.id === editTasks.id);
//             const updatedtaskList = [...taskList];
//             if (taskIndex !== -1) {
//                 updatedtaskList[taskIndex] = { ...tasks, id: editTasks.id };
//             }
//             setTaskList(updatedtaskList);
//             setEditTasks(null);
//         } else {
//             let temp_arr = [...taskList, { ...tasks, id: taskList.length++ }];
//             setTaskList(temp_arr);
//         }
//         setTasks(initialInput);
//     };

//     const taskInputDelete = (i) => {
//         let new_Arr = taskList.filter((task) => task.id !== i);
//         setTaskList(new_Arr);
//     };

//     const taskEditFunction = (val) => {
//         setEditTasks(val);
//         setTasks(val);
//     };

//     const backFunction = useNavigate();

//     const handleback = () => {
//         localStorage.removeItem("user_d");
//         backFunction("/");
//     };

//     const openModal = (taskId) => {
//         setCurrentTaskId(taskId);
//         setModalIsOpen(true);
//         const taskIndex = taskList.findIndex((task) => task.id === taskId);
//         if (taskIndex !== -1) {
//             setTasks(taskList[taskIndex]);
//         }
//     };

//     const closeModal = () => {
//         setCurrentTaskId(null);
//         setModalIsOpen(false);
//         setTasks(initialInput);
//     };

//     const submitAnswer = (event) => {
//         event.preventDefault();
//         if (currentTaskId !== null) {
//             const taskIndex = taskList.findIndex((task) => task.id === currentTaskId);
//             if (taskIndex !== -1) {
//                 const updatedTaskList = [...taskList];
//                 updatedTaskList[taskIndex] = { ...updatedTaskList[taskIndex], answer: tasks.answer };
//                 setTaskList(updatedTaskList);
//                 setModalIsOpen(false);
//                 setTasks(initialInput);
//             }
//         }
//     };

//     return (
//         <>
//             <div className="container">
//                 <div>
//                     <h1 className="text-primary text-center">Dashboard</h1>
//                     {role ? <h3 className="text-center">Welcome Teacher</h3> : <h3 className="text-center">Hello Student</h3>}
//                     <div className="mt-4">
//                         {role && (
//                             <>
//                                 <label htmlFor="task">Tasks</label>
//                                 <input type="text" value={tasks.t} name="t" onChange={handOnchangeFn} placeholder="Enter tasks" />
//                                 <label htmlFor="task">Description</label>
//                                 <input type="text" value={tasks.de} name="de" onChange={handOnchangeFn} placeholder="Description" />
//                                 {editTasks !== null ? (
//                                     <button className="btn btn-dark" onClick={taskInputSubmit}>
//                                         Update Task
//                                     </button>
//                                 ) : (
//                                     <button className="btn btn-success mt-2" onClick={taskInputSubmit}>
//                                         Add Task
//                                     </button>
//                                 )}
//                             </>
//                         )}
//                     </div>
//                     <br />
//                     <button className="btn btn-primary mt-2" onClick={handleback}>
//                         Logout
//                     </button>
//                     <br />
//                 </div>

//                 <div>
//                     <ol className="list-group">
//                         {taskList.map((taskItem) => (
//                             <li className="list-group-item" key={taskItem.id}>
//                                 <p>
//                                     <span className="fs-4">Task:</span> {taskItem.t}
//                                 </p>
//                                 <p>
//                                     <span className="fs-4">Description:</span> {taskItem.de}
//                                 </p>
//                                 {/* Show answer for both teachers and students */}
//                                 {taskItem.answer && (
//                                     <p>
//                                         <span className="fs-4">Answer:</span> {taskItem.answer}
//                                     </p>
//                                 )}
//                                 {role && (
//                                     <>
//                                         <span>
//                                             <button className="btn btn-warning" onClick={() => taskEditFunction(taskItem)}>
//                                                 Edit Task
//                                             </button>
//                                         </span>
//                                         <span>
//                                             <button className="btn btn-danger" onClick={() => taskInputDelete(taskItem.id)}>
//                                                 Delete task
//                                             </button>
//                                         </span>
//                                     </>
//                                 )}
//                                 {!role &&
//                                     !taskItem.answer && ( // Show 'Answer' button only for students and if answer is not submitted yet
//                                         <button className="btn btn-primary" onClick={() => openModal(taskItem.id)}>
//                                             Answer
//                                         </button>
//                                     )}
//                                 {!role &&
//                                     taskItem.answer && ( // Show 'Edit Answer' button only for students if answer is already submitted
//                                         <button className="btn btn-primary" onClick={() => openModal(taskItem.id)}>
//                                             Edit Answer
//                                         </button>
//                                     )}
//                             </li>
//                         ))}
//                     </ol>
//                 </div>
//             </div>

//             <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
//                 <h3>{editTasks ? "Edit" : "Answer"} the Task</h3>
//                 <form onSubmit={submitAnswer}>
//                     <textarea rows={4} cols={50} name="answer" value={tasks.answer || ""} onChange={handOnchangeFn} placeholder="Write your answer here..." />
//                     <button type="submit">{editTasks ? "Update" : "Submit"}</button>
//                     <button onClick={closeModal}>Cancel</button>
//                 </form>
//             </Modal>
//         </>
//     );
// }

// export default Dashboard;







/** @format */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Modal from "react-modal";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import AnswerModal from "./AnswerModal";

Modal.setAppElement("#root");

function Dashboard(props) {
  const { role } = props;

  const initialInput = {
    t: "",
    de: "",
    answer: "",
  };

  const [tasks, setTasks] = useState(initialInput);
  const [taskList, setTaskList] = useState(() => {
    const storedItems = localStorage.getItem("Task");
    return storedItems ? JSON.parse(storedItems) : [];
  });
  const [editTasks, setEditTasks] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);

  useEffect(() => {
    localStorage.setItem("Task", JSON.stringify(taskList));
  }, [taskList]);

  const handOnchangeFn = (e) => {
    const { name, value } = e.target;
    setTasks({ ...tasks, [name]: value });
  };

  const taskInputSubmit = () => {
    if (editTasks !== null) {
      const taskIndex = taskList.findIndex((task) => task.id === editTasks.id);
      const updatedtaskList = [...taskList];
      if (taskIndex !== -1) {
        updatedtaskList[taskIndex] = { ...tasks, id: editTasks.id };
      }
      setTaskList(updatedtaskList);
      setEditTasks(null);
    } else {
      let temp_arr = [...taskList, { ...tasks, id: taskList.length++ }];
      setTaskList(temp_arr);
    }
    setTasks(initialInput);
  };

  const taskInputDelete = (i) => {
    let new_Arr = taskList.filter((task) => task.id !== i);
    setTaskList(new_Arr);
  };

  const taskEditFunction = (val) => {
    setEditTasks(val);
    setTasks(val);
  };

  const backFunction = useNavigate();

  const handleback = () => {
    localStorage.removeItem("user_d");
    backFunction("/");
  };

  const openModal = (taskId) => {
    setCurrentTaskId(taskId);
    setModalIsOpen(true);
    const taskIndex = taskList.findIndex((task) => task.id === taskId);
    if (taskIndex !== -1) {
      setTasks(taskList[taskIndex]);
    }
  };

  const closeModal = () => {
    setCurrentTaskId(null);
    setModalIsOpen(false);
    setTasks(initialInput);
  };

  const submitAnswer = (event) => {
    event.preventDefault();
    if (currentTaskId !== null) {
      const taskIndex = taskList.findIndex((task) => task.id === currentTaskId);
      if (taskIndex !== -1) {
        const updatedTaskList = [...taskList];
        updatedTaskList[taskIndex] = { ...updatedTaskList[taskIndex], answer: tasks.answer };
        setTaskList(updatedTaskList);
        setModalIsOpen(false);
        setTasks(initialInput);
      }
    }
  };

  return (
    <>
      <div className="container">
        <div>
          <h1 className="text-primary text-center">Dashboard</h1>
          {role ? <h3 className="text-center">Welcome Teacher</h3> : <h3 className="text-center">Hello Student</h3>}
          <div className="mt-4">
            {role && (
              <TaskForm tasks={tasks} handOnchangeFn={handOnchangeFn} taskInputSubmit={taskInputSubmit} editTasks={editTasks} />
            )}
          </div>
          <br />
          <button className="btn btn-primary mt-2" onClick={handleback}>
            Logout
          </button>
          <br />
        </div>

        <div>
          <TaskList
            taskList={taskList}
            role={role}
            taskEditFunction={taskEditFunction}
            taskInputDelete={taskInputDelete}
            openModal={openModal}
          />
        </div>
      </div>

      <AnswerModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        tasks={tasks}
        handOnchangeFn={handOnchangeFn}
        submitAnswer={submitAnswer}
        editTasks={editTasks}
      />
    </>
  );
}

export default Dashboard;

