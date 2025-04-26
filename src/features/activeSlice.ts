import { createSlice } from "@reduxjs/toolkit";
interface ActiveSlice {
    active_todo_id : string| undefined,
}
const initialState:ActiveSlice ={
    active_todo_id: '',
}

const activeSlice =  createSlice({
    name: 'activeTodo',
    initialState,
    reducers: {
        setActiveTodo: (state,action) => {
            const {id} = action.payload
            if(state.active_todo_id === id){
                state.active_todo_id = undefined;

            }else{

                state.active_todo_id = id
            }
        },
        
    }
}) 

export const {setActiveTodo} = activeSlice.actions
export default activeSlice.reducer