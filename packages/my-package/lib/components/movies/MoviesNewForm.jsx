import React, { PropTypes, Component } from 'react';
import {
	Components,
	registerComponent,
	withCurrentUser,
	getFragment
} from 'meteor/vulcan:core';

import Movies from '../../modules/movies/collection.js';

const MoviesNewForm = ({ currentUser }) => (
	<div>
		{Movies.options.mutations.create.check(currentUser) ? (
			<div
				style={{
					marginBottom: '20px',
					paddingBottom: '20px',
					borderBottom: '1px solid #ccc'
				}}
			>
				<h4>Insert New Document</h4>
				<Components.SmartForm
					collection={Movies}
					mutationFragment={getFragment('MoviesItemFragment')}
				/>
			</div>
		) : null}
	</div>
);

registerComponent({
	name: 'MoviesNewForm',
	component: MoviesNewForm,
	hocs: [withCurrentUser]
});
