/** @format */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

function Dashboard(props) {
    // Destructuring the role prop directly
    const { role } = props;

    const initialInput = {
        t: "",
        de: "",
    };

    // All States
    const [tasks, setTasks] = useState(initialInput);
    const [taskList, setTaskList] = useState(() => {
        const storedItems = localStorage.getItem("Task");
        return storedItems ? JSON.parse(storedItems) : [];
    });
    const [editTasks, setEditTasks] = useState(null);

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
            let temp_arr = [...taskList, { ...tasks, id: taskList.length + 1 }];
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
        // let temp_val = window.alert("Do you really want to logout");
        // if(temp_val) {
            localStorage.removeItem('user_d');
            backFunction("/");
        // }
    };

    return (
        <>
            <div className="container">
                <div>
                    <h1 className="text-primary text-center">Dashboard</h1>
                    {/* Conditional rendering based on props.role */}
                    {role ? <h3 className="text-center">Welcome Teacher</h3> : <h3 className="text-center">Hello Student</h3>}
                    <div className="mt-4">
                        {role && (
                            <>
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
                            </>
                        )}
                    </div>
                    <br />
                    <button className="btn btn-primary mt-2" onClick={handleback}>
                        Logout
                    </button>
                    <br />
                </div>

                <div>
                    <ol className="list-group">
                        {taskList.map((taskItem, i) => (
                            <li className="list-group-item" key={i}>
                                <p>
                                    <span className="fs-4">Task:</span> {taskItem.t}
                                </p>
                                <p>
                                    <span className="fs-4">Description:</span> {taskItem.de}
                                </p>
                                {role && (
                                    <span>
                                        <button className="btn btn-warning" onClick={() => taskEditFunction(taskItem)}>
                                            Edit Task
                                        </button>
                                    </span>
                                )}
                                {role && (
                                    <span>
                                        <button className="btn btn-danger" onClick={() => taskInputDelete(taskItem.id)}>
                                            Delete task
                                        </button>
                                    </span>
                                )}
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
