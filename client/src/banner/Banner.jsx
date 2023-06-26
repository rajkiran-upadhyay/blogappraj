import { styled, Box, Typography } from '@mui/material';

const Image = styled(Box)`
    width: 100%;
    background: url(https://drivebywebsites.co.uk/wp-content/uploads/2017/06/blog.jpg) center/100% repeat-x #000;
    height: 50vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Heading = styled(Typography)`
    font-size: 70px;
    color: blue;
    line-height: 1
`;



const Banner = () => {
    
    return (
        <Image>
            <Heading>Write your BLOG!</Heading>
          
        </Image>
    )
}

export default Banner;