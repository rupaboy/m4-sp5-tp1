import { useState } from "react"
import { UseMarkers } from "../hook/UseMarkers"
import MarkersList from "./MarkersList"
import Button from "./particle/molecule/Button"


const Dashboard = ({ isMenuOpen, isFinderOpen, setIsFinderOpen, currentCountry, setCurrentCountry, setIsMenuOpen }) => {

  const [showMarkers, setShowMarkers] = useState(true)
  const { markers, clearMarkers } = UseMarkers()
  return (
    <main className={`${isMenuOpen || isFinderOpen || currentCountry !== null ? 'hidden' : ''}`}>

      <div className="absolute left-4 top-1/2 translate-y-[-2em]">
        <Button
          buttonText={<i className="bi-star-half" />}
          buttonName={`${showMarkers ? 'Hide Markers' : 'Show Markers'}`}
          action={() => showMarkers ? setShowMarkers(false) : setShowMarkers(true)}
        />
      </div>
      {markers.length !== 0 && showMarkers &&
        <MarkersList
          markers={markers}
          clearMarkers={clearMarkers}
          setCurrentCountry={setCurrentCountry}
          setIsMenuOpen={setIsMenuOpen}
          setIsFinderOpen={setIsFinderOpen} />
      }

    </main>
  )
}

export default Dashboard