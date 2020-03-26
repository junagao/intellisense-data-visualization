import styled from 'styled-components';

export const TableContainer = styled.div`
  min-width: 80%;
`;

export const TableTable = styled.table`
  width: 100%;
  font-size: 0.9rem;
  text-align: left;
  border-radius: 2px 2px 0 0;
  border-collapse: separate;
  border-spacing: 0;
`;

export const TableThead = styled.thead`
  display: table-header-group;
  vertical-align: middle;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
`;

export const TableTh = styled.th`
  color: rgba(0, 0, 0, 0.85);
  background-color: #fafafa;
  border-bottom: 1px solid #f0f0f0;
  display: table-cell;
  font-weight: 500;
  text-align: left;
  transition: background 0.3s ease;
  padding: 1rem;
`;

export const TableTr = styled.tr`
  display: table-row;
  position: relative;
  vertical-align: middle;
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

export const TableTd = styled.td`
  padding: 0.75rem 1rem;
  color: rgba(0, 0, 0, 0.65);
`;
