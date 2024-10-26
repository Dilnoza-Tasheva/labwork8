import { Box, CircularProgress } from '@mui/material';


const Loader = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress sx={{mx: "auto"}}/>
    </Box>
  );
};

export default Loader;