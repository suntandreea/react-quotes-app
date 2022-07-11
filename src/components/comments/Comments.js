import {useCallback, useEffect, useState} from 'react';
import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';
import {useParams} from 'react-router-dom';
import useHttp from '../../hooks/use-http';
import {getAllComments} from '../../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';
import CommentsList from './CommentsList';

const Comments = () => {
  const params = useParams();
  const {quoteId} = params;
  const [isAddingComment, setIsAddingComment] = useState(false);
  const {sendRequest, status, data: loadedComments, error} = useHttp(getAllComments, true);

  useEffect(() => {
    sendRequest(quoteId);
  }, [quoteId, sendRequest]);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const onAddedComment = useCallback(() => {
    sendRequest(quoteId);
  },[quoteId, sendRequest]);

  let comments;

  if (status === 'pending') {
    comments = <div className='centered'><LoadingSpinner /></div>;
  }

  if (error) {
    comments =  <p className='centered focused'>{error}</p>;
  }

  if (status === 'completed' && loadedComments && loadedComments.length > 0) {
    comments = <CommentsList comments={loadedComments}/>
  }

  if (status === 'completed' && (!loadedComments || loadedComments.length === 0)) {
    comments =  <p className='centered'>No comments found!</p>;
  }

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm quoteId={quoteId} onAddedComment={onAddedComment} />}
      {comments}
    </section>
  );
};

export default Comments;
