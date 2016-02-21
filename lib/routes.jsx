FlowRouter.route('/', {
    name: 'App',
    action(params) {
        renderMainLayoutWith(<App />)
    }
})

FlowRouter.route('/ranking', {
    name: 'TimesList',
    action(params) {
        renderMainLayoutWith(<TimesList />)
    }
})

FlowRouter.route('/login', {
    name: 'Login',
    action(params) {
        renderMainLayoutWith(<UserLogin />)
    }
})

function renderMainLayoutWith(component) {
    ReactLayout.render(MainLayout, {
        header: <Header />,
        content: component,
        footer: <Footer />
    })
}