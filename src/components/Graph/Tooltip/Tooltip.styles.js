import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const TooltipDiv = styled.div.attrs(({ x, y }) => ({
  style: {
    marginLeft: `${x - 20}px`,
    marginTop: `${y + 25}px`,
  },
}))`
  position: absolute;
  animation: 0.2s ${fadeIn} ease-in;
  background-color: #fff;
  border-radius: 0.25rem;
  box-shadow: 0 1px 4px 0 #eaeaea, 0 0 0 1px #eaeaea;
  font-size: 0.65rem;
  padding: 0.5rem;
`;

export const TooltipH1 = styled.h1.attrs(({ color }) => ({ style: { color } }))`
  font-size: 0.7rem;
  font-weight: 500;
`;

export const TooltipP = styled.p`
  color: #333;
  opacity: 0.85;
  :first-of-type {
    margin-top: 0.25rem;
  }
`;

export const TooltipSpan = styled.span`
  opacity: 0.75;
`;
