<script setup>
defineProps({
  placeholder: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue", "click"]);
</script>

<template>
  <div class="flex">
    <input
      :value="modelValue"
      class="flex-1 rounded-r-none border-r-0"
      type="text"
      :readonly="readonly"
      :placeholder="placeholder"
      @input="emit('update:modelValue', $event.target.value)"
    />
    <button
      id="button"
      class="rounded-l-none py-1 active:mt-0 active:pt-2 text-secondary"
      :disabled="disabled"
      @click="emit('click')"
    >
      <slot></slot>
    </button>
  </div>
</template>

<style scoped></style>
