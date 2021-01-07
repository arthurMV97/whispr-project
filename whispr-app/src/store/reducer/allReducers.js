import {combineReducers} from 'redux';
import userStore from './user.js'
import adminStore from './admin.js'


const allReducers = combineReducers({
    userStore,
    adminStore
})
export default allReducers