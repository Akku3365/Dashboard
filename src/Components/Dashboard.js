/** @format */

// /** @format */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

function Dashboard(props) {
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
    const [editdTask, setEditdTask] = useState({ id: 0, t: "", de: "" });

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
        setEditdTask(val);
        setTasks(val);
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
                    {editTasks !== null ? (
                        <button className="btn btn-dark" onClick={taskInputSubmit}>
                            Update Task
                        </button>
                    ) : (
                        <button className="btn btn-dark" onClick={taskInputSubmit}>
                            Add Task
                        </button>
                    )}
                    <br />
                    <button className="mt-2" onClick={handleback}>
                        Back to Home
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
                                <span>
                                    <button onClick={() => taskEditFunction(taskItem)}>Edit Task</button>
                                </span>
                                <span>
                                    <button onClick={() => taskInputDelete(taskItem.id)}>Delete task</button>
                                </span>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
