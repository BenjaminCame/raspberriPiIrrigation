
import { useState } from 'react'
import type { SprinklerStatus } from '../types/sprinkler'
import Switch from 'react-switch'
import axios from 'axios'

type SprinklerProps = {
    sprinklerZone: SprinklerStatus
}


export default function Sprinkler({sprinklerZone}: SprinklerProps) {
    
    //TODO current isActive is not determined by the backend 
    const [isActive, setIsActive] = useState(sprinklerZone.isActive);
    console.log(sprinklerZone)

    const handleToggle = async () => {
        setIsActive(isActive => !isActive);//TODO messy junk code refactor asap
        const res = await axios.post("http://localhost:3000/sprinklerStatus", {
            params:{
                id: sprinklerZone.id,
                isActive: Boolean(isActive)
            }
        });
        console.log(res)
    }

    return (
        <span>
            <h1>{sprinklerZone.label}</h1>
            <Switch
                onChange={handleToggle}
                checked={sprinklerZone.isActive}
            />
        </span>
    )
}