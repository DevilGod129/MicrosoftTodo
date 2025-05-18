import { createSlice, nanoid } from '@reduxjs/toolkit';
interface ListSlice {
  lists: NewList[];
  availableIds: number[];
  last_added_id: string | null;
}
interface NewList {
  num_id?: number;
  name: string;
  id: string;
  
}
const initialState: ListSlice = {
  lists: [],
  last_added_id: null,
  availableIds: Array.from({ length: 101 }, (_, i) => i), // Store available IDs,
};

export const ListSlice = createSlice({
  name: 'List',
  initialState,
  reducers: {
    // add new group.........
    addList: (state) => {
      const new_id = state.availableIds[0];
      state.availableIds = state.availableIds.filter((num) => num !== new_id);

      const add_new_list: NewList = {
        num_id: new_id,
        name: new_id === 0 ? `Untitled list` : `Untitled list (${new_id})`,
        id: nanoid(),
        
      };
      state.lists.push(add_new_list);
      state.last_added_id = add_new_list.id
    },

    // renameList: (state, action) => {
    //   const { id, new_name, num_id } = action.payload;
    //   state.lists = state.lists.map((list) =>
    //     list.id === id ? { ...list, name: new_name } : list
    //   );
    //   state.availableIds.push(num_id);
    //   state.availableIds.sort((a, b) => a - b);
    // },
    renameList: (state, action) => {
  const { id, new_name } = action.payload;
  state.lists = state.lists.map((list) =>
    list.id === id ? { ...list, name: new_name } : list
  );
},


    deleteList: (state, action) => {
      const { id, num_id } = action.payload;
      state.lists = state.lists.filter((list) => list.id !== id);
      state.availableIds.push(num_id);
      state.availableIds.sort((a, b) => a - b);
    },
  },
});

export const { addList, renameList, deleteList } = ListSlice.actions;
export default ListSlice.reducer;
