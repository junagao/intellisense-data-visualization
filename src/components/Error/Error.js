import React from 'react';
import PropTypes from 'prop-types';

import ErrorDiv from './Error.styles';

const Error = ({ error }) => (
  <ErrorDiv>
    <p>The following unexpected error occurred: {error}.</p>
    <p>Please try again.</p>
  </ErrorDiv>
);

Error.propTypes = {
  error: PropTypes.string.isRequired,
};

export default Error;
