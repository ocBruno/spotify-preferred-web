import React, { useCallback, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import styled from 'styled-components';
import debounce from 'lodash.debounce';

import FeaturedPlaylists from '../components/FeaturedPlaylists';
import PlaylistsFilters from '../components/PlaylistsFilters';

import {
	activeFiltersToQueryParams,
	getFeaturedPlaylists,
	getSpotifyAccessTokenAndExpiration
} from '../helpers/spotify';

const PreferredPlaylistsTitle = styled.h2`margin-left: 1.5%;`;

const Home = (props) => {
	const [ hasTokenExpired, setTokenExpired ] = React.useState(false);

	const [ cookies, setCookie ] = useCookies([]);

	const [ isCookieLoading, setIsCookieLoading ] = useState(true);

	const [ activePlaylistsTitle, setActivePlaylistsTitle ] = useState('');

	const [ activePlaylists, setActivePlaylists ] = useState([]);

	const [ queriedPlaylists, setQueriedPlaylists ] = useState([]);
	const [ activeQuery, setActiveQuery ] = useState('');

	const [ isActivePlaylistsLoading, setIsActivePlaylistsLoading ] = useState(true);

	const [ activeFilters, setActiveFilters ] = useState([]);
	const [ activeFilterValues, setActiveFilterValues ] = useState(undefined);

	useEffect(
		() => {
			const setTokenAndExpiration = async () => {
				const { data, error } = await getSpotifyAccessTokenAndExpiration();

				if (error !== undefined) {
					// handle error
				} else if (data.access_token && data.expiresIn) {
					const access_token = data.access_token;
					const expiresIn = data.expiresIn;

					setCookie('access_token', access_token, { path: '/' });
					setIsCookieLoading(false);

					setTimeout(() => {
						setTokenExpired(true);
					}, expiresIn);
				}
			};

			setTokenAndExpiration();
		},
		[ hasTokenExpired, setCookie ]
	);

	const getAccessCookie = useCallback(
		() => {
			return cookies.access_token;
		},
		[ cookies ]
	);

	useEffect(
		() => {
			const setActiveFeaturedPlaylists = async () => {
				const access_token = getAccessCookie();
				const { data, error } = await getFeaturedPlaylists({
					access_token: access_token,
					filters: activeFilterValues
				});

				if (error !== undefined) {
					// handle error
				} else if (data) {
					setIsActivePlaylistsLoading(false);
					setActivePlaylists(data.playlists.items);
					setActivePlaylistsTitle(data.message);
				}
			};

			setActiveFeaturedPlaylists();
		},
		[ getAccessCookie, setIsActivePlaylistsLoading, activeFilterValues ]
	);

	const handleFilterOptionUpdate = (optionId, value) => {
		setIsActivePlaylistsLoading(true);

		const updatedFilters = activeFilters.map((filter) => {
			if (filter.id === optionId) {
				let updatedValue = value;

				if (filter.id === 'timestamp') {
					updatedValue = new Date(updatedValue).toISOString();
				}

				return { ...filter, activeValue: updatedValue };
			} else {
				return filter;
			}
		});
		// reset query on filter change
		setActiveQuery('');
		setActiveFilterValues(activeFiltersToQueryParams(updatedFilters));
	};

	const handleSearchQueryUpdate = (event) => {
		/* signalize React not to nullify the event object */
		event.persist();
		let value = event.target.value;
		setActiveQuery(value);
		setIsActivePlaylistsLoading(true);

		const debouncedUpdatePlaylists = debounce((value) => {
			updateQueriedPlaylists(value);
			setIsActivePlaylistsLoading(false);
		}, 1000);

		debouncedUpdatePlaylists(value);
	};

	const updateQueriedPlaylists = (query) => {
		let _queriedPlaylists;
		if (query.length === 0) {
			_queriedPlaylists = [];
		} else {
			_queriedPlaylists = activePlaylists.filter((playlist) => {
				let playlistInfo = playlist.name + playlist.description;
				if (playlistInfo.toLowerCase().includes(query.toLowerCase())) {
					return true;
				} else {
					return false;
				}
			});
		}
		setQueriedPlaylists(_queriedPlaylists);
	};
	return (
		<div>
			<PreferredPlaylistsTitle>Spotify preferred playlists</PreferredPlaylistsTitle>
			<PlaylistsFilters
				handleFilterOptionUpdate={handleFilterOptionUpdate}
				handleSearchQueryUpdate={handleSearchQueryUpdate}
				activeFilters={activeFilters}
				setActiveFilters={setActiveFilters}
				activeQuery={activeQuery}
			/>

			<FeaturedPlaylists
				title={activePlaylistsTitle}
				playlists={activeQuery.length !== 0 ? queriedPlaylists : activePlaylists}
				handleFilterOptionUpdate={handleFilterOptionUpdate}
				isActivePlaylistsLoading={isActivePlaylistsLoading}
			/>
		</div>
	);
};

export default Home;
