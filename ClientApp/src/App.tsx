import { Grid } from '@material-ui/core';
import React from 'react';
import Layout from './Components/Navigation/Layout';
import { useStyles } from './MuiStyles';
import { BrowserRouter } from 'react-router-dom';
import Login from './Components/Login';
import { useAppSelector } from './Store/StoreHooks';
import { IUser } from './Models/UserModels/User';
import { RootState } from './Store/ConfigureStore';

const App: React.FC = () => {
  const classes = useStyles();

  const user = useAppSelector<IUser>((state: RootState) => state.user);

  return (
    <div>
      {user && user.isAuthenticated ? (
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
