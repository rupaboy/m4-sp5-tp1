import { useWorld } from '../hook/UseWorld'
import { useEffect } from 'react'

const Menu = () => {

    const { continents, languages, selectedContinents, setSelectedContinents } = useWorld()


    return (
        <main>
            <div className='
            flex flex-wrap justify-center text-white gap-1 px-4'>
                {continents.map((continent, i) => (
                    <button
                        key={i}
                        onClick={() => setSelectedContinents(continent)}
                        className='px-1 text-center cursor-pointer border'
                    >
                        {continent}
                    </button>
                ))}
            </div>

        </main>
    )
}

export default Menu