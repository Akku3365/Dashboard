import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";


function Dashboard(props) {

    let initialSubmit;

    // if (localStorage.getItem("Task") === null) {
    //     initialSubmit = []
    // } else {
    //     initialSubmit = JSON.parse(localStorage.getItem("Task"))
    // }

    
    const [submitTask, setSubmitTask] = useState(initialSubmit);
    useEffect(() => {
        localStorage.setItem("Task", JSON.stringify(submitTask))
    }, [submitTask])
    
    const initialTask = {
        task: "",
        desc: ""
    }
    const [tasks, setTasks] = useState(initialTask);

    const taskInputChange = (e) => {
        const { name, value } = e.target;
        setTasks({ ...tasks, [name]: value });
        console.log(tasks)
    }

    const taskInputSubmit = () => {
        setSubmitTask({ ...submitTask, tasks})
    }

    console.log(submitTask)

    // console.log(props)

    const backFunction = useNavigate();

    const handleback = () => {
        backFunction("/");
    }

    return (
        <>
            <div className='container'>
                <h1 className='text-primary text-center'>Dashboard{props.role}</h1>
                <label htmlFor='task mt-3'>Tasks</label>
                <input type='text' name="task" value={tasks.task} onChange={taskInputChange} placeholder='Enter tasks'></input>
                <input type='text' name="desc" value={tasks.desc} onChange={taskInputChange} placeholder='Description'></input>
                <button onClick={taskInputSubmit} >Add Task</button>
                <br />
                <button className='mt-5' onClick={handleback} >Back to Home</button>
            </div>
        </>
    )
}

export default Dashboard
