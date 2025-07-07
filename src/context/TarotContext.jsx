import React, { createContext, useContext, useState } from 'react';

const TarotContext = createContext();

export function useTarot() {
  return useContext(TarotContext);
}

export function TarotProvider({ children }) {
  const [phase, setPhase] = useState('idle'); // idle, shuffling, dealing
  const [slots, setSlots] = useState([]);
  const [pendingSlots, setPendingSlots] = useState([]);

async function fetchCard() {
  const res = await fetch('https://tarotapi.dev/api/v1/cards/random?n=1');
  const data = await res.json();
  const card = data.cards[0];
  console.log(card)
  return {
    name: card.name,
    meaning_up: card.meaning_up,
    meaning_rev: card.meaning_rev,
    desc: card.desc,
    // Opcional: agrega un placeholder de imagen
    image: `https://dummyimage.com/200x300/cccccc/000000&text=${encodeURIComponent(card.name)}`
  };
}


  function startTirada(slotNames) {
    setPhase('shuffling');
    setPendingSlots(slotNames);
    setSlots([]); // limpia
  }

  async function cortar() {
    const cards = await Promise.all(pendingSlots.map(fetchCard));
    setSlots(pendingSlots.map((name, i) => ({ label: name, card: cards[i] })));
    setPhase('dealing');
  }

  return (
    <TarotContext.Provider value={{
      phase, slots, startTirada, cortar
    }}>
      {children}
    </TarotContext.Provider>
  );
}
