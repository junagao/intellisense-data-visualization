import React from 'react';
import PropTypes from 'prop-types';

import {
  TableContainer,
  TableTable,
  TableThead,
  TableTh,
  TableTr,
  TableTd,
} from 'components/Table.styles';

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
