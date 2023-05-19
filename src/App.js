import React from 'react';
import { Resource, Admin } from 'react-admin';
import { createTheme } from '@material-ui/core/styles';
import LoginPage from './LoginPage';
import MessageList from './components/MessageList';
import MessageCreate from './components/MessageCreate';
import MessageEdit from './components/MessageEdit';
import dataProvider from './dataProvider'; // Import the custom data provider
import authProvider from './authProvider'; // Import the custom authentication provider

const theme = createTheme({
  // Customize your theme if needed
});

const App = () => (
  <Admin dataProvider={dataProvider} theme={theme} loginPage={LoginPage} authProvider={authProvider}>
    <Resource name="messages" list={MessageList} create={MessageCreate} edit={MessageEdit} />
  </Admin>
);

export default App;
