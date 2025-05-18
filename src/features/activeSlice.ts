import { createSlice } from "@reduxjs/toolkit";
interface ActiveSlice {
    active_todo_id : string| undefined,
    text_color : string | undefined,
    bg_color: string | undefined
}
const initialState:ActiveSlice ={
    active_todo_id: '',
    bg_color: 'https://i.imgur.com/EDjOfUE.png',
    text_color: 'white'
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
        setTextColor: (state,action) => {
            const {text_color} = action.payload;
            state.text_color = text_color
        },
        setBgColor : (state,action) => {
            const {bg_color} = action.payload;
            state.bg_color =bg_color
        }
        
    }
}) 

export const {setActiveTodo,setBgColor,setTextColor} = activeSlice.actions
export default activeSlice.reducer