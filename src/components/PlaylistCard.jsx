import React from 'react';

const PlaylistCard = ({ name, description, url, images }) => {
	return (
		<div>
			<img src={(images[0], url)} alt="Playlist background" />
			<h3>{name}</h3>
			<p>{description}</p>
			<a href={url}>Listen</a>
		</div>
	);
};

export default PlaylistCard;
