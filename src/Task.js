import './App.css';
import axios from 'axios';
import pencil from './img/pencil.svg';
import cross from './img/cross.svg';

function Task({task, tasks, setEditTask, updateText, setTasks}) {

  const url = `http://localhost:8000/`;

  const deleteTask = async (task) => {
    console.log(task)
    await axios.delete(`${url}deleteTask?_id=${task._id}`).then((res) => {
      if (res.status === 200) {
      const stayedTasks = tasks.filter((i)=> i._id != task._id);
      setTasks(stayedTasks)
      }
    })
  }

  const updateTask = (task) => {
    setEditTask(task);
    updateText(task.text);
  }

  const changeChecked = async (task) => {
    await axios.patch(`${url}updateTask`, {
      _id: task._id,
      isCheck: !task.isCheck
    }).then(res => {
      if (res.status === 200) {
        const newTasks = tasks.map(item => {
          const newTask = {...item};
          if (task._id === newTask._id) {
            newTask.isCheck = !task.isCheck;
          }
          return newTask;
        }) 
        setTasks(newTasks);
      }
    })
  }

  return (
    <div className='task'>
        <input className='check' type='checkbox' onChange={() => changeChecked(task)} checked={task.isCheck} /> 
        <p>{task.text}</p>
        <button className='d-button' onClick={() => updateTask(task)}>
          <img src={pencil} alt={"edit"} />
        </button>
        <button className='d-button' onClick={() => deleteTask(task)}>
          <img src={cross} alt={"delete"} />
        </button>
    </div>
  )
}
  
export default Task;
