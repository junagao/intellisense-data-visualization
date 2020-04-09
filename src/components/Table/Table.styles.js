import styled from 'styled-components';

export const TableContainer = styled.div`
  max-width: 46rem;
  margin-bottom: 1rem;
  @media (min-width: 1280px) {
    max-width: 28rem;
  }
`;

export const TableTable = styled.table`
  font-size: 0.85rem;
  text-align: left;
  border-radius: 0.25rem 0.25rem 0 0;
  border-collapse: separate;
  border-spacing: 0;
  table-layout: fixed;
`;

export const MetricColumn = styled.col`
  width: 80%;
`;

export const ValueColumn = styled.col`
  width: 20%;
`;

export const TableThead = styled.thead`
  display: table-header-group;
  vertical-align: middle;
  width: 50%;
`;

export const TableTh = styled.th`
  color: rgba(0, 0, 0, 0.85);
  background-color: #fafafa;
  border-bottom: 1px solid #f0f0f0;
  display: table-cell;
  font-weight: 500;
  text-align: left;
  transition: background 0.3s ease;
  padding: 0.75rem;
  width: 25%;
`;

export const TableTr = styled.tr`
  display: table-row;
  position: relative;
  vertical-align: middle;
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
  cursor: pointer;
  background-color: ${({ isSelected }) => (isSelected ? '#ddd' : '#fff')};
  transition: background 0.3s ease;
`;

export const TableTd = styled.td`
  padding: 0.75rem;
  color: rgba(0, 0, 0, 0.65);
`;
