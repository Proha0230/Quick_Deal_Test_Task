<template>
  <div class="main_task" v-for="(item, ind) in arr" :key="item">
    <div class="main_task__item">
      <h5 class="main_task__item--date">{{item.date}}</h5>
      <p class="main_task__item--p" :contenteditable="false">{{item.message}}</p>
      <p style="display: none">{{item.id}}</p>

      <div class='main_task__item--edit' v-if="editTask && editTaskOpenInputNeededTask && editTaskOpenInputNeededTask.id === item.id">
        <textarea v-model="editTaskNewValue" maxlength="190"></textarea>
      </div>

      <div class="main_task__item--button" v-if="!editTask || editTaskOpenInputNeededTask && editTaskOpenInputNeededTask.id !== item.id">
        <button class="button__change" @click="funcChangeTask(true, item)">Редактировать</button>
        <button class="button__delete" @click="funcDeleteTask(item, ind)">Удалить</button>
      </div>

      <div class="main_task__item--button" v-if="editTask && editTaskOpenInputNeededTask && editTaskOpenInputNeededTask.id === item.id">
        <button class="button__change" @click="editTaskUser(ind)" :disabled="editTaskNewValue.length < 5">Изменить задачу</button>
        <button class="button__delete" @click="funcChangeTask(false)">Отмена</button>
      </div>

    </div>
  </div>

</template>

<script lang="ts">

import {Ref, ref} from "vue";
import axios from "axios";
import {useStore} from "vuex";

export default {
  props:['data'],
  setup(props: any) {

    type task = {
      date:string,
      message:string,
      id:number
    }

    const arr: Ref<Array<task> | null> = ref(null);
    const store = useStore();
    const editTaskNewValue: Ref<string> = ref('');
    const editTask: Ref<boolean> = ref(false);
    const editTaskOpenInputNeededTask: Ref<task | null> = ref(null);
    if(props.data) arr.value = props.data;

    // Удаление задачи
    const funcDeleteTask = async (valueTask: task, ind:number) => {
      let userTaskList: Array<task> = store.state.taskList
      const neededPost = userTaskList.find(item => item.id === valueTask.id) as task
      if(neededPost) userTaskList = userTaskList.filter(item => item !== neededPost)
      store.state.taskList = userTaskList
      arr.value = store.state.taskList
      await axios.delete(`https://quickdealtask-default-rtdb.firebaseio.com/taskList/${ind}.json`);
      // Этот костыль ниже - на скорую руку как говорится, для не больших обьемов данных, чтобы не путалась индексация задач на firebase т.к. можно было бы дать им
      // уникальные id и т.п. но сейчас время уже 02:37)) я бы смог и если вы завтра не с самого утра проверите задание то я поправлю этот костыль как проснусь ;)
      const body = JSON.stringify({taskList: store.state.taskList})
      await axios.patch(`https://quickdealtask-default-rtdb.firebaseio.com/.json`, body)
    }
    //

    // Редактирование задачи
    const funcChangeTask = async (value: boolean, valueTask?: task) => {
      editTask.value = value
      if(valueTask) {
        editTaskOpenInputNeededTask.value = valueTask
      }
    }
    const editTaskUser = async (ind:number) => {
      console.log(ind, 'ind')
      const body = JSON.stringify({message: editTaskNewValue.value})
      if(arr.value) arr.value[ind].message = editTaskNewValue.value
      await axios.patch(`https://quickdealtask-default-rtdb.firebaseio.com/taskList/${ind}.json`, body);
      editTask.value = false
      editTaskOpenInputNeededTask.value = null;

    }
    //


    return{arr, funcDeleteTask, editTaskNewValue, funcChangeTask, editTask, editTaskOpenInputNeededTask, editTaskUser}
  }
}

</script>

<style scoped lang="scss">
@import "src/assets/sass/partials/mixins";

.main_task {

  @include text(90vw, 450px);
  margin: 10px 0;
  max-height: 335px;

  &__item {
    display: flex;
    flex-flow: column;
    justify-content: inherit;
    align-items: start;
    overflow: hidden;
    padding: 5px;

    &--date {
      margin: 15px 0;
    }

    &--p {
      margin: 0 0 20px 0;
    }

    &--edit {
      width: 100%;

      & textarea {
        width: 100%;
        max-width: 400px;
        height: 70px;
        resize: none;
      }
    }

    &--button {
      display: flex;

      & .button {
        &__change {
          @include button(0 5px, 120px, 50px);
          border: solid plum 3px;
          margin-bottom: 5px;

          &:disabled {
            background-color: dimgray;
            color: white;
          }
        }
        &__delete {
          @include button(0 5px, 120px, 50px);
          border: solid plum 3px;
          margin-bottom: 5px;
        }
      }
    }
  }
}

</style>