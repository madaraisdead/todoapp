

export default function tasks(tasks = [], action) {
  switch (action.type)
  {
    case 'FETCH_TASKS':
      return action.payload;
    case 'CREATE_TASK':
      return [...tasks, action.payload];
      case 'COMPLETE_TASK':
        return tasks.map((task) => task._id === action.payload._id ? action.payload : task)
    case 'PROJECT_TASKS':
      return action.payload
    case 'TODAY_TASKS':
      return action.payload
    case 'NEXTDAYS_TASKS':
      return action.payload
    case 'DELETE_TASK': 
      return tasks.filter((task)=> task._id !== action.payload)
    default:
    return tasks;
  }
}