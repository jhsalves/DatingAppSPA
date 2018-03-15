import { Photo } from './Photo';

export interface User {
    id: number;
    username: string;
    knownAs: string;
    age: number;
    gender: string;
    createdAt: Date;
    lastActive: Date;
    photoUrl: string;
    city: string;
    country: string;
    intrests?: string;
    introduction?: string;
    lookingFor?: string;
    photos?: Photo[];
}
