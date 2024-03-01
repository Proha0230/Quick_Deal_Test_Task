<template>
  <div class="main_homepage">
    <header class="main_homepage__header">
        <h3 class="main_homepage__header--logo">Quick Deal Task Manager</h3>
    </header>
    <nav class="main_homepage__nav">
      <button @click="goToTaskPage" class="main_homepage__nav--button">Ваш список задач</button>
    </nav>
    <section class="main_homepage__main_section">
      <h3>
        Quick Deal Task Manager - Это инновационный менеджер задач! С его помощью вы сможете составить список дел на весь день и ничего не забыть.
        Благодаря нашей инновационной системе хранилища данных - ваши планы не будут рассекречены. Вы можете полностью доверить нам - ваш распорядок дел.
        Зайдите в 'Ваш список задач' и возьмите под контроль свои дела!
      </h3>
    </section>
    <footer class="main_homepage__footer">

    </footer>
  </div>

</template>

<script lang="ts">
import {useRouter} from "vue-router";
export default {
  setup() {
    const router = useRouter();

    const goToTaskPage = ():void => {
      router.push('/task-page')
    }

    return{goToTaskPage}
  }
}

</script>

<style scoped lang="scss">
@import "src/assets/sass/partials/mixins";

.main_homepage {
  max-width: 900px;
  width: 100%;

   &__nav {
     display: flex;
     justify-content: space-around;
     width: 100%;
     max-width: 900px;
     align-items: center;
     height: 10vh;

     &--button{
       @include button(10px 0);
     }
   }

  &__header {
    height: 20vh;
    max-height: 200px;
    text-align: center;
    display: flex;
    flex-flow: column;
    justify-content: center;

    & img {
      width: 100vw;
      max-width: 900px;
      height: 20vh;

    }
    &--logo{
      color: lightgrey;
      font-size: 35px;
      text-shadow: 7px 5px black;
    }
  }

  &__main_section {
    height: 60vh;
    display: flex;
    justify-content: center;
    padding-top: 20px;

    & h3 {
      @include text(100%, 600px);
      max-height: 255px;
    }
  }
}


</style>






















<script setup lang="ts">
</script>