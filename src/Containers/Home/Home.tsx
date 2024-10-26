import { Box, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { NavLink } from 'react-router-dom';


const Home = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          <nav aria-label="main mailbox folders">
            <List>
              <ListItem disablePadding>
                <ListItemButton component={NavLink} to="/">
                  <ListItemText primary="All" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component={NavLink} to="/">
                  <ListItemText primary="Star Wars" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component={NavLink} to="/">
                  <ListItemText primary="Famous people" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component={NavLink} to="/">
                  <ListItemText primary="Saying" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component={NavLink} to="/">
                  <ListItemText primary="Humor" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component={NavLink} to="/">
                  <ListItemText primary="Motivational" />
                </ListItemButton>
              </ListItem>
            </List>
          </nav>
        </Box>
        Home
      </Grid>

    </>
  );
};

export default Home;