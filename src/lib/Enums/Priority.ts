
export type Priority = {
    value: number;
    name: string;
}

export const High: Priority = {
    value: 10,
    name: "High"
}

export const Medium: Priority = {
    value: 5,
    name: "Medium"
}

export const Low: Priority = {
    value: 0,
    name: "Low"
}

export let Priorities: Priority[] = [
    Low, Medium, High
];