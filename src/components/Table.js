import React from 'react';
import PropTypes from 'prop-types';

const Table = ({ data }) => {
  const renderTableHeader = () => {
    if (data.length) {
      const header = Object.keys(data[0]);
      return header
        .slice(0, 2)
        .map((key) => (
          <th key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</th>
        ));
    }
    return null;
  };

  const renderTableData = () =>
    data.map((item) => {
      const { metric, value } = item;
      return value && value[0] !== 'OK' ? (
        <tr key={metric}>
          <td>{metric}</td>
          <td>{value[value.length - 1].toFixed(2)}</td>
        </tr>
      ) : null;
    });

  return (
    <div>
      <table>
        <thead>
          <tr>{renderTableHeader()}</tr>
        </thead>
        <tbody>{renderTableData()}</tbody>
      </table>
    </div>
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
