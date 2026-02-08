
import { useState } from 'react'
import type { SprinklerZone } from '../types/sprinkler'
import Switch from 'react-switch'
import axios from 'axios'

type SprinklerProps = {
    sprinklerZone: SprinklerZone
    
}


export default function Sprinkler({sprinklerZone}: SprinklerProps) {
    
    //TODO current isActive is not determined by the backend 
    const [isActive, setIsActive] = useState(sprinklerZone.isActive);

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
            <h1>{sprinklerZone.name}</h1>
            <Switch
                onChange={handleToggle}
                checked={isActive}
            />
        </span>
    )
}