import { useState } from "react"
import { UseMarkers } from "../hook/UseMarkers"
import MarkersList from "./MarkersList"
import Button from "./particle/molecule/Button"
import { UseUi } from "../hook/UseUi"


const Dashboard = ({ currentCountry, toCountryHub }) => {

  const [showMarkers, setShowMarkers] = useState(true)
  const { markers } = UseMarkers()
  const { isFinderOpen, isMenuOpen, isHubOpen, setIsHubOpen, setIsDashBoardOpen, isDashBoardOpen } = UseUi()

  return (
    <main className={`${isMenuOpen || isFinderOpen ? 'hidden' : ''}`}>

      <div className="absolute left-4 top-1/2 translate-y-[-2em]">
        <Button
          buttonText={<i className="bi-star-half" />}
          buttonName={`${showMarkers ? 'Hide Markers' : 'Show Markers'}`}
          action={() => showMarkers ? setShowMarkers(false) : setShowMarkers(true)}
        />
      </div>

      {markers.length !== 0 && showMarkers &&
        <MarkersList
          toCountryHub={toCountryHub}
        />
      }

    </main>
  )
}

export default Dashboard