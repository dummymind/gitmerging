import React, { useState } from 'react';
import RequesterApp from './AppRequester';
import AdminApp from './AppAdmin';
//import './App.css';
import Vip from './components/MarsFamilyHome.jsx/MarsFamilyHome';

function App() {
  const [isAdmin, setIsAdmin] = useState(false); // This can be based on some logic to determine if the user is admin

  return (
    <div>
      <RequesterApp/>
    </div>
  );
}

export default App;
