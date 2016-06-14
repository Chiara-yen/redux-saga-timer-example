import React, { Component } from 'react';
import { connect } from 'react-redux';

import './styles.styl';
import * as actions from '../../actions';
import Timer from '../../components/Timer'

class App extends Component {
	constructor(props) {
	  super(props)
	}

	render() {
		const { seconds, status, ...actions } = this.props;
		return(
			<div>
				<Timer seconds={seconds} status={status} actions={actions} />
			</div>
		)
	}
}

function mapStateToProps(state, ownProps) {
	return {
		seconds: state.default.seconds,
		status: state.default.status,
	}
}

export default connect(mapStateToProps,{
	start: actions.start,
	stop: actions.stop,
	reset: actions.reset,
})(App);