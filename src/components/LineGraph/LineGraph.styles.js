import styled from 'styled-components';

export const GraphContainer = styled.div`
  height: 100%;
  flex: 1 1 auto;
`;

export const GraphSvg = styled.svg`
  background-color: #f8f9fa;
  padding: 1rem;
`;

export const AxisG = styled.g`
  path,
  line {
    stroke: black;
    opacity: 0.2;
    stroke-width: 0.5;
    shape-rendering: crispEdges;
  }
`;

export const LinePath = styled.path`
  stroke-width: 1.5;
  fill: none;
  z-index: 0;
`;

export const LegendText = styled.text`
  font-size: 0.75rem;
  opacity: ${({ hover }) => (hover ? '1' : '0')};
  transition: all ease-in 0.1s;
  z-index: 1;
`;
