import { Grid } from '@material-ui/core';
import React from 'react';
import Layout from './Components/Navigation/Layout';
import { useStyles } from './MuiStyles';
import { BrowserRouter } from 'react-router-dom';
import Login from './Components/Login';
import { useAppContextState } from './Context/AppContext';

const App: React.FC = () => {
  const classes = useStyles();
  const { appContextState, dispatch } = useAppContextState();
  return (
    <div>
      {appContextState.authenticated ? (
        <div className={classes.root}>
          <BrowserRouter>
            <Grid container>
              <Grid item xs={12}>
                <Layout />
              </Grid>
            </Grid>
          </BrowserRouter>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default App;
