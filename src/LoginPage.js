import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, TextField, Button } from '@material-ui/core';
import { useLogin, useNotify } from 'react-admin';

const useStyles = makeStyles((theme) => ({
  card: {
    width: '40%',
    margin: '0 auto',
    marginTop: theme.spacing(10),
    backgroundColor: '#f7f7f7',
    borderRadius: '10px',
  },
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing(2),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  input: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const LoginPage = () => {
  const classes = useStyles();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const login = useLogin();
  const notify = useNotify();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ username, password }).catch(() => notify('Invalid login credentials'));
  };

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" component="h2" className={classes.title}>
          CrudMessageApp Login
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            type="text"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            variant="outlined"
            className={classes.input}
          />
          <TextField
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            className={classes.input}
          />
          <Button type="submit" color="primary" variant="contained" className={classes.button}>
            Sign in
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginPage;
