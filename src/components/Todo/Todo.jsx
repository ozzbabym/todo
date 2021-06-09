import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import styles from './Todo.module.css'

function Todo() {
    const task = useSelector(item=>item.task)
    const selector = useSelector(item=>item)

    const dispatch = useDispatch()
    const [value, setValue] = React.useState('')
    const [sort, setSort] = React.useState(task)
    
    React.useEffect(() => {
        setSort(task)
        dispatch({type: 'ACTIVE_TASK', payload: true})
        dispatch({type: 'COMPLITED_TASK', payload: false})
    }, [task])

    const addTask = () => {
        let obj = {
            id: new Date(),
            name: value,
            isChecked: false
        }
        if (value.length>1 && value.length<30) {
        dispatch({type: 'ADD_TASK', payload: obj})
        setValue('')
        } else {
          alert('неверно ввели данные')  
        }
    }

    const deleteTask = (e) => {
        dispatch({type: 'DELETE_TASK', payload: e})
    }

    const changeIsChecked = (e) => {
        dispatch({type: 'CHECKED_TASK', payload: e})
    }

    const  allSort = () => {
        setSort(task)
    }

    const  activeSort = () => {
        const taskActive = task.filter(item=>item.isChecked === false)
        setSort(taskActive)
    }

    const  complitedSort = () => {
        const taskActive = task.filter(item=>item.isChecked === true)
        setSort(taskActive)
    }



    return (
        <div>
            <div className={styles.header}>
                <div className="input-group mb-3">
                    <input onChange={e=>setValue(e.currentTarget.value)}  type="text" className={`form-control ${value.length>1 && value.length<30 ? "is-valid" : "is-invalid"}`} placeholder="enter your task (length max 30 symbols min 2 symbols))" aria-label="Recipient's username" aria-describedby="button-addon2" value={value}/>
                    <button onClick={addTask} className="btn btn-primary" type="button" id="button-addon2">Add</button>
                </div>
            </div>
            <div className={styles.taskCount}>
                <div>Task: <span>{task.length}</span></div>
                <div>Active: <span>{selector.taskActive && selector.taskActive.length}</span></div>
                <div>Complited: <span>{selector.taskComplited && selector.taskComplited.length}</span></div>
            </div>
            <div className={styles.buttonPopup}>
                <button onClick={allSort} className='btn btn-secondary'>All</button>
                <button onClick={activeSort} className='btn btn-warning'>Active</button>
                <button onClick={complitedSort} className='btn btn-success'>Complited</button>
            </div>
            <div className={styles.todoList}>
                {sort && sort.map((item)=>{
                    return <div className={styles.todoItem} key={item.id}>
                            <div><input onChange={e=>changeIsChecked({checked: e.target.checked, id: item.id })} type='checkbox' checked={item.isChecked}/></div>
                            <div className={item.isChecked ? styles.taskDecoration : ''}><p>{item.name}</p></div>
                            <div onClick={()=>deleteTask(item.id)}><span className='btn btn-danger'>delete</span></div>
                    </div>}
                )}   
            </div>
        </div>
    )
}

export default Todo
