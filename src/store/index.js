import * as Vuex from "vuex";

const store = Vuex.createStore({
    state() {
        return {
            list: [],
            finishedList:[],
        }
    },
    mutations: {
        addTask(state, task) {
            state.list.unshift(task)
        },
        updateTask(state,data) {
            state.list[data.idx] = data.task
        },
        updateTasks(state, tasks) {
            state.list = tasks
        },
        updateFinishTasks(state, tasks) {
            console.log(tasks);
            state.finishedList = tasks
        },
        deleteTask(state, idx) {
            state.list.splice(idx, 1);
        },
        finishedTask(state,idx){
            state.finishedList.unshift(state.list[idx]);
            state.list.splice(idx, 1);
        },
        unfinishedTask(state,idx){
            state.list.unshift(state.finishedList[idx]);
            state.finishedList.splice(idx, 1);
        },
    }
});

export default store;