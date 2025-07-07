import React from 'react';
import { TarotProvider, useTarot } from './context/TarotContext';

function Controls() {
  const { startTirada } = useTarot();

  return (
    <div>
      <button onClick={() => startTirada(['Single Card'])}>1 Card</button>
      <button onClick={() => startTirada(['Past', 'Present', 'Future'])}>3 Cards</button>
      <button onClick={() => startTirada([
        '1. Present Situation', '2. Challenge', '3. Past',
        '4. Future', '5. Above', '6. Below',
        '7. Advice', '8. External Influences', '9. Hopes and Fears', '10. Outcome'
      ])}>10 Cards</button>
    </div>
  );
}

function ShufflePhase() {
  const { cortar } = useTarot();
  return (
    <div>
      <p>🔄 Mezclando el mazo...</p>
      <button onClick={cortar}>Cortar con la mano izquierda</button>
    </div>
  );
}

function Spread() {
  const { slots } = useTarot();

  return (
    <div>
      {slots.map((s, i) => (
        <div key={i}>
          <p>{s.label}</p>
          {s.card && (
            <div>
              <p>Name: {s.card.name}</p>
              <img src={s.card.image} alt={s.card.name} width="100" />
              <p>Meaning: {s.card.meaning_up}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function Main() {
  const { phase } = useTarot();

  if (phase === 'idle') return <Controls />;
  if (phase === 'shuffling') return <ShufflePhase />;
  if (phase === 'dealing') return <Spread />;
  return null;
}

export default function App() {
  return (
    <TarotProvider>
      <h1>Tarot App</h1>
      <Main />
    </TarotProvider>
  );
}
