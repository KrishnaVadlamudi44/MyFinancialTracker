import {
  Avatar,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { GetUserItems, RemoveUserItem } from '../../Api/UserApi';
import { IUserItems } from '../../Models/UserModels/User';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import DeleteIcon from '@material-ui/icons/Delete';
import { GetLinkToken } from '../../Api/PlaidApi';
import { useAppContextState } from '../../Context/AppContext';

const Items = () => {
  const [userItems, setuserItems] = useState<IUserItems[]>();
  const { appContextState, dispatch } = useAppContextState();

  const createTokenAndOpenPlaid = () => {
    GetLinkToken().then((token) => {
      dispatch({ type: 'setLinkToken', nextState: token });
    });
  };

  const LoadUserItems = async () => {
    let items = await GetUserItems();
    items && setuserItems(items);
  };

  const RemoveItem = async (institutionId: string) => {
    const resp = await RemoveUserItem(institutionId);
    resp && LoadUserItems();
  };

  useEffect(() => {
    LoadUserItems();
  }, []);
  return (
    <div>
      <button onClick={createTokenAndOpenPlaid}>addAccountOnClick</button>
      <Grid item xs={12} md={3}>
        <List>
          {userItems &&
            userItems.length > 0 &&
            userItems.map((item) => {
              return (
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <AccountBalanceIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={item.institutionName} />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge='end'
                      aria-label='delete'
                      onClick={() => RemoveItem(item.institutionId)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
        </List>
      </Grid>
    </div>
  );
};

export default Items;
