<template>
  <div
    class="c-card"
    :class="[
      bordered ? 'c-card--bordered' : '',
      shadowClass,
      hoverable ? 'c-card--hoverable' : ''
    ]"
    :style="bodyStyle"
  >
    <!-- Card 头部：支持 header 或 title，右侧显示 extra 内容 -->
    <div v-if="header || title" class="c-card__header">
      <span class="c-card__title">{{ title || header }}</span>
      <span v-if="extra" class="c-card__extra">{{ extra }}</span>
    </div>
    <!-- Card 主体 -->
    <div class="c-card__body">
      <slot />
    </div>
    <!-- Card 底部插槽 -->
    <div v-if="$slots.footer" class="c-card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { cardProps } from "./types";
import "../style/";
import { StyleValue } from "vue";

defineOptions({
  name: "CCard"
});
const props = defineProps(cardProps);
const bodyStyle = computed<StyleValue>(() => props.bodyStyle);

// 根据 shadow 属性设置不同的阴影效果类
const shadowClass = computed(() => {
  if (props.shadow === "always") {
    return "c-card--shadow-always";
  } else if (props.shadow === "hover") {
    return "c-card--shadow-hover";
  }
  return "";
});
</script>

<style></style>
