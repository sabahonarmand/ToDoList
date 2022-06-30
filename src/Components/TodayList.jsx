import React, { useContext, useEffect, useState } from 'react';
import { TasksContexts } from '../Contexts/TasksContexts';
import Navbar from './Navbar';
import './AllTasks.css';
import 'animate.css';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment-jalaali';
function TodayList() {

    const [tasksProp, setTasksProp] = useContext(TasksContexts);
    const [todayDate, setTodayDate] = useState(moment());
    const [todayTasks, setTodayTasks] = useState([]);
    const [showItems, setShowItems] = useState(false);

    //We should filter the tasks array that just displaying today task
    useEffect(() => {
        const inputFormat = 'jYYYY/jM/jD';
        const today = todayDate.locale('fa').format(inputFormat);
        let arr = tasksProp.filter(r => r.date === today);
        if (arr.length !== 0) {
            setShowItems(true);
        }
        setTodayTasks(arr);
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
                        {todayTasks.map((r, index) => (
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
export default TodayList;