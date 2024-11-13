export interface EventList{
    id: number;
    category: string;
    title: string;
    description: string;
    location: string;
    date: string;
    time: string;
    petsAllowed: boolean;
    organizer: string;
}
export interface MessageState{
    message:string;
}
export interface EventState{
    event: EventList | null;
}
export interface OrganizerState{
    organizer: Organizer | null;
}
export interface Organizer{
    id: number;
    name: string;
    address: string;
}
export interface EventItem{
    id: number;
    category: string;
    title: string;
    description: string;
    location: string;
    date: string;
    time: string;
    organizer: string;
}
export interface OrganizerItem{
    id: number;
    name: string;
    address: string;
}