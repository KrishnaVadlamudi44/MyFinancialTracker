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
import React, { useCallback, useEffect, useState } from 'react';
import { GetUserItems, RemoveUserItem } from '../../Api/UserApi';
import { IUserItems } from '../../Models/UserModels/User';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import DeleteIcon from '@material-ui/icons/Delete';
import { CreateItem, GetLinkToken } from '../../Api/PlaidApi';
import { usePlaidLink } from 'react-plaid-link';

const Items: React.FC = () => {
  const [userItems, setuserItems] = useState<IUserItems[]>();
  const [token, setToken] = useState<string>('');

  const onSuccess = useCallback((token: string, metadata) => {
    CreateItem(token);
    LoadUserItems();
  }, []);

  const createTokenAndOpenPlaid = () => {
    open();
  };

  const LoadUserItems = async () => {
    let items = await GetUserItems();
    items && setuserItems(items);
  };

  const RemoveItem = async (institutionId: string) => {
    const resp = await RemoveUserItem(institutionId);
    resp && LoadUserItems();
  };

  const { open } = usePlaidLink({
    token: token,
    onSuccess: onSuccess,
    onExit: LoadUserItems,
  });

  useEffect(() => {
    if (token === '') {
      GetLinkToken().then((data) => {
        setToken(data);
      });
    }
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
                <ListItem key={item.institutionId}>
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
