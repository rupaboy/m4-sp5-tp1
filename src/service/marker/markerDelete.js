import { getMarkers } from "./markersGet";

const API_KEY = import.meta.env.VITE_API_KEY;

export function deleteMarker(userId, markerId) {
  return fetch(`https://${API_KEY}.mockapi.io/api/user/${userId}/marker/${markerId}`, {
    method: 'DELETE',
    headers: { 'content-type': 'application/json' }
  })
  .then(res => {
    if (!res.ok) throw new Error("Error al eliminar marcador");
    return res.json();
  })
  .then(response => {
    console.log("Marcador eliminado:", response);
    return response;
  })
  .catch(error => {
    console.error(error);
    throw error;
  });
}

export async function deleteAllMarkers(userId) {
  try {
    const markers = await getMarkers(userId);
    const promises = markers.map(marker => deleteMarker(userId, marker.id));
    
    await Promise.all(promises);
    console.log('All markers removed')
    
  } catch (error) {
    console.log('Error deleting all markers', error);
    throw error;
  }
}

