import React, { useState } from 'react';

const LongestUncommonSubsequence = () => {
  const [stringA, setStringA] = useState('');
  const [stringB, setStringB] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const lusLength = findLUSlength(stringA, stringB);
    setResult(lusLength);
  };

  return (
    <div>
      <h1>Longest Uncommon Subsequence Finder</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>String A: </label>
          <input 
            type="text" 
            value={stringA} 
            onChange={(e) => setStringA(e.target.value)} 
          />
        </div>
        <div>
          <label>String B: </label>
          <input 
            type="text" 
            value={stringB} 
            onChange={(e) => setStringB(e.target.value)} 
          />
        </div>
        <button type="submit">Find LUS Length</button>
      </form>
      {result !== null && (
        <div>
          <h3>Result: {result}</h3>
        </div>
      )}
    </div>
  );
};

/**
 * @param {string} a
 * @param {string} b
 * @return {number}
 */
var findLUSlength = function(a, b) {
    // If the strings are the same, there is no uncommon subsequence
    if (a === b) {
        return -1;
    }
    
    // If the strings are different, the longest uncommon subsequence is the longer string
    return Math.max(a.length, b.length);
};

export default LongestUncommonSubsequence;
