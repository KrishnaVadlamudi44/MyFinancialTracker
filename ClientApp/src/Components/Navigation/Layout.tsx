import {
  AppBar,
  Button,
  Drawer,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import React, { useState } from 'react';
import { useStyles } from '../../MuiStyles';
import MainContent from '../MainContent';
import LeftMainMenu from './LeftMainMenu';

const Layout = () => {
  const classes = useStyles();
  const [drawerOpen, setdrawerOpen] = useState<boolean>(false);

  const toggleDrawerOpen = () => {
    setdrawerOpen(!drawerOpen);
  };

  return (
    <div className={classes.root}>
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar>
          <Hidden smUp>
            <IconButton
              edge='start'
              className={classes.menuButton}
              onClick={toggleDrawerOpen}
              color='inherit'
              aria-label='menu'
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          <Typography variant='h6' className={classes.title}>
            My Financial Tracker
          </Typography>
          <Button color='inherit'>Login</Button>
        </Toolbar>
      </AppBar>
      <Hidden smDown>
        <Drawer
          className={classes.drawer}
          variant='permanent'
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div>
            <Toolbar />
            <LeftMainMenu />
          </div>
        </Drawer>
      </Hidden>
      <Hidden smUp>
        <Drawer
          className={classes.drawer}
          variant='temporary'
          anchor='left'
          open={drawerOpen}
          onClose={toggleDrawerOpen}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div>
            <Toolbar />
            <LeftMainMenu onSelect={toggleDrawerOpen} />
          </div>
        </Drawer>
      </Hidden>
      <main className={classes.content}>
        <Toolbar />
        <MainContent />
      </main>
    </div>
  );
};

// const useStyles = makeStyles((theme: Theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     flexGrow: 1,
//   },
// }));

export default Layout;
