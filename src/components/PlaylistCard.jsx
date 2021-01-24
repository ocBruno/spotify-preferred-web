import React from 'react';
import styled from 'styled-components';

import { device } from '../helpers/css';

const CardWrapper = styled.div`
	display: block;
	@media ${device.tablet} {
		display: inline-block;
		width: 30%;
	}
`;
const PlaylistImage = styled.img`width: 100%;`;
const PlaylistNameHeader = styled.h3`@media ${device.tablet} {}`;
const PlaylistDescription = styled.p`@media ${device.tablet} {}`;

const PlaylistCard = ({ className, name, description, url, images }) => {
	const redirectTo = (url) => {
		window.location.assign(url);
	};
	return (
		<CardWrapper className={className} onClick={(e) => redirectTo(url)}>
			<PlaylistImage src={images[0].url} alt="Playlist background" />
			<PlaylistNameHeader>{name}</PlaylistNameHeader>
			<PlaylistDescription>{description}</PlaylistDescription>
		</CardWrapper>
	);
};

export default PlaylistCard;
