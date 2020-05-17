import React, { useState, useContext } from 'react';
import GithubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContext';

const Search = () => {
  const [text, setText] = useState('');
  const githubContext = useContext(GithubContext);
  const alertContext = useContext(AlertContext);

  const onSubmit = e => {
    e.preventDefault();
    //error message
    if (text === '') {
      alertContext.setAlert('Please enter student id/fullname', 'light');
    } else {
      githubContext.searchUsers(text);
      // clear the form
      setText('');
    }
  };

  const onChange = e => setText(e.target.value);
  return (
    <div>
      <form onSubmit={onSubmit} className='form'>
        <input
          type='text'
          name='text'
          placeholder='Search Students...'
          value={text}
          onChange={onChange}
        />
        <input
          type='submit'
          value='Search'
          className='btn btn-dark btn-block'
        />
      </form>
      {/* clear button */}
      {githubContext.users.length > 0 && (
        <button
          className='btn btn-light btn-block'
          onClick={githubContext.clearUsers}
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default Search;
