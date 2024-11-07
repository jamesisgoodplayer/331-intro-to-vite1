<script setup lang="ts">
import { RouterLink } from 'vue-router';
import EventCard from '@/components/EventCard.vue'
import EventDetails from '@/components/EventDetails.vue'
import EventService from '@/services/EventService';
import  { type Event } from '@/types'
import { ref ,onMounted,computed,watchEffect} from 'vue'
const events = ref<Event[] | null>(null)

const totalEvents = ref(0)

const hasNexPage = computed(() => {
  const totoalPages = Math.ceil(totalEvents.value / props.pageSize)
  return page.value < totoalPages
})

const props = defineProps ({
  page:{
    type:Number,
    required:true
  },
  pageSize: {
    type: Number,
    required: true
  }
})

watchEffect(() => {
  fetchEvents(props.page, props.pageSize);
});

const page = computed(()=>props.page)

onMounted(()=>{
  fetchEvents(props.page, props.pageSize);
})
function fetchEvents(page: number, size: number) {

  EventService.getEvents(size, page)
    .then(response => {
      events.value = response.data;
      totalEvents.value = parseInt(response.headers['x-total-count'], 10);
    })
    .catch(error => {
      console.error('There was an error getting events.', error);
    });
}
</script>

<template>
  <h1>Events For Good</h1>
  <!-- new element -->
  <div class="flex flex-col items-center">
    <div v-for="event in events" :key="event.id" class="event-item">
      <EventCard :event="event" />
      <EventDetails :event="event" />
    </div>
  </div>
  <div class="pagination">
    <RouterLink 
    :to="{name:'event-list-view',query: { page:props.page-1, pageSize:props.pageSize }}"
    rel="prev"
    v-if="props.page > 1"
    class="pagination-button">
    &#60;Prev Page</RouterLink>

    <RouterLink 
    :to="{ name:'event-list-view',query: { page:props.page+1, pageSize:props.pageSize }}" 
    rel = "next"
    v-if="hasNexPage"
    class="pagination-button">
    &#62;Next Page</RouterLink>
  </div>
</template>

<style scoped>

.event-item {
  display: flex;
  justify-content:space-between;
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


