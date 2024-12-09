import type { EventList } from '@/types';
import axios from 'axios';
import type { AxiosResponse } from 'axios';


const apiClient = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials:false,
    headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
    getEvents(perPage:number, page:number) {
        return apiClient.get('/events?_limit=' +perPage + '&_page=' + page);
    },
    getEvent(id:number) {
        return apiClient.get('/events/'+ id);
    },
    saveEvent(event:EventList){
        return apiClient.post('/events', event);
    },
    getEventsByKeyword(keyword:string, perPage:number, page:number):
     Promise<AxiosResponse<EventList[]>>{
        return apiClient.get<EventList[]>('/events?title=' +keyword + '&_limit=' +perPage + '&_page=' + page);}

}