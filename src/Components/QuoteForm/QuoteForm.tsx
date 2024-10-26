import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useState } from 'react';
import { IQuoteForm } from '../../types';

const initialForm = {
  author: '',
  category: '',
  text: '',
};

const QuoteForm = () => {
  const [form, setForm] = useState<IQuoteForm>({...initialForm});
  const [category, setCategory] = useState('');

  const categories = [
    {title: 'Star Wars', id: 'star-wars'},
    {title: 'Famous people', id: 'famous-people'},
    {title: 'Saying', id: 'saying'},
    {title: 'Humor', id: 'humor'},
    {title: 'Motivational', id: 'motivational'},
  ];

  const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setForm(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onChangeCategoryField = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as string;
    setForm(prevState => ({
      ...prevState,
      category: value,
    }));
  };


  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={onSubmitForm}>
      <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center" }}>
        Add new quote
      </Typography>

      <Grid container spacing={2} sx={{mx: "auto", width: "50%", mt: 4}}>
        <Grid size={12}>
          <FormControl fullWidth>
            <InputLabel>
              Category
            </InputLabel>
            <Select
              labelId="category-label"
              id="category-select"
              label="Category"
              value={form.category}
              onChange={onChangeCategoryField}
            >
              {categories.map (categ => (
                <MenuItem key={categ.id} value={categ.id}>
                  {categ.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid size={12}>
          <TextField
            sx={{width: "100%"}}
            id="outlined-basic"
            label="Author"
            name="author"
            variant="outlined"
            value={form.author}
            onChange={onChangeField}
          />
        </Grid>
        <Grid size={12}>
          <TextField
            sx={{width: "100%"}}
            id="outlined-basic"
            label="Text"
            name="text"
            variant="outlined"
            value={form.text}
            onChange={onChangeField}
          />
        </Grid>
        <Grid size={12}>
          <Button type="submit" variant="contained" sx={{width: "100%"}}>
            Save
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default QuoteForm;