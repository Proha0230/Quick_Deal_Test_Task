<template>
  <router-view/>
</template>

<script lang="ts">
import {useStore} from "vuex";
import {onBeforeMount} from "vue";

export default {
  setup(){

    const store = useStore();

    onBeforeMount(async()=> {
      await store.dispatch('getTasksList');
    })
    return{}
  }
}

</script>

<style lang="scss">

#app {
  width: 100vw;
  height: 100vh;
  display: flex;
  max-width: 900px;
  justify-content: center;
  background-image: url("../src/assets/bg.jpeg");
  background-size: cover;
}

html, body{
  margin: 0;
  padding: 0;
  width: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
}
</style>
