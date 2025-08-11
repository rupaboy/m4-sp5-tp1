const API_KEY = import.meta.env.VITE_API_KEY;

export function getUserById(userId) {
  return fetch(`https://${API_KEY}.mockapi.io/api/user/${userId}`, {
    method: 'GET',
    headers: { 'content-type': 'application/json' }
  })
  .then(res => {
    if (!res.ok) throw new Error("Error fetching user");
    return res.json();
  });
}
