export type SprinklerZone = {
    id: string,
    name: string,
    isActive: boolean,
    gpioPin: number
}

//TODO: I now have a json file in the server that holds this, will need to implement data passing on init 
export const SPRINKLER_ZONES: SprinklerZone[] = [
    { id: 'frontLawn', name: 'Front Lawn', gpioPin: 17, isActive: false },
    { id: 'backYard', name: 'Back Yard', gpioPin: 18, isActive: false },
    { id: 'sideYard', name: 'Side Yard', gpioPin: 27, isActive: false },
    { id: 'backGarden', name: 'Back Garden Bed', gpioPin: 26, isActive: false },
]