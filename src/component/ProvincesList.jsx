import { useEffect, useState } from 'react';
import axios from 'axios';

const ProvincesList = () => {
    const [provinces, setProvinces] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const response = await axios.get(
                    " https://apis.datos.gob.ar/georef/api/provincias"
                );
                
                setProvinces(response.data.provincias)

            } catch (error) {
                console.log('Error buscando provincias:', error)
            } finally {
                setLoading(false);
            }
        };

    fetchProvinces();

    }, [])

    loading ? (<p className='text-center'>Cargando provincias...</p>) : null

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-2">Provincias de Argentina</h1>
            <ul className="grid grid-cols3 gap-2">
                {provinces.map((province) => (
                    <li
                    key={province.id}
                    className='p-2 bg-blue-200 rounded hover:bg-blue-300'
                    >
                        {province.nombre}
                    </li>
                ))}
            </ul>

        </div>
    );

};

export default ProvincesList;