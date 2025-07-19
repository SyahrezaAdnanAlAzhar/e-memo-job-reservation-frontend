<script setup lang="ts">
import { computed } from 'vue';

const model = defineModel<string>();

interface Props {
  id: string;
  label: string;
  placeholder?: string;
  rows?: number;
  error?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '',
  rows: 4,
  error: '',
  disabled: false,
});

const textareaClasses = computed(() => ({
  'border-add-red focus:border-add-red focus:ring-add-red': props.error,
  'border-mono-lightgrey focus:border-mainblue-4 focus:ring-mainblue-4': !props.error,
}));
</script>

<template>
  <div class="w-full">
    <label :for="props.id" class="block text-sm font-semibold text-mono-darkgrey mb-1">
      {{ props.label }}
    </label>
    <textarea
      :id="props.id"
      v-model="model"
      :placeholder="props.placeholder"
      :rows="props.rows"
      :disabled="props.disabled"
      class="
        w-full px-3 py-2
        bg-mono-white text-mono-black
        border-2 rounded-lg
        transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-opacity-50
        disabled:bg-mono-lightgrey disabled:cursor-not-allowed
        resize-y
      "
      :class="textareaClasses"
    ></textarea>
    <p v-if="props.error" class="mt-1 text-sm text-add-red">
      {{ props.error }}
    </p>
  </div>
</template>