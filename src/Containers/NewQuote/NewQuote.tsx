import QuoteForm from '../../Components/QuoteForm/QuoteForm.tsx';
import { IQuoteForm } from '../../types';
import axiosApi from '../../axiosApi.ts';


const NewQuote = () => {

  const submitForm = async(quote: IQuoteForm) => {
    await axiosApi.post('quotes.json', {...quote});
  };


  return (
    <div>
      <QuoteForm submitForm={submitForm}/>
    </div>
  );
};

export default NewQuote;