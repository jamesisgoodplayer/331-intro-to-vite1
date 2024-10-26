<script setup lang="ts">
import StudentCard from '@/components/StudentCard.vue';
import StudentService from '@/services/StudentService';
import type { StudentEvent } from '@/student'
import { ref ,onMounted} from 'vue'
const students= ref<StudentEvent[]>()
    onMounted(()=>{
  StudentService.getEvents()
   .then((response) => {
      students.value = response.data
   })
   .catch((error) => {
      console.error('There was an error!', error)
   })
})
</script>
<template>
    <h1>Student's informaion</h1>
    <!-- new element -->
    <div class="events">
      <div v-for="student in students" :key="student.id" class="event-item">
        <StudentCard :student="student" />
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