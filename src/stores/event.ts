import type { EventState, EventList } from '@/types'
import { defineStore } from 'pinia'
export const useEventStore = defineStore('event', {
  state: (): EventState => ({
    event: null
  }),
  actions: {
    setEvent(event: EventList): void {
      this.event = event
    }
  }
})
