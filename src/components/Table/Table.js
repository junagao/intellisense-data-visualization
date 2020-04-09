import React from 'react';
import PropTypes from 'prop-types';

import {
  TableContainer,
  TableTable,
  MetricColumn,
  ValueColumn,
  TableThead,
  TableTh,
  TableTr,
  TableTd,
} from './Table.styles';

const Table = ({ data, onToggleMetric, selectedMetrics }) => {
  const renderTableHeader = () => {
    if (data.length) {
      const headers = [
        Object.keys(data[0])[0],
        Object.keys(data[0].dataset[0])[1],
      ];
      return headers
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
    data.map(({ metric, dataset }) => {
      return (
        <TableTr
          key={metric}
          onClick={() => onToggleMetric(metric, dataset)}
          isSelected={
            selectedMetrics.find((item) => item.metric === metric) !== undefined
          }
        >
          <TableTd>{metric}</TableTd>
          <TableTd>{dataset.slice(-1)[0].value.toFixed(2)}</TableTd>
        </TableTr>
      );
    });

  return (
    <TableContainer>
      <TableTable>
        <colgroup>
          <MetricColumn />
          <ValueColumn />
        </colgroup>
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
      dataset: PropTypes.arrayOf(
        PropTypes.shape({
          time: PropTypes.number,
          value: PropTypes.number,
        }),
      ),
    }),
  ).isRequired,
  onToggleMetric: PropTypes.func.isRequired,
  selectedMetrics: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default Table;
