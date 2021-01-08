import { Grid } from '@material-ui/core';
import React from 'react';
import Layout from './Components/Navigation/Layout';
import { useStyles } from './MuiStyles';
import { BrowserRouter } from 'react-router-dom';

const App: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <BrowserRouter>
        <Grid container>
          <Grid item xs={12}>
            <Layout />
          </Grid>
        </Grid>
      </BrowserRouter>
    </div>
  );
};

export default App;
