import { createStore } from 'vuex'
import axios from "axios"

type task = {
  date:string,
  message:string,
  id:number | null
}
export default createStore({
  state: {
    taskList: Array<task>({
      date: '',
      message: '',
      id: null
    }),
    loading: false,
  },
  getters: {
  },
  mutations: {
    postNewTask(state, payload: task) {
        if(!state.taskList) state.taskList = Array(payload)
        else state.taskList.unshift(payload)
    }

  },
  actions: {
    async getTasksList(state, commit) {
      const {data} = await axios.get(`https://quickdealtask-default-rtdb.firebaseio.com/taskList/.json`)
      if(data) {
        const arr:unknown[] = Object.values(data).filter(item => item !== null);
        if(Array.isArray(arr) && arr.every(obj => typeof obj === 'object')) {
          this.state.taskList = arr
        }
        this.state.loading = true
      }
    }
  },
  modules: {
  }
})
