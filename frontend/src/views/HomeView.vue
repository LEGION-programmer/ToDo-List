<template>
  <div class="header">
  <h1>Welcome in ToDo List</h1>
  </div>

  <div class="options">
    <h3>How do you wanna use this aplication?</h3>
    <div>
      <div class="aplicationUseOptions" v-if="guest === true">
        <button><a href="/login">Login</a></button><br>
        <button><a href="/register">Registration</a></button><br>
        <button @click="worring"><a>Continue as guest</a></button>
      </div>
      <div class="aplicationUseOptions" v-else>
        <h3>If you use the app as a guest, your tasks will only be saved on this device and browser. If you want to access them on other devices, you'll need to sign in.</h3>
        <button><a href="/ToDoList">CONTINUE</a></button>
        <button @click="worring"><a>BACK</a></button>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'HomeView',

  data() {
    return {
      guest: true,
      router: useRouter()
    }
  },

  methods: {
    worring(){
      if(this.guest){
        this.guest = false
      }
      else{
        this.guest = true
      }
    }
  },

    //check if user already exist
  created: 
    function(){
      if(localStorage.getItem('user')){
        this.router.push({ name: 'ToDoList'})
      }
    }
}

</script>


<style scoped>
*{
  color: #03001C;
  text-align: center;
  font-family: Montserrat;
}

.header{
  width: 100%;
  height: 100px;
  border: solid 5px #301E67;
  border-radius: 50px;
}

.header>h1{
  padding: 5px;
}

.options{
  width: 100%;
  height: 500px;
  border: solid 5px #301E67;
  border-radius: 50px;
  margin-top: 10px;
}

.aplicationUseOptions{
  width: 70%;
  height: 350px;
  background-color: rgb(255, 255, 255, 0.65);
  border-radius: 50px;
  position: absolute;
  left: 15%;
}

.aplicationUseOptions>button{
  transition: 0.5s;
  width: 70%;
  height: 75px;
  font-size: 25px;
  background-color: white;
  border: solid 4px #5A79c4;
  margin: 12px;
  border-radius: 50px;
  cursor: pointer;
}

.aplicationUseOptions>button:hover{
  transition: 0.5s;
  width: 80%;
  border: solid 4px #06b706;
  box-shadow: 1px 3px 30px #06b706;
}

.aplicationUseOptions>button>a{
  text-decoration: none;
  color: black;
  color: #5A79c4;
  font-style: italic;
}
</style>
