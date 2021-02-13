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
import { GetUserItems, RemoveUserItem } from '../Api/UserApi';
import { IUserItems } from '../Models/UserModels/User';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import DeleteIcon from '@material-ui/icons/Delete';

const Items = () => {
  const [userItems, setuserItems] = useState<IUserItems[]>();

  const LoadUserItems = async () => {
    let items = await GetUserItems();
    setuserItems(items);
  };

  const RemoveItem = async (institutionId: string) => {
    const resp = await RemoveUserItem(institutionId);
    if (resp) {
      LoadUserItems();
    }
  };

  useEffect(() => {
    LoadUserItems();
  }, []);
  return (
    <div>
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
                      onClick={() => RemoveItem(item.institutionId)}
                    >
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
