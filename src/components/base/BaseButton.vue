<script setup lang="ts">
import { computed } from 'vue';

type ButtonColor = 'lightBlue' | 'darkBlue' | 'monochrome' | 'success' | 'danger' | 'custom';
type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonWeight = 'normal' | 'semibold' | 'bold' | 'black';

interface Props {
  color?: ButtonColor;
  size?: ButtonSize;
  weight?: ButtonWeight;
  outline?: boolean; 
  disabled?: boolean;
  customClass?: string;
}

// DEFAULT BUTTON
const props = withDefaults(defineProps<Props>(), {
  color: 'lightBlue',
  size: 'md',
  weight: 'semibold',
  outline: false,
  disabled: false,
  customClass: '',
});


// BASE STYLE
const baseClasses = `
  inline-flex items-center justify-center
  rounded-lg
  transition-all duration-200
  focus:outline-none focus:ring-2 focus:ring-opacity-75

  disabled:opacity-50 disabled:cursor-not-allowed
`;

// LOOKUP OBJECTS
const sizeMap: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

const weightMap: Record<ButtonWeight, string> = {
  normal: 'font-normal',
  semibold: 'font-semibold',
  bold: 'font-bold',
  black: 'font-black',
};

const colorMap: Record<ButtonColor, { solid: string; outline: string }> = {
  lightBlue: {
    solid: 'bg-mainblue-1 text-mono-black hover:bg-mainblue-2 hover:font-bold',
    outline: 'bg-mono-white text-mainblue-3 border-mainblue-4 hover:bg-mono-lightgrey hover:font-bold',
  },
  darkBlue: {
    solid: 'bg-mainblue-4 text-mono-white hover:bg-mainblue-5 hover:font-bold',
    outline: 'bg-mono-white text-mainblue-6 border-mainblue-7 hover:bg-mono-lightgrey hover:font-bold',
  },
  monochrome: {
    solid: 'bg-mono-darkgrey text-mono-white hover:bg-mono-black hover:font-bold',
    outline: 'bg-mono-white text-mono-darkgrey border-mono-black hover:bg-mono-lightgrey hover:font-bold',
  },
  success: {
    solid: 'bg-add-green text-mono-white hover:font-bold',
    outline: 'bg-mono-white text-add-green border-add-green hover:bg-add-green hover:text-mono-white hover:font-bold',
  },
  danger: {
    solid: 'bg-add-red text-mono-white hover:font-bold',
    outline: 'bg-mono-white text-add-red border-add-red hover:bg-add-red hover:text-mono-white hover:font-bold',
  },
  custom: { 
    solid: '',
    outline: '',
  }
};

// COMPUTED PROPERTY
const computedClasses = computed(() => {
  const sizeClass = sizeMap[props.size];
  const weightClass = weightMap[props.weight];
  const colorClasses = props.outline 
    ? colorMap[props.color]?.outline 
    : colorMap[props.color]?.solid;
  return `${baseClasses} ${sizeClass} ${weightClass} ${colorClasses} ${props.customClass}`;
});
</script>

<template>
  <button :class="computedClasses" :disabled="props.disabled">
    <slot />
  </button>
</template>

<style scoped>
</style>