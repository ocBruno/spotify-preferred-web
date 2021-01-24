import React from 'react';
import styled from 'styled-components';

import { device } from '../helpers/css';

const FilterWrapper = styled.span`
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
	@media ${device.tablet} {
	}
`;
const SelectFilterLabel = styled.label``;
const SelectFilter = styled.select``;
const SelectFilterOption = styled.option``;

const DatetimeInputLabel = styled.label``;
const DatetimeInput = styled.input``;

const LimitInputLabel = styled.label``;
const LimitInput = styled.input``;

const OffsetInputLabel = styled.label``;
const OffsetInput = styled.input``;

const PlaylistFilter = ({ className, id, name, values, validation }) => {
	if (values) {
		return (
			<FilterWrapper className={className}>
				<SelectFilterLabel for={name}>{name}</SelectFilterLabel>
				<SelectFilter id={id} name={name}>
					{values.map((value) => {
						return <SelectFilterOption value={value.value}>{value.name}</SelectFilterOption>;
					})}
				</SelectFilter>
			</FilterWrapper>
		);
	} else if (id === 'timestamp') {
		return (
			<FilterWrapper className={className}>
				<DatetimeInputLabel>{name}</DatetimeInputLabel>
				<DatetimeInput type="datetime-local" id={id} />
			</FilterWrapper>
		);
	} else if (id === 'limit') {
		return (
			<FilterWrapper className={className}>
				<LimitInputLabel>{name}</LimitInputLabel>
				<LimitInput type="number" min="1" max="50" />
			</FilterWrapper>
		);
	} else if (id === 'offset') {
		return (
			<FilterWrapper className={className}>
				<OffsetInputLabel>{name}</OffsetInputLabel>
				<OffsetInput type="number" />
			</FilterWrapper>
		);
	} else {
		return <div> oops</div>;
	}
};

export default PlaylistFilter;
