App = React.createClass({

    // TimerMixin for setInterval()
    mixins: [TimerMixin],
    lastMeasurement: 0,
    measuredTime: 0,

    getInitialState() {
        return {
            gpsSpeed: 0,
            measuredTime: '0.00',
            measuredDistance: '',
            jumbotronClass: 'jumbotron',
        }
    },

    componentDidMount() {
        // options for GPS watch-process
        let options = {
            enableHighAccuracy: true,
            timeout: 100,
            maximumAge: 0
        }

        // Start the GPS watch-process
        this.watch = navigator.geolocation.watchPosition(
            this.handleSpeedChange,
            this.handleWatchError ,
            options
        )
    },

    endWatch() {
        navigator.geolocation.clearWatch(this.watch)
    },

    handleSpeedChange(pos) {
        let speed = pos.coords.speed

        this.handleMeasurement(speed * 3.6) // m/s => km/h

        this.setState({gpsSpeed: (speed != null) ? speed * 3.6 : 0})
    },

    handleTimeChange(time = 0) {
        // Format the time and update the state.
        this.setState({measuredTime: (time > 0)? time.toFixed(2): '0.00'})
    },

    handleWatchError(err) {
        // Output GPS errors in the console (DEV: remove for production)
        console.log('ERROR(' + err.code + '): ' + err.message)
    },

    setUpMeasurement(event) {
        // Get the speed range and store each value in an array
        let data = event.target.attributes.getNamedItem('data-range').value.split('-')

        // Reset the measurement
        this.resetMeasurement()

        // Apply data for new measurement
        this.startSpeed = data[0]
        this.targetSpeed = data[1]
        this.setState({measuredDistance: data[0] + '-' + data[1]})

    },

    resetMeasurement(timerValue = 0) {

        // end watch
        this.stopTimer()

        // reset values
        this.startSpeed = 0
        this.targetSpeed = 0
        this.endTime = 0
        this.startTime = 0
        this.measuredTime = 0

        // reset view
        if(timerValue == 0) {
            this.setState({measuredDistance: ''})
            this.setState({gpsSpeed: 0})
            this.setState({jumbotronClass: 'jumbotron'})
        }

        // Update the time - set to result if present, else set to 0
        this.handleTimeChange(timerValue)
    },

    startTimer() {
        // Update the time every 10ms
        this.timer = TimerMixin.setInterval(() => {this.executeTimer()}, 10)
    },

    executeTimer() {
        // Output the difference between the current and the start time in seconds
        this.handleTimeChange((Date.now() - this.startTime) / 1000)
    },

    stopTimer() {
        // Stop the timer - setInterval()
        clearInterval(this.timer)
    },

    handleMeasurement(speed) {

        //Break if no Settings are applied
        if(!this.startSpeed && !this.targetSpeed) {
            return false
        }

        // Start measurement if conditions are fulfilled
        if(
            this.lastMeasurement < speed &&
            this.lastMeasurement <= this.startSpeed &&
            speed > this.startSpeed &&
            this.startTime == 0) {
            this.startTime = Date.now()
            this.measuredTime = 0
            this.startTimer()
            this.setState({jumbotronClass: 'jumbotron jumbotron-process'})
        }

        // Stop measurement if conditions are fulfilled
        if(this.startTime != 0 && speed >= this.targetSpeed) {
            // Calculate result
            this.endTime = Date.now()
            this.measuredTime = (this.endTime - this.startTime) / 1000

            // Reset all values and update timer with result
            this.stopTimer()
            this.resetMeasurement(this.measuredTime)

            // Change appearance of jumbotron
            this.setState({jumbotronClass: 'jumbotron jumbotron-finished'})

            // Show modal to save time to ranking
            $('#SaveTimeModal').modal('show')
        }

        this.lastMeasurement = speed
    },

    render() {

        // Output actual view - ToDo: maybe generate buttons in a loop
        return (
            <div className="container">
                <div className={this.state.jumbotronClass}>
                    <div className="container">
                        <p>Current Speed</p>
                        <h1 className="text-center">
                            {Math.round(this.state.gpsSpeed)} km/h
                        </h1>
                        <p>Time {(this.state.measuredDistance) ? this.state.measuredDistance + ' km/h' : ''}</p>
                        <h1 className="text-center">
                            {this.state.measuredTime} sec.
                        </h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 col-spacing">
                        <button
                            className="btn btn-primary btn-lg btn-block btn-responsive"
                            onClick={this.setUpMeasurement}
                            data-range="0-100" >
                            0 - 100 km/h
                        </button>
                    </div>
                    <div className="col-md-6 col-spacing">
                        <button
                            className="btn btn-primary btn-lg btn-block btn-responsive"
                            onClick={this.setUpMeasurement}
                            data-range="100-200" >
                            100 - 200 km/h
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 col-spacing">
                        <button
                            className="btn btn-primary btn-lg btn-block btn-responsive"
                            onClick={this.setUpMeasurement}
                            data-range="0-50" >
                            0 - 50 km/h
                        </button>
                    </div>
                    <div className="col-md-6 col-spacing">
                        <button
                            className="btn btn-primary btn-lg btn-block btn-responsive"
                            onClick={this.setUpMeasurement}
                            data-range="100-150" >
                            100 - 150 km/h
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 col-spacing">
                        <button
                            className="btn btn-primary btn-lg btn-block btn-responsive"
                            onClick={this.setUpMeasurement}
                            data-range="50-100" >
                            50 - 100 km/h
                        </button>
                    </div>
                    <div className="col-md-6 col-spacing">
                        <button
                            className="btn btn-danger btn-lg btn-block btn-responsive"
                            onClick={this.resetMeasurement} >
                            Reset
                        </button>
                    </div>
                </div>

                <SaveTimeModal
                    measuredDifference={this.state.measuredDistance}
                    measuredTime={this.state.measuredTime} />
            </div>
        )
    }
})