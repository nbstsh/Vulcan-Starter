import React, { PropTypes, Component } from 'react';
import {
	Components,
	registerComponent,
	withMulti,
	withCurrentUser,
	Loading
} from 'meteor/vulcan:core';

import Movies from '../../modules/movies/collection.js';

const MoviesList = ({
	results = [],
	currentUser,
	loading,
	loadMore,
	count,
	totalCount
}) => (
	<div style={{ maxWidth: '500px', margin: '20px auto' }}>
		{/* user accounts */}
		<div
			style={{
				padding: '20px 0',
				marginBottom: '20px',
				borderBottom: '1px solid #ccc'
			}}
		>
			<Components.AccountsLoginForm />
		</div>

		{loading ? (
			<Loading />
		) : (
			<div className='movies'>
				{/* new document form placeholder */}
				<Components.MoviesNewForm />

				{/* documents list */}
				{results.map(movie => (
					<Components.MoviesItem
						key={movie._id}
						movie={movie}
						currentUser={currentUser}
					/>
				))}

				{/* load more */}

				{totalCount > results.length ? (
					<a
						href='#'
						onClick={e => {
							e.preventDefault();
							loadMore();
						}}
					>
						Load More ({count}/{totalCount})
					</a>
				) : (
					<p>No more items.</p>
				)}
			</div>
		)}
	</div>
);

const options = {
	collection: Movies,
	fragmentName: 'MoviesItemFragment',
	limit: 5
};

registerComponent({
	name: 'MoviesList',
	component: MoviesList,
	hocs: [[withMulti, options], withCurrentUser]
});
