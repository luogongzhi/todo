<template>
  <n-list-item class="task-item-wrapper">
    <template #prefix>
      <n-icon size="16">
        <drag-indicator-outlined />
      </n-icon>
    </template>
    <swiper
      :initial-slide="1"
      :slides-per-view="1"
      :resistance-ratio="0"
      :speed="200"
      @transitionEnd="onTransitionEnd"
    >
      <swiper-slide class="back-slide1">未完成</swiper-slide>
      <swiper-slide>{{ task.content }}</swiper-slide>
      <swiper-slide class="back-slide">未完成</swiper-slide>
    </swiper>
  </n-list-item>
</template>

<script setup>
import { defineProps, defineEmit } from "vue";
import "swiper/swiper.min.css";
import { Swiper, SwiperSlide } from "swiper/vue";
import { DragIndicatorOutlined } from "@vicons/material";
import { NListItem, NIcon } from "naive-ui";

const props = defineProps({ 
  task: Object,
  taskIndex: Number,
});

const emit = defineEmit(["unfinishedTask"]);

const onTransitionEnd = (instance) => {
  const { activeIndex } = instance;
  if (activeIndex === 0 || activeIndex === 2) {
      emit("unfinishedTask");
  }
};
</script>

<style lang="postcss">
.task-item-wrapper {
  & .back-slide {
      color: white;
      background: tomato;
      padding-left: 20px !important;
      justify-content: flex-start;
      box-sizing: border-box;
  }
  & .back-slide1 {
      box-sizing:border-box;
      color: white;
      width: 362px;
      background: tomato;
      justify-content: flex-end;
      padding-right: 20px !important;
  }
}

.task-item-wrapper:not(:last-child) {
  border-bottom: none !important;
}
</style>
