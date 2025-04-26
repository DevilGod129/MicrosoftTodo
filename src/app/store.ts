import { configureStore } from "@reduxjs/toolkit"
import todoreducer from '../features/todoSlice'
import listreducer from '../features/listSlice.tsx'
import groupreducer from '../features/groupSlice.tsx'
import activereducer from '../features/activeSlice' 
import activeListreducer from '../features/activeList'

export const store = configureStore({
    reducer:{
        Todo: todoreducer,
        List: listreducer,
        Group: groupreducer,
        ActiveTodo: activereducer,
        ActiveList: activeListreducer,
    }
})
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch