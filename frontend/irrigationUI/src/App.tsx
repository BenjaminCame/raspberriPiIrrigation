
import Sprinkler from './components/Sprinkler.tsx'
// import { SprinkerZones } from './types/sprinker.ts'
import { SPRINKLER_ZONES } from './types/sprinker.ts'
import './App.css'

function App() {
  return (
    <>
      <div>
        {SPRINKLER_ZONES.map(zone => (
          <Sprinkler />
        ))}
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
