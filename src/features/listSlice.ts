import { createSlice,nanoid } from "@reduxjs/toolkit";
interface ListSlice {
    groups: NewList[],
    availableIds: number[],
}
interface NewList {
    num_id :number,
    name :string,
    id: string,
}
const initialState:ListSlice = {
    groups : [],
    availableIds: Array.from({ length: 101 }, (_, i) => i), // Store available IDs,
}

export const GroupSlice = createSlice({
    name:'Group',
    initialState,
    reducers: {
        // add new group.........
        addGroup: (state) => {
            const new_id = state.availableIds[0];
            state.availableIds = state.availableIds.filter((num) => num!== new_id)

            const add_new_group:NewList = {
                num_id : new_id,
                name: (new_id === 0 ? `Untitled list` : `Untitled list (${new_id})`),
                id: nanoid(),
                
            }
            state.groups.push(add_new_group)
        },

        renameGroup: (state,action) => {
            const {id,new_name,num_id} = action.payload
            state.groups =state.groups.map((grp) => grp.id === id ? {...grp,name:new_name}: grp)
            state.availableIds.push(num_id)
            state.availableIds.sort((a, b) => a - b);
        },

        deleteGroup: (state,action) => {
            const {id,num_id} = action.payload
            state.groups = state.groups.filter((grp) => grp.id!== id)
            state.availableIds.push(num_id)
            state.availableIds.sort((a, b) => a - b);
        }

        }
    }
)

export const {addGroup,renameGroup,deleteGroup} = GroupSlice.actions
export default GroupSlice.reducer