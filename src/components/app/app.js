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
			{ label: 'Going to learn React', important: true, like: false, id: nextId() },
			{ label: 'That is so good', important: false, like: false, id: nextId() },
			{ label: 'I need a break...', important: false, like: false, id: nextId() },
		],
		term: '',
		filter: 'all',
	};

	deleteItem = (id) => {
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
			like: false,
			id: nextId(),
		};
		this.setState(({ data }) => {
			const newArr = [...data, newItem];
			return {
				data: newArr,
			};
		});
	};

	onToggleImportant = (id) => {
		console.log(`Important ${id}`);
	};

	onToggleLike = (id) => {
		this.onToggle(id, 'like');
	};

	onToggleImportant = (id) => {
		this.onToggle(id, 'important');
	};

	onToggle = (id, item) => {
		this.setState(({ data }) => {
			const index = data.findIndex((elem) => elem.id === id);

			const old = data[index];
			let newItem = {};
			switch (item) {
				case 'important':
					newItem = { ...old, important: !old.important };
					break;
				case 'like':
					newItem = { ...old, like: !old.like };
					break;
				default:
					console.log(item);
					break;
			}
			const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];
			return {
				data: newArr,
			};
		});
	};

	searchPost = (items, term) => {
		if (term.length === 0) {
			return items;
		}

		return items.filter((item) => {
			return item.label.indexOf(term) > -1;
		});
	};

	filterPost = (items, filter) => {
		if (filter === 'like') {
			return items.filter((item) => item.like);
		} else {
			return items;
		}
	};

	onUpdateSearch = (term) => {
		this.setState({ term });
	};

	onFilterSelect = (filter) => {
		this.setState({ filter });
	};

	render() {
		const { data, term, filter } = this.state;

		const liked = data.filter((item) => item.like).length;
		const allPosts = data.length;

		const visiblePosts = this.filterPost(this.searchPost(data, term), filter);

		return (
			<AppBlock>
				<AppHeader liked={liked} allPosts={allPosts} />
				<div className="search-panel d-flex">
					<SearchPanel onUpdateSearch={this.onUpdateSearch} />
					<PostStatusFilter filter={filter} onFilterSelect={this.onFilterSelect} />
				</div>
				<PostList
					posts={visiblePosts}
					onDelete={this.deleteItem}
					onToggleImportant={this.onToggleImportant}
					onToggleLike={this.onToggleLike}
				/>
				<PostAddForm onAdd={this.onAddItem} />
			</AppBlock>
		);
	}
}
