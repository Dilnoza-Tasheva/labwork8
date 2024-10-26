import {
  Box, Button,
  Card,
  CardActions,
  CardContent,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { NavLink } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { IQuote, IQuoteApi } from '../../types';
import axiosApi from '../../axiosApi.ts';


const Home = () => {
  const [quotes, setQuotes] = useState<IQuote[]>([]);

  const fetchData = useCallback(async() => {
    const response: {data: IQuoteApi} = await axiosApi<IQuoteApi>('quotes.json');

    if (response.data) {
      const quotesFromApi = Object.keys(response.data).map(quoteKey => {
        return {
          ...response.data[quoteKey],
          id: quoteKey,
        };
      });
      setQuotes(quotesFromApi);
    }
  }, []);

  useEffect(() => {
    void fetchData();
  },[fetchData]);


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
        {quotes.length === 0 ? <p>No quotes found</p> :
          <Grid>
            {quotes.map((quote) => (
              <Grid key={quote.id} sx={{mb: 4}}>
                <Card sx={{ minWidth: 275 }}>
                  <CardContent>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: 14 }}>
                      {quote.text}
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: 16 }}>
                      - {quote.author}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" component={NavLink} to="/">Edit</Button>
                    <Button>Delete</Button>
                  </CardActions>
                </Card>
              </Grid>
              ))}
          </Grid>
        }
      </Grid>

    </>
  );
};

export default Home;