
import { useState } from 'react'
import type { SprinklerZone } from '../types/sprinkler'
import Switch from 'react-switch'

type SprinklerProps = {
    sprinklerZone: SprinklerZone
    
}


export default function Sprinkler({sprinklerZone}: SprinklerProps) {
    
    const [isActive, setIsActive] = useState(sprinklerZone.isActive);

    const handleToggle = () => {
        setIsActive(isActive => !isActive);
        //TODO switchs work on ui need to pass to server to change solinoid position
    }

    return (
        <span>
            <h1>{sprinklerZone.name}</h1>
            <Switch
                onChange={handleToggle}
                checked={isActive}
            />
        </span>
    )
}