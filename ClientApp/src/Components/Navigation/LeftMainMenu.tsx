import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useStyles } from '../../MuiStyles';
import { useHistory } from 'react-router-dom';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import ListAltIcon from '@material-ui/icons/ListAlt';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useAppContextState } from '../../Context/AppContext';

interface ILeftMainMenuProps {
  onSelect?: () => void | undefined;
}

const LeftMainMenu: React.FC<ILeftMainMenuProps> = ({ onSelect }) => {
  const classes = useStyles();
  const history = useHistory();
  const [selected, setSelected] = useState<string>();
  const { appContextState, dispatch } = useAppContextState();

  const handleClick = (item: string) => {
    switch (item) {
      case 'Dashboard':
        history.push('Dashboard');
        //forcing to re-render component so that history is updated for below "selected" property to work
        setSelected(item);
        break;
      case 'Accounts':
        history.push('Accounts');
        setSelected(item);
        break;
      case 'Items':
        history.push('Items');
        setSelected(item);
        break;
      case 'Profile':
        history.push('Profile');
        setSelected(item);
        break;
      case 'Logout':
        localStorage.removeItem('token');
        localStorage.removeItem('sessionId');

        dispatch({
          type: 'updateAppState',
          nextState: { ...appContextState, authenticated: false },
        });
        break;

      default:
        break;
    }
  };

  return (
    <div className={classes.drawerContainer}>
      <List>
        {['Dashboard', 'Accounts', 'Items'].map((text, index) => (
          <ListItem
            button
            key={text}
            onClick={() => {
              handleClick(text);
            }}
            selected={history.location.pathname.includes(text)}
          >
            <ListItemIcon>
              {text === 'Dashboard' && <DashboardIcon />}
              {text === 'Accounts' && <AccountBalanceIcon />}
              {text === 'Items' && <ListAltIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Profile', 'Logout'].map((text, index) => (
          <ListItem
            button
            key={text}
            onClick={() => {
              handleClick(text);
            }}
            selected={history.location.pathname.includes(text)}
          >
            <ListItemIcon>
              {text === 'Profile' && <AccountCircleIcon />}
              {text === 'Logout' && <ExitToAppIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default LeftMainMenu;
