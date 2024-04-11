import {configureStore} from '@reduxjs/toolkit'
import userReducer from './features/user/userSlice'
import cartReducer from './features/cart/CartSlice.tsx'

const store =  configureStore({
    reducer: {
        user: userReducer,
        cart: cartReducer
    }
})

export default store