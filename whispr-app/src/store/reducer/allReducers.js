import {combineReducers} from 'redux';
import userStore from './user.js'
import adminStore from './admin.js'
import abonnementStore from './following.js'
import favorisStore from './favoris.js'



const allReducers = combineReducers({
    userStore,
    adminStore,
    abonnementStore,
    favorisStore
})
export default allReducers