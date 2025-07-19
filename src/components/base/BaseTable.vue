<script setup lang="ts" generic="T extends Record<string, any>">
import type { TableHeader, SortState } from '@/types/table'

interface Props {
  headers: TableHeader[]
  items: T[]
  isLoading?: boolean
  sortBy?: SortState[]
}

const props = withDefaults(defineProps<Props>(), {
  isLoading: false,
  sortBy: () => [], 
})

const emit = defineEmits<{
  (e: 'sort', header: TableHeader): void
}>()

function handleHeaderClick(header: TableHeader) {
  if (header.sortable) {
    emit('sort', header)
  }
}

function getSortDirection(key: string): 'asc' | 'desc' | 'none' {
  const sortState = props.sortBy.find((s) => s.key === key)
  return sortState ? sortState.direction : 'none'
}
</script>

<template>
  <div class="w-full overflow-x-auto rounded-lg border border-mono-lightgrey">
    <table class="w-full text-sm text-left text-mono-darkgrey">
      <thead class="text-xs text-mono-darkgrey uppercase bg-mono-white">
        <tr>
          <th
            v-for="header in props.headers"
            :key="header.key"
            scope="col"
            class="px-6 py-4 font-bold"
            :class="[header.class, { 'cursor-pointer hover:bg-mono-lightgrey': header.sortable }]"
            @click="handleHeaderClick(header)"
          >
            <div class="flex items-center gap-2">
              <span>{{ header.label }}</span>
              <div v-if="header.sortable" class="relative w-4 h-6">
                <!-- Default -->
                <svg
                  v-if="getSortDirection(header.key) === 'none'"
                  class="w-6 h-6 text-mono-lightgrey absolute inset-0"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 20V7m0 13-4-4m4 4 4-4m4-12v13m0-13 4 4m-4-4-4 4"
                  />
                </svg>

                <!-- Ascending -->
                <svg
                  v-if="getSortDirection(header.key) === 'asc'"
                  class="w-6 h-6 text-mono-black absolute inset-0"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v13m0-13 4 4m-4-4-4 4"
                  />
                </svg>

                <!-- Descending -->
                <svg
                  v-if="getSortDirection(header.key) === 'desc'"
                  class="w-6 h-6 text-mono-black absolute inset-0"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 19V5m0 14-4-4m4 4 4-4"
                  />
                </svg>
              </div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <!-- Status Loading -->
        <tr v-if="props.isLoading">
          <td :colspan="props.headers.length" class="text-center p-8">
            <slot name="loading">
              <span class="text-mono-grey">Memuat data...</span>
            </slot>
          </td>
        </tr>

        <!-- Status Data Kosong -->
        <tr v-else-if="!props.items.length">
          <td :colspan="props.headers.length" class="text-center p-8">
            <slot name="empty">
              <span class="text-mono-grey">Tidak ada data untuk ditampilkan.</span>
            </slot>
          </td>
        </tr>

        <!-- Render Baris Data -->
        <tr
          v-else
          v-for="(item, index) in props.items"
          :key="index"
          class="bg-mono-white border-b border-mono-lightgrey last:border-b-0 hover:bg-mono-lightgrey hover:bg-opacity-50"
        >
          <td v-for="header in props.headers" :key="`${header.key}-${index}`" class="px-6 py-4">
            <!-- INI BAGIAN PALING PENTING: DYNAMIC SLOT -->
            <!-- Komponen akan mencari slot dengan nama yang cocok dengan 'header.key'. -->
            <!-- Jika tidak ada, ia akan menampilkan data mentah sebagai fallback. -->
            <slot :name="header.key" :item="item" :value="item[header.key]">
              {{ item[header.key] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
