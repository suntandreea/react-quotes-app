import {Link, Route, useParams, useRouteMatch} from 'react-router-dom';
import Comments from '../components/comments/Comments';
import HighlightedQuote from '../components/quotes/HighlightedQuote';
import NoQuotesFound from '../components/quotes/NoQuotesFound';
import useHttp from '../hooks/use-http';
import {getSingleQuote} from '../lib/api';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import {useEffect} from 'react';

const Detail = props => {

  const match = useRouteMatch();
  const params = useParams();

  const {sendRequest, status, data: loadedQuote, error} = useHttp(getSingleQuote, true);

  useEffect(() => {
    sendRequest(params.quoteId);
  }, [sendRequest]);

  // const quote = DUMMY_QUOTES.find(quote => quote.id === params.quoteId);

  if (status === 'pending') {
    return (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className='centered focused'>{error}</p>;
  }

  if (status === 'completed' && !loadedQuote.text) {
    return <NoQuotesFound />;
  }

  return (
    <div>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      <Route path={match.path} exact>
        {/* ca sa afiseze continutul numai cand sunt pe url-ul simplu de quote */}
        <div className='centered'>
          <Link className='btn--flat' to={`${match.url}/comments`}>Show Comments</Link>
        </div>
      </Route>
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </div>
  );
};

export default Detail;