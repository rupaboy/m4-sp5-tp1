const API_KEY = import.meta.env.VITE_API_KEY;

export function updateUser(userId, updatedUser) {
  return fetch(`https://${API_KEY}.mockapi.io/api/user/${userId}`, {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(updatedUser)
  })
  .then(res => {
    if (!res.ok) throw new Error("Error al actualizar usuario");
    return res.json();
  });
}
