const API_KEY = import.meta.env.VITE_API_KEY;

export function getMarkers(userId) {
  return fetch(`https://${API_KEY}.mockapi.io/api/user/${userId}/marker`)
    .then(res => {
      if (!res.ok) throw new Error("Error al obtener marcadores");
      return res.json();
    })
    .catch(error => {
      console.error(error);
      throw error;
    });
}
