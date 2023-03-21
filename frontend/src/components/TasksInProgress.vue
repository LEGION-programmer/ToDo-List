<template>
    <div class="tasks">
        <ul>
          <li v-for="(task, _id) in items" :key="_id" v-show="task.taskStatus === 'in Progress'">
            <OneTask :item="task"/>
          </li>
        </ul>
    </div>
    </template>
    
    <script>
    import OneTask from './task/OneTask.vue'
    
    export default{
        name: 'TaskList',
        props: ['items'],
        components:{
            OneTask 
        }
    }
    </script>
    
    <style>
    ul{
        list-style: none;
        list-style-position: inside;
        margin: 15px;
        padding: 0;
        text-align: center;
    }
    </style>