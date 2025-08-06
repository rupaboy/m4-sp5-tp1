import { useState } from "react"
import { UseMarkers } from "../hook/UseMarkers"
import MarkersList from "../component/MarkersList"
import Button from "../component/particle/molecule/Button"
import { UseUi } from "../hook/UseUi"
import { useUser } from "../hook/UseUser"


const Dashboard = ({ currentCountry, toCountryHub }) => {

  const [showMarkers, setShowMarkers] = useState(true)
  const { isLoggedIn } = useUser()
  const { markers } = UseMarkers()
  const { isFinderOpen, isMenuOpen } = UseUi()

  return (
    <main className={`${isMenuOpen || isFinderOpen || !isLoggedIn ? 'hidden' : ''}`}>

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