<template>
  <div
    class="c-input"
    :class="[
      `c-input--${size}`,
      {
        'c-input--disabled': disabled,
        'c-input--with-prefix': prefixIcon,
        'c-input--with-suffix': suffixIcon || clearable || showPassword,
        'c-input--focused': focused
      }
    ]"
  >
    <!-- 前缀图标 -->
    <span v-if="prefixIcon" class="c-input__prefix">
      <i :class="prefixIcon" />
    </span>

    <!-- 输入框主体 -->
    <input
      ref="inputRef"
      v-model="inputValue"
      :type="inputType"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :maxlength="maxlength"
      :minlength="minlength"
      :name="name"
      :id="id"
      :autocomplete="autocomplete"
      :autofocus="autofocus"
      class="c-input__inner"
      @input="handleInput"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
      @keydown="handleKeydown"
      @keyup="handleKeyup"
    />

    <!-- 后缀区域 -->
    <span
      v-if="suffixIcon || clearable || showPassword"
      class="c-input__suffix"
    >
      <!-- 清空按钮 -->
      <span
        v-if="clearable && inputValue && !disabled"
        class="c-input__clear"
        @click="handleClear"
      >
        <i class="c-icon-close" />
      </span>

      <!-- 密码切换按钮 -->
      <span
        v-if="showPassword && type === 'password'"
        class="c-input__password-toggle"
        @click="togglePassword"
      >
        <i :class="passwordVisible ? 'c-icon-eye' : 'c-icon-eye-off'" />
      </span>

      <!-- 后缀图标 -->
      <span
        v-if="suffixIcon && !clearable && !showPassword"
        class="c-input__suffix-icon"
      >
        <i :class="suffixIcon" />
      </span>
    </span>

    <!-- 字数统计 -->
    <span v-if="showWordLimit && maxlength" class="c-input__word-limit">
      {{ inputValue.length }}/{{ maxlength }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from "vue";
import { inputProps, type InputEmits } from "./types";
import "../style/";

defineOptions({
  name: "CInput"
});

const props = defineProps(inputProps);
const emit = defineEmits<InputEmits>();

// 响应式数据
const inputRef = ref<HTMLInputElement>();
const focused = ref(false);
const passwordVisible = ref(false);

// 计算属性
const inputValue = computed({
  get() {
    return String(props.modelValue || "");
  },
  set(value: string) {
    emit("update:modelValue", value);
  }
});

const inputType = computed(() => {
  if (props.type === "password" && passwordVisible.value) {
    return "text";
  }
  return props.type;
});

// 事件处理
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = target.value;
  inputValue.value = value;
  emit("input", value);
};

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("change", target.value);
};

const handleFocus = (event: FocusEvent) => {
  focused.value = true;
  emit("focus", event);
};

const handleBlur = (event: FocusEvent) => {
  focused.value = false;
  emit("blur", event);
};

const handleKeydown = (event: KeyboardEvent) => {
  emit("keydown", event);
  if (event.key === "Enter") {
    emit("enter", event);
  }
};

const handleKeyup = (event: KeyboardEvent) => {
  emit("keyup", event);
};

const handleClear = () => {
  inputValue.value = "";
  emit("clear");
  nextTick(() => {
    inputRef.value?.focus();
  });
};

const togglePassword = () => {
  passwordVisible.value = !passwordVisible.value;
  nextTick(() => {
    inputRef.value?.focus();
  });
};

// 暴露方法
defineExpose({
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
  select: () => inputRef.value?.select(),
  inputRef
});
</script>

<style></style>
