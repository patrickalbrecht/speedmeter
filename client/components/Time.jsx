// Time component - represents a single measurement
Time = React.createClass({
    propTypes: {
        // Time object is required
        time: React.PropTypes.object.isRequired
    },

    render () {

        return (
            <tr>
                <td>
                    <strong>{this.props.ranking}.</strong>
                </td>
                <td>
                    {this.props.time.measuredTime}
                </td>
                <td>
                    {this.props.time.timeComment}
                </td>
            </tr>
        )
    }
})