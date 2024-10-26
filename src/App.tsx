import NavBar from './Components/NavBar/NavBar.tsx';
import { Container, Typography } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Home from './Containers/Home/Home.tsx';
import NewQuote from './Containers/NewQuote/NewQuote.tsx';

const App = () => {

  return (
    <>
      <header>
        <NavBar/>
      </header>
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/quotes" element={<Home/>}></Route>
          <Route path="/quotes/new-quote" element={<NewQuote/>}></Route>
          <Route path="/quotes/category/:category" element={<Home/>}></Route>
          <Route path="*" element={<Typography variant="h6">Not found</Typography>}></Route>
        </Routes>
      </Container>
    </>
  );
};

export default App;
