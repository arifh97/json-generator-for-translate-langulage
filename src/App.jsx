import React, { useState } from 'react';
import './App.css';

function App() {
  const [jsonData, setJsonData] = useState({});
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [jsonOutput, setJsonOutput] = useState('');

  const handleAddKeyValue = () => {
    if (key && value) {
      const keys = key.split('\n');
      const values = value.split('\n');

      // Create a new JSON object by adding each key-value pair
      const newJsonObject = {};

      keys.forEach((k, index) => {
        newJsonObject[k] = values[index] || values[values.length - 1]; // Use the last value if there are more keys than values
      });

      // Update the main JSON object
      setJsonData((prev) => ({ ...prev, ...newJsonObject }));
      setKey('');
      setValue('');
    }
  };

  const handleGenerateJson = () => {
    setJsonOutput(JSON.stringify(jsonData, null, 2));
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(jsonOutput).then(() => {
      alert('JSON copied to clipboard!');
      setJsonOutput('')
    }).catch((err) => {
      console.error('Failed to copy: ', err);
    });
  };

  return (
    <div className="App">
      <h1>Custom JSON Generator</h1>

      <div className='App-main'>
        <textarea
          type="text"
          placeholder="Menu Name (e.g., About)"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
        <textarea
          type="text"
          placeholder="Link (e.g., https://yourwebsite.com/about)"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button onClick={handleAddKeyValue}>Add</button>
      </div>

      <button onClick={handleGenerateJson}>Generate JSON</button>

      <h2>Generated JSON:</h2>
      <button onClick={handleCopyToClipboard}>Copy to Clipboard</button>
      <pre>{jsonOutput}</pre>
    </div>
  );
}

export default App;