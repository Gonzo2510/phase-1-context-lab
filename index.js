/* Your Code Here */

function createEmployeeRecord([strFirstName, strFamilyName, strTitle, numPayPerHour]) {
    let obj = {
        firstName : strFirstName,
        familyName : strFamilyName,
        title : strTitle,
        payPerHour : numPayPerHour,
        timeInEvents : [],
        timeOutEvents : []
    }
    return obj
};

function createEmployeeRecords(employeeRecords) {
    let records = []
    employeeRecords.forEach(element => {
        records.push(createEmployeeRecord(element))
    });
    return records 
};

function createTimeInEvent(dateStamp = "2023-06-21 0000") {
    let obj = {
        type : 'TimeIn',
        hour : Number(dateStamp.slice(11)),
        date : dateStamp.slice(0,10)
    }
    this.timeInEvents.push(obj)
    return this
};

function createTimeOutEvent(dateStamp = "2023-06-21 0800") {
    let obj = {
        type : 'TimeOut',
        hour : Number(dateStamp.slice(11)),
        date : dateStamp.slice(0,10)
    }
    this.timeOutEvents.push(obj)
    return this
};

function hoursWorkedOnDate(date = "YYYY-MM-DD") {
    for (let i = 0; i < this.timeInEvents.length; i++) {
        if (this.timeInEvents[i].date === date) {
            const timeIn = this.timeInEvents[i].hour
            const timeOut = this.timeOutEvents[i].hour
            let hoursWorked = (timeOut - timeIn)/100
            return hoursWorked
        } else continue
      }
};

function wagesEarnedOnDate(date = "YYYY-MM-DD") {
    let rate = this.payPerHour
    let hours = hoursWorkedOnDate.call(this, date)
    let payOwed = rate * hours
    return payOwed
};
/*
function allWagesFor(record) {
    let workedDates = []
    let payOwedForAllDates = 0
    for (let i = 0; i < record.timeInEvents.length; i++) {
        workedDates.push(record.timeInEvents[i]['date'])
    }
    for (let i = 0; i < workedDates.length; i++) {
        let date = workedDates[i]

        payOwedForAllDates += (wagesEarnedOnDate(record, date))
    }
    return payOwedForAllDates
};
*/

function findEmployeeByFirstName(employeeRecords, strFirstName) {
    return employeeRecords.find(record => record.firstName === strFirstName)
};



/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function calculatePayroll(employeeRecords) {
    let payroll = 0
    employeeRecords.map(employee => {
        payroll += allWagesFor.call(employee)
    })
    return payroll
};
