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
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

interface ILeftMainMenuProps {
  onSelect?: () => void | undefined;
}

const LeftMainMenu: React.FC<ILeftMainMenuProps> = ({ onSelect }) => {
  const classes = useStyles();
  const history = useHistory();
  const [selected, setSelected] = useState<string>();
  console.log(history.location);
  return (
    <div className={classes.drawerContainer}>
      <List>
        {['Dashboard', 'Accounts'].map((text, index) => (
          <ListItem
            button
            key={text}
            onClick={() => {
              history.push(text);
              //forcing to re-render component so that history is updated for below "selected" property to work
              setSelected(text);
            }}
            selected={history.location.pathname.includes(text)}
          >
            <ListItemIcon>
              {text === 'Dashboard' && <DashboardIcon />}
              {text === 'Accounts' && <AccountBalanceIcon />}
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
              history.push(text);
              //forcing to re-render component so that history is updated for below "selected" property to work
              setSelected(text);
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
