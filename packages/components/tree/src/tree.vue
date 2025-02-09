<template>
  <ul class="c-tree">
    <c-tree-node
      v-for="(item, index) in newOptions"
      :key="index"
      :item="item"
      :showCheckbox="showCheckbox"
      :draggable="draggable"
    />
  </ul>
</template>

<script setup lang="ts">
import "../style/";
import CTreeNode from "./tree-node.vue";
import { computed } from "vue";

const props = defineProps({
  // 原始树节点数据
  options: {
    type: Array,
    default: () => []
  },
  // 是否显示复选框
  showCheckbox: {
    type: Boolean,
    default: false
  },
  // 默认将所有节点展开
  defaultExpandAll: {
    type: Boolean,
    default: false
  },
  // 默认将所有节点选中
  defaultChecked: {
    type: Boolean,
    default: false
  },
  // 过滤关键字（过滤时会匹配节点 label，不区分大小写）
  filterText: {
    type: String,
    default: ""
  },
  // 是否启用节点拖拽
  draggable: {
    type: Boolean,
    default: false
  }
});

// 预处理节点：根据 defaultExpandAll 与 defaultChecked 设置默认展开和选中状态
const processTree = (nodes: any[]) => {
  return nodes.map((node) => {
    const newNode = { ...node };
    newNode.isOpened = props.defaultExpandAll
      ? true
      : newNode.isOpened || false;
    newNode.checked = props.defaultChecked ? true : newNode.checked || false;
    if (newNode.children && newNode.children.length > 0) {
      newNode.children = processTree(newNode.children);
    }
    return newNode;
  });
};

// 过滤树节点：递归过滤符合关键字的节点
const filterTree = (nodes: any[], keyword: string): any[] => {
  return nodes.reduce((acc: any[], node) => {
    const matches = node.label.toLowerCase().includes(keyword.toLowerCase());
    let filteredChildren: any[] = [];
    if (node.children && node.children.length > 0) {
      filteredChildren = filterTree(node.children, keyword);
    }
    if (matches || filteredChildren.length > 0) {
      const newNode = { ...node };
      if (filteredChildren.length > 0) {
        newNode.children = filteredChildren;
      } else {
        delete newNode.children;
      }
      acc.push(newNode);
    }
    return acc;
  }, []);
};

const newOptions = computed(() => {
  let processed = processTree(props.options);
  const keyword = props.filterText.trim();
  if (keyword) {
    processed = filterTree(processed, keyword);
  }
  return processed;
});
</script>

<script lang="ts">
export default {
  name: "CTree"
};
</script>
