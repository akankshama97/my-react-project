import { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <main className="app">
      <h1>React Environment Ready</h1>
      <p>Click the button to verify React is working.</p>
      <button onClick={() => setCount((value) => value + 1)}>
        Count: {count}
      </button>
    </main>
  );
}
