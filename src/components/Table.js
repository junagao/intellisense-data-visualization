import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TableContainer = styled.div`
  min-width: 80%;
`;

const TableTable = styled.table`
  width: 100%;
  font-size: 0.9rem;
  text-align: left;
  border-radius: 2px 2px 0 0;
  border-collapse: separate;
  border-spacing: 0;
`;

const TableThead = styled.thead`
  display: table-header-group;
  vertical-align: middle;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
`;

const TableTh = styled.th`
  color: rgba(0, 0, 0, 0.85);
  background-color: #fafafa;
  border-bottom: 1px solid #f0f0f0;
  display: table-cell;
  font-weight: 500;
  text-align: left;
  transition: background 0.3s ease;
  padding: 1rem;
`;

const TableTr = styled.tr`
  display: table-row;
  position: relative;
  vertical-align: middle;
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const TableTd = styled.td`
  padding: 0.75rem 1rem;
  color: rgba(0, 0, 0, 0.65);
`;

const Table = ({ data }) => {
  const renderTableHeader = () => {
    if (data.length) {
      const header = Object.keys(data[0]);
      return header
        .slice(0, 2)
        .map((key) => (
          <TableTh key={key}>
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </TableTh>
        ));
    }
    return null;
  };

  const renderTableData = () =>
    data.map((item) => {
      const { metric, value } = item;
      return value && value[0] !== 'OK' ? (
        <TableTr key={metric}>
          <TableTd>{metric}</TableTd>
          <TableTd>{value[value.length - 1].toFixed(2)}</TableTd>
        </TableTr>
      ) : null;
    });

  return (
    <TableContainer>
      <TableTable>
        <TableThead>
          <TableTr>{renderTableHeader()}</TableTr>
        </TableThead>
        <tbody>{renderTableData()}</tbody>
      </TableTable>
    </TableContainer>
  );
};

Table.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      metric: PropTypes.string,
      value: PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      ),
    }),
  ).isRequired,
};

export default Table;
