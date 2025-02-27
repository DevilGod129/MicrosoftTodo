import { createSlice } from "@reduxjs/toolkit";
interface ActiveSlice {
    active_todo_id : string,
    visible :boolean,
}
const initialState:ActiveSlice ={
    active_todo_id: '',
    visible: false,
}

const activeSlice =  createSlice({
    name: 'activeTodo',
    initialState,
    reducers: {
        setActiveTodo: (state,action) => {
            const {todo_id} = action.payload
            state.active_todo_id = todo_id
            state.visible = !state.visible
        },
        
    }
}) 

export const {setActiveTodo} = activeSlice.actions
export default activeSlice.reducer