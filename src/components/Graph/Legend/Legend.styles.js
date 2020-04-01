import styled from 'styled-components';

const LegendText = styled.text`
  font-size: 0.75rem;
  opacity: ${({ hover }) => (hover ? '1' : '0')};
  transition: all ease-in 0.1s;
`;

export default LegendText;
