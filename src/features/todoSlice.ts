import { createSlice, nanoid } from "@reduxjs/toolkit";
interface TodoSlice {
    todos : NewTodos[],
}
export interface NewTodos {
    todo_id: string;
    text: string;
    completed: boolean;
    subtodo: NewSubTodo[],
    list_id:string,
    imp_list_id: string | null,
    timestamp: string,
    important: boolean, 
}
interface NewSubTodo {
    subtodo_id: string,
    subtodo_text: string,
    subtodo_completed: boolean,
}
const initialState:TodoSlice ={
    todos:[],    
}

export const TodoSlice = createSlice({
    name:'todo',
    initialState,
    reducers:{
        // Addding todo to the string
        addTodo: (state,action) => {
            const {list_id,text } = action.payload
            const add_new_todo: NewTodos = {
                todo_id: nanoid(),
                text: text,
                completed: false,
                subtodo:[],
                list_id: list_id, // list-id ko path aauxa yesma.......//
                imp_list_id:null,
                timestamp: Date.now().toString(),
                important: false,
            }
            state.todos.push(add_new_todo)
        },

        // Deleting todo 
        deleteTodo: (state,action) => {
            const {id} =action.payload
            state.todos = state.todos.filter((todo) => todo.todo_id !== id )
            // Here the filter returns back a new array with removed id todo
        },

        // Edit the text in todo.......
        editTodo: (state,action) => {
            const {id,text} =action.payload
            state.todos = state.todos.map((todo) => todo.todo_id === id ? {...todo,text:text}:todo)
            state.todos = state.todos.map((todo) => todo.todo_id === id ? {...todo,timestamp:new Date().toISOString()}:todo)


        },

        //Toggle the todo.....

        toggleTodo: (state,action) =>{
            const {id} =action.payload
            state.todos = state.todos.map((todo) => todo.todo_id === id ? {...todo,completed: !todo.completed}:todo)
            
        },


        importantTodo: (state,action: {
            payload : {
                todo_id :string
            }
        }) => {
            const {todo_id}  = action.payload
            state.todos = state.todos.map((obj) => obj.todo_id=== todo_id ? {...obj,important:!state.todos}: obj)
            state.todos = state.todos.map((todo) => todo.todo_id === todo_id ? {...todo,imp_list_id:'2000'}:todo)
        },

        // substeps: 

        add_sub_todo: (state,action : {
            payload : {
                todoId:string,
                textContent:string


            }
        }) =>{

            const todoId = action.payload.todoId;
            const subtodo_add:NewSubTodo  = {
                subtodo_id: nanoid(),
                subtodo_text: action.payload.textContent,
                subtodo_completed: false,
            }
            state.todos.find((v)=> v.todo_id == todoId)?.subtodo.push(subtodo_add)
        },

        del_sub_todo : (state,action:{
            payload : {
                todoId: string,
                subtodoId: string,
            }
        }) => {

            // state.todos.subtodo = state.todos.subtodo.filter((todo) => todo.subtodo_id !== action.payload )
            const TodoId = action.payload.todoId
            const subTodoId = action.payload.subtodoId

            state.todos.find((v) => v.todo_id == TodoId)?.subtodo.filter((todo) => todo.subtodo_id !== subTodoId)

        },

        edit_sub_todo : (state,action:{
            payload:{
                TodoId : string,
                subTodoId : string,
                subTodoContent: string,

            }
        }) => {
            
            // state.todos.subtodo = state.todos.subtodo.map((todo) => todo.subtodo_id === id ? {...todo,subtodo_text:text}:todo)
            const TodoId = action.payload.TodoId
            const subTodoId = action.payload.subTodoId
            const subTodoContent = action.payload.subTodoContent

            // state.todos.find((v) => v.todo_id == TodoId)?.subtodo.find((todo) => todo.subtodo_id == subTodoId)?.subtodo_text = subTodoContent
            const todo = state.todos.find((v) => v.todo_id == TodoId)
            if(todo){
                const subtodo = todo.subtodo.find((todo) => todo.subtodo_id == subTodoId)
                if(subtodo){
                    subtodo.subtodo_text = subTodoContent
                }
                else{
                    return 
                }
            }
            else{
                return
            }
        },
        
        toggle_sub_todo: (state,action:{
            payload:{
                TodoId : string,
                subTodoId : string,
            }
        }) =>{
            const TodoId = action.payload.TodoId
            const subTodoId = action.payload.subTodoId

            // state.todos.subtodo = state.todos.subtodo.map((todo) => todo.subtodo_id === id ? {...todo,subtodo_completed: !todo.subtodo_completed}:todo)
            const todo = state.todos.find((v) => v.todo_id == TodoId)
            if(todo){
                const subtodo = todo.subtodo.find((todo) => todo.subtodo_id == subTodoId)
                if(subtodo){
                    subtodo.subtodo_completed = !subtodo.subtodo_completed
                }
                else{
                    return 
                }
            }
            else{
                return
            }

        },

    }
})


export const {addTodo,editTodo,deleteTodo,add_sub_todo,edit_sub_todo,del_sub_todo,toggleTodo,toggle_sub_todo,importantTodo} = TodoSlice.actions

export default TodoSlice.reducer
