import React, { useEffect, useState } from 'react';
import './App.css';
import { FaWifi } from 'react-icons/fa';
import {  connect, getAllItems } from './Api';

function App() {
  const [networks, setNetworks] = useState([]);
  const [selectedNetwork, setSelectedNetwork] = useState(null);
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    handleScan();
    // setInterval(() => {
    //   handleScan();
    // }, 5000);
  }, [])
  
  const handleConnect = async (network) => {
    setLoading(true);
    try {
      const data = await connect(network.ssid, 'meowmeownigga');
      if (data.success && data.success === true) {
        setSelectedNetwork(network);
      } else {
        setSelectedNetwork(false);
      }
      setLoading(false);

    } catch (error) {
      console.error('Failed to connect.', error);
    }

  };

  const handleScan = async () => {
    setLoading(true);
    try {
      const data = await getAllItems();
      setNetworks(data.data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to check status.');
    }
  };


  return (
    <div className="App">
      <header className="header">
        <h2>WiFi Networks {networks.length > 0 ? <span>({networks.length})</span> : null}</h2>
      </header>
      <main className="content">
        <ul className="network-list">
          {networks.map((network) => (
            <li
              key={network.bssid}
              className="network-item"
              onClick={() => handleConnect(network)}
            > 
              <FaWifi className="wifi-icon" />
              <div>{network.ssid} ({network.quality})<p style={{marginBottom:0}}>{network.bssid} {network.security[0]}</p></div>
              {network.security.length > 0 && <span className="secure">🔒</span>}
            </li>
          ))}
        </ul>
        {selectedNetwork && (
          <div className="connection-info">
            <p>Connected to: <strong>{selectedNetwork.ssid}</strong></p>
          </div>
        )}
          {loading ? <div className='loader'></div> : null}

      </main>
    </div>
  );
}

export default App;
