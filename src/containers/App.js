import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader/root';
import { connect } from 'react-redux';

import getData from 'actions/data';
import Table from 'components/Table';

export class App extends React.Component {
  componentDidMount() {
    const { getData } = this.props;
    getData();
  }

  render() {
    const { data } = this.props;

    return (
      <div>
        <Table data={data} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.data,
});

const mapDispatchToProps = {
  getData,
};

App.propTypes = {
  getData: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export const connectedApp = hot(
  connect(mapStateToProps, mapDispatchToProps)(App),
);
