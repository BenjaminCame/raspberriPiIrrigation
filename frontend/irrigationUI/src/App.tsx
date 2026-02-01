
import Sprinkler from './components/Sprinkler.tsx'
// import type sprinklerProp from './components/Sprinkler.tsx'
// import { SprinklerZone } from './types/sprinkler.ts'
import { SPRINKLER_ZONES } from './types/sprinkler.tsx'
import './App.css'


function App() {
  return (
    <>
      <div>
        {SPRINKLER_ZONES.map( (zone) => (
          <Sprinkler sprinklerZone={zone}  />
        ))}
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
