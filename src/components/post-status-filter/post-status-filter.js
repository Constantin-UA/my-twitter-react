import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import './post-status-filter.css';

export default class PostStatusFilter extends Component {
	buttons = [
		{ name: 'all', label: 'Все' },
		{ name: 'like', label: 'Понравилось' },
	];

	render() {
		const buttons = this.buttons.map(({ name, label }) => {
			const { filter, onFilterSelect } = this.props;
			const active = filter === name;
			const clazz = active ? 'info' : 'outline-secondary';
			return (
				<Button key={name} variant={clazz} onClick={() => onFilterSelect(name)}>
					{label}
				</Button>
			);
		});
		return <div className="btn-group">{buttons}</div>;
	}
}
