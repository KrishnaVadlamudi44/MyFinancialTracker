import { makeStyles, Theme, CircularProgress } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { green } from '@material-ui/core/colors';
import React, { ElementType } from 'react';

interface IButtonInput {
  onClick(
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement | MouseEvent>
  ): void;
  label: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  fullWidth?: boolean;
  variant?: 'text' | 'outlined' | 'contained' | undefined;
  color?: 'inherit' | 'primary' | 'secondary' | 'default' | undefined;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
}

const ButtonInput = ({
  type,
  label,
  fullWidth,
  variant,
  color,
  className,
  onClick,
  loading,
  disabled,
}: IButtonInput) => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <Button
        type={type ? type : 'button'}
        fullWidth={fullWidth}
        variant={variant}
        color={color}
        className={className}
        onClick={onClick}
        disabled={disabled || loading}
      >
        {label}
      </Button>
      {loading && (
        <CircularProgress size={20} className={classes.buttonProgress} />
      )}
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
    width: '100%',
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -6,
    marginLeft: -12,
  },
}));

export default ButtonInput;
