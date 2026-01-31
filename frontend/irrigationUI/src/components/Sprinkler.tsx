
import { useState } from 'react'


export default function Sprinkler() {
    const [count, setCount] = useState(0) // use this of 'on off status of strinkler'
    return (
        <div>
            <h1>This is my sprinker component</h1>
            <button onClick={() => setCount((count) => count + 1)}>
                count is {count}
            </button>
        </div>
    )
}