import React, { Component } from 'react';
import './post-list-item.scss';

export default class PostListItem extends Component {
	render() {
		const { label, onDelete, onToggleImportant, onToggleLike, important, like } = this.props;
		let classNames = 'app-list-item d-flex justify-content-between';

		if (important) {
			classNames += ' important';
		}

		if (like) {
			classNames += ' like';
		}
		return (
			<div className={classNames}>
				<span className="app-list-item-label" onClick={onToggleLike}>
					{label}
				</span>
				<div className="d-flex justify-content-center align-items-center">
					<button className="btn-star btn-sm" type="button" onClick={onToggleImportant}>
						<i className="bi bi-star"></i>
					</button>
					<button className="btn-trash btn-sm" type="button" onClick={onDelete}>
						<i className="bi bi-trash"></i>
					</button>
					<i className="bi bi-heart"></i>
				</div>
			</div>
		);
	}
}
