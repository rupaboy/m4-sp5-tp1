const API_KEY = import.meta.env.VITE_API_KEY;

export function updateMarker(userId, markerId, updatedMarker) {
  return fetch(`https://${API_KEY}.mockapi.io/api/user/${userId}/markers/${markerId}`, {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(updatedMarker)
  })
  .then(res => {
    if (!res.ok) throw new Error("Error al actualizar marcador");
    return res.json();
  })
  .then(marker => {
    console.log("Marcador actualizado:", marker);
    return marker;
  })
  .catch(error => {
    console.error(error);
    throw error;
  });
}
