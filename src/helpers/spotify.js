export const getSpotifyAccessTokenAndExpiration = async () => {
	const clientId = process.env.REACT_APP_CLIENT_ID;
	const clientSecret = process.env.REACT_APP_CLIENT_SECRET;

	let data, error;

	if (clientId === undefined || clientSecret === undefined) {
		data = undefined;
		error = `Error with env vars`;
	}
	const authorization = btoa(clientId + ':' + clientSecret);

	await fetch('https://accounts.spotify.com/api/token', {
		method: 'POST',
		headers: {
			Authorization: `Basic ${authorization}`,
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: new URLSearchParams({
			grant_type: 'client_credentials'
		})
	})
		.then((res) => res.json())
		.then((_data) => {
			data = { access_token: _data.access_token, expiresIn: _data.expires_in };
			error = undefined;
		})
		.catch((_error) => {
			data = undefined;
			error = `Error with client authorization`;
		});
	return { data, error };
};
export const activeFiltersToQueryParams = (activeFilters) => {
	const queryParamsObj = {};

	activeFilters.map((activeFilter) => {
		// if value
		if (activeFilter.activeValue) {
			queryParamsObj[activeFilter.id] = activeFilter.activeValue;
		} else {
			if (activeFilter.values) {
				queryParamsObj[activeFilter.id] = activeFilter.values[0].value;
			} else if (activeFilter.id === 'limit' && !activeFilter.activeValue) {
				queryParamsObj['limit'] = 20;
			} else if (activeFilter.id === 'offset' && !activeFilter.activeValue) {
				queryParamsObj['offset'] = 0;
			}
		}
	});
	return queryParamsObj;
};
export const getFeaturedPlaylists = async ({ access_token, filters }) => {
	let data, error, url;
	const queryParams = new URLSearchParams(filters).toString();
	if (filters === undefined) {
		url = 'https://api.spotify.com/v1/browse/featured-playlists';
	} else {
		url = `https://api.spotify.com/v1/browse/featured-playlists?${queryParams}`;
	}
	await fetch(url, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${access_token}`
		}
	})
		.then((res) => res.json())
		.then((_data) => {
			data = _data;
			error = undefined;
		})
		.catch((_error) => {
			data = undefined;
			error = `Error with client authorization`;
		});
	return { data, error };
};

export const fetchPlaylistFilters = async () => {
	let data, error;

	await fetch('http://www.mocky.io/v2/5a25fade2e0000213aa90776')
		.then((res) => res.json())
		.then((_data) => {
			data = _data;
			error = undefined;
		})
		.catch((_error) => {
			data = undefined;
			error = `Error with client authorization`;
		});
	return { data, error };
};
