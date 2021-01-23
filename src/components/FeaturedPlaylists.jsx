import React from 'react';
import PlaylistCard from './PlaylistCard';

const FeaturedPlaylists = ({ title, playlists }) => {
	return (
		<div>
			<h2>{title}</h2>
			{playlists.map((playlist) => {
				return (
					<PlaylistCard
						key={playlist.name}
						name={playlist.name}
						description={playlist.description}
						url={playlist.url}
						images={playlist.images}
					/>
				);
			})}
		</div>
	);
};

export default FeaturedPlaylists;
