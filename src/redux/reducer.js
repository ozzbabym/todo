const initialState = {
    task: []
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {

    case 'ADD_TASK':{
        return { ...state, task: [...state.task, action.payload] }
        }
    case 'DELETE_TASK':{
        return { ...state, task: state.task.filter(item=>item.id !== action.payload) }
        }
    case 'CHECKED_TASK':{
        const task = state.task.map(value => {
            if(value.id === action.payload.id){
               let valueChecked = {id: value.id, name: value.name, isChecked: action.payload.checked}
               return valueChecked
            }else{
               return value
            }
        })
        return { ...state, task: task }
        }
    case 'ACTIVE_TASK':{
        return { ...state, taskActive: state.task.filter(item=>item.isChecked !== action.payload) }
        }    
    case 'COMPLITED_TASK':{
        return { ...state, taskComplited: state.task.filter(item=>item.isChecked !== action.payload) }
        }    
    default:
        return state
    }
}

