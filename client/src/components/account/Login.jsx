import React from 'react'
import { Box, TextField, Button, styled, Typography } from '@mui/material'
import { useState, useContext } from 'react'
import { API } from '../../service/api'
import { DataContext } from '../../context/DataProvider'
import { useNavigate } from 'react-router-dom'
//object : camelCase and px is default not hyphen-based css
const Component = styled(Box)`
width:400px;
margin:auto;
box-shadow:5px 2px 5px 2px rgb(0 0 0/0.6);
background:linear-gradient(to left,grey,white)
`
const Image = styled('img')({
  width: 100,
  margin: 'auto',
  display: 'flex',
  padding: '50px 0 0'

})
const Wrapper = styled(Box)`
padding:25px 35px;
display:flex;
flex-direction:column;
&>div,&>button,&>p{
  margin-top:15px;
}
`
const LoginButton = styled(Button)`
text-transform:none;
background:#fb641b;
color:#fff;
height:48px;
border-radius:2px;

`
const SignupButton = styled(Button)`
text-transform:none;
background:#fff;
color:#2874f0;
height:48px;
border-radius:2px;

`
const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`
const signupInitialValues = {
  name: '',
  username: '',
  password: ''
}

const loginInitialValues = {

  username: '',
  password: ''
}

const Login = ({ isUserAuthenticated }) => {
  const imageURL = 'https://cdn.pixabay.com/photo/2012/05/07/18/57/blog-49006_960_720.png';
  const [account, toggleAccount] = useState('login');
  const [signup, setSignup] = useState(signupInitialValues);
  const [login, setLogin] = useState(loginInitialValues);
  const [error, showError] = useState('');
  const [e2, sE2] = useState(false);
  const { setAccount } = useContext(DataContext);
  const navigate = useNavigate()

  const toggleSignup = () => {
    sE2(false);
    account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
  }

  const onInputChange = (e) => {
    sE2(false)
    setSignup({ ...signup, [e.target.name]: e.target.value })
  }
  const onValueChange = (e) => {
    sE2(false)
    setLogin({ ...login, [e.target.name]: e.target.value })
  }
  const signupUser = async () => {
    if (signup.name.length < 3 || signup.username.length < 3 || signup.password.length < 3) {

      sE2(true)
    }
    else {
      let response = await API.userSignup(signup);
      if (response.isSuccess) {
        showError('');
        sE2(false)
        setSignup(signupInitialValues);
        toggleAccount('login');
      } else {
        showError('Something went wrong ! Try again later');
      }
    }
  }

  const loginUser = async () => {
    if (!login.username || !login.password) {
      sE2(true)
    } else {
      let response = await API.userLogin(login);
      console.log('ter',response)
      if (response.isSuccess) {
    
        showError('');
        sE2(false);


        sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
        sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
        setAccount({ name: response.data.name, username: response.data.username });
        isUserAuthenticated(true)
        navigate('/');
      } else {
        showError('Something went wrong ! Try again later');
      }
    }
  }

  return (
    <Component>
      <Box>
        <Image src={imageURL} alt="login" />
        {account === 'login' ?
          <Wrapper>
            <TextField variant='standard' value={login.username} name='username' onChange={(e) => { onValueChange(e) }} label='username' />
            <TextField type="password"  value={login.password} variant='standard' name='password' onChange={(e) => { onValueChange(e) }} label='password' />
            {e2 && <span style={{ color: 'red', fontSize: 10, fontWeight: 'bold' }}>All fields are required!</span>}
            {error && <Error>{error}</Error>}  
            <LoginButton variant='contained' onClick={() => loginUser()}>Login</LoginButton>
            <Typography style={{ textAlign: 'center' }}>OR</Typography>
            <SignupButton onClick={() => toggleSignup()}>Create an account</SignupButton>
          </Wrapper>
          :
          <Wrapper>
            <TextField variant='standard' name='name' onChange={(e) => { onInputChange(e) }} label='Name' />
            <TextField variant='standard' name='username' onChange={(e) => { onInputChange(e) }} label='Username' />
            <TextField variant='standard' name='password' onChange={(e) => { onInputChange(e) }} label='Password' />
            {error && <Error>{error}</Error>}   {e2 ? <span style={{ color: "red", fontWeight: 'bold', fontSize: 10 }}>Cant't be empty & all fields must have atleast 3 characters</span> : null}
            <SignupButton variant='contained' onClick={() => signupUser()}>Signup</SignupButton>
            <Typography style={{ textAlign: 'center' }}>OR</Typography>
            <LoginButton onClick={() => toggleSignup()}>Already have an account ?</LoginButton>
          </Wrapper>}
      </Box>
    </Component>
  )
}

export default Login