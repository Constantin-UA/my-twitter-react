import React, { Component } from 'react';

import './post-add-form.css';

export default class PostAddForm extends Component {
	state = {
		text: '',
	};
	onValueChange = (e) => {
		this.setState({
			text: e.target.value,
		});
	};
	onSubmit = (e) => {
		e.preventDefault();
		if (this.state.text === '') {
			console.log('add text!!!');
		} else {
			this.props.onAdd(this.state.text);
			this.setState({
				text: '',
			});
		}
	};

	render() {
		return (
			<form className="bottom-panel d-flex" onSubmit={this.onSubmit}>
				<input
					type="text"
					placeholder="О чем вы думаете?"
					className="form-control new-post-label"
					onChange={this.onValueChange}
					value={this.state.text}
				/>
				<button type="submit" className="btn btn-outline-secondary">
					Добавать
				</button>
			</form>
		);
	}
}
