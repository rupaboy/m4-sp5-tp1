const getCapitalImage = async (capitalName) => {
  const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(capitalName)}`);

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  }

  const data = await res.json();

  // Si thumbnail es undefined, no intentes mapear nada aquí, solo devuelve null
  return data.thumbnail?.source || null;
};

export default getCapitalImage