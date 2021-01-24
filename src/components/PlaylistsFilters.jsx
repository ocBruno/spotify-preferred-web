import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { device } from '../helpers/css';
import { fetchPlaylistFilters } from '../helpers/spotify';
import PlaylistFilter from './PlaylistFilter';

const PlaylistsFiltersWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	margin-right: auto;
	margin-left: 1rem;
	@media ${device.tablet} {
		margin-left: auto;
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

const PlaylistsFilters = ({ activeFilters, setActiveFilters, handleFilterOptionUpdate }) => {
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
							setActiveFilters={setActiveFilters}
							handleFilterOptionUpdate={handleFilterOptionUpdate}
						/>
					);
				})}
			</PlaylistsFiltersWrapper>
		);
	}
};

export default PlaylistsFilters;
