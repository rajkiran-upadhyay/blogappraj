import { AppBar, Toolbar, styled } from '@mui/material';
import { Link } from 'react-router-dom';
const Component = styled(AppBar)`
    background:linear-gradient(to right,white,blue,yellow);
    color: black;
`;
const Container = styled(Toolbar)`
    justify-content: center;
    & > a {
        padding: 5px;
        color: #000;
        text-decoration: none;
        margin:3px;
        background: linear-gradient(to left,grey,white,brown);
        border-radius:7px;
        height:18px;
    }
    &>a:hover{
        font-weight:bolder;
    }
`
const Header = () => {
    return (
        <Component>
            <Container>
                <Link to='/'>HOME</Link>
              
                <Link to='/login'>LOGOUT</Link>
            </Container>
        </Component>
    )
}

export default Header;