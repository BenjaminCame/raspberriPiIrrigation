
import Sprinkler from './components/Sprinkler.tsx'
import { SPRINKLER_ZONES } from './types/sprinkler.tsx'
import WebSocketConnection from './services/webSocketService.tsx'
import './App.css'


function App() {
  return (
    <>
      <WebSocketConnection/>
      <h1>home Irrigation system</h1>
      <div>
        {SPRINKLER_ZONES.map( (zone) => (
          <Sprinkler sprinklerZone={zone}  />
        ))}
      </div>
    </>
  )
}

export default App
