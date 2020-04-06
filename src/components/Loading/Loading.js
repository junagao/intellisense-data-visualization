import React from 'react';

import { SpinnerDiv, SpinnerDoubleBounceDiv } from './Loading.styles';

const Loading = () => (
  <SpinnerDiv>
    <SpinnerDoubleBounceDiv />
    <SpinnerDoubleBounceDiv />
  </SpinnerDiv>
);

export default Loading;
