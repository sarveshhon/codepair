import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css'; // Optional: Choose your theme
import 'prismjs/components/prism-java.min.js'; // Import language for Java (if Java code is expected)

const SearchPage = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Handle input change
  const handleInputChange = (e) => {
    setPrompt(e.target.value);
  };

  // Handle search request
  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await axios.post('/search', {
        prompt: prompt,
      });

      setResponse(result.data.response);
    } catch (error) {
      console.error("Error fetching data", error);
      setResponse("Sorry, something went wrong!");
    }

    setIsLoading(false);
  };

  // Format the code after it's fetched
  useEffect(() => {
    if (response) {
      Prism.highlightAll(); // Re-run Prism to highlight newly fetched code
    }
  }, [response]);

  return (
    <div style={styles.container}>
      <h1>Codepair Search</h1>
      <form onSubmit={handleSearch} style={styles.form}>
        <input
          type="text"
          value={prompt}
          onChange={handleInputChange}
          placeholder="Ask me anything..."
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Search
        </button>
      </form>

      {isLoading ? (
        <div style={styles.loadingText}>Analysing ...</div>
      ) : (
        response && (
          <div style={styles.responseContainer}>
            <h2>Response</h2>
            <div style={styles.responseText}>
              <p>{response}</p>
            </div>

            {/* Dynamically display code */}
            <div style={styles.codeContainer}>
              <h3>Code Example:</h3>
              <pre style={styles.codeBlock}>
                <code className="language-java">
                  {response} {/* Display the response code here */}
                </code>
              </pre>
            </div>
          </div>
        )
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f7fb',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '500px',
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '20px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    fontSize: '16px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  loadingText: {
    fontSize: '18px',
    color: '#007bff',
  },
  responseContainer: {
    width: '100%',
    maxWidth: '600px',
    marginTop: '20px',
    padding: '15px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e0e0e0',
  },
  responseText: {
    fontSize: '18px',
    color: '#333',
    lineHeight: '1.6',
  },
  codeContainer: {
    marginTop: '20px',
    padding: '15px',
    backgroundColor: '#f4f7fb',
    borderRadius: '8px',
    border: '1px solid #ddd',
  },
  codeBlock: {
    fontFamily: 'Courier New, monospace',
    backgroundColor: '#000000',
    padding: '15px',
    borderRadius: '5px',
    fontSize: '14px',
    color: '#333',
    overflowX: 'auto',
    whiteSpace: 'pre-wrap',
  },
};

export default SearchPage;
