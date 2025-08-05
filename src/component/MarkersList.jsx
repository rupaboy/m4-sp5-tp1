import Marker from "./particle/molecule/Marker"
import Button from "./particle/molecule/Button"
import { UseUi } from "../hook/UseUi"
import { UseMarkers } from "../hook/UseMarkers"

const MarkersList = ({ toCountryHub }) => {

  const { setIsFinderOpen, setIsMenuOpen, setIsDashBoardOpen } = UseUi()
  const { markers, clearMarkers } = UseMarkers()

  return (
    <aside className="flex flex-col w-screen overflow-y-scroll justify-center items-center">
      <header className="w-full flex flex-col items-center justify-center mb-2 h-12 gap-2">
        <h4 className="text-center pt-2 text-sm border-b dark:border-b-amber-500 border-b-amber-800 w-full">Markers</h4>

      </header>


      <div className="
            border dark:border-slate-700 border-slate-500
            w-[70vw] rounded-md flex flex-wrap justify-center my-auto gap-1
            max-h-[30vh] min-h-[30vh] overflow-hidden overflow-y-scroll">

        <ul className="flex flex-wrap h-min justify-center gap-1 mb-auto p-2 mx-auto">
          {markers.map((marker) => (
            <Marker
              key={marker.id}
              name={marker.name}
              action={() => {
                toCountryHub(marker)
                setIsMenuOpen(false)
                setIsFinderOpen(false)
                setIsDashBoardOpen(false)
              }}
              id={marker.id}
              flag={marker.flag}
            />
          ))}
        </ul>
      </div>

      {markers.length > 1 &&
        <Button
          buttonText={<i className='bi-trash' />}
          title={`Removes all markers other than user's location`}
          ratio={'px-2 flex whitespace-nowrap items-center justify-center gap-1'}
          buttonName={'Clear Markers'}
          action={() => {
            clearMarkers()
          }}
        />
      }
    </aside>
  )
}

export default MarkersList