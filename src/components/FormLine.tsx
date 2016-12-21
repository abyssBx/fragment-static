import * as React from "react"
import "./FormLine.less"

export default class FormLine extends React.Component {
	render() {
		const { required, label } = this.props

		return (
			<div className="form-line">
				<label>{required ? '*' : ''} {label}:</label>
				<span className="form-control">
					{this.props.children}
				</span>
			</div>
		)
	}
}