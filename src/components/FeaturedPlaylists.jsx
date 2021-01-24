import React from 'react';
import styled from 'styled-components';
import { device } from '../helpers/css';
import PlaylistCard from './PlaylistCard';
import PlaylistsFilters from './PlaylistsFilters';

const FeaturedPlaylistsContainer = styled.div`
	display: flex;
	flex-direction: column;
`;
const FeaturedPlaylistsWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
`;
const FeaturedPlaylistsTitle = styled.h2`margin-left: 1.5%;`;

const PlaylistCardWrapper = styled(PlaylistCard)`
@media ${device.tablet} {
  margin-right: auto;
  margin-left: auto;
}
`;

const FeaturedPlaylists = ({ title, playlists, setActiveFilters, activeFilters, handleFilterOptionUpdate }) => {
	return (
		<FeaturedPlaylistsContainer>
			<FeaturedPlaylistsTitle>{title}</FeaturedPlaylistsTitle>

			<PlaylistsFilters
				handleFilterOptionUpdate={handleFilterOptionUpdate}
				activeFilters={activeFilters}
				setActiveFilters={setActiveFilters}
			/>

			<FeaturedPlaylistsWrapper>
				{playlists.map((playlist) => {
					return (
						<PlaylistCardWrapper
							className="playlistCard"
							key={playlist.name}
							name={playlist.name}
							description={playlist.description}
							url={playlist.uri}
							images={playlist.images}
						/>
					);
				})}
			</FeaturedPlaylistsWrapper>
		</FeaturedPlaylistsContainer>
	);
};

export default FeaturedPlaylists;
