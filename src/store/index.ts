import { createStore } from "vuex"
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import type { type } from "os"
dayjs.extend(duration)
// type todos = {
//     done: boolean,
//     content: string,
//     createTime: number
// }

export default createStore({
    state: {
        todos: JSON.parse(localStorage.getItem("todos") || '[]') || [
            {
                done: false,
                content: "",
                createTime: 0,
                // currentTime : 0
                // createDuration: 0
            }
        ],

    },
    getters: {

    },
    mutations: {
        addTodo(state, data) {
            state.todos.push({
                done: false,
                content: data,
                //unix() 秒
                createTime: dayjs().unix()
            });
        },
        createDuration(state) {
            // const currentTime = dayjs().unix()
            // const createTime = state.todos.



        },
        handleDelete(state, index) {
            state.todos.splice(index, 1);
        },
        doneTodo(state, index) {
            state.todos[index].done = !state.todos[index].done
        },
        saveData(state) {
            localStorage.setItem("todos", JSON.stringify(state.todos));
        }

    },

    actions: {

    }
})