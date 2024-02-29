<template>
<div class="main_task_page" v-if="store.state.loading">
  <div class="main_task_page__create">
    <button class="main_task_page__create--button" @click="goToHomePage">На главную страницу</button>
    <button class="main_task_page__create--button" @click="newTaskChange(true)">{{store.state.taskList.length ? 'Создать задачу' : 'Создайте вашу первую задачу'}}</button>
    <div class="main_task_page__create--task" v-if="newTask">
      <textarea class="task__textarea" maxlength="190" minlength="3" v-model="textAreaValue"></textarea>
      <div class="task__button">
        <button class="task__button--create" @click="funcNewTaskPost" :disabled="textAreaValue.length < 5">Создать</button>
        <button class="task__button--cancel" @click="newTaskChange(false)">Отмена</button>
      </div>
    </div>
  </div>
  <div class="main_task_page__task_list">
    <TaskItem :data="store.state.taskList"></TaskItem>
  </div>
</div>
</template>

<script lang="ts">
import TaskItem from "@/components/TaskItem.vue";
import {Ref, ref} from "vue";
import axios from "axios"
import {useStore} from "vuex";
import {useRouter} from "vue-router";

export default {
  setup() {

    type task = {
      date:string,
      message:string,
      id:number
    }

    const store = useStore();
    const router = useRouter();
    const newTask: Ref<boolean> = ref(false)
    const textAreaValue: Ref<string> = ref('')

    const newTaskChange = (value:boolean) => {
      newTask.value = value
    }
    const goToHomePage = ():void => {
      router.push('/')
    }

    const funcNewTaskPost = async () => {
      const id: number = store.state.taskList.length + 1
      const newTask:task = {
        date: datePost(),
        message: textAreaValue.value,
        id: id
      }
      store.commit('postNewTask', newTask)
      newTaskChange(false)
      const body = JSON.stringify({taskList: store.state.taskList})
      await axios.patch(`https://quickdealtask-default-rtdb.firebaseio.com/.json`, body)
      textAreaValue.value = ''
    }

    const datePost = ():string => {
      const year = new Date().getFullYear()
      const month = new Date().getMonth() + 1
      const day = new Date().getDate()
      return `${day}.${month < 10 ? '0' + month : month}.${year}`
    }

    return{newTask, newTaskChange, textAreaValue, funcNewTaskPost, store, goToHomePage}
  },
  components:{TaskItem}
}

</script>

<style scoped lang="scss">
@import "src/assets/sass/partials/mixins";

.main_task_page {
  display: flex;
  flex-flow: column;
  width: 100%;
  max-width: 600px;

  &__create {
    display: flex;
    flex-flow: column;
    width: 100%;
    max-width: 600px;
    align-items: center;
    margin-top: 30px;


    &--button {
      @include button(10px 0);
    }

    &--task {
      display: flex;
      flex-flow: column;
      align-items: center;

      & .task {
        &__textarea {
          width: 300px;
          height: 200px;
          resize: none;
          margin: 20px 0;
        }
        &__button {


          &--create {
            @include button(10px 5px);
          }
          &--cancel {
            @include button(10px 5px);
          }
        }

      }
    }
  }

  &__task_list {
    display: flex;
    flex-flow: column;
    align-items: center;
    overflow: scroll;
  }

}

</style>