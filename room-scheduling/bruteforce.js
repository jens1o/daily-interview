const tape = require('tape');

function getRoomCountForMeetingSlots(meetingSlots) {
    // if you have no meetings, you need no rooms o/
    if (meetingSlots.length === 0) {
        return 0;
    }

    let maxConflictCount = 0;

    // iterate over every time slot and find the number of conflicts in the other
    // timeslots
    for (let i = 0; i < meetingSlots.length; i++) {
        let currentConflictCount = 0;
        let meetingSlot = meetingSlots[i];

        for (let j = 0; j < meetingSlots.length; j++) {
            // we would be looking at the very same timeslot, ignore
            // and continue in the j-loop
            if (i === j) continue;

            let otherMeetingSlot = meetingSlots[j];

            if (isIntersectingTimeslot(meetingSlot, otherMeetingSlot)) {
                maxConflictCount = Math.max(maxConflictCount, ++currentConflictCount);
            }
        }
    }

    // you always need at least one room
    return Math.max(maxConflictCount, 1);
}

function isIntersectingTimeslot(slotA, slotB) {
    if (slotA[0] === slotB[0]) {
        return true;
    }

    let earlierMeeting;
    let laterMeeting;
    if (slotA[0] < slotB[0]) {
        earlierMeeting = slotA;
        laterMeeting = slotB;
    } else { // No need to compare, check for equality is done above
        earlierMeeting = slotB;
        laterMeeting = slotA;
    }

    if (laterMeeting[0] < earlierMeeting[1]) {
        return true;
    }

    return false;
}

tape('isIntersectingTimeslot', function (t) {
    let testTimeslots = [
        [[[20, 25], [20, 30]], true],
        [[[30, 75], [0, 50]], true],
        [[[0, 50], [30, 75]], true],
        [[[0, 70], [75, 100]], false],
        [[[30, 75], [60, 150]], true],
        [[[30, 70], [0, 20]], false],
    ];

    t.plan(testTimeslots.length);

    for (testTimeslotData of testTimeslots) {
        t.equal(testTimeslotData[1], isIntersectingTimeslot(testTimeslotData[0][0], testTimeslotData[0][1]));
    }
});

tape('getRoomCountForMeetingSlots', function (t) {
    t.plan(2);

    t.equal(2, getRoomCountForMeetingSlots([[30, 75], [0, 50], [60, 150], [75, 80]]));
    t.equal(1, getRoomCountForMeetingSlots([[30, 75], [0, 20], [75, 180]]));
})
//                                 <--A-->   <--B-->
console.log(isIntersectingTimeslot([20, 25], [20, 30]))
console.log(isIntersectingTimeslot([30, 75], [0, 50]))
console.log(isIntersectingTimeslot([0, 50], [30, 75]))
console.log(isIntersectingTimeslot([0, 70], [75, 100]))
console.log(isIntersectingTimeslot([30, 75], [60, 150]));

console.log(getRoomCountForMeetingSlots([[30, 75], [0, 50], [60, 150], [75, 80]]));