export const SIGNING_KEYS_DEFAULT_POSITIONS: SigningKey[] = [
    { position: 1 },
    { position: 2 },
    { position: 3 },
    { position: 4 },
    { position: 5 },
    { position: 6 },
    { position: 7 },
    { position: 8 }
];

export interface SigningKey {
    position: number;
    value?: string;
}