import React, { Component } from 'react';
import nextId from 'react-id-generator';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import PostStatusFilter from '../post-status-filter';
import PostList from '../post-list';
import PostAddForm from '../post-add-form';

import './app.css';
import styled from 'styled-components';

const AppBlock = styled.div`
	margin: 0 auto;
	max-width: 800px;
`;

export default class App extends Component {
	state = {
		data: [
			{ label: 'Going to learn React', important: true, id: nextId() },
			{ label: 'That is so good', important: false, id: nextId() },
			{ label: 'I need a break...', important: false, id: nextId() },
		],
	};

	deleteItem = (id) => {
		console.log(id);
		this.setState(({ data }) => {
			const index = data.findIndex((elem) => elem.id === id);

			/* 			const before = data.slice(0, index);
			const after = data.slice(index + 1);
			const newArr = [...before, ...after]; */

			const newArr = [...data.slice(0, index), ...data.slice(index + 1)];
			return {
				data: newArr,
			};
		});
	};

	onAddItem = (body) => {
		const newItem = {
			label: body,
			important: false,
			id: nextId(),
		};
		this.setState(({ data }) => {
			const newArr = [...data, newItem];
			return {
				data: newArr,
			};
		});
	};

	render() {
		return (
			<AppBlock>
				<AppHeader />
				<div className="search-panel d-flex">
					<SearchPanel />
					<PostStatusFilter />
				</div>
				<PostList posts={this.state.data} onDelete={this.deleteItem} />
				<PostAddForm onAdd={this.onAddItem} />
			</AppBlock>
		);
	}
}
