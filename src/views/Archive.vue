<template>
  <n-h1>Archive List</n-h1>
  <n-space vertical>
    <n-list v-if="finishedList.length">
      <draggable
        :list="finishedList"
        @start="drag = true"
        @end="drag = false"
        item-key="id"
      >
        <template #item="{ index, element }">
          <finished-task-item
            :key="element.id"
            :taskIndex="index"
            :task="element"
            @unfinishedTask="() => unfinishedTask(index)"
          />
        </template>
      </draggable>
    </n-list>
    <n-thing v-else> 还没有任务被完成 </n-thing>
  </n-space>
</template>

<script setup>
import { NH1 } from "naive-ui";
import { computed } from "vue";
import { useStore } from "vuex";
import {
  NList,
  NListItem,
  NButton,
  NSpace,
  NThing,
  NModal,
  NInput,
} from "naive-ui";
import FinishedTaskItem from "../components/FinishedTaskItem.vue";
import draggable from "vuedraggable";

const store = useStore();
let finishedList = computed(() => store.state.finishedList);

const unfinishedTask = (index) => {
  store.commit("unfinishedTask", index);
};
</script>

<style scope>
    .extra {
      display: flex;
      justify-content: center;
    }
</style>
