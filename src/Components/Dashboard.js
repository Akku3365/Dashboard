// /** @format */

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.css";
// import Modal from "react-modal";
// import { DragDropContext, Droppable } from "react-beautiful-dnd";
// import lodashDebounce from "lodash.debounce";
// import TaskForm from "./TaskForm";
// import AnswerModal from "./AnswerModal";
// import TaskList from "./TaskList"; // Import the new component
// import Process from "./Process";
// import Completed from "./Completed";

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
//             let temp_arr = [...taskList, { ...tasks, id: taskList.length }];
//             setTaskList(temp_arr);
//         }
//         setTasks(initialInput);
//     };

//     const taskInputDelete = (id) => {
//         setTaskList((prevList) => prevList.filter((task) => task.id !== id));
//     };

//     const taskEditFunction = (val) => {
//         setEditTasks(val);
//         setTasks(val);
//     };

//     const debouncedUpdateLocalStorage = lodashDebounce((updatedTasks) => {
//         localStorage.setItem("Task", JSON.stringify(updatedTasks));
//     }, 500);

//     const handleDragEnd = (result) => {
//         if (!result.destination) return;

//         const updatedTasks = Array.from(taskList);
//         const [removed] = updatedTasks.splice(result.source.index, 1);
//         updatedTasks.splice(result.destination.index, 0, removed);

//         setTaskList(updatedTasks);
//         debouncedUpdateLocalStorage(updatedTasks);
//     };

//     const backFunction = useNavigate();

//     const handleBack = () => {
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
//                     <div className="mt-4">{role && <TaskForm tasks={tasks} handOnchangeFn={handOnchangeFn} taskInputSubmit={taskInputSubmit} editTasks={editTasks} />}</div>
//                     <br />
//                     <button className="btn btn-primary mt-2" onClick={handleBack}>
//                         Logout
//                     </button>
//                     <br />
//                 </div>

//                 <div className="d-flex flex-row mt-2">
//                     <div>
//                         <DragDropContext onDragEnd={handleDragEnd}>
//                             <Droppable droppableId="task-list" isDropDisabled={!role}>
//                                 {(provided) => (
//                                     <div ref={provided.innerRef} {...provided.droppableProps}>
//                                         <TaskList taskList={taskList} role={role} taskEditFunction={taskEditFunction} taskInputDelete={taskInputDelete} openModal={openModal} />
//                                         {provided.placeholder}
//                                     </div>
//                                 )}
//                             </Droppable>
//                         </DragDropContext>
//                     </div>

//                     <div >
//                         <DragDropContext onDragEnd={handleDragEnd}>
//                             <Droppable droppableId="task-list" isDropDisabled={!role}>
//                                 {(provided) => (
//                                     <div ref={provided.innerRef} {...provided.droppableProps}>
//                                         <Process taskList={taskList} role={role} taskEditFunction={taskEditFunction} taskInputDelete={taskInputDelete} openModal={openModal} />
//                                         {provided.placeholder}
//                                     </div>
//                                 )}
//                             </Droppable>
//                         </DragDropContext>
//                     </div>

//                     <div>
//                         <DragDropContext onDragEnd={handleDragEnd}>
//                             <Droppable droppableId="task-list" isDropDisabled={!role}>
//                                 {(provided) => (
//                                     <div ref={provided.innerRef} {...provided.droppableProps}>
//                                         <Completed taskList={taskList} role={role} taskEditFunction={taskEditFunction} taskInputDelete={taskInputDelete} openModal={openModal} />
//                                         {provided.placeholder}
//                                     </div>
//                                 )}
//                             </Droppable>
//                         </DragDropContext>
//                     </div>
//                 </div>
//             </div>

//             <AnswerModal modalIsOpen={modalIsOpen} closeModal={closeModal} tasks={tasks} handOnchangeFn={handOnchangeFn} submitAnswer={submitAnswer} editTasks={editTasks} />
//         </>
//     );
// }

// export default Dashboard;











import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Modal from "react-modal";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import lodashDebounce from "lodash.debounce";
import TaskForm from "./TaskForm";
import AnswerModal from "./AnswerModal";
import TaskList from "./TaskList";
import Process from "./Process";
import Completed from "./Completed";

Modal.setAppElement("#root");

function Dashboard(props) {
    const { role } = props;

    const initialInput = {
        t: "",
        de: "",
        answer: "",
        status: "",
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
            let temp_arr = [...taskList, { ...tasks, id: taskList.length }];
            setTaskList(temp_arr);
        }
        setTasks(initialInput);
    };

    const taskInputDelete = (id) => {
        setTaskList((prevList) => prevList.filter((task) => task.id !== id));
    };

    const taskEditFunction = (val) => {
        setEditTasks(val);
        setTasks(val);
    };

    const debouncedUpdateLocalStorage = lodashDebounce((updatedTasks) => {
        localStorage.setItem("Task", JSON.stringify(updatedTasks));
    }, 500);

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const sourceIndex = result.source.index;
        const destinationIndex = result.destination.index;
        const sourceListId = result.source.droppableId;
        const destinationListId = result.destination.droppableId;

        if (sourceListId === destinationListId) {
            // Dragged within the same list (taskList, process, completed)
            const updatedTasks = Array.from(taskList);
            const [removed] = updatedTasks.splice(sourceIndex, 1);
            updatedTasks.splice(destinationIndex, 0, removed);

            setTaskList(updatedTasks);
            debouncedUpdateLocalStorage(updatedTasks);
        } else {
            // Dragged from taskList to Process or Completed
            const taskToMove = taskList[sourceIndex];
            taskToMove.status = destinationListId === "in-process" ? "In Process" : "Completed";

            const updatedTasks = Array.from(taskList);
            updatedTasks.splice(sourceIndex, 1);
            updatedTasks.splice(destinationIndex, 0, taskToMove);

            setTaskList(updatedTasks);
            debouncedUpdateLocalStorage(updatedTasks);
        }
    };

    const backFunction = useNavigate();

    const handleBack = () => {
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
                    <div className="mt-4">{role && <TaskForm tasks={tasks} handOnchangeFn={handOnchangeFn} taskInputSubmit={taskInputSubmit} editTasks={editTasks} />}</div>
                    <br />
                    <button className="btn btn-primary mt-2" onClick={handleBack}>
                        Logout
                    </button>
                    <br />
                </div>

                {/* Drag and drop context */}
                <DragDropContext onDragEnd={handleDragEnd}>
                    <div className="d-flex flex-row mt-2">
                        {/* Droppable for taskList */}
                        <Droppable droppableId="task-list" isDropDisabled={!role}>
                            {(provided) => (
                                <div ref={provided.innerRef} {...provided.droppableProps}>
                                    <TaskList taskList={taskList.filter((task) => !task.status)} role={role} taskEditFunction={taskEditFunction} taskInputDelete={taskInputDelete} openModal={openModal} />
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>

                        {/* Droppable for Process */}
                        <Droppable droppableId="in-process" isDropDisabled={!role}>
                            {(provided) => (
                                <div ref={provided.innerRef} {...provided.droppableProps}>
                                    {taskList.some((task) => task.status === "In Process") ? (
                                        <Process taskList={taskList.filter((task) => task.status === "In Process")} role={role} taskEditFunction={taskEditFunction} taskInputDelete={taskInputDelete} openModal={openModal} />
                                    ) : (
                                        <p className="text-center">In Process: No tasks yet</p>
                                    )}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>

                        {/* Droppable for Completed */}
                        <Droppable droppableId="completed" isDropDisabled={!role}>
                            {(provided) => (
                                <div ref={provided.innerRef} {...provided.droppableProps}>
                                    {taskList.some((task) => task.status === "Completed") ? (
                                        <Completed taskList={taskList.filter((task) => task.status === "Completed")} role={role} taskEditFunction={taskEditFunction} taskInputDelete={taskInputDelete} openModal={openModal} />
                                    ) : (
                                        <p className="text-center">Completed: No tasks yet</p>
                                    )}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>
                </DragDropContext>
            </div>

            <AnswerModal modalIsOpen={modalIsOpen} closeModal={closeModal} tasks={tasks} handOnchangeFn={handOnchangeFn} submitAnswer={submitAnswer} editTasks={editTasks} />
        </>
    );
}

export default Dashboard;

