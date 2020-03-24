import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader/root';
import { connect } from 'react-redux';

import getData from 'actions/data';

export class App extends React.Component {
  componentDidMount() {
    const { getData } = this.props;
    getData();
  }

  render() {
    return <div>Intellisense</div>;
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
};

export const connectedApp = hot(
  connect(mapStateToProps, mapDispatchToProps)(App),
);
