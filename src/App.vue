<template>
  <div id="app">
    <n-layout>
      <n-layout-header>
        <h1>mini TO-DO</h1>
          <div class="extra">
              <n-button><router-link to="/"> 首页 </router-link></n-button>
              <n-button><router-link to="archive"> 归档 </router-link></n-button>
          </div>
      </n-layout-header>
      <n-layout-content>
        <router-view />
      </n-layout-content>
    </n-layout>
  </div>
</template>

<script setup>
import {
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NGridItem,
  NGrid,
  NH1,
  NButton,
  NButtonGroup,
} from "naive-ui";
import { useStore } from "vuex";
import { onMounted } from "vue";

const store = useStore();

onMounted(() => {
  let myData = localStorage.getItem("myData");
  if (myData) {
    myData = JSON.parse(myData);
    store.commit("updateTasks", myData[0]);
    store.commit("updateFinishTasks",myData[1])
  }
});

window.onbeforeunload = () => {
  let list = store.state.list;
  let finishedList = store.state.finishedList;
  let myData = [list, finishedList]
  localStorage.setItem("myData", JSON.stringify(myData));
};
</script>

<style lang="postcss" scoped>
#app {
    background: #f5f5f5;

    & .n-layout-header {
        text-align: center;
        border-bottom: 1px solid #e6e6e6;
    }

    & .n-layout-content {
        margin:  auto;
        padding: 16px;
        max-width: 360px;
        
    }

}
.router-link-active {
    text-decoration: none;
}

a {
    text-decoration: none;
    color: #000;
}
</style>
