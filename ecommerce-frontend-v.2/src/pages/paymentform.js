import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function PaymentForm({phoneNumber, setPhoneNumber}) {
  // Step 2: Create a state variable for the phone number
  

  // Step 3: Use the value prop to set the input field's value
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Input Mobile Number to Initiate Mobile Payment
      </Typography>
      <Grid item xs={12} md={6}>
        {/* Step 3: Use the value prop */}
        <TextField
          required
          id="Mobile Number"
          label="Mobile Number"
          helperText="Input as 254 xxx xxx xxx"
          fullWidth
          autoComplete="cc-csc"
          variant="standard"
          // Step 3: Set the value of the input field
          value={phoneNumber}
          // Step 4: Update the state variable when the input changes
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={<Checkbox color="secondary" name="saveCard" value="yes" />}
          label="Remember Mpesa Mobile Number details for next time"
        />
      </Grid>
    </React.Fragment>
  );
}
