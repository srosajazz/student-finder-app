import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import GithubContext from '../../context/github/githubContext';

const Search = ({ showClear, clearUsers, setAlert }) => {
  const [text, setText] = useState('');
  const githubContext = useContext(GithubContext);
  const onSubmit = e => {
    e.preventDefault();
    //error message
    if (text === '') {
      setAlert('Please enter student id/fullname', 'light');
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
      {showClear && (
        <button className='btn btn-light btn-block' onClick={clearUsers}>
          Clear
        </button>
      )}
    </div>
  );
};

Search.propTypes = {
  clearUsers: PropTypes.func.isRequired,
  showClear: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default Search;
