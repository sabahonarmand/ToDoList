import React from 'react';
import MakeToDoList from './Components/MakeToDoList';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import TodayList from './Components/TodayList';
import AllTasks from './Components/AllTasks';
import { TaskProvider } from './Contexts/TasksContexts';

function App() {

  return (
    <Router>
      <div className="App">
        <Switch>
          <TaskProvider>
            <Route path="/">
              <Redirect to="/MakeToDoList"></Redirect>
            </Route>
            <Route exact path="/MakeToDoList" component={MakeToDoList} />
            <Route exact path="/AllTasks" component={AllTasks} />
            <Route exact path="/TodayList" component={TodayList} />
          </TaskProvider >
        </Switch>
      </div>
    </Router>
  );
}
export default App;
