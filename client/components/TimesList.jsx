TimesList = React.createClass({

    mixins: [ReactMeteorData],
    measurementTypes: [
        {value: '0-50'},
        {value: '0-100'},
        {value: '50-100'},
        {value: '100-150'},
        {value: '150-200'}
    ],

    getInitialState() {
        return {
            speedDifference: '0-100'
        }
    },

    getMeteorData() {
        return {
            times: MeasuredTimes.find({speedDifference: this.state.speedDifference}).fetch(),
            currentUser: Meteor.user()
        }
    },

    renderMeasuredTimes() {

        let rankingCounter = 0;

        // Get tasks from this.data.tasks
        return this.data.times.map((time) => {
            rankingCounter++

            return <Time
                key={time._id}
                ranking={rankingCounter}
                time={time}
            />

        })
    },

    renderMeasurementTypes() {

        return this.measurementTypes.map((type) => {
            return <option
                value={type.value}
            >
                {type.value} km/h
            </option>
        })
    },

    handleTypeChange(event) {
        this.setState({speedDifference: event.target.value})
    },

    render() {
        return (
            <div className="container">

                <div className="well well-lg">
                    <label for="speed-differences">Select type</label>
                    <select
                        name="speed-differences"
                        id="speed-differences"
                        className="form-control"
                        value={this.state.speedDifference}
                        onChange={this.handleTypeChange}
                    >
                        {this.renderMeasurementTypes()}
                    </select>
                </div>
                <table className="table table-responsive">
                    <thead>
                        <tr>
                            <th>Position</th>
                            <th>Time in seconds</th>
                            <th>Comment</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.renderMeasuredTimes()}
                    </tbody>
                </table>
            </div>
        )
    }
})