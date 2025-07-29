import MenuFinder from "./molecule/MenuFinder"
import Marker from "./molecule/Marker"
import { UseMarkers } from "../../hook/UseMarkers"
import Button from "./molecule/Button"

const Menu = ({ setIsFinderOpen, setIsMenuOpen, setCurrentCountry }) => {

  const { markers, clearMarkers } = UseMarkers()

  return (
    <main className="w-full absolute">

      {markers.length !== 0 &&

        <aside>
          <header className="flex w-full items-center justify-center mb-2 h-12 gap-2">
            <h4 className="text-slate-400 text-center pt-2 text-xs">Markers</h4>
            
            <Button
              buttonText={<i className='bi-trash text-slate-400' />}
              title={`Remove all markers`}
              ratio={'w-20 flex items-center justify-center gap-1'}
              buttonName={'Clear All'}
              action={() => {
                clearMarkers()
              }}
            />

          </header>

          <div className="flex flex-wrap items-center justify-center gap-1 mb-10 max-h-[30vh] overflow-hidden overflow-y-scroll mx-5">

            {markers.map((marker) => (
              <Marker
                key={marker.id}
                name={marker.name}
                action={() => {
                  setCurrentCountry(marker)
                  setIsMenuOpen(prev => !prev)
                }}
                id={marker.id}
                flag={marker.flag}
              />
            ))}
          </div>
        </aside>
      }


      <h4 className="text-slate-400 text-center text-xs mb-4">Find countries by...</h4>
      <MenuFinder
        setIsFinderOpen={setIsFinderOpen}
        setIsMenuOpen={setIsMenuOpen}
        setCurrentCountry={setCurrentCountry}
      />
    </main>
  )
}

export default Menu