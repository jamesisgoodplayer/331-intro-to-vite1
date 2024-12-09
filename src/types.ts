export interface EventList{
    id: number;
    category: string;
    title: string;
    description: string;
    location: string;
    date: string;
    time: string;
    petsAllowed: boolean;
    organizer: Organizer;
    images: string[];
}
export interface EventItem{
    id: number;
    category: string;
    title: string;
    description: string;
    location: string;
    date: string;
    time: string;
    organizer: Organizer;
}
export interface MessageState{
    message:string;
}
export interface EventState{
    event: EventList | null;
}

export interface Organizer{
    id: number;
    name: string;
}

