import { createSlice } from "@reduxjs/toolkit";
interface ListId {
    active_list_id: string;
}
const initialState: ListId ={
    active_list_id: '',
}

const activeList = createSlice({
    name: 'activeList',
    initialState,
    reducers:{
        setActiveList: (state,action) => {
            const {todo_id} = action.payload
            state.active_list_id = todo_id
        },
    }
})

export const {setActiveList} = activeList.actions
export default activeList.reducer