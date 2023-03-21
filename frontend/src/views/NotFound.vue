<template>
    <div>
        <h1>Sorry but this page doesn't exist</h1>

        <button @click="home()">Back to home page</button>
    </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default{
    name: 'NotFound',

    data(){
        return {
            router: useRouter()
        }
    },

    methods:{
        home(){
            this.router.push({ name: 'home'})
        }
    }
}
</script>

<style scoped>
h1{
    color: red;
}

button{
 width: 50%;
 height: 50px;   
}
</style>