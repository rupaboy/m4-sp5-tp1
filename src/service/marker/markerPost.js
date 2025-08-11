const API_KEY = import.meta.env.VITE_API_KEY;

export function createMarker(userId, newMarker) {
  return fetch(`https://${API_KEY}.mockapi.io/api/user/${userId}/markers`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(newMarker)
  })
  .then(res => {
    if (!res.ok) throw new Error("Error al crear marcador");
    return res.json();
  })
  .then(marker => {
    console.log("Marcador creado:", marker);
    return marker;
  })
  .catch(error => {
    console.error(error);
    throw error;
  });
}
