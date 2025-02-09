<template>
  <div>
    <CTree :options="treeData" :showCheckbox="true" />
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
const treeData = ref([
  {
    label: "节点 A (禁用)",
    disabled: true,
    children: [{ label: "子节点 A1" }, { label: "子节点 A2" }]
  },
  {
    label: "节点 B",
    children: [{ label: "子节点 B1", disabled: true }, { label: "子节点 B2" }]
  }
]);
</script>
