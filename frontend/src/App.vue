<template>
  <div>
    <router-link to="/login"></router-link>
    <router-link to="/register"></router-link>
    <router-link to="/ToDoList"></router-link>
  </div>
    
    <router-view v-slot="{ Component }">
      <suspense timeout="0">
        <template #default>
          <div>
            <component :is="Component" ::key="$route.path"></component>
          </div>
        </template>
        <template #fallback>
          <div>
            <LoadingPage/>
          </div>
        </template>
      </suspense>
    </router-view>
</template>

<script>
import LoadingPage from './components/LoadingPage.vue';

export default {
  name: 'App',
  components: {
    LoadingPage
  }
}
</script>

<style>

body{
  background-color: rgb(0, 0, 0);
  background-image: linear-gradient(to bottom right, #B6EADA, #5B8FB9);
}
</style>
