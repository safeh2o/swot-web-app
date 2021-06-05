import React, { Component } from "react";
import SelectSearch, { fuzzySearch } from 'react-select-search';

function renderOptions(props, option, snapshot, className) {
	const imgStyle = {
		borderRadius: '50%',
		verticalAlign: 'text-bottom',
		marginRight: 15,
	};

	return (
		<button {...props} className={className} type="button">
			<span><img alt="" style={imgStyle} width="24" height="24" src={'/assets/icons/flags/' + option.value + '.svg'} /><span>{option.name}</span></span>
		</button>
	);
}

function renderInput(props, option, snapshot, className) {
	const imgStyle = {
		borderRadius: '50%',
	};

	return (
		<span className="icon">
			<i><img alt="" style={imgStyle} width="24" height="24" src={'/assets/icons/flags/' + (option.value || 'default') + '.svg'} /></i>
			<input {...props} className={className} type="text" />
		</span>
	);
}

class FormSelectSearch extends Component {
	render() {
		return (
			<>
				{this.props.icon ? (
					<SelectSearch
						// printOptions={'always'}
						options={this.props.options}
						renderOption={renderOptions}
						renderValue={renderInput}
						search
						filterOptions={fuzzySearch}
						name="response"
						placeholder="..."
					/>
				) : (
					<SelectSearch
						options={this.props.options}
						search
						filterOptions={fuzzySearch}
						name="response"
						placeholder="..."
					/>
				)}
			</>
		);
	}
}

export default FormSelectSearch;