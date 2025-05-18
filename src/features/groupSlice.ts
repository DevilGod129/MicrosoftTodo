import { createSlice, nanoid } from '@reduxjs/toolkit';
// Question: why newgroupd work
interface GroupSlice {
  groups: NewGroup[];
  availableIds: number[];
  last_group_id :string | null ; 
}
interface NewGroup {
  num_id: number;
  name: string;
  id: string;
}
const initialState: GroupSlice = {
  groups: [],
  last_group_id:null,
  availableIds: Array.from({ length: 101 }, (_, i) => i), // Store available IDs,
};

export const GroupSlice = createSlice({
  name: 'Group',
  initialState,
  reducers: {
    // add new group.........
    addGroup: (state) => {
      const new_id: number = state.availableIds[0];
      state.availableIds = state.availableIds.filter((num) => num !== new_id);

      const add_new_group: NewGroup = {
        num_id: new_id,
        name: new_id === 0 ? `Untitled Group` : `Untitled Group (${new_id})`,
        id: nanoid(),
      };
      state.last_group_id =add_new_group.id
      state.groups.push(add_new_group);
    },

    // renameGroup: (state, action) => {
    //   const { id, new_name, num_id } = action.payload;
    //   state.groups = state.groups.map((grp) =>
    //     grp.id === id ? { ...grp, name: new_name } : grp
    //   );
    //   state.availableIds.push(num_id);
    //   state.availableIds.sort((a, b) => a - b);
    // },
    renameGroup: (state, action) => {
  const { id, new_name } = action.payload;
  state.groups = state.groups.map((grp) =>
    grp.id === id ? { ...grp, name: new_name } : grp
  );
}
,

    deleteGroup: (state, action) => {
      const { id, num_id } = action.payload;
      state.groups = state.groups.filter((grp) => grp.id !== id);
      state.availableIds.push(num_id);
      state.availableIds.sort((a, b) => a - b);
    },
  },
});

export const { addGroup, renameGroup, deleteGroup } = GroupSlice.actions;
export default GroupSlice.reducer;
