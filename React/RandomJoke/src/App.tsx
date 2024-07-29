// Today's Random Joke
// 2024.07.29

import React, { useState, useEffect } from 'react';

const App: React.FC = () => {
  const [joke, setJoke] = useState<string>('');

  const fetchJoke = async () => {
    try {
      const response = await fetch('https://official-joke-api.appspot.com/random_joke');
      const data = await response.json();
      const formattedJoke = `${data.setup}\n - ${data.punchline}`;
      setJoke(formattedJoke);
    } catch (error) {
      setJoke('Oops! Something went wrong. Please try again.');
    }
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <div className="app">
      <div className="title">Today's Random Joke</div>
      <div className="container">
        <div className="joke">{joke}</div>
        <button onClick={fetchJoke}>Random Joke</button>
      </div>
      <div className="footer">2024.07.29 / kimpro82</div>
    </div>
  );
};

export default App;
