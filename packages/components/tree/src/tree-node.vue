<template>
  <li
    :draggable="draggable"
    @dragstart="handleDragStart"
    @dragover.prevent="handleDragOver"
    @drop="handleDrop"
  >
    <div class="c-tree-node">
      <!-- 使用伪元素显示正三角形 -->
      <span class="toggle" @click="toggleOpen" :class="{ opened: isOpened }" />
      <label v-if="showCheckbox">
        <input
          type="checkbox"
          v-model="localItem.checked"
          :disabled="localItem.disabled"
        />
      </label>
      {{ localItem.label }}
    </div>
    <ul v-if="isOpened && localItem.children" class="c-children">
      <c-tree-node
        v-for="(child, index) in localItem.children"
        :key="index"
        :item="child"
        :showCheckbox="showCheckbox"
        :draggable="draggable"
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
  },
  draggable: {
    type: Boolean,
    default: false
  }
});

// 使用 reactive 复制 item 的属性，确保局部状态可响应
const localItem = reactive({ ...props.item });

// 计算属性 isOpened 依赖于 localItem
const isOpened = computed(() => localItem.isOpened);

// 切换展开状态
const toggleOpen = () => {
  localItem.isOpened = !localItem.isOpened;
};

// 拖拽开始事件
const handleDragStart = (e: DragEvent) => {
  // 将当前节点数据序列化后存入 dataTransfer
  e.dataTransfer?.setData("text/plain", JSON.stringify(localItem));
};

// 拖拽经过事件（这里仅做阻止默认行为，可扩展视觉反馈）
const handleDragOver = (e: DragEvent) => {
  // 此处可添加拖拽经过时的样式提示
};

// 拖拽放下事件（简单示例：打印拖拽数据）
const handleDrop = (e: DragEvent) => {
  const data = e.dataTransfer?.getData("text/plain");
  if (data) {
    const draggedItem = JSON.parse(data);
    console.log("Dropped", draggedItem, "on", localItem);
    // 可通过 emit 事件将拖拽数据传递给父组件，由父组件处理节点的重新排序或移动
  }
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
