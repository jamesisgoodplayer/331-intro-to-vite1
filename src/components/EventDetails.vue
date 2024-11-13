<script setup lang="ts">
import type { EventList } from '@/types'

defineProps<{
  event: EventList
}>()
</script>

<template>
    <div class="event-details">
      <h2> Category: {{ event.category }} </h2>
      <h3>Organizer: {{ event.organizer }}</h3>
    </div>
  </template>

<style scoped>
.event-details {
  padding:20px;
  width:250px;
  cursor:pointer;
  border:1px solid #39495c;
  margin-bottom: 18px;
}

.event-details:hover {
   transform: scale(1.01); 
   box-shadow: 0 3px 12px 0 rgba(0,0,0,0.2); 
}
</style>