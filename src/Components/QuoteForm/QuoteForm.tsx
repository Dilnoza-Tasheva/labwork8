import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useEffect, useState } from 'react';
import { IQuoteForm } from '../../types';
import * as React from 'react';

const initialForm = {
  author: '',
  category: '',
  text: '',
};

interface Props {
  quoteToEdit?: IQuoteForm;
  submitForm: (quote: IQuoteForm) => void;
}

const QuoteForm: React.FC<Props> = ({quoteToEdit, submitForm}) => {
  const [form, setForm] = useState<IQuoteForm>({...initialForm});

  useEffect(() => {
    if (quoteToEdit) {
      setForm(prevState => ({
        ...prevState,
        ...quoteToEdit,
      }));
    }
  }, [quoteToEdit]);

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

  const onChangeCategoryField = (e: SelectChangeEvent) => {
    const value = e.target.value;
    setForm(prevState => ({
      ...prevState,
      category: value,
    }));
  };


  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    submitForm({...form});

    if (!quoteToEdit) {
      setForm({...initialForm});
    }
  };

  return (
    <form onSubmit={onSubmitForm}>
      <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center" }}>
        {quoteToEdit ? 'Edit' : 'Add new'} quote
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
            {quoteToEdit ? 'Update' : 'Save'}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default QuoteForm;