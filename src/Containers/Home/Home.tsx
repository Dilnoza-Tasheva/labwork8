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
import { NavLink, useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { IQuote, IQuoteApi } from '../../types';
import axiosApi from '../../axiosApi.ts';
import Loader from '../../Components/UI/Loader/Loader.tsx';


const Home = () => {
  const {category} = useParams<{category: string}>();
  const [quotes, setQuotes] = useState<IQuote[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = useCallback(async(selectedCategory?: string) => {
    try {
      setLoading(true);
      let resultFromApi = 'quotes.json';
      if (selectedCategory) {
        resultFromApi += `?orderBy="category"&equalTo="${selectedCategory}"`;
      }
      const response: {data: IQuoteApi} = await axiosApi<IQuoteApi>(resultFromApi);
      if (response.data) {
        const quotesFromApi = Object.keys(response.data).map(quoteKey => {
          return {
            ...response.data[quoteKey],
            id: quoteKey,
          };
        });
        setQuotes(quotesFromApi);
      }
    } catch (error) {
      console.error (error);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteQuote = async (idQuote: string) => {
    try {
      setLoading(true);
      await axiosApi.delete(`quotes/${idQuote}.json`);
      setQuotes(prevQuotes => prevQuotes.filter(quote => quote.id !== idQuote));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchData(category);
  },[fetchData, category]);


  return (
    <>
      {loading ? <Loader/> :
      <>
        <Grid container spacing={2}>
          <Grid>
            <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
              <nav aria-label="main mailbox folders">
                <List>
                  <ListItem disablePadding>
                    <ListItemButton component={NavLink} to="/quotes">
                      <ListItemText primary="All" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton component={NavLink} to="/quotes/category/star-wars">
                      <ListItemText primary="Star Wars" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton component={NavLink} to="/quotes/category/famous-people">
                      <ListItemText primary="Famous people" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton component={NavLink} to="/quotes/category/saying">
                      <ListItemText primary="Saying" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton component={NavLink} to="/quotes/category/humor">
                      <ListItemText primary="Humor" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton component={NavLink} to="/quotes/category/motivational">
                      <ListItemText primary="Motivational" />
                    </ListItemButton>
                  </ListItem>
                </List>
              </nav>
            </Box>
          </Grid>
          <Grid>
            {quotes.length === 0 ? <p>No quotes found</p> :
              <Grid>
                {quotes.map((quote) => (
                  <Grid key={quote.id} sx={{mb: 4}}>
                    <Card sx={{ minWidth: 275 }}>
                      <CardContent>
                        <Typography variant="body2" sx={{ fontSize: 16 }}>
                          {quote.text}
                        </Typography>
                        <Typography variant="body2" sx={{color: 'text.secondary',  fontSize: 14 }}>
                          - {quote.author}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button variant="contained" color="success" component={NavLink} to={`/quotes/${quote.id}/edit`}>Edit</Button>
                        <Button variant="outlined" color="error" onClick={() => deleteQuote(quote.id)}>Delete</Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            }
          </Grid>
        </Grid>
      </>
      }
    </>
  );
};

export default Home;