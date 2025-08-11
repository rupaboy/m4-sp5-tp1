const API_KEY = import.meta.env.VITE_API_KEY;

export function createUser(newUser) {
  return fetch(`https://${API_KEY}.mockapi.io/api/user`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(newUser)
  })
    .then(res => {
      if (!res.ok) {
        throw new Error("Error al crear usuario");
      }
      return res.json(); // siempre devolvemos el body si ok
    })
    .then(user => {
      return user; // usuario creado
    });
}
