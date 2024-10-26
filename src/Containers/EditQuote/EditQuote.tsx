import QuoteForm from '../../Components/QuoteForm/QuoteForm.tsx';
import { useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { IQuote, IQuoteForm, } from '../../types';
import axiosApi from '../../axiosApi.ts';
import Loader from '../../Components/UI/Loader/Loader.tsx';


const EditQuote = () => {
  const [quote, setQuote] = useState<IQuote>();
  const params = useParams<{idQuote: string}>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchOneQuote = useCallback(async(id: string) => {
    try{
      setLoading(true);
      const response: {data: IQuote} = await axiosApi<IQuote>(`quotes/${id}.json`);
      if(response.data) {
        setQuote(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  },[]);

  useEffect(() => {
    if (params.idQuote) {
      void fetchOneQuote(params.idQuote);
    }
  }, [params.idQuote, fetchOneQuote]);

  const submitForm = async (quote: IQuoteForm) => {
    try {
      if (params.idQuote) {
        setLoading(true);
        await axiosApi.put(`quotes/${params.idQuote}.json`, {...quote});
        navigate('/');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      {loading ? <Loader/> :
      <>
        {quote ?
        <>
          <QuoteForm quoteToEdit={quote} submitForm={submitForm}/>
        </>
          :
          <p>Quote not found</p>
        }
      </>
      }
    </>
  );
};

export default EditQuote;