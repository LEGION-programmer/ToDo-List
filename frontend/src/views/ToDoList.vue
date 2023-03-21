<template>
  <div class="menu">
    <button @click="logout" id="logout">Logout</button>
    <!-- form for adding task-->
    <div class="addTask">
      <button @click="showHide = !showHide">ADD TASK</button>
      <AddTask v-show="showHide === true"/>
    </div>
    <!-- task list with status todo -->
    <div class="tasksList">
      <h1 @click="showTodo = !showTodo">ToDo</h1>
      <TasksList :items="todoStore.tasks" v-show="showTodo"/>
      <button v-if="showClearLocalStorage === true">Delete All Tasks</button>
    </div>
    <!-- task list with status in Progress -->
    <div class="tasksList">
      <h1 @click="showInProgress = !showInProgress">In progress</h1>
        <TasksInProgress :items="todoStore.tasks" v-show="showInProgress"/>
    </div>
    <!-- task list with status Finished -->
    <div class="tasksList">
      <h1 @click="showFinished = !showFinished">Finished</h1>
        <FinishedTasks :items="todoStore.tasks" v-show="showFinished"/>
    </div>
  </div>
</template>

<script>

import { useRouter } from 'vue-router'
import { useTodoStore } from '../stores/todoStore'
import axios from 'axios'
import AddTask from '../components/AddTask.vue'
import TasksList from '../components/TasksList.vue'
import TasksInProgress from '../components/TasksInProgress.vue'
import FinishedTasks from '../components/FinishedTasks.vue'


export default {  
  name: 'ToDoList',
  components:{
    AddTask,
    TasksList,
    TasksInProgress,
    FinishedTasks
  },
  setup(){
    const todoStore = useTodoStore()

    return {todoStore}
  },
  data(){
    return{
      router: useRouter(),
      textOnButton: '',
      showHide: false,
      newTask:{
        title:'',
        description:'',
        prioritet:'todo'
      },
      showTodo: true,
      showInProgress: true,
      showFinished: true,
      showClearLocalStorage: false
    }
  },

  methods: {

    showMenu(){
      if(this.showHide){
        this.showHide = false
        this.buttonText = 'ADD TASK'
      }
      else{
        this.showHide = true
        this.buttonText = 'BACK'
      }
    },

    logout(){
      localStorage.removeItem('user')
      this.router.push({ name: 'home'})
    }

  },
  created: 
    async function(){
      if(localStorage.getItem('user')){
        await axios.get(`http://localhost:3000/notes/${localStorage.getItem('user')}`)
        .then(res => this.todoStore.getAllNotes(res.data))
        .catch(err => console.log(err))
      }else{
        const tasks = []
        for (let i = 0; i < localStorage.length; i++) {
          let key = localStorage.key(i);
          tasks.push(JSON.parse(localStorage.getItem(key)));
        }
        this.todoStore.getAllNotes(tasks)
      }
    }
  
}

</script>

<style scoped>
.menu{
  width: 100%;
  height: 1000px;
}

.menu>button{
  width: 80px;
  text-align: center;
  color: #B6EADA;
  padding: 3px;
  margin: 5px;
  border: 2px solid #301E67;
  border-radius: 30px;
}

.addTask{
  background-color: rgb(255, 255, 255, 0.65);
  text-align: center;
  border: 5px solid #301E67;
  border-radius: 50px;
  margin: 10px;
}

.addTask>button{
transition: 0.5s;
width: 20%;
height: 50px;
font-size: 20px;
background-color: #5B8FB9;
border: solid 4px #301E67;
margin: 12px;
border-radius: 50px;
cursor: pointer;
color: #B6EADA;
}

.addTask>button:hover{
transition: 0.5s;
width: 25%;
border: solid 4px #06b706;
box-shadow: 1px 3px 30px #06b706;
}

.tasksList{
  text-align: center;
  border: 5px solid #301E67;
  border-radius: 40px;
  height: auto;
}

.tasksList>h1{
  color: #03001C;
}

@media screen and (min-width: 800px) {
  .tasksList{
    width: 29%;

  }
}

@media screen and (max-width: 600px) {
  .tasksList{
    width: 90%;

  }
}
</style>