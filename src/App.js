import React, { useState } from 'react';
import RequesterApp from './AppRequester';
import AdminApp from './AppAdmin';
import AppReport from './AppReport';
import AppVip from './AppVip';
import AppVip2 from './AppVip2';
import UserManagement from './components/UserManagement.jsx/UserManagement'
//import Vip from './components/MarsFamilyHome.jsx/MarsFamilyHome';
//import Vip2 from './components/MarsFamilyComplete.jsx/MarsFamilyComplete';
import './App.css';




function App() {
  const [isAdmin, setIsAdmin] = useState(false); // This can be based on some logic to determine if the user is admin

  return (
    <div>
      <RequesterApp/>
    </div>
  );
}

export default App;