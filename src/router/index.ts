import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '@/views/EventListView.vue'
import AboutView from '@/views/AboutView.vue'
import StudentListView from '@/views/StudentListView.vue'
import EventDetailView from '@/views/event/DetailView.vue'
import EventRegisterView from '@/views/event/RegisterView.vue'
import EventEditView from '@/views/event/EditView.vue'
import EventLayoutView from '@/views/event/LayoutView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import NetWorkErrorView from '@/views/NetWorkErrorView.vue'
import nProgress from 'nprogress'
import EventService from '@/services/EventService'
import { useEventStore } from '@/stores/event'
import OrganizerListView from '@/views/OrganizerListView.vue'
import AddEventView from '@/views/EventFormView.vue'
import AddOrganizerView from '@/views/OrganizerFormView.vue'
import OrganiezrLayoutView from '@/views/organizer/LayoutView.vue'
import { useOrganizerStore } from '@/stores/organizer'
import OrganizerService from '@/services/OrganizerService'
import OrganizerDetailView from '@/views/organizer/DetailView.vue'
import OrganizerRegisterView from '@/views/organizer/RegisterView.vue'
import OrganizerEditView from '@/views/organizer/EditView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
  
    {
      path: '/event-list-view',
      name: 'event-list-view',
      component: EventListView,
      props: (route) => ({
        page: Number(route.query.page) || 1,
        pageSize: Number(route.query.pageSize) || 1
      })
    },
    {
      path: '/event/:id',
      name: 'event-layout-view',
      component: EventLayoutView,
      props: true,
      beforeEnter: (to) => {
        const id = parseInt(to.params.id as string)
        const eventStore = useEventStore()
        return EventService.getEvent(id)
          .then((response) => {
            // need to setup the data for the event
            eventStore.setEvent(response.data)
          })
          .catch((error) => {
            if (error.response && error.response.status === 404) {
              return {
                name: '404-resource-view',
                params: { resource: 'event' }
              }
            } else {
              return { name: 'network-error-view' }
            }
          })
      },
      
      
      children: [
        {
          path: '',
          name: 'event-detail-view',
          component: EventDetailView,
          props: true
        },
        {
          path: 'register',
          name: 'event-register-view',
          component: EventRegisterView,
          props: true
        },
        {
          path: 'edit',
          name: 'event-edit-view',
          component: EventEditView,
          props: true
        }
      ]
    },
    {
      path: '/organizer-list',
      name: 'organizer-list',
      component:OrganizerListView,
      props: (route) => ({
        page: Number(route.query.page) || 1,
        pageSize: Number(route.query.pageSize) || 1
      })
    },
    {
      path: '/organizer/:id',
      name: 'organizer-layout-view',
      component: OrganiezrLayoutView,
      props: true,
      beforeEnter: (to) => {
        const id = parseInt(to.params.id as string)
        const organizerStore = useOrganizerStore()
        return OrganizerService.getOrganizer(id)
          .then((response) => {
            // need to setup the data for the event
            organizerStore.setOrganizer(response.data)
          })
          .catch((error) => {
            if (error.response && error.response.status === 404) {
              return {
                name: '404-resource-view',
                params: { resource: 'organizer' }
              }
            } else {
              return { name: 'network-error-view' }
            }
          })
      },
      
      
      children: [
        {
          path: '',
          name: 'organizer-detail-view',
          component: OrganizerDetailView,
          props: true
        },
        {
          path: 'register',
          name: 'organizer-register-view',
          component: OrganizerRegisterView,
          props: true
        },
        {
          path: 'edit',
          name: 'organizer-edit-view',
          component: OrganizerEditView,
          props: true
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      component:AboutView
    },
    {
      path: '/student',
      name:'student',
      component: StudentListView
    },
    {
      path:'/add-event',
      name: 'add-event',
      component: AddEventView,
    },
    {
      path:'/add-organizer',
      name: 'add-organizer',
      component: AddOrganizerView,
    },
    {
      path: '/404/:resource',
      name: '404-resource-view',
      component: NotFoundView,
      props: true
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView
    },
    {
      path: '/network-error',
      name: 'network-error-view',
      component: NetWorkErrorView
    },
      
  ],
  scrollBehavior(to, from, savedPosition) {
   if (savedPosition) {
     return savedPosition
   } else {
     return { top: 0 }
   }
}
    
})
router.beforeEach(() => {
  nProgress.start()
})
router.afterEach(() => {
  nProgress.done()
})

export default router
