import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader/root';
import { connect } from 'react-redux';

import getData from 'actions/data';
import Table from 'components/Table';
import AppContainer from 'containers/App.styles';

export class App extends React.Component {
  componentDidMount() {
    const { getData } = this.props;
    getData();
  }

  render() {
    const { data } = this.props;

    return (
      <AppContainer>
        <Table data={data} />
      </AppContainer>
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
