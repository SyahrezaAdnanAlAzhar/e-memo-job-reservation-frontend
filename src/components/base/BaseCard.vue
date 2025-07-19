<script setup lang="ts">
interface Props {
  customClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  customClass: '',
})
</script>

<template>
  <div class="bg-mono-white rounded-xl shadow-md overflow-hidden" :class="props.customClass">
    <div v-if="$slots.header" class="p-4 sm:p-6 border-b border-mono-lightgrey">
      <slot name="header" />
    </div>

    <div class="p-4 sm:p-6">
      <slot />
    </div>

    <div v-if="$slots.footer" class="p-4 sm:p-6 bg-mono-lightgrey bg-opacity-50">
      <slot name="footer" />
    </div>
  </div>
</template>
