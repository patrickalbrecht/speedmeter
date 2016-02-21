// New collection for the comments
MeasuredTimes = new Mongo.Collection("measuredTimes")

if (Meteor.isClient) {

    Meteor.subscribe('measuredTimes')
}

if (Meteor.isServer) {

    // publish times
    Meteor.publish('measuredTimes', () => {
        return MeasuredTimes.find()
    })
}