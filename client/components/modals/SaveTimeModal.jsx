SaveTimeModal = React.createClass({

    getInitialState() {
      return({
          timeComment: ''
      })
    },

    handleTimeCommentChange(event) {
        this.setState({timeComment: event.target.value})
    },

    handleTimeCommentSubmit() {
        Meteor.call('addTime', this.props.measuredTime, this.props.measuredDifference, this.state.timeComment)
    },

    render() {
        return (
            <div id="SaveTimeModal" className="modal fade" role="dialog">
                <div className="modal-dialog">

                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">Save Time</h4>
                        </div>
                        <div className="modal-body">
                            <p>
                                You did {this.props.measuredDifference} km/h in {this.props.measuredTime} seconds!
                            </p>
                            <label for="timeComment" className="">Comment</label>
                            <input
                                type="text"
                                name="timeComment"
                                className="form-control"
                                onChange={this.handleTimeCommentChange}
                                value={this.state.timeComment} />
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-default"
                                data-dismiss="modal">
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={this.handleTimeCommentSubmit}
                                data-dismiss="modal">
                                Submit
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
})