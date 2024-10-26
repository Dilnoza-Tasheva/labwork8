import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';


const NavBar = () => {
  return (
    <Box sx={{ flexGrow: 1, mb: 5 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography color="inherit" variant="h6" to="/" component={NavLink} sx={{ flexGrow: 1, textDecoration: "none" }}>
            Quotes Central
          </Typography>
          <Button color="inherit" component={NavLink} to="/">Quotes</Button>
          <Button color="inherit" component={NavLink} to="/quotes/new-quote">Write new quote</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;