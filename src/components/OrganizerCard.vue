<script setup lang="ts">
//import { ref } from 'vue'
import  {type Organizer} from '@/types'
defineProps<{
  organizer: Organizer
}>()
</script>


<template>
    <RouterLink class="event-link" :to="{ name: 'organizer-detail-view',params:{id: organizer.id }}">
      <div 
    class="cursor-pointer border border-gray-600 p-[20px] w-[250px] mb-[18px] 
hover:scale-101 hover:shadow-sp"> 
        <h2>{{ organizer.name }}</h2>
        <span>@{{ organizer.id }} on {{ organizer.address }}</span>>
      </div>
    </RouterLink>
  </template>
  <style scoped>
  .event-link{
    text-decoration: none;
    color: #2c3e50;
  }
  .event-link:hover {
    color: #2980b9; 
  }
  .event-card{
    padding:20px;
    width:250px;
    cursor:pointer;
    border:1px solid #39495c;
    margin-bottom: 18px;
  }
  
  </style>