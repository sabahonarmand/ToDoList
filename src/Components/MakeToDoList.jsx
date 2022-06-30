import React, { useEffect, useState, useContext } from 'react';
import { TasksContexts } from '../Contexts/TasksContexts';
import './MakeToDoList.css';
import 'animate.css';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import DatePicker from 'react-datepicker2';
import moment from 'moment-jalaali';
import Navbar from './Navbar';

function MakeToDoList() {

    const [dateValue, setDateValue] = useState(moment());  //show the present moment
    const [showItems, setShowItems] = useState(true);    //show all of tasks with details
    const [showErrorMassage, setShowErrorMassage] = useState(false);  // show error masage when we don't have any input 
    const [titleInput, setTitleInput] = useState("");
    const [taskInput, setTaskInput] = useState("");
    const [startTimeValue, setStartTimeValue] = useState("");
    const [endTimeValue, setEndTimeValue] = useState("");
    const [date, setDate] = useState("");

    const [tasksProp, setTasksProp] = useContext(TasksContexts);

    const [tasks, setTasks] = useLocalState("task", []);
    function useLocalState(key, initialValue) {
        // State to store our value
        // Pass initial state function to useState so logic is only executed once
        const [storedValue, setStoredValue] = useState(() => {
            if (typeof window !== "undefined") {
                const saved = window.localStorage.getItem(key);
                if (saved !== null) {
                    return JSON.parse(saved);
                }
            }
            return initialValue;
        });

        useEffect(() => {
            window.localStorage.setItem(key, JSON.stringify(storedValue));
        }, [storedValue]);

        return [storedValue, setStoredValue];
    }

    //set the title input
    function handleChangeTitleInput(e) {
        setTitleInput(e.target.value);
    }

    //set the task input
    function handleChangeTaskInput(e) {
        setTaskInput(e.target.value);
    }

    //when click submit button, tasksInput will be set.
    function handleClickSubmiteButton() {
        //show error massage when we don't have titleInput and taskInput
        if (titleInput === "" || taskInput === "") {
            setShowErrorMassage(true);
        }
        else {
            // first element of tesks array is empty, so we should delete it.
            setTasks([...tasks, {
                id: tasks.length,
                title: titleInput,
                task: taskInput,
                date: date,
                startTime: startTimeValue,
                endTime: endTimeValue,
                deleteTask: false,
                doneTask: false
            }]);
            // set tesks array for another page
            setTasksProp([...tasksProp, {
                id: tasksProp.length,
                title: titleInput,
                task: taskInput,
                date: date,
                startTime: startTimeValue,
                endTime: endTimeValue,
                deleteTask: false,
                doneTask: false
            }]);
            setTitleInput("");
            setTaskInput("");
            setShowItems(true);
            setShowErrorMassage(false);

        }
    }

    //In this function we should set doneTask properties of desired element true 
    //and then delete it from this page
    function handleClickCheckIcon(r, index) {
        let doneItem = tasksProp.find(item =>
            item.title == r.title && item.task == r.task && item.date == r.date);
        doneItem.doneTask = true;
        let arr = [...tasks];
        let i = arr.findIndex(item =>
            item.title == r.title && item.task == r.task && item.date == r.date);
        arr.splice(i, 1);
        setTasks(arr);
    }

    //In this function we should set deleteTask properties of desired element true 
    //and then delete it
    function handleClickDeleteIcon(r, index) {
        let temp = [...tasks];
        let i = temp.findIndex(item => item === r);
        temp[i].deleteTask = true;
        setTasks(temp);
        setTimeout(function () {
            let arr = [...tasks];
            arr.splice(i, 1);
            setTasks(arr);
            let arr2 = [...tasksProp];
            let i2 = arr2.findIndex(item =>
                item.title == r.title && item.task == r.task && item.date == r.date);
            arr2.splice(i2, 1);
            setTasksProp(arr2);
        }, 900);
    };
    return (
        <div>
            <Navbar />
            <div className="MakeToDoList">
                <div className="container">
                    <div className="logo">
                        <svg width="150" height="150" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
                            <desc>Created with Sketch.</desc>
                            <defs>
                                <linearGradient x1="34.9523037%" y1="0%" x2="116.039609%" y2="115.484477%" id="linearGradient-1">
                                    <stop stop-color="#1700FF" offset="0%"></stop>
                                    <stop stop-color="#B10EF1" offset="100%"></stop>
                                </linearGradient>
                                <rect id="path-2" x="19.8783454" y="5.46149939" width="67.2578578" height="67.2008596" rx="8.99999976"></rect>
                                <filter x="-35.7%" y="-28.3%" width="162.4%" height="162.5%" filterUnits="objectBoundingBox" id="filter-3">
                                    <feOffset dx="-3" dy="2" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
                                    <feGaussianBlur stdDeviation="6.5" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                                    <feColorMatrix values="0 0 0 0 0.0296505968   0 0 0 0 0.0172602666   0 0 0 0 0.100446429  0 0 0 0.423177083 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
                                </filter>
                                <linearGradient x1="0%" y1="0%" x2="115.291753%" y2="112.548614%" id="linearGradient-4">
                                    <stop stop-color="#1700FF" offset="0%"></stop>
                                    <stop stop-color="#9E0CF3" offset="83.2001616%"></stop>
                                    <stop stop-color="#B10EF1" offset="100%"></stop>
                                </linearGradient>
                                <path d="M40.2086259,6.21042694 C39.2480415,5.24152695 38.1027468,4.75708888 36.7727039,4.75708888 C35.4426658,4.75708888 34.3096854,5.24152695 33.3737297,6.21042694 L16.3049725,23.7622477 L12.0193093,19.3649757 C11.0833536,18.3960804 9.9503732,17.9116376 8.62033507,17.9116376 C7.29029269,17.9116376 6.14499751,18.3960804 5.1844131,19.3649757 C4.24845898,20.3338709 3.78048896,21.5077058 3.78048896,22.8865186 C3.78048896,24.2653314 4.24845898,25.4391663 5.1844131,26.4080615 L12.8690505,34.3082476 C13.8296349,35.2771428 14.9749296,35.7615833 16.3049725,35.7615833 C17.6350106,35.7615833 18.767991,35.2771428 19.7039467,34.3082476 L40.2086259,13.2535128 C41.1445816,12.2597758 41.61255,11.0797257 41.61255,9.71333379 C41.61255,8.34694665 41.1445816,7.17932216 40.2086259,6.21042694 Z" id="path-5"></path>
                                <filter x="-51.5%" y="-62.9%" width="203.1%" height="225.8%" filterUnits="objectBoundingBox" id="filter-6">
                                    <feOffset dx="0" dy="0" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
                                    <feGaussianBlur stdDeviation="6.5" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                                    <feColorMatrix values="0 0 0 0 1   0 0 0 0 1   0 0 0 0 1  0 0 0 0.588937953 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
                                </filter>
                            </defs>
                            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <g id="Artboard-2" transform="translate(-214.000000, -272.000000)">
                                    <g id="Group-4" transform="translate(201.000000, 269.000000)">
                                        <g id="Group-3" transform="translate(58.787474, 58.534712) rotate(-6.000000) translate(-58.787474, -58.534712) translate(5.642436, 5.434712)">
                                            <g id="Group-2" transform="translate(52.899385, 53.035097) rotate(7.000000) translate(-52.899385, -53.035097) translate(5.609309, 5.785097)">
                                                <path d="M20.0219734,15.1240886 L74.1829282,14.1930575 C79.1527566,14.1076258 83.2508546,18.0672116 83.3362864,23.03704 C83.3371726,23.0885978 83.3376158,23.1401624 83.3376158,23.1917278 L83.3376158,72.0429044 C83.3376158,76.9531616 79.4018358,80.9571794 74.4923039,81.0415747 L20.3313491,81.9726057 C15.3615207,82.0580374 11.2634227,78.0984516 11.1779909,73.1286232 C11.1771047,73.0770654 11.1766615,73.0255009 11.1766615,72.9739354 L11.1766615,24.1227589 C11.1766615,19.2125016 15.1124415,15.2084838 20.0219734,15.1240886 Z" id="Rectangle" fill="url(#linearGradient-1)" transform="translate(47.257139, 48.082832) scale(-1, -1) rotate(-25.000000) translate(-47.257139, -48.082832) "></path>
                                                <g id="Rectangle" transform="translate(53.507274, 39.061929) rotate(-10.000000) translate(-53.507274, -39.061929) ">
                                                    <use fill="black" fill-opacity="1" filter="url(#filter-3)" href="#path-2"></use>
                                                    <use fill="#FBFBFB" fill-rule="evenodd" href="#path-2"></use>
                                                </g>
                                            </g>
                                        </g>
                                        <g id="Group-5" transform="translate(43.000000, 26.000000)">
                                            <path d="M41.1093892,10.5623533 C40.1488048,9.59345333 39.0035101,9.10901526 37.6734673,9.10901526 C36.3434291,9.10901526 35.2104488,9.59345333 34.274493,10.5623533 L17.2057358,28.1141741 L12.9200727,23.716902 C11.9841169,22.7480068 10.8511366,22.263564 9.52109843,22.263564 C8.19105605,22.263564 7.04576086,22.7480068 6.08517646,23.716902 C5.14922234,24.6857973 4.68125232,25.8596322 4.68125232,27.238445 C4.68125232,28.6172578 5.14922234,29.7910927 6.08517646,30.7599879 L13.7698139,38.660174 C14.7303983,39.6290692 15.875693,40.1135096 17.2057358,40.1135096 C18.535774,40.1135096 19.6687543,39.6290692 20.6047101,38.660174 L41.1093892,17.6054392 C42.045345,16.6117022 42.5133134,15.4316521 42.5133134,14.0652602 C42.5133134,12.698873 42.045345,11.5312485 41.1093892,10.5623533 Z" id="Page-1" fill="url(#linearGradient-4)" opacity="0.3" transform="translate(23.597283, 24.611262) rotate(-16.000000) translate(-23.597283, -24.611262) "></path>
                                            <path d="M42.0101526,14.2623533 C41.0495682,13.2934533 39.9042735,12.8090153 38.5742306,12.8090153 C37.2441925,12.8090153 36.1112121,13.2934533 35.1752564,14.2623533 L18.1064992,31.8141741 L13.820836,27.416902 C12.8848803,26.4480068 11.7518999,25.963564 10.4218618,25.963564 C9.09181941,25.963564 7.94652422,26.4480068 6.98593982,27.416902 C6.78271177,27.6272827 6.60154798,27.8473258 6.4424483,28.0770317 C5.8688243,28.9052219 5.58201568,29.8590202 5.58201568,30.938445 C5.58201568,32.3172578 6.04998569,33.4910927 6.98593982,34.4599879 L14.6705772,42.360174 C15.6311616,43.3290692 16.7764563,43.8135096 18.1064992,43.8135096 C19.4365373,43.8135096 20.5695177,43.3290692 21.5054734,42.360174 L42.0101526,21.3054392 C42.9461083,20.3117022 43.4140767,19.1316521 43.4140767,17.7652602 C43.4140767,16.398873 42.9461083,15.2312485 42.0101526,14.2623533 Z" id="Page-1" fill="url(#linearGradient-4)" opacity="0.2" transform="translate(24.498046, 28.311262) rotate(-16.000000) translate(-24.498046, -28.311262) "></path>
                                            <g id="Page-1" transform="translate(22.696519, 20.259336) rotate(-16.000000) translate(-22.696519, -20.259336) ">
                                                <use fill="black" fill-opacity="1" filter="url(#filter-6)" href="#path-5"></use>
                                                <use fill="url(#linearGradient-4)" fill-rule="evenodd" href="#path-5"></use>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </svg>
                    </div>
                    <div className="inputs">
                        <input className="titleInput" type="text" placeholder="عنوان" value={titleInput}
                            onChange={(e) => handleChangeTitleInput(e)}
                        ></input>
                    </div>
                    <div className="inputs">
                        <input className="taskInput" type="text" placeholder="برنامه" value={taskInput}
                            onChange={(e) => handleChangeTaskInput(e)}
                        ></input>
                    </div>
                    <div className="calendar">
                        <div className="endTime">
                            <input
                                className="TimeInput"
                                type="time"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                // 5 minutes
                                inputProps={{
                                    step: 300,
                                }}
                                onChange={(e) => setEndTimeValue(e.target.value)}
                            ></input>
                        </div>
                        <div className="startTime">
                            <input
                                className="TimeInput"
                                type="time"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                // 5 minutes
                                inputProps={{
                                    step: 300,
                                }}
                                onChange={(e) => setStartTimeValue(e.target.value)}
                            ></input>
                        </div>
                        <DatePicker
                            className="date"
                            value={dateValue}
                            timePicker={false}
                            isGregorian={false}
                            onChange={(value) => {
                                const inputFormat = 'jYYYY/jM/jD';
                                const t = value.locale('fa').format(inputFormat);
                                setDate(t)
                            }
                            }
                        />
                    </div>
                    <button className="submiteButton" onClick={handleClickSubmiteButton}>تایید</button>
                    <div className="Tasks">
                        {showErrorMassage === true ?
                            <p className="errorMassage animate__animated animate__bounceIn">Oops! Please, enter name item⚠</p>
                            : null}
                        <ul className="Items">
                            {showItems === true ?
                                tasks.map((r, index) => (
                                    <li key={r.id} className={r.deleteTask ? "item animate__animated animate__bounceOut" : "item animate__animated animate__flipInX"}>
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
                                                <CheckIcon className="checkIcon" onClick={() => handleClickCheckIcon(r, index)} />
                                                <DeleteIcon className="deleteIcon" onClick={() => handleClickDeleteIcon(r, index)} />
                                            </div>
                                            <br />
                                            <span className="task">{r.task}</span>
                                        </div>
                                    </li>
                                )) : null
                            }
                        </ul>
                    </div>
                </div>
            </div >
        </div>
    )
}
export default MakeToDoList;
