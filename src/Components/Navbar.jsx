import React, { useContext } from 'react';
import './Navbar.css';
import { Link } from "react-router-dom";
import { TasksContexts } from '../Contexts/TasksContexts';


function Navbar() {
    return (
        <div className="navbar">
            <ul className="navbarList">
                <li className="navbarItem"><Link to="/MakeToDoList">ساخت برنامه</Link></li>
                <li className="navbarItem"><Link to="/AllTasks">همه ی برنامه ها</Link></li>
                <li className="navbarItem"><Link to="/TodayList">برنامه امروز</Link></li>
            </ul>
        </div>
    )
}
export default Navbar;
