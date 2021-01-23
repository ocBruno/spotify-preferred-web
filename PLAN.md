# MM React Test Plan

Create a web and app application used to display the preferred playlists from customers.

## Pages

The web application has only one page that lists the featured playlists at Spotify according to some criteria.

## Components

- FeaturedPlaylists
One list of featured playlists to be displayed consumed from this API [Spotify get list of featured playlists](https://developer.spotify.com/web-api/get-list-featured-playlists/)

- PlaylistsFilter
One filter component with API filter fields and one local search text input to filter the playlists by "name".

The filter component should be used to filter the elements displayed by the list of featured playlists.

The API filter fields and their possible values/type are mounted by consuming this Mock API [Playlists filters mock data](http://www.mocky.io/v2/5a25fade2e0000213aa90776)

## Effects

- Fetch api data and update components accordingly

Every time the user change any information on the filter component and every 30 seconds, to see if any information from the Spotify APIs has changed.

## Non functional requirements

1. Accessible
2. Responsive
3. Fault tolerant
4. Resilient

## Solution Architecture Details

## Frameworks And Libraries

- React
- Bootstrap

## Choice Of Patterns

- Mobile first

- Clean code