<script setup lang="ts">
import { toRefs } from 'vue'
import  {type Organizer} from '@/types'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message';
const props = defineProps<{
  organizer: Organizer
  id: string
}>()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { organizer } = toRefs(props)
const router = useRouter()
const store = useMessageStore()

const Edit = () => {
  store.updateMessage(' The data has been updated' + props.organizer.name)
  setTimeout(() => {
    store.resetMessage()
  },3000)
  router.push({ name:'event-detail-view', params: {id:props.organizer.id} })
}
</script>
<template>
   <p>Edit event here</p>
   <button @click="Edit">Edit</button>
</template>