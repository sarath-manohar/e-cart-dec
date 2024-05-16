import { createSlice } from "@reduxjs/toolkit";

const whishListSlice = createSlice ({
     name:"whislist",
     initialState:[],
     reducers:{
        addToWhislist:(state,action)=>{
             state.push(action.payload)
        },
        removeFromWhishlist:(state,action)=>{
          return state.filter(item=>item.id!=action.payload)
        }

     }
})

export const {addToWhislist,removeFromWhishlist}=whishListSlice.actions
export default whishListSlice.reducer