const API_KEY = import.meta.env.VITE_API_KEY;

export function getUsers() {
  return fetch(`https://${API_KEY}.mockapi.io/api/user`, {
    method: 'GET',
    headers: { 'content-type': 'application/json' },
  })
    .then(res => {
      if (!res.ok) throw new Error("Error fetching users");
      return res.json();
    })
    .catch(error => {
      console.error("Error obteniendo usuarios:", error);
      throw error;
    });
}
