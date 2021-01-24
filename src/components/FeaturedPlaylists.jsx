import React from 'react';
import styled from 'styled-components';

import LoadingSpinner from './LoadingSpinner';
import PlaylistCard from './PlaylistCard';

import { device, fadeIn } from '../helpers/css';

const FeaturedPlaylistsContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

const FeaturedPlaylistsTitle = styled.h2`margin-left: 1.5%;`;

const FeaturedPlaylistsWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
`;

const PlaylistCardWrapper = styled(PlaylistCard)`
	animation: ${fadeIn} 300ms ease-in;

@media ${device.tablet} {
  margin-right: 1rem;
  margin-left: 1rem;
}
`;
const LargeLoadingSpinner = styled(LoadingSpinner)`
width: 180px;
margin-top: 4rem
`;
const FeaturedPlaylists = ({ title, playlists, isActivePlaylistsLoading }) => {
	if (isActivePlaylistsLoading) {
		return (
			<FeaturedPlaylistsContainer>
				<LargeLoadingSpinner alt="Featured Playlists Loading" />
			</FeaturedPlaylistsContainer>
		);
	} else {
		return (
			<FeaturedPlaylistsContainer>
				<FeaturedPlaylistsTitle>{title}</FeaturedPlaylistsTitle>

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
	}
};

export default FeaturedPlaylists;
