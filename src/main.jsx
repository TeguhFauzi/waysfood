import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext.jsx';
import { UserContextProvider } from './context/UserContext.jsx';
import { DropdownContextProvider } from './context/DropdownContext.jsx';
import { QueryClient, QueryClientProvider } from 'react-query';

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <UserContextProvider>
        <AuthContextProvider>
          <DropdownContextProvider>
            <Router>
              <App />
            </Router>
          </DropdownContextProvider>
        </AuthContextProvider>
      </UserContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
