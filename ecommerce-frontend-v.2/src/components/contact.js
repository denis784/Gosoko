import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Button, Fab, TextField, Typography } from '@mui/material';
import { MailOutline } from '@mui/icons-material';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 999,
  },
  button: {
    borderRadius: '50%',
    minWidth: 0,
    width: theme.spacing(7),
    height: theme.spacing(7),
    color: '#fff',
    backgroundColor: '#e53e3e',
    boxShadow: theme.shadows[6],
    '&:hover': {
      backgroundColor: '#d53333',
    },
  },
  form: {
    position: 'fixed',
    bottom: theme.spacing(10),
    right: theme.spacing(2),
    zIndex: 999,
    backgroundColor: '#fff',
    padding: theme.spacing(2),
    boxShadow: theme.shadows[6],
    display: 'flex',
    flexDirection: 'column',
  },
  formTitle: {
    marginBottom: theme.spacing(2),
  },
  formField: {
    marginBottom: theme.spacing(2),
  },
}));

const ContactBubble = () => {
  const classes = useStyles();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleBubbleClick = () => {
    setIsFormOpen(!isFormOpen);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle form submission
  };

  return (
    <>
      <div className={classes.root}>
        <Fab className={classes.button} onClick={handleBubbleClick}>
          <MailOutline />
        </Fab>
      </div>
      {isFormOpen && (
        <form className={classes.form} onSubmit={handleSubmit}>
          <Typography variant="h6" className={classes.formTitle}>
            Send us a message
          </Typography>
          <TextField
            label="Name"
            variant="outlined"
            className={classes.formField}
            required
          />
          <TextField
            label="Email"
            variant="outlined"
            className={classes.formField}
            required
          />
          <TextField
            label="Message"
            variant="outlined"
            multiline
            rows={4}
            className={classes.formField}
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Send
          </Button>
        </form>
      )}
    </>
  );
};

export default ContactBubble;
