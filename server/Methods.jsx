
Meteor.methods({

    // Add new measured time to db
    addTime(measuredTime, speedDifference, timeComment) {

        if (!measuredTime || !speedDifference) {
            throw new Meteor.Error('no-data')
        }

        MeasuredTimes.insert({
            speedDifference: speedDifference,
            measuredTime: measuredTime,
            timeComment: timeComment,
            createdAd: new Date()
        })
    },
})