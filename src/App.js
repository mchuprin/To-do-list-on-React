import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Task from './Task';
import EditTask from './EditTask';

function App() {
  const [text, setText] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [taskText, updateText] = useState('');

  const url = `http://localhost:8000/`;

  useEffect (async() => {
    await axios.get(`${url}allTasks`).then(res => {
      setTasks(res.data);
    })
  }, [])
  
  const addNewTask = async () => {
    await axios.post(`${url}createTask`, {
      text,
      isCheck: false
    }).then(res => {
      if (res.status === 200) {
      setText('');
      const updatedList = [...tasks, res.data];
      setTasks(updatedList)
      }
    })
  } 

  return (
    <div className='back'>
      <h1>Список дел</h1>
      <div className='input-line'>
        <input className='main-input' type='text' id='mainInput' value={text} onChange={(event) => setText(event.target.value)} />
        <button className='main-button' onClick={() => addNewTask()}>Добавить</button>
      </div>
      {
        tasks
          .sort ((a, b) => {
            if (a.isCheck === b.isCheck) return 0;
            return (a.isCheck > b.isCheck) ? 1 : -1})
          .map(task => (
          <React.Fragment key={task._id}> {
              editTask === task ? 
                <EditTask 
                  task={task} 
                  setTasks={setTasks}
                  taskText={taskText}
                  updateText={updateText}
                  setEditTask={setEditTask} 
                  tasks={tasks} 
                  updateText={updateText}
                />
               : 
                <Task 
                  task={task} 
                  setTasks={setTasks}
                  setEditTask={setEditTask} 
                  tasks={tasks} 
                  updateText={updateText}
                />
          }    
          </React.Fragment>
        )) 
      }
    </div> 
  )
}
  
export default App;