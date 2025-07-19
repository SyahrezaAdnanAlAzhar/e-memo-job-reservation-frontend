<script setup lang="ts">
import { computed, useSlots } from 'vue';

const model = defineModel<string | number>();

interface Props {
    id: string;
    label: string;
    type?: 'text' | 'email' | 'password' | 'number' | 'search';
    placeholder?: string;
    error?: string;
    disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    type: 'text',
    placeholder: '',
    error: '',
    disabled: false,
});

const slots = useSlots();

const inputClasses = computed(() => {
    const baseClasses = `
        w-full py-2
        bg-mono-white text-mono-black
        border-2 rounded-lg
        transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-opacity-50
        disabled:bg-mono-lightgrey disabled:cursor-not-allowed
    `;
    
    const paddingClasses = slots['icon-left'] ? 'pl-10' : 'pl-3';
    const paddingRightClasses = slots['icon-right'] ? 'pr-10' : 'pr-3';

    const stateClasses = props.error
        ? 'border-add-red focus:border-add-red focus:ring-add-red'
        : 'border-mono-lightgrey focus:border-mainblue-4 focus:ring-mainblue-4';
        
    return `${baseClasses} ${paddingClasses} ${paddingRightClasses} ${stateClasses}`;
});
</script>

<template>
    <div class="w-full">
    <label :for="props.id" class="block text-sm font-semibold text-mono-darkgrey mb-1">
        {{ props.label }}
    </label>

    <div class="relative">
        <div v-if="$slots['icon-left']" class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <span class="text-mono-darkgrey">
            <slot name="icon-left" />
        </span>
        </div>

        <input
        :id="props.id"
        v-model="model"
        :type="props.type"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        :class="inputClasses"
        />

        <div v-if="$slots['icon-right']" class="absolute inset-y-0 right-0 pr-3 flex items-center">
        <span class="text-mono-darkgrey">
            <slot name="icon-right" />
        </span>
        </div>
    </div>

    <p v-if="props.error" class="mt-1 text-sm text-add-red">
        {{ props.error }}
    </p>
</div>
</template>