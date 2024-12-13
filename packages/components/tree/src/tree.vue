<template>
  <ul class="c-tree">
    <c-tree-node
      v-for="(item, index) in newOptions"
      :key="index"
      :item="item"
      :showCheckbox="showCheckbox"
    />
  </ul>
</template>

<script setup lang="ts">
import "../style/";
import CTreeNode from "./tree-node.vue";
import { ref } from "vue";

const props = defineProps({
  options: {
    type: Array,
    default: () => []
  },
  showCheckbox: {
    type: Boolean,
    default: false
  },
  checked: {
    type: Boolean,
    default: false
  }
});

const newOptions = ref(props.options);
</script>
<script lang="ts">
export default {
  name: "CTree"
};
</script>
