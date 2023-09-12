import { configureStore } from '@reduxjs/toolkit'
import HomeReducer from  "./Home/HomeSlice"
import PersonalReducer from './Personal/PersonalSlice'

 const store = configureStore({ reducer: {
    homeReducer:HomeReducer,
    personal:PersonalReducer
 } })


export default store