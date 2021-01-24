import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { device } from '../helpers/css';
import { fetchPlaylistFilters } from '../helpers/spotify';
import PlaylistFilter from './PlaylistFilter';

const PlaylistsFiltersWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	margin-left: auto;
	margin-right: auto;
	@media ${device.tablet} {
		justify-content: space-between;
		flex-wrap: nowrap;
		width: 97%;
		margin-bottom: 0.5rem;
	}
`;
const NameInputWrapper = styled.label`
	display: flex;
	flex-direction: column;
	width: 100%;
	input,
	select {
		width: 80%;
	}
	label {
		margin-bottom: 0.5rem;
	}
`;
const NameInputLabel = styled.label``;
const NameInput = styled.input``;
const PlaylistsFilters = (props) => {
	const [ activeFilters, setActiveFilters ] = useState([]);
	const [ isActiveFiltersLoading, setActiveFiltersLoading ] = useState(true);
	useEffect(
		() => {
			const setActivePlaylistsFilters = async () => {
				const { data, error } = await fetchPlaylistFilters();
				if (error !== undefined) {
					// handle error
				} else {
					setActiveFilters(data.filters);
					setActiveFiltersLoading(false);
				}
			};
			setActivePlaylistsFilters();
		},
		[ setActiveFilters ]
	);

	if (isActiveFiltersLoading) {
		return <div>Loading</div>;
	} else {
		return (
			<PlaylistsFiltersWrapper>
				<NameInputWrapper>
					<NameInputLabel>Pesquisar</NameInputLabel>
					<NameInput type="text" placeholder="Nome" />
				</NameInputWrapper>
				{activeFilters.map((filter) => {
					return (
						<PlaylistFilter
							name={filter.name}
							id={filter.id}
							className="playlistFilter"
							values={filter.values}
							key={filter.id}
							validation={filter.validation}
						/>
					);
				})}
			</PlaylistsFiltersWrapper>
		);
	}
};

export default PlaylistsFilters;
