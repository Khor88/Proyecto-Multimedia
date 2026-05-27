import { personOutline } from 'ionicons/icons';
import LeagueIcon from '../images/LeagueIcon.png';

export interface Member {
  id: number;
  name: string;
  role: string;
  image: string;
}

export interface League {
  id: number;
  name: string;
  division: string;
  position: string;
  points: string;
  image: string;
}

export const dummyLeagues: League[] = [
  { 
    id: 1, 
    name: 'LIGA PRO-FIGHT', 
    division: 'División Regional Madrid', 
    position: '8 / 12', 
    points: '1.250', 
    image: LeagueIcon 
  },
  { 
    id: 2, 
    name: 'ELITE STRIKERS', 
    division: 'Liga Nacional A', 
    position: '3 / 20', 
    points: '2.400', 
    image: LeagueIcon 
  },
  { 
    id: 3, 
    name: 'CLUB DEL COMBATE', 
    division: 'Torneo Local BCN', 
    position: '1 / 8', 
    points: '900', 
    image: LeagueIcon 
  },
];

export const dummyMembers: Member[] = [
  { id: 1, name: 'Pablo Méndez', role: 'Presidente', image: personOutline },
  { id: 2, name: 'Lucas García', role: 'Luchador', image: personOutline },
  { id: 3, name: 'Ana Belén', role: 'Árbitro', image: personOutline },
];
