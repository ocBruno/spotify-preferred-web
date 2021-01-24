import React from 'react';
import styled from 'styled-components';

const SpinnerImage = styled.img`
	margin-left: auto;
	margin-right: auto;
	width: 40px;
`;

const LoadingSpinner = ({ className, alt = 'Loading' }) => {
	return <SpinnerImage className={className} alt={alt} src="/images/spinner.svg" />;
};

export default LoadingSpinner;
