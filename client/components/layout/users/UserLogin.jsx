UserLogin = React.createClass({
    onSubmit(e) {
        e.preventDefault()

        //let email       = $(e.target).find('[name=email]').val()
        //let password    = $(e.target).find('[name=password]').val()
        let email       = $(e.target).find('[name=email]').val()
        let password    = $(e.target).find('[name=password]').val()

        Meteor.loginWithPassword(email, password, (err) => {
            if(err) {
                console.log(err.reason)
            } else {
                FlowRouter.go('Home')
            }
        })
    },
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-6 col-sm-offset-3">
                        <h1>Login</h1>

                        <form onSubmit={ this.onSubmit }>
                            <input type="text" name="email" placeholder="Enter email..." className="form-control"/>
                            <input type="password" name="password" placeholder="Enter password..." className="form-control"/>
                            <input type="submit" value="login" className="btn btn-default"/>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
})