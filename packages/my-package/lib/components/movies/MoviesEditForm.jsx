import React, { PropTypes, Component } from 'react';
import { Components, registerComponent, getFragment } from 'meteor/vulcan:core';

import Movies from '../../modules/movies/collection.js';

const MoviesEditForm = ({ documentId, closeModal }) => (
	<Components.SmartForm
		collection={Movies}
		documentId={documentId}
		mutationFragment={getFragment('MoviesItemFragment')}
		showRemove={true}
		successCallback={document => {
			closeModal();
		}}
	/>
);

registerComponent({ name: 'MoviesEditForm', component: MoviesEditForm });
