import React, { useState } from 'react';
import './App.css';

function App() {
  const [code, setCode] = useState('');
  const [downloadLink, setDownloadLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      const response = await fetch('/generate_exe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      const downloadURL = await response.text();
      setDownloadLink(downloadURL);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Python to .exe Converter</h1>
        <textarea
          rows="10"
          cols="50"
          value={code}
          onChange={handleCodeChange}
          placeholder="Enter your Python code here..."
        ></textarea>
        <button onClick={handleSubmit} disabled={isLoading}>
          Convert to .exe
        </button>
        {isLoading && <p>Generating .exe, please wait...</p>}
        {downloadLink && (
          <a href={downloadLink} download="output.exe">
            Download .exe
          </a>
        )}
      </header>
    </div>
  );
}

export default App;
