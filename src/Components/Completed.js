import React from "react";
import { Draggable } from "react-beautiful-dnd";

function Completed({ taskList, role, taskEditFunction, taskInputDelete, openModal }) {
    console.log(taskList)
    return (
        <>
            <div style={{ border: "2px solid black", width: "100%" }}>
                <ol className="list-group">
                    <h1 className="text-center">Completed</h1>
                    {taskList.map((taskItem, index) => (
                        <Draggable key={taskItem.id.toString()} draggableId={taskItem.id.toString()} index={index} isDragDisabled={!role}>
                            {(provided) => (
                                <div style={{border: "2px solid red"}}>
                                <li className="list-group-item mt-2" style={{ border: "2px solid lightskyblue", background: "floralwhite", borderRadius: "5px" }} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                    <p>
                                        <span className="fs-4">Task:</span> {taskItem.t}
                                    </p>
                                    <p>
                                        <span className="fs-4">Description:</span> {taskItem.de}
                                    </p>
                                    <p>
                                        <span className="fs-4">Answer:</span> {taskItem.answer}
                                    </p>
                                    {taskItem.status && (
                                        <p>
                                            <span className="fs-4 text-primary">Status:</span> {taskItem.status}
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
                                    {!role && !taskItem.status && (
                                        <button className="btn btn-primary" onClick={() => openModal(taskItem.id)}>
                                            Answer
                                        </button>
                                    )}
                                    {!role && taskItem.status && (
                                        <button className="btn btn-primary" onClick={() => openModal(taskItem.id)}>
                                            Edit Answer
                                        </button>
                                    )}
                                </li>
                                </div>
                            )}
                        </Draggable>
                    ))}
                </ol>
            </div>
        </>
    );
}

export default Completed;


