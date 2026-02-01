export type SprinklerZone = {
    id: number,
    name: string,
    isActive: boolean,
    gpioPin: number
}

export const SPRINKLER_ZONES: SprinklerZone[] = [
    { id: 1, name: 'Front Lawn', gpioPin: 17, isActive: false },
    { id: 2, name: 'Back Yard', gpioPin: 18, isActive: false },
    { id: 3, name: 'Side Yard', gpioPin: 27, isActive: false },
    { id: 4, name: 'Back Garden Bed', gpioPin: 26, isActive: false },
]