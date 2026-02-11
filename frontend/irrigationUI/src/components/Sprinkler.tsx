import { useEffect, useState } from 'react'
import type { SprinklerStatus } from '../types/sprinkler'
import Switch from 'react-switch'
import axios from 'axios'

type SprinklerProps = {
    sprinklerZone: SprinklerStatus
}

//TODO should probably create a sprinkler zone object as opposed to the JSON file...
export default function Sprinkler({sprinklerZone}: SprinklerProps) {
    
    const [isActive, setIsActive] = useState(sprinklerZone.isActive);

    useEffect(() => {
        setIsActive(sprinklerZone.isActive)
    },[sprinklerZone.isActive])

    console.log(sprinklerZone)

    const handleToggle = async () => {
        const newValue = !isActive;
        setIsActive(newValue); // optimistic update
        try {
            await axios.post("http://localhost:3000/sprinklerStatus", {
                id: sprinklerZone.id,
                isActive: newValue
            });
        } catch (err) {
            console.log(err);
            setIsActive(sprinklerZone.isActive);//reverts if post fails (need to test behaviour)
        }
    }

    return (
        <span>
            <h1>{sprinklerZone.label}</h1>
            <Switch
                onChange={handleToggle}
                checked={isActive}
            />
        </span>
    )
}