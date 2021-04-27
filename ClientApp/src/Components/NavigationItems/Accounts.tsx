import {
  createStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Theme,
  withStyles,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { GetAccounts, GetLinkToken } from '../../Api/PlaidApi';
import { useAppContextState } from '../../Context/AppContext';
import { useStyles } from '../../MuiStyles';
import LinkBankAccount from './LinkBankAccount';

const Accounts = () => {
  const { appContextState, dispatch } = useAppContextState();

  let classes = useStyles();

  const GetAccountsForUser = async () => {
    let accounts = await GetAccounts();
    if (accounts) {
      dispatch({ type: 'updateUserAccounts', nextState: accounts });
    }
  };

  useEffect(() => {
    GetAccountsForUser();
  }, []);

  return (
    <div>
      Accounts page
      <div>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label='customized table'>
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align='right'>Type</StyledTableCell>
                <StyledTableCell align='right'>Sub type</StyledTableCell>
                <StyledTableCell align='right'>Instritutuion</StyledTableCell>
                <StyledTableCell align='right'>Balance</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appContextState.userAccounts &&
                appContextState.userAccounts.map((account) => {
                  return (
                    <StyledTableRow key={account.id}>
                      <StyledTableCell component='th' scope='row'>
                        {account.name}
                      </StyledTableCell>
                      <StyledTableCell align='right'>
                        {account.type}
                      </StyledTableCell>
                      <StyledTableCell align='right'>
                        {account.subType}
                      </StyledTableCell>
                      <StyledTableCell align='right'>
                        {account.institutionId}
                      </StyledTableCell>
                      <StyledTableCell align='right'>
                        {account.balance.available}
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {appContextState.linkToken && (
        <LinkBankAccount token={appContextState.linkToken} />
      )}
    </div>
  );
};

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  })
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
)(TableRow);

export default Accounts;
