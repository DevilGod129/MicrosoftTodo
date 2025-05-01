import { createSlice } from "@reduxjs/toolkit";
interface ListId {
    active_list_id: string | null;
    
}
const initialState: ListId ={
    active_list_id: null,
    
}

const activeList = createSlice({
    name: 'activeList',
    initialState,
    reducers:{
        setActiveList: (state,action) => {
            const {list_id} = action.payload
            state.active_list_id = list_id
        },
    }
})

export const {setActiveList} = activeList.actions
export default activeList.reducer