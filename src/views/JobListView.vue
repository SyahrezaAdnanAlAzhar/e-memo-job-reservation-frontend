<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import BaseTable from '@/components/base/BaseTable.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import type { TableHeader, SortState } from '@/types/table'
import { useAuthStore } from '@/stores/auth'
import { debounce } from 'lodash-es'

// STATE MANAGEMENT ===
const authStore = useAuthStore()

// === LOCAL STATE ===
const originalItems = ref<any[]>([])
const isLoading = ref(true)
const sortState = ref<SortState[]>([])

// === HEADERS DEFINITION ===
const tableHeaders: TableHeader[] = [
  { key: 'no', label: 'No' },
  { key: 'jobDescription', label: 'Job Description' },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'ticketAge', label: 'Umur Tiket', sortable: true },
  { key: 'requestor', label: 'Requestor' },
  { key: 'pic', label: 'PIC Job' },
  { key: 'lokasi', label: 'Lokasi' },
  { key: 'actions', label: '', class: 'text-center' },
]

// === COMPUTED PROPERTIES ===
const canChangePriority = computed(() => sortState.value.length === 0)

const sortedItems = computed(() => {
  if (!canChangePriority.value) {
    const itemsToSort = [...originalItems.value]
    // Implementasikan logika sorting kompleks di sini...
    return itemsToSort
  }
  return originalItems.value
})

// === METHODS / FUNCTIONS ===
function handleSort(header: TableHeader) {
  // Implementasikan logika handle sort di sini...
}

function increasePriority(item: any) {
  // Implementasikan logika menaikkan prioritas di sini...
  console.log('Naikkan prioritas untuk:', item.no)
  debouncedUpdatePriority()
}

function decreasePriority(item: any) {
  // Implementasikan logika menurunkan prioritas di sini...
  console.log('Turunkan prioritas untuk:', item.no)
  debouncedUpdatePriority()
}

// Panggil API setelah user berhenti mengubah selama 1.5 detik
const debouncedUpdatePriority = debounce(() => {
  console.log('Menyimpan urutan prioritas baru ke backend...')
  // await api.savePriorityOrder(originalItems.value);
}, 1500)

// === LIFECYCLE HOOKS ===
onMounted(async () => {
  isLoading.value = true
  // Ganti ini dengan panggilan API Anda yang sebenarnya
  // const response = await api.getJobs();
  // originalItems.value = response.data;

  // Data dummy untuk development
  originalItems.value = [
    {
      no: 1,
      jobDescription: 'Memperbaiki Mesin 1...',
      status: 'belum_terassign',
      ticketAge: '2 Hari',
      requestor: 'Syahreza Adnan',
      pic: null,
      lokasi: 'Forging F11',
    },
    {
      no: 2,
      jobDescription: 'Memeriksa kualitas...',
      status: 'dikerjakan',
      ticketAge: '5 Hari',
      requestor: 'Arif Tri W',
      pic: 'Doni',
      lokasi: 'Forging F12',
    },
  ]
  isLoading.value = false
})
</script>

<template>
  <div class="p-4 sm:p-8">
    <h1 class="text-2xl font-bold mb-6">Daftar Pekerjaan</h1>

    <!-- Filter dan Statistik Card bisa diletakkan di sini -->

    <BaseTable
      :headers="tableHeaders"
      :items="sortedItems"
      :is-loading="isLoading"
      :sort-by="sortState"
      @sort="handleSort"
    >
      <!-- Kustomisasi sel-sel spesifik -->
      <template #status="{ item }">
        <!-- Logika untuk menampilkan badge status -->
      </template>

      <template #pic="{ item }">
        <span v-if="item.pic">{{ item.pic }}</span>
        <BaseButton v-else-if="authStore.permissions.canAssignJob" size="sm"> Assign </BaseButton>
      </template>

      <template #actions="{ item }">
        <div class="flex items-center justify-center space-x-2">
          <button
            title="Lihat Detail"
            class="w-6 h-6 rounded-full bg-mainblue-4 border-2 border-mono-white ring-2 ring-mainblue-4"
          ></button>

          <template v-if="authStore.permissions.canChangePriority">
            <button
              title="Naikkan Prioritas"
              @click="increasePriority(item)"
              :disabled="!canChangePriority"
              :class="{ 'opacity-25 cursor-not-allowed': !canChangePriority }"
            >
              <!-- Ikon Panah Atas Hijau -->
            </button>
            <button
              title="Turunkan Prioritas"
              @click="decreasePriority(item)"
              :disabled="!canChangePriority"
              :class="{ 'opacity-25 cursor-not-allowed': !canChangePriority }"
            >
              <!-- Ikon Panah Bawah Merah -->
            </button>
          </template>
        </div>
      </template>
    </BaseTable>
  </div>
</template>
