<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import EventDetails from '@/components/EventDetails.vue'
import EventService from '@/services/EventService';
import type { Event } from '@/type'
import { ref ,onMounted} from 'vue'
const events = ref<Event[]>()
onMounted(()=>{
  EventService.getEvents()
   .then((response) => {
      events.value = response.data
   })
   .catch((error) => {
      console.error('There was an error!', error)
   })
})
</script>

<template>
  <h1>Events For Good</h1>
  <!-- new element -->
  <div class="events">
    <div v-for="event in events" :key="event.id" class="event-item">
      <EventCard :event="event" />
      <EventDetails :event="event" />
    </div>
  </div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.event-item {
  display: flex;
  justify-content:space-between;
  align-items: center;
  margin-bottom: 30px;
}
</style>


