<template>
  <div>
    <input v-model="filterText" placeholder="输入关键字过滤节点" />
    <CTree :options="treeData" :showCheckbox="true" :filterText="filterText" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const filterText = ref("");

const treeData = ref([
  {
    label: "苹果",
    children: [{ label: "红富士" }, { label: "青苹果" }]
  },
  {
    label: "香蕉",
    children: [{ label: "大香蕉" }, { label: "小香蕉" }]
  },
  {
    label: "梨子",
    children: [{ label: "雪梨" }, { label: "黄金梨" }]
  }
]);
</script>
