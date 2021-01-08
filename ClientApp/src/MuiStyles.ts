import { createMuiTheme, makeStyles, Theme } from '@material-ui/core';

export const muiTheme: Theme = createMuiTheme({
  palette: {
    primary: {
      main: '#739E5A',
    },
    secondary: {
      main: '#C1C44D',
    },
    success: {
      main: '#42f58a',
    },
    error: {
      main: '#f44336',
    },
  },
});

const drawerWidth = 240;

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));
