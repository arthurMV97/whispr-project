import {combineReducers} from 'redux';
import userStore from './user.js'
import adminStore from './admin.js'
import abonnementStore from './following.js'


const allReducers = combineReducers({
    userStore,
    adminStore,
    abonnementStore
})
export default allReducers