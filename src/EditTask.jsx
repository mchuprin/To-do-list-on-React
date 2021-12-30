import './App.css';
import axios from 'axios';
import URL from './url'
import cross from './img/cross.svg';
import done from './img/done.svg';

const EditTask = ({task, tasks, setEditTask, updateText, setTasks, taskText}) => {

  const URL = `http://localhost:8000/`;

  const deleteTask = async (task) => {
    await axios.delete(`${URL}deleteTask?_id=${task._id}`).then((res) => {
      if (res.status === 200) {
      const stayedTasks = tasks.filter((i)=> i._id !== task._id);
      setTasks(stayedTasks)
      }
    })
  }

  const doneEdit = async (task) => {
    await axios.patch(`${URL}updateTaskText`, {
      _id: task._id,
      text: taskText
    }).then(res => {
      if (res.status === 200) {
        tasks.map(value => {
          if(value._id === task._id) {
           value.text = taskText;
            setEditTask(null);
          }
        })
      }
    })
  }

  const changeChecked = async (task) => {
    await axios.patch(`${URL}updateTask`, {
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
      <input className='check' type='checkbox' onChange={() => changeChecked(task)} checked={task.isCheck}/>
      <input className='edit-input' type='text' value={taskText} onChange={(e) => updateText(e.target.value)} />
      <button className='d-button' onClick={() => doneEdit(task)}>
        <img src={done} alt={"done"}  /> 
      </button>            
      <button className='d-button' onClick={() => deleteTask(task)}>
        <img src={cross} alt={"delete"} />
      </button>   
    </div>
  )
}

export default EditTask;