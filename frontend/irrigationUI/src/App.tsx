
import Sprinkler from './components/Sprinkler.tsx'
// import { SPRINKLER_ZONES } from './types/sprinkler.tsx'
import WebSocketConnection from './services/webSocketService.tsx'
import { useEffect, useState } from 'react';
import type { SprinklerStatus } from './types/sprinkler.tsx';

import './App.css'


function App() {
  const [sprinklerStatus, setSprinklerStatus] = useState<SprinklerStatus[]>([]);


  const handleSprinklerStatus = (data: SprinklerStatus[]) => {
    
    const array = Array.isArray(data) ? data : [data];
    setSprinklerStatus(array)
  }

  useEffect(() =>{
    console.log(`Updated sprinklerStatus:`, sprinklerStatus);
  }, [sprinklerStatus])

  return (
    <>
      <WebSocketConnection sendSprinklerStatus = { handleSprinklerStatus } />
      <h1>home Irrigation system</h1>
      <div>
        {sprinklerStatus.map( (zones) => (
          <Sprinkler sprinklerZone={zones}  />
        ))}
      </div>
    </>
  )
}

export default App
