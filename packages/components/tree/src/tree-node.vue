<template>
  <li>
    <div class="c-tree-node" @click="toggleOpen">
      <!-- 使用伪元素显示正三角形 -->
      <span class="toggle" @click="toggleOpen" :class="{ opened: isOpened }" />
      <label v-if="showCheckbox">
        <input type="checkbox" v-model="localItem.checked" />
      </label>
      {{ localItem.label }}
    </div>
    <ul v-if="isOpened && localItem.children" class="c-children">
      <c-tree-node
        v-for="(child, index) in localItem.children"
        :key="index"
        :item="child"
        :showCheckbox="showCheckbox"
      />
    </ul>
  </li>
</template>

<script setup lang="ts">
import { reactive, computed } from "vue";

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  showCheckbox: {
    type: Boolean,
    default: false
  }
});

// 使用 reactive 复制 item 的属性
const localItem = reactive({ ...props.item });

// 计算属性 isOpened 依赖于 localItem
const isOpened = computed(() => localItem.isOpened);

const toggleOpen = () => {
  localItem.isOpened = !localItem.isOpened;
};
</script>

<script lang="ts">
export default {
  name: "CTreeNode"
};
</script>

<style scoped>
li {
  list-style: none;
}

.toggle {
  display: inline-block;
  width: 0;
  height: 0;
  margin-right: 8px;
  border-style: solid;
  border-width: 6px 4px 0 4px; /* 正三角形 */
  border-color: #909399 transparent transparent transparent;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}

/* 展开状态，三角形朝下 */
.toggle.opened {
  transform: rotate(90deg);
  border-width: 4px 6px 4px 0;
  border-color: transparent #909399 transparent transparent;
}
</style>
