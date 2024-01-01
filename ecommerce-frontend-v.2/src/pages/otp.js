import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/auth';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup'; // Import the ButtonGroup component
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import CustomSnackbar from '../components/snackbar';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';  // Import the Box component
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

function Otp() {
  let { regemail, apiUrl } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: regemail, code: '' });
  const [errorCount, setErrorCount] = useState(0); // Initialize errorCount to 0
  const [count,setCount]=useState(true);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const {
    setMessage,
    messageToSnackbar,
    setSeverity,
    setRegemail,
    severity,
    severityForSnackbar,
    setShowSnackbar,
    message,
    showSnackbar,
    handleClose,
  } = useContext(AuthContext);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSecondForm = (emailset) => {
    setRegemail(emailset);
  };

  const resetPage = () => {
    setRegemail(null);
    setErrorCount(0); // Reset errorCount to 0
  };

  useEffect(() => {
    if (errorCount >= 3) {
      setCount(false);
    } else {
      setCount(true);
    }
    console.log("this is  the count",errorCount)
  }, [errorCount]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors({});
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    };
    fetch(`${apiUrl}/api/account/verify/`, requestOptions)
      .then((response) => {
        if (response.status === 400) {
          return response.json().then((data) => {
            const successMessage = Object.values(data).flat().join(', ');
            setMessage(successMessage);
            setSeverity('error');
            setShowSnackbar(true);
            setErrors(data);
            setErrorCount(errorCount + 1); // Update error count here
          });
        } else if (response.status === 200) {
          return response.json().then((data) => {
            const successMessage = Object.values(data).flat().join(', ');
            setMessage(successMessage);
            setSeverity('success');
            setShowSnackbar(true);

            alert('Your Account is active !!');
            localStorage.removeItem('regemail');
            navigate('/login', { replace: true });
          });
        } else {
          return response.json();
        }
      })
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ padding: 2, elevation: 60 }}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <img
          src="./images/Logo.png"
          alt="Logo"
          style={{ margin: '1rem', width: '200px', height: '80px' }}
        />
        {regemail ? (
          <>
            <Typography component="h1" variant="h5">
              Enter The OTP 
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="OTP CODE"
                type="text"
                name="code"
                value={formData.code}
                onChange={handleInputChange}
                error={errors.email ? true : false}
                helperText={errors.email ? errors.email : ''}
              />
              <ButtonGroup fullWidth> {/* Use ButtonGroup */}
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, mb: 2, color: 'white' }}
                >
                  Submit
                </Button>

                <Button
                onClick={resetPage}
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  color: 'white',
                  backgroundColor: 'red',
                  '&:hover': {
                    backgroundColor: 'red',
                  },
                }}
                disabled={count}
              >
                Reset Verification
              </Button>

              </ButtonGroup>
            </Box>
          </>
        ) : (
          <>
            <Typography component="h1" variant="h5">
              Enter Your Email 
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              <Button
                onClick={() => handleSecondForm(formData.email)}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, color: 'white' }}
              >
                Next
              </Button>
            </Box>
          </>
        )}
        <Grid container>
          <Grid item xs>
            <Link href="/forgotPassword" variant="body2" color="#4aaf51">
              Forgot Password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="/register" variant="body2" color="#4aaf51">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
        <CustomSnackbar
          showSnackbar={showSnackbar}
          handleClose={handleClose}
          message={message}
          severity={severity}
        />

      </Box>
    </Container>
  );
}

export default Otp;
