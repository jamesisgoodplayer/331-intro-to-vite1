<script setup lang="ts">
import { toRefs } from 'vue'
import  {type Event} from '@/types'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message';
const props = defineProps<{
  event: Event
  id: string
}>()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { event } = toRefs(props)
const router = useRouter()
const store = useMessageStore()

const Edit = () => {
  store.updateMessage(' The data has been updated' + props.event.title)
  setTimeout(() => {
    store.resetMessage()
  },3000)
  router.push({ name:'event-detail-view', params: {id:props.event.id} })
}
</script>
<template>
   <p>Edit event here</p>
   <button @click="Edit">Edit</button>
</template>