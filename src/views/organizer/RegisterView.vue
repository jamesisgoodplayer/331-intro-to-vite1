<script setup lang="ts">
import { toRefs } from 'vue'
import  {type Organizer} from '@/types'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message';
const props = defineProps<{
  organizer: Organizer
  id: string
}>()
const router = useRouter()
const store = useMessageStore()
//eslint-disable-next-line @typescript-eslint/no-unused-vars
const { organizer } = toRefs(props)
const register = () => {
  store.updateMessage('You are successfully registered for' + props.organizer.name)
  setTimeout(() => {
    store.resetMessage()
  },3000)
  router.push({ name:'event-detail-view', params: {id:props.organizer.id} })
}
</script>
<template>
 <p>Register event here</p>
 <button @click="register">Register</button>
</template>