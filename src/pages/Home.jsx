import React, { useCallback, useEffect } from 'react';

import FeaturedPlaylists from '../components/FeaturedPlaylists';

import {
	activeFiltersToQueryParams,
	getFeaturedPlaylists,
	getSpotifyAccessTokenAndExpiration
} from '../helpers/spotify';

import { useCookies } from 'react-cookie';
import { useState } from 'react';

const Home = (props) => {
	const [ hasTokenExpired, setTokenExpired ] = React.useState(false);

	const [ cookies, setCookie ] = useCookies([]);
	const [ isCookieLoading, setIsCookieLoading ] = useState(true);
	const [ activePlaylistsTitle, setActivePlaylistsTitle ] = useState('');
	const [ activePlaylists, setActivePlaylists ] = useState([]);
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
		const updatedFilters = activeFilters.map((filter) => {
			if (filter.id === optionId) {
				let updatedValue = value;

				if (filter.id === 'timestamp') {
					updatedValue.toISOString();
				}

				return { ...filter, activeValue: updatedValue };
			} else {
				return filter;
			}
		});
		console.log(activeFiltersToQueryParams(updatedFilters));
		setActiveFilterValues(activeFiltersToQueryParams(updatedFilters));
	};
	return (
		<div>
			{isActivePlaylistsLoading ? (
				<div>Featured playlists loading</div>
			) : (
				<FeaturedPlaylists
					title={activePlaylistsTitle}
					playlists={activePlaylists}
					activeFilters={activeFilters}
					setActiveFilters={setActiveFilters}
					handleFilterOptionUpdate={handleFilterOptionUpdate}
				/>
			)}
		</div>
	);
};

export default Home;
