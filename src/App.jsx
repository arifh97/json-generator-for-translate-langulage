import React, { useState } from 'react';

function App() {
  const [jsonData, setJsonData] = useState(null);
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [jsonOutput, setJsonOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const handleAddKeyValue = () => {
    if (key.trim() && value.trim()) {
      const keys = key.split('\n').map(k => k.trim()).filter(k => k);
      const values = value.split('\n').map(v => v.trim()).filter(v => v);

      const newJsonObject = {};
      keys.forEach((k, index) => {
        newJsonObject[k] = values[index] || values[values.length - 1];
      });

      setJsonData(prev => ({ ...prev, ...newJsonObject }));
    }
  };

  const handleGenerateJson = () => {
    setJsonOutput(JSON.stringify(jsonData, null, 2));
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(jsonOutput).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };
  const [fileName, setFileName] = useState('translate')
  const handleDownloadJson = () => {
    const blob = new Blob([jsonOutput], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${fileName || 'data'}.json`;
    link.click();
  };

  return (
    <div className="container mx-auto max-w-[1140px] py-6 md:py-8">
      <h1 className='text-center font-semibold text-3xl md:text-4xl mb-6 lg:mb-8'>Custom JSON Generator</h1>
      <div className='flex items-center gap-3 mb-3'>
        <textarea
          className='w-full resize-none h-[200px] border border-solid border-gray-200 !outline-none rounded-lg p-4'
          placeholder="Variables (e.g: About)"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
        <textarea
          className='w-full resize-none h-[200px] border border-solid border-gray-200 !outline-none rounded-lg p-4'
          placeholder="Values (e.g: About)"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-3 mb-2">
        <button className='w-full h-[52px] rounded-lg bg-[#f9f9f9] hover:bg-black/10 cursor-pointer transition-all duration-300 text-sm font-medium' onClick={() => { setJsonData(null); setValue('');}}>Clear</button>
        <button className='w-full h-[52px] rounded-lg bg-[#f9f9f9] hover:bg-black/10 cursor-pointer transition-all duration-300 text-sm font-medium' onClick={handleAddKeyValue}>Add</button>
      </div>
      <div className="mb-3">
        {jsonData &&
          <button className='w-full h-[52px] rounded-lg bg-[#f9f9f9] hover:bg-black/10 cursor-pointer transition-all duration-300 text-base font-semibold' onClick={handleGenerateJson}>Generate JSON</button>
        }
      </div>

      <div className="mb-4">
        <h2 className='font-medium text-xl text-left mb-2'>Added Entries:</h2>
        {jsonData &&
          <ul className='bg-[#f0f0f0] p-5 rounded-lg max-h-[130px] overflow-auto'>
            {Object.entries(jsonData).map(([k, v], i) => (
              <li key={k}><strong className='font-semibold text-black'>({i + 1}). {k}:</strong> {v}</li>
            ))}
          </ul>
        }
      </div>

      {jsonOutput &&
        <div className="">
          <div className="flex items-center justify-between gap-3">
            <h2 className='font-medium text-xl text-left mb-2'>Generated JSON:</h2>
            <div className="flex items-center gap-3">
              <input onChange={(e)=> setFileName(e.target.value)} type="text" className='w-[100px] text-[#5d5d5d] bg-[#F0F0F0] px-2 py-1 rounded text-xs outline-none' placeholder='SetJsonName' />
              <button className='cursor-pointer transition-all duration-500 hover:text-purple-500 flex items-center justify-center text-[#5d5d5d] uppercase gap-1' onClick={handleCopyToClipboard}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-[16px]"><path fillRule="evenodd" clipRule="evenodd" d="M7 5C7 3.34315 8.34315 2 10 2H19C20.6569 2 22 3.34315 22 5V14C22 15.6569 20.6569 17 19 17H17V19C17 20.6569 15.6569 22 14 22H5C3.34315 22 2 20.6569 2 19V10C2 8.34315 3.34315 7 5 7H7V5ZM9 7H14C15.6569 7 17 8.34315 17 10V15H19C19.5523 15 20 14.5523 20 14V5C20 4.44772 19.5523 4 19 4H10C9.44772 4 9 4.44772 9 5V7ZM5 9C4.44772 9 4 9.44772 4 10V19C4 19.5523 4.44772 20 5 20H14C14.5523 20 15 19.5523 15 19V10C15 9.44772 14.5523 9 14 9H5Z" fill="currentColor"></path></svg>
                {copied ? 'Copied' : 'Copy'}
              </button>
              <button className='cursor-pointer transition-all duration-500 hover:text-purple-500 flex items-center justify-center text-[#5d5d5d] uppercase gap-1' onClick={handleDownloadJson}>
                <svg className='size-[20px]' stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M18 15v3H6v-3H4v3c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-3h-2zm-1-4-1.41-1.41L13 12.17V4h-2v8.17L8.41 9.59 7 11l5 5 5-5z"></path></svg>
                Download
              </button>
            </div>
          </div>
          <pre className="bg-[#f0f0f0] p-5 rounded-lg text-left w-full max-h-[250px] overflow-auto">
            {jsonOutput}
          </pre>
        </div>
      }
    </div>
  );
}

export default App;