/** @format */
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

function Dashboard(props) {
    const initialInput = {
        t: "",
        de: "",
    };

    // All States
    const [tasks, setTasks] = useState(initialInput);
    // const [description, setDescription] = useState('');
    const [taskList, setTaskList] = useState([]);
    const [editTasks, setEditTasks] = useState({});
    const [editdTask, setEditdTask] = useState({ id: 0, t: "", de: "" });

    useEffect(() => {
        const storedItems = localStorage.getItem("Task");
        if (storedItems) {
            setTaskList(JSON.parse(storedItems));
        }
    }, []);

    const handOnchangeFn = (e) => {
        const { name, value } = e.target;
        setTasks({ ...tasks, [name]: value });
    };

    const taskInputSubmit = () => {
        let temp_arr = [...taskList, { ...tasks, id: taskList.length + 1 }];
        setTaskList(temp_arr);
        localStorage.setItem("Task", JSON.stringify(temp_arr));
        setTasks(initialInput);
    };

    const taskInputDelete = (i) => {
        console.log(i);
        let new_Arr = taskList.filter((task) => task.id !== i);
        setTaskList(new_Arr);
        localStorage.setItem("Task", JSON.stringify(new_Arr));
    };

    const taskEditFunction = (val) => {
        setEditTasks(val);
        setEditdTask(val)
    };

    // Update the input fields for editing the task
    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditdTask({ ...editdTask, [name]: value });
    };

    // Save the edited task

    const handleSaveEdit = () => {
        const taskIndex = taskList.findIndex((task) => task.id === editTasks.id);
        const updatedtaskList = [...taskList];
        if (taskIndex !== -1) {
            updatedtaskList[taskIndex] = { ...editdTask, id: editTasks.id };
        }
        setTaskList(updatedtaskList);
        localStorage.setItem("Task", JSON.stringify(updatedtaskList));
        setEditdTask({
            id: 0,
            t: "",
            de: "",
        });
        setEditTasks({});
    };

    const backFunction = useNavigate();

    const handleback = () => {
        backFunction("/");
    };

    return (
        <>
            <div className="container">
                <div>
                    <h1 className="text-primary text-center">Dashboard{props.role}</h1>
                    <label htmlFor="task">Tasks</label>
                    <input type="text" value={tasks.t} name="t" onChange={handOnchangeFn} placeholder="Enter tasks"></input>
                    <label htmlFor="task">Description</label>
                    <input type="text" value={tasks.de} name="de" onChange={handOnchangeFn} placeholder="Description"></input>
                    <button className="btn btn-dark" onClick={taskInputSubmit}>Add Task</button><br />
                    <button className="mt-2" onClick={handleback}>
                        Back to Home
                    </button>
                    <br />
                </div>

                <div>
                    <ol className="list-group">
                        {taskList.map((taskItem, i) => (
                            <li className="list-group-item" key={i}>
                                <p><span className="fs-4">Task:</span> {taskItem.t}</p>
                                <p><span className="fs-4">Description:</span> {taskItem.de}</p>
                                <span><button onClick={() => taskEditFunction(taskItem)} >Edit Task</button></span>
                                <span><button onClick={() => taskInputDelete(taskItem.id)}>Delete task</button></span>
                            </li>
                        ))}
                    </ol>
                </div>
            {editTasks.id !== undefined && (
                <div>
                    <h3>Edit Your Task</h3>
                    <input type="text" name="t" value={editdTask.t} onChange={handleEditChange} placeholder="Edit your task"></input>
                    <input type="text" name="de" value={editdTask.de} onChange={handleEditChange} placeholder="Edit your description"></input>
                    <button onClick={handleSaveEdit}>Update</button>
                </div>
            )}
            </div>
        </>
    );
}

export default Dashboard;
