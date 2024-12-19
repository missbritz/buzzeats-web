import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}


export function deconstructArr (arr:any) {
    return arr.map((i:any) => Object.values(i)).flat()
}