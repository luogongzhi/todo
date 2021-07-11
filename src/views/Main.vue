<template>
  <n-space vertical>
    <n-list v-if="list.length">
      <draggable
        :list="list"
        @start="drag = true"
        @end="drag = false"
        item-key="id"
      >
        <template #item="{ index, element }">
          <task-item
            :taskIndex="index"
            :task="element"
            :key="element.id"
            @delete="() => onDelete(index)"
            @finished="() => onFinished(index)"
            @edit="() => onEdit(index, element)"
          />
        </template>
      </draggable>
    </n-list>
    <n-thing v-else> 请添加待办任务 </n-thing>
    <div class="extra">
      <n-button @click="showModal = true"> 添加 </n-button>
    </div>
  </n-space>

  <n-modal
    v-model:show="showModal"
    preset="dialog"
    title="Dialog"
    :show-icon="false"
  >
    <template #header>
      <div>添加任务</div>
    </template>
    <div>
      <n-input
        v-model:value="content"
        type="input"
        placeholder="请填写任务信息..."
      />
    </div>

    <template #action>
      <n-button @click="onAdd">添加</n-button>
    </template>
  </n-modal>

  <n-modal
    v-model:show="showEditModal"
    preset="dialog"
    title="Dialog"
    :show-icon="false"
  >
    <template #header>
      <div>任务详情</div>
    </template>
    <div>
      <n-input
        v-model:value="editContent"
        type="input"
        placeholder="请填写任务信息..."
      />
    </div>
    <template #action>
      <n-button @click="onUpdate">修改</n-button>
    </template>
  </n-modal>
</template>

<script setup>
import { computed, ref } from "vue";
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
import TaskItem from "../components/TaskItem.vue";
import draggable from "vuedraggable";
import { v4 as uuidv4 } from 'uuid';

const store = useStore();
let list = computed(() => store.state.list);

const initTask = {
  id: "",
  content: "",
};

let showModal = ref(false);
let content = ref(initTask.content);
let showEditModal = ref(false);
let editContent = ref("");
let editTaskIndex = ref(0);
let editTask = { ...initTask };

const onAdd = () => {
  store.commit("addTask", {
    ...initTask,
    id: uuidv4(),
    content: content.value,
  });
  showModal.value = false;
  content.value = "";
};

const onFinished = (index) => {
  store.commit("finishedTask", index);
};

const onDelete = (index) => {
  store.commit("deleteTask", index);
};

const onEdit = (index, task) => {
  editTask = task;
  showEditModal.value = true;
  editTaskIndex.value = index;
  editContent.value = task.content;
};

const onUpdate = () => {
  let task = {
    ...editTask,
    content: editContent.value,
  };
  store.commit("updateTask", {
    idx: editTaskIndex.value,
    task: task,
  });
  showEditModal.value = false;
};

</script>

<style scoped>
.n-thing {
  text-align: center;
}

.extra {
  display: flex;
  justify-content: center;
}
</style>
