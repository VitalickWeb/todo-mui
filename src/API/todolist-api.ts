import axios from 'axios'


const instanceTodo = axios.create({
    withCredentials: true,//flag который проверяет на наличие cookie
    baseUrl: 'https://social-network.samuraijs.com/api/1.1'
    // headers: {
    //     'API-KEY': 'd26e77b0-fffd-47c6-b626-b4aa9e3fa7eb'
    // }
})

export const todolistAPI = {
    getTodoLists() {
        return instanceTodo.get(`/todo-lists`)
    },
    createTodoLists(title: string) {
        return instanceTodo.post(`/todo-lists${title}`)
    },
    deleteTodoLists(todoListID: string) {
        return instanceTodo.delete(`/todo-lists${todoListID}`)
    },
    updateTodoLists(todoListID: string, title: string) {
        return instanceTodo.put(`/todo-lists${todoListID}${title}`)
    }
}

