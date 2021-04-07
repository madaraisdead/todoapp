import {combineReducers} from 'redux'
import projects from './projects'
import tasks from './tasks'
import lists from './lists'
import users from './users'
export default combineReducers({
  projects, tasks, lists, users
})
