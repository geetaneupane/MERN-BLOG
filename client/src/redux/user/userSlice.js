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
        },
        updateStart: (state) => {
            state.loading = true;
            state.error = null;
          },
          updateSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
          },
          updateFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
          },


//Following code is deleting the user account purpose. When we click the delete user option, then we should have the 
// updated state i.e. the profile username and other details of the user should be deleted.

          deleteUserStart: (state) => {
            state.loading = true;
            state.error = null;
          },
          deleteUserSuccess: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
          },
          deleteUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
          },

          signoutSuccess:(state, action)=>{
            state.currentUser=null,
            state.loading=false,
            state.error=null
          }
    }
});


export const {signInStart, 
  signInSuccess,
   signInFailure,
    updateStart,
     updateSuccess, 
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutSuccess
  
}=userSlice.actions
export default userSlice.reducer