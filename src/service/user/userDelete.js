const API_KEY = import.meta.env.VITE_API_KEY;

export function userDelete(userId) {
  return fetch(`https://${API_KEY}.mockapi.io/api/user/${userId}`, {
    method: 'DELETE',
    headers: { 'content-type': 'application/json' },
  })
    .then(res => {
      if (!res.ok) throw new Error("Error al eliminar usuario");
      return res.json();
    });
}
