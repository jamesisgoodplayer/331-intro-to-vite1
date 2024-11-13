<script setup lang="ts">
import { toRefs, defineProps } from 'vue'
import  {type Organizer} from '@/types'


const props = defineProps<{
  organizer: Organizer
  id: string
}>()

const { organizer } = toRefs(props)

</script>
<template>
    <p>{{ organizer.id }} @ {{ organizer.name }}</p> 
    <p>{{ organizer.address }}</p>
</template>