<script setup lang="ts">
import { RouterLink } from 'vue-router'
import EventCard from '@/components/EventCard.vue'
import EventDetails from '@/components/EventDetails.vue'
import EventService from '@/services/EventService'
import { type EventList } from '@/types'
import { useRouter } from 'vue-router'
import { ref, onMounted, computed, watchEffect } from 'vue'
import BaseInput from '@/components/BaseInput.vue'
const events = ref<EventList[] | null>(null)

const keyword = ref('')

const totalEvents = ref(0)
const router = useRouter()
const hasNexPage = computed(() => {
  const totoalPages = Math.ceil(totalEvents.value / props.pageSize)
  return page.value < totoalPages
})

const props = defineProps({
  page: {
    type: Number,
    required: true,
  },
  pageSize: {
    type: Number,
    required: true,
  },
})

watchEffect(() => {
  fetchEvents(props.page, props.pageSize)
})

const page = computed(() => props.page)

onMounted(() => {
  fetchEvents(props.page, props.pageSize)
  updateKeyword()
})
function fetchEvents(page: number, size: number) {
  EventService.getEvents(size, page)
    .then(response => {
      events.value = response.data
      totalEvents.value = parseInt(response.headers['x-total-count'], 10)
    })
    .catch(error => {
      console.error('There was an error getting events.', error)
    })
}

function updateKeyword() {
  let queryFunction
  console.log('keyword', keyword.value)
  if (keyword.value === '') {
    queryFunction = EventService.getEvents(3, page.value)
  } else {
    queryFunction = EventService.getEventsByKeyword(
      keyword.value,
      3,
      page.value,
    )
  }
  queryFunction
    .then(response => {
      events.value = response.data
      console.log('events', events.value)
      totalEvents.value = response.headers['x-total-count']
      console.log('totalEvent', totalEvents.value)
    })
    .catch(() => {
      router.push({ name: 'NetworkError' })
    })
}
</script>

<template>
  <h1>Events For Good</h1>
  <!-- new element -->
  <main class="flex flex-col items-center">
    <BaseInput
      v-model="keyword"
      type="text"
      label="Search..."
      @input="updateKeyword"
    />
    <div v-for="event in events" :key="event.id" class="event-item">
      <EventCard :event="event" />
      <EventDetails :event="event" />
    </div>
  </main>
  <div class="pagination">
    <RouterLink
      :to="{
        name: 'event-list-view',
        query: { page: props.page - 1, pageSize: props.pageSize },
      }"
      rel="prev"
      v-if="props.page > 1"
      class="pagination-button"
    >
      &#60;Prev Page</RouterLink
    >

    <RouterLink
      :to="{
        name: 'event-list-view',
        query: { page: props.page + 1, pageSize: props.pageSize },
      }"
      rel="next"
      v-if="hasNexPage"
      class="pagination-button"
    >
      &#62;Next Page</RouterLink
    >
  </div>
</template>

<style scoped>
.event-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}
.pagination {
  display: flex;
  justify-content: center; /* Center the buttons */
  margin-top: 20px; /* Top margin */
}

.pagination-button {
  padding: 10px 20px; /* Inner padding */
  background-color: #070404; /* Button background color */
  color: rgb(255, 234, 0); /* Button text color */
  border: none; /* Remove border */
  border-radius: 5px; /* Rounded corners */
  margin: 0 10px; /* Space between buttons */
  text-decoration: none; /* Remove underline */
  cursor: pointer; /* Cursor style */
  transition: background-color 0.3s; /* Background color transition */
}

.pagination-button:hover {
  background-color: #0056b3; /* Background color on hover */
}
</style>
