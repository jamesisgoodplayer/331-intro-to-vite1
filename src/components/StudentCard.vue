<script setup lang="ts">
//import { ref } from 'vue'
import type { StudentEvent } from '@/student'
defineProps<{
  student: StudentEvent
}>()
</script>

<template>
  <div class="event-class">
    <div class="event-card">
      <h2>StudentName:{{ student.name }}</h2>
      <h3>surname:{{ student.surname }}</h3>
      <p>GPA: {{ student.gpa }}</p>
    </div>
  </div>
</template>
<style scoped>
.event-card{
  padding:20px;
  width:250px;
  cursor:pointer;
  border:1px solid #39495c;
  margin-bottom: 18px;
}
.event-card:hover{
   transform: scale(1.01);
   box-shadow: 0 3px 12px 0 rgba(0,0,0,0.2);
}
</style>