<template>
  <div class="header">
    <h1>Logowanie</h1>
  </div>

  <div class="menu">
    <div class="loginMenu">
      <form v-on:submit.prevent="sendDataPost">
        <ul class="loginForm">
          <li class="option">
            <label for="login">Login</label>
          </li>
          <li class="option">
            <input type="text" name="login" id="login" v-model="userData.login">
          </li>
          <li class="option">
            <label for="password">Password</label>
          </li>
          <li class="option">
            <input type="password" name="password" id="password" v-model="userData.password">
          </li>
        </ul>
        <!-- write errors for user -->
        <p>{{ message }}</p>

        <button type="reset">Reset</button>
        <button type="submit">Login</button>
      </form>
      <button><a href="/">BACK</a></button>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import axios from "axios";
export default {
  name: 'LoginPage',

  data() {
    return {
      message: '',
        router: useRouter(),
        userData: {
          login: '',
          password: ''
        }
    }
  },

  methods: {
    async sendDataPost(){
      try{
            const data = {
                login: this.userData.login,
                password: this.userData.password
            }
            const res = await axios.post('http://localhost:3000/login', data, {
                headers: {
                    'content-type': 'application/json'
                }
            })
            this.message = res.data.message
            if(res.data.validationStatus == true){  
                window.localStorage.setItem('user', data.login)  
                this.router.push({ name: 'ToDoList'})
            }
        }
        catch(e){
            console.log(e)
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
font-family: Montserrat ;
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

.menu{
  width: 100%;
  height: 500px;
  border: solid 5px #301E67;
  padding: 10px;
  margin-top: 10px;
  border-radius: 50px;
}

.loginForm{
  list-style-type: none;
}

.option{
  font-size: 20px;
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

.loginMenu{
width: 70%;
height: 300px;
background-color: rgb(255, 255, 255, 0.65);
border-radius: 50px;
position: absolute;
left: 15%;
}

.loginMenu>form>button{
transition: 0.5s;
width: 20%;
height: 50px;
font-size: 20px;
background-color: white;
border: solid 4px #5A79c4;
margin: 12px;
border-radius: 50px;
cursor: pointer;
color: #5A79c4;
}

.loginMenu>form>button:hover{
transition: 0.5s;
width: 25%;
border: solid 4px #06b706;
box-shadow: 1px 3px 30px #06b706;
}

.loginMenu>button{
  transition: 0.5s;
  width: 20%;
  height: 50px;
  font-size: 25px;
  background-color: white;
  border: solid 4px #5A79c4;
  margin: 12px;
  border-radius: 50px;
  cursor: pointer;
}


.loginMenu>button:hover{
  transition: 0.5s;
  width: 25%;
  border: solid 4px #06b706;
  box-shadow: 1px 3px 30px #06b706;
}
.loginMenu>button>a{
  text-decoration: none;
  color: #5A79c4;
  font-style: italic;
}

p{
  color: red;
}
</style>