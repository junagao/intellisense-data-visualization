import styled from 'styled-components';

const spinnerBackgroundColor = '#999';
const spinnerSize = '3rem';

export const SpinnerDiv = styled.div`
  width: ${spinnerSize};
  height: ${spinnerSize};
  position: relative;
  margin: 100px auto;
`;

export const SpinnerDoubleBounceDiv = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: ${spinnerBackgroundColor};
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;
  animation: bounce 2s infinite ease-in-out;

  :last-child {
    animation-delay: -1s;
  }

  @keyframes bounce {
    0%,
    100% {
      transform: scale(0);
    }
    50% {
      transform: scale(1);
    }
  }
`;
