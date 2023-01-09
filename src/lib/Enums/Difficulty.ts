export type Difficulty = {
    value: number;
    name: string;
}

export const Hard: Difficulty = {
    value: 10,
    name: "Hard"
}

export const Normal: Difficulty = {
    value: 5,
    name: "Normal"
}

export const Easy: Difficulty = {
    value: 0,
    name: "Easy"
}

export const Difficulties: Difficulty[] = [
    Easy, Normal, Hard
];