<template>
<div class="oneTask">
    <div>
        <h1 class="taskTitle" @click="showHide = !showHide">{{ item.title }}</h1>
        <p class="taskDescription" v-show="showHide === true">{{ item.description }}</p>
    </div>
    <form v-on:submit.prevent="sendNewNote(item._id)" v-show="editNoteSwitch === true">
        <ul>
            <li>
                <input type="text" v-model="title">
            </li>
            <li>
                <input type="text" v-model="description">
            </li>
        </ul>
        <button>Edit note</button>
    </form>
    <img src="../../assets/icons8-trash-can-50.png" alt="trash" @click="deleteNote(item._id)">
    <img src="../../assets/menu.png" alt="edit" @click="editNoteSwitch = !editNoteSwitch">
    <img src="../../assets/start-button.png" alt="start" v-show="item.taskStatus === 'todo'" @click="sendNewTaskStatus(item._id)">
    <img src="../../assets/flag.png" alt="finish" v-show="item.taskStatus === 'in Progress'" @click="sendNewTaskStatus(item._id)">
</div>
</template>

<script>
import {useTodoStore} from '../../stores/todoStore'
import axios from 'axios'
import { ref } from 'vue'
export default{
    props:['item'],
    setup(){
        const todoStore = useTodoStore()       

        let title = ref('')
        let description = ref('')

        //delete note in data base
        const deleteNoteInDataBase = async(id) => {
            try{
                await axios.delete(`http://localhost:3000/notes/${id}`)   
            }catch(e){
                console.log(e)
            }
        }
        //edit note in data base
        const sendNewNoteToDataBase = async(id) => {
            try{
                await axios.post(`http://localhost:3000/notes`, {id: id})
                .then(async(res) => {
                    await axios.put(`http://localhost:3000/notes/${id}`, {
                    title: title.value,
                    description: description.value,
                    taskStatus: res.data.taskStatus
                    })
                })
            }catch(e){
                console.log(e)
            }
        }
        // change task status in data base
        const letsStart = async (id) => {
            try{
                await axios.post(`http://localhost:3000/notes`, {id: id})
                .then(async(res) => {
                    if(res.data.taskStatus === 'todo'){
                        await axios.put(`http://localhost:3000/notes/${id}`, {
                        title: res.data.title,
                        description: res.data.description,
                        taskStatus: "in Progress"
                    })
                    }else{
                        await axios.put(`http://localhost:3000/notes/${id}`, {
                        title: res.data.title,
                        description: res.data.description,
                        taskStatus: "Finished"
                    })
                    }
                })   
            }catch(e){
                console.log(e)
            }
        }
        // update task status
        const sendNewTaskStatus = (id) => {
            if(localStorage.getItem('user')){
                letsStart(id)
            }else{
                todoStore.changeTaskStatus(id)
            }
            window.location.reload()
        }
        //  delete note
        const deleteNote = (id) => {
            todoStore.deleteTask(id)
            if(!localStorage.getItem('user')){
                localStorage.removeItem(id)
            }else{
                deleteNoteInDataBase(id)
            }
            window.location.reload()  
        }
        //  update note
        const sendNewNote = (id) =>{
            if(localStorage.getItem('user')){
                sendNewNoteToDataBase(id)
            }else{
                todoStore.editTask(id, {
                _id: id,
                title: title.value,
                description: description.value,
                })
            }
            window.location.reload()
        }

        return {deleteNote, sendNewNote, sendNewTaskStatus, title, description}
    },
    data(){
        return{
            showHide: false,
            editNoteSwitch: false
        }
    }
}
</script>

<style scoped>
.oneTask{
    width: 85%;
    padding: 10px;
    margin: 5px;
    border: 3px solid #301E67;
    border-radius: 50px;
    box-shadow: 5px 5px 8px black;;
}

.taskTitle{
    font-size: 20px;
    color: #03001C;
}

.taskDescription{
    font-size: 15px;
    color: #03001C;
}

img{
    width: 30px;
    height: 30px;
    margin: 5px;
    cursor: pointer;
}

form{
    text-align: center;
}

input{
    transition: 0.4s;
    width: 50%;
    height: 20px;
    font-size: 13px;
    color: black;
    border: 2px solid #5A79c4;
    border-radius: 30px;
}

input:focus{
  transition: 0.4s;
  border: 5px solid #06b706;
  box-shadow: 1px 3px 30px #06b706;
}

form>button{
    transition: 0.5s;
    width: 40%;
    height: 40px;
    font-size: 15px;
    background-color: #5B8FB9;
    border: solid 4px #301E67;
    margin: 12px;
    border-radius: 50px;
    cursor: pointer;
    color: #B6EADA;
}
</style>