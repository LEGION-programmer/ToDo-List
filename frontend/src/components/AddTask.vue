<template>
    <div>
        <form v-on:submit.prevent="addNewNote">
            <ul class="addTaskMenu">
            <li class="option">
                <label for="taskTitle">Task title</label>
            </li>
            <li class="option">
                <input type="text" name="taskTitle" id="taskTitle" v-model="newTask.title">
            </li>
            <li class="option">
                <label for="description">Description</label>
            </li>
            <li class="option">
                <input type="text" name="description" id="description" v-model="newTask.description">
            </li>
            </ul>
            
            <button>Add</button>
            {{ message }}
        </form>
    </div>
</template>

<script>
import {useTodoStore} from '../stores/todoStore'
import axios from 'axios'

export default{
    setup(){
        const todoStore = useTodoStore()
        const newTask = {
            title: '',
            description: '',
            taskStatus: 'todo'
        }
        let message = ''

        const addNewNote = async () => {
            if(localStorage.getItem('user')){
                const taskData = {
                    _id: Math.floor(Math.random()*1000),
                    title: newTask.title,
                    description: newTask.description,
                    taskStatus: 'todo',
                    owner: localStorage.getItem('user')
                }
                    const res = await axios.post('http://localhost:3000/notesAdd', taskData, {
                        headers: {
                            'content-type': 'application/json'
                        }}
                    )
                    message = res.data.message
                    window.location.reload()
                }else{
                    const localStorageData = {
                        title: newTask.title,
                        description: newTask.description,
                        taskStatus: newTask.taskStatus,
                        _id: Math.floor(Math.random()*10000)
                    }
                    todoStore.addTask(localStorageData)
                    localStorage.setItem(localStorageData._id, JSON.stringify(localStorageData))
                }
        }

        return {newTask, addNewNote, message}
    }
}
</script>

<style>
.tasksList{
  color: blue;
  width: 30%;
  height: 300px;
  background-color: rgb(255, 255, 255, 0.65);
  margin: 10px;
  border: 5px solid yellow;
  float: left;
}

.addTaskMenu{
  list-style-type: none;
}

.option>input{
  transition: 0.4s;
  width: 50%;
  height: 30px;
  font-size: 20px;
  color: black;
  border: 2px solid #5A79c4;
  border-radius: 50px;
}

.option>input:focus{
  transition: 0.4s;
  border: 5px solid #06b706;
  box-shadow: 1px 3px 30px #06b706;
}

button{
    transition: 0.5s;
    width: 15%;
    height: 40px;
    font-size: 20px;
    background-color: #5B8FB9;
    border: solid 4px #301E67;
    margin: 12px;
    border-radius: 50px;
    cursor: pointer;
    color: #B6EADA;
}

button:hover{
    transition: 0.5s;
    width: 20%;
    border: solid 4px #06b706;
    box-shadow: 1px 3px 30px #06b706;
}
</style>