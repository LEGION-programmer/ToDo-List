<template>
<div class="header">
    <h1>Register</h1>
</div>

<div class="menu">
    <div class="registerMenu">
    <form v-on:submit.prevent="sendDataPost">
        <ul class="registerForm">
        <li class="option">
            <label for="login">Login</label>
        </li>
        <li class="option">
            <input type="text" name="login" id="login" placeholder="login" v-model="userData.login">
        </li>
        <li class="option">
            <label for="email">Email</label>
        </li>
        <li class="option">
            <input type="email" name="email" id="email" placeholder="email" v-model="userData.email">
        </li>
        <li class="option">
            <label for="password">Password</label>
        </li>
        <li class="option">
            <input type="password" name="password" id="password" placeholder="password" v-model="userData.password">
        </li>
        <li class="option">
            <label for="cPassword">Confirm Password</label>
        </li>
        <li class="option">
            <input type="password" name="cPassword" id="cPassword" placeholder="confirm password" v-model="userData.cPassword">
        </li>
        </ul>

        <button type="reset">Reset</button>
        <button type="submit">Login</button>
    </form>
        <!-- write errors for user -->
        <p>{{ message }}</p>

        <button><a href="/">BACK</a></button>
    </div>
</div>
</template>

<script>
import { useRouter } from 'vue-router'
import axios from "axios";

export default {
name: 'RegisterPage',

data(){
    return{
        message: '',
        router: useRouter(),
        userData: {
            login: '',
            email: '',
            password: '',
            cPassword: ''
        },
    }
},
methods: {
    async sendDataPost(){
       try{
            const data = {
                login: this.userData.login,
                email: this.userData.email,
                password: this.userData.password,
                cPassword: this.userData.cPassword
            }
            const res = await axios.post('http://localhost:3000/register', data, {
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

.menu{
    margin-top: 10px;
    width: 100%;
    height: 500px;
    border: solid 5px #301E67;
    border-radius: 50px;
}

.registerForm{
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

.registerMenu{
    margin-top: 10px;
    width: 70%;
    height: 350px;
    background-color: rgb(255, 255, 255, 0.65);
    border-radius: 50px;
    position: absolute;
    left: 15%;
}

.registerMenu>form>button{
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
    margin-left: 40px;
}

.registerMenu>form>button:hover{
    transition: 0.5s;
    width: 25%;
    border: solid 4px #06b706;
    box-shadow: 1px 3px 30px #06b706;
}

.registerMenu>button{
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


.registerMenu>button:hover{
    transition: 0.5s;
    width: 25%;
    border: solid 4px #06b706;
    box-shadow: 1px 3px 30px #06b706;
}
.registerMenu>button>a{
    text-decoration: none;
    color: #5A79c4;
    font-style: italic;
}

p{
    color: red;
}
</style>