import { createSlice } from '@reduxjs/toolkit'

const initialState={
    currentUser:null,
    error:null,
    loading:false
}

const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart:(state)=>{
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
       // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
     // immutable state based off those changes
            state.loading=true,
            state.error=null
        },
        signInSuccess:(state, action)=>{
         state.currentUser=action.payload,                  //For understanding payload, it is the userdata that we will get while sigining. 
         state.loading=false,                               //Look into the redux documentation to fully understand what is payload. 
         state.error=null
        },
        signInFailure:(state, action)=>{
            state.loading=false,
            state.error=action.payload                     //We will see the error message same as we see while inspecting. 
        }
    }
});


export const {signInStart, signInSuccess, signInFailure}=userSlice.actions
export default userSlice.reducer