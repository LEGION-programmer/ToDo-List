import { defineStore } from 'pinia'


export const useTodoStore = defineStore('todoStore', {
    state: () => ({
        tasks: []
    }),

    actions: {
        // get all notes
        async getAllNotes(notes){
            this.tasks = notes
        },
        //  adding task
        addTask(task){
            this.tasks.push(task)
        },
        // deleteing task
        deleteTask(id){
            const newTasks = [...this.tasks].filter(t => t._id !== id)
            this.tasks = newTasks
        },
        // editing task
        editTask(id, task){       

            const oldValues = JSON.parse(localStorage.getItem(id))
            const newValues = {
                _id: task._id,
                title: task.title,
                description: task.description,
                taskStatus: oldValues.taskStatus
            }
            localStorage.removeItem(id)
            localStorage.setItem(id, JSON.stringify(newValues))
     
        },
        //  updating task status
        changeTaskStatus(id) {
            const oldValues = JSON.parse(localStorage.getItem(id))
            
            if(oldValues.taskStatus === 'todo'){
                oldValues.taskStatus = 'in Progress'
            }else if(oldValues.taskStatus === 'in Progress'){
            oldValues.taskStatus = 'Finished'
            }
            localStorage.removeItem(id)
            localStorage.setItem(id, JSON.stringify(oldValues))
          },
    }
})