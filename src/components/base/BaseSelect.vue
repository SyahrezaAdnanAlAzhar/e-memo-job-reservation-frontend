<script setup lang="ts">
import { computed } from 'vue';

export interface SelectOption {
  value: string | number;
  text: string;
}

const model = defineModel<string | number>();

interface Props {
  id: string;
  label: string;
  options: SelectOption[]; 
  error?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  error: '',
  disabled: false,
});

const selectClasses = computed(() => ({
  'border-add-red focus:border-add-red focus:ring-add-red': props.error,
  'border-mono-lightgrey focus:border-mainblue-4 focus:ring-mainblue-4': !props.error,
}));
</script>

<template>
    <div class="w-full">
        <label :for="props.id" class="block text-sm font-semibold text-mono-darkgrey mb-1">
            {{ props.label }}
        </label>
        <div class="relative">
            <select
                :id="props.id"
                v-model="model"
                :disabled="props.disabled"
                class="
                w-full pl-3 pr-10 py-2
                bg-mono-white text-mono-black
                border-2 rounded-lg
                transition-colors duration-200
                focus:outline-none focus:ring-2 focus:ring-opacity-50
                disabled:bg-mono-lightgrey disabled:cursor-not-allowed
                appearance-none
                "
                :class="selectClasses"
            >
                
                <option disabled value="">Please select one</option>
                <option v-for="option in props.options" :key="option.value" :value="option.value">
                {{ option.text }}
                </option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">            
                <svg class="w-5 h-5 text-mono-grey" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M18.425 10.271C19.499 8.967 18.57 7 16.88 7H7.12c-1.69 0-2.618 1.967-1.544 3.271l4.881 5.927a2 2 0 0 0 3.088 0l4.88-5.927Z" clip-rule="evenodd"/>
                </svg>
            </div>
        </div>
        <p v-if="props.error" class="mt-1 text-sm text-add-red">
        {{ props.error }}
        </p>
    </div>
</template>