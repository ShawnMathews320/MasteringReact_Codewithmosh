import React from 'react';

// returns a new component that wraps our original component
function withTooltip(Component) {
	return class WithTooltip extends React.Component {
		// state that determines whether we should show a tooltip or not
		state = { showTooltip: false };

		mouseOver = () => this.setState({ showTooltip: true });

		mouseOut = () => this.setState({ showTooltip: false });

		render() {
			return (
				<div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
					<Component
						{...this.props} // used to pass any props that we have passed from the outside
						showTooltip={this.state.showTooltip}
					/>
				</div>
			);
		}
	};
}

export default withTooltip;
