import Marker from "./particle/molecule/Marker"
import Button from "./particle/molecule/Button"

const MarkersList = ({ clearMarkers, markers, setCurrentCountry, setIsFinderOpen, setIsMenuOpen }) => {
  return (
    <aside className="flex flex-col w-screen overflow-y-scroll justify-center items-center">
          <header className="flex w-full items-center justify-center mb-2 h-12 gap-2">
            <h4 className="text-center pt-2 text-xs">Markers</h4>

            <Button
              buttonText={<i className='bi-trash' />}
              title={`Remove all markers`}
              ratio={'w-20 flex items-center justify-center gap-1'}
              buttonName={'Clear'}
              action={() => {
                clearMarkers()
              }}
            />

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
                    setCurrentCountry(marker)
                    setIsMenuOpen(false)
                    setIsFinderOpen(false)
                  }}
                  id={marker.id}
                  flag={marker.flag}
                />
              ))}
            </ul>
          </div>
        </aside>
  )
}

export default MarkersList