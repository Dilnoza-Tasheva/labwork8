import QuoteForm from '../../Components/QuoteForm/QuoteForm.tsx';
import { useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { IQuote, IQuoteForm, } from '../../types';
import axiosApi from '../../axiosApi.ts';


const EditQuote = () => {
  const [quote, setQuote] = useState<IQuote>();
  const params = useParams<{idQuote: string}>();
  const navigate = useNavigate();

  const fetchOneQuote = useCallback(async(id: string) => {
    const response: {data: IQuote} = await axiosApi<IQuote>(`quotes/${id}.json`);

    if(response.data) {
      setQuote(response.data);
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
        await axiosApi.put(`quotes/${params.idQuote}.json`, {...quote});
        navigate('/');
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div>
      <QuoteForm quoteToEdit={quote} submitForm={submitForm}/>
    </div>
  );
};

export default EditQuote;