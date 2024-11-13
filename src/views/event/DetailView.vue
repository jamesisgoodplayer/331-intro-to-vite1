<script setup lang="ts">
import { toRefs, defineProps } from 'vue'
import  {type EventList} from '@/types'


const props = defineProps<{
  event: EventList
  id: string
}>()

const { event } = toRefs(props)

</script>
<template>
    <p>{{ event.title }} @ {{ event.location }}</p> 
    <p>{{ event.description }}</p>
</template>