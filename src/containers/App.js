import React from 'react';
import './App.css';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundary';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			robots: [],
			searchfield: '',
		};
		this.onSearchChange = this.onSearchChange.bind(this);
	}

	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(response => response.json())
			.then(users => this.setState({ robots: users }));
	}

	onSearchChange(event) {
		this.setState({ searchfield: event.target.value });
	}

	render() {
		const filteredRobots = this.state.robots.filter(robot => {
			return robot.name
				.toLowerCase()
				.includes(this.state.searchfield.toLowerCase());
		});
		if (this.state.robots.length === 0) {
			return <h1>Loading...</h1>;
		} else {
			return (
				<div className="tc">
					<h1 className="f1">RoboFriends</h1>
					<SearchBox searchChange={this.onSearchChange} />
					<Scroll>
						<ErrorBoundry>
								<CardList robots={filteredRobots} />
						</ErrorBoundry>
					</Scroll>
				</div>
			);
		}
	}
}

export default App;
