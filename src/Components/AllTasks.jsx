import React, { useContext, useEffect, useState } from 'react';
import { TasksContexts } from '../Contexts/TasksContexts';
import Navbar from './Navbar';
import './AllTasks.css';
import 'animate.css';
import DeleteIcon from '@mui/icons-material/Delete';

//In this page we can see all of tasks and can delete the done task.
function AllTasks() {

    const [tasksProp, setTasksProp] = useContext(TasksContexts);
    const [showItems, setShowItems] = useState(false);
    //If we don't have any task, we should display this page is empty.
    useEffect(() => {
        if (tasksProp.length !== 0) {
            setShowItems(true);
        }
    }, [tasksProp])

    //Delete element from AllTask page and TodayTask page
    function handleClickDeleteIcon(r, index) {
        let arr = [...tasksProp];
        arr.splice(index, 1);
        setTasksProp(arr);
    };

    return (
        <div>
            <Navbar />
            <div className="AllTasks">
                {showItems === true ?
                    <ul className="list-Items animate__animated animate__fadeInDown">
                        {tasksProp.map((r, index) => (
                            <li key={r.id} className={`${r.deleteTask ? "taskItem animate__animated animate__bounceOut" : "taskItem"}
                            ${r.doneTask ? "doneTask" : ""}`}>
                                <div>
                                    <div className="time" style={{ marginTop: "10px" }}>
                                        <span>{r.endTime}</span>
                                        <span className="st">{r.startTime}</span>
                                        <span> , {r.date}</span>
                                    </div>
                                    <br />
                                    <span className="title">{r.title}</span>
                                    <br />
                                    <div className="Icons">
                                        {r.doneTask ?
                                            <DeleteIcon className="deleteIcon" onClick={() => handleClickDeleteIcon(index, r)}
                                            />
                                            : ""}
                                    </div>
                                    <br />
                                    <span className="task">{r.task}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                    :
                    <div className="EmptyStateDiv animate__animated animate__jackInTheBox">
                        <img src="/image/EmptyState.png" alt="image" className="EmptyStateImage" />
                        <a className="Nothing">!!!NOTHING </a>
                        <br />
                        <a className="EmptyError">.It's empty in here</a>
                    </div>
                }
            </div>
        </div>
    )
}
export default AllTasks;