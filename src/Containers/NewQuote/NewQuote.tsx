import QuoteForm from '../../Components/QuoteForm/QuoteForm.tsx';
import { IQuoteForm } from '../../types';
import axiosApi from '../../axiosApi.ts';
import { useState } from 'react';
import Loader from '../../Components/UI/Loader/Loader.tsx';
import { useNavigate } from 'react-router-dom';


const NewQuote = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const submitForm = async(quote: IQuoteForm) => {
    try {
      setLoading(true);
      await axiosApi.post('quotes.json', {...quote});
      navigate('/');
    } catch (error) {
      console.error (error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? <Loader/> : <QuoteForm submitForm={submitForm}/> }
    </>
  );
};

export default NewQuote;