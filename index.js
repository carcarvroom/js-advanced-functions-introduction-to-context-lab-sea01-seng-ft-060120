// Your code here
const createEmployeeRecord = (personArray) => {
  return {
    firstName: personArray[0],
    familyName: personArray[1],
    title: personArray[2],
    payPerHour: personArray[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

const createEmployeeRecords = (employeeArray) => {
  const newEmployeeArray = []
  employeeArray.forEach(array => newEmployeeArray.push(createEmployeeRecord(array)))
  return newEmployeeArray
}

const createTimeInEvent = (employeeRecord, timestamp) => {
  const [date, hour] = timestamp.split(' ')
  employeeRecord.timeInEvents.push({
    type: 'TimeIn',
    hour: Number(hour),
    date: date
  })
  return employeeRecord
}

const createTimeOutEvent = (employeeRecord, timestamp) => {
  const [date, hour] = timestamp.split(' ')
  employeeRecord.timeOutEvents.push({
    type: 'TimeOut',
    hour: Number(hour),
    date: date
  })
  return employeeRecord
}

const hoursWorkedOnDate = (employeeRecord, date) => {
  let timeIn = employeeRecord.timeInEvents.find( e => e.date === date)
  let timeOut = employeeRecord.timeOutEvents.find( e => e.date === date)
  return (timeOut.hour - timeIn.hour)/100
}

const wagesEarnedOnDate = (employeeRecord, date) => {
  let hours = hoursWorkedOnDate(employeeRecord, date)
  return hours * employeeRecord.payPerHour
}

const allWagesFor = (employeeRecord) => {
  let wages = 0
  employeeRecord.timeInEvents.forEach(event => {
    let date = event.date
    wages += (wagesEarnedOnDate(employeeRecord, date))
  })
  return wages
}

const findEmployeeByFirstName = (srcArray, firstName) => {
  return srcArray.find(record => record.firstName === firstName)
}

const calculatePayroll = (employeeArray) => {
  let sumPay = employeeArray.map(employee => allWagesFor(employee))
  return sumPay.reduce(function(a, b) {
    return a + b
  })
}