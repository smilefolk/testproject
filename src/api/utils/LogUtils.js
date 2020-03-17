const fs = require('fs');
const path = require('path');
const moment = require('moment-timezone');

const hostName = process.env.HOST_NAME;
function getDateTimeFormat(date) {
  const dateT = date + (7 * 60 * 60 * 1000);
  const dateTime = new Date(dateT);
  const years = dateTime.getFullYear();
  const months = dateTime.getMonth() + 1;
  const day = dateTime.getDate();
  const hours = dateTime.getHours();
  const mins = dateTime.getMinutes();
  const sec = dateTime.getSeconds();
  const msec = dateTime.getMilliseconds();
  const monthFormatted = months < 10 ? `0${months}` : months;
  const dayFormatted = day < 10 ? `0${day}` : day;
  const hourFormatted = hours < 10 ? `0${hours}` : hours;
  const minFormatted = mins < 10 ? `0${mins}` : mins;
  const secFormatted = sec < 10 ? `0${sec}` : sec;
  let mSecFormatted;
  if (msec < 10) {
    mSecFormatted = `00${msec}`;
  } else if (msec < 100) {
    mSecFormatted = `0${msec}`;
  } else {
    mSecFormatted = msec;
  }
  // [2017-06-20 16:20:47:575]
  // const formatDateTime = `${years}-${monthFormatted}-${dayFormatted} ${hourFormatted}:${minFormatted}:${secFormatted}`;
  return `${years}-${monthFormatted}-${dayFormatted} ${hourFormatted}:${minFormatted}:${secFormatted}:${mSecFormatted}`;
}
async function logToFile(text, file) {
  // Define file name.
  const filename = file !== undefined ? file : 'default.log';
  // Define log text.
  const logText = `${text}\r\n`;

  // Save log to file.
  fs.appendFile(filename, logText, 'utf8', (error) => {
    if (error) {
      // If error - show in console.
      console.log(error);
    }
  });
}
async function changeNameLog(firstName, finalName) {
  fs.rename(firstName, finalName, (err) => {
    console.log('renamed complete', firstName, finalName);
    if (err) { console.log('renamed err', firstName, finalName); }
  });
}
async function initDetail() {
  const date = new Date();
  const timeStamp = new Date(date).getTime();
  // timeStamp += 7 * 60 * 60 * 1000;
  // const ts = new Date(timeStamp);
  // const timestring = ts.toString();
  const now = moment(timeStamp);
  const Year = now.tz('Asia/Bangkok').format('YYYY');
  const Mount = now.tz('Asia/Bangkok').format('MM');
  const Day = now.tz('Asia/Bangkok').format('DD');
  // tidatemenow.tz('Asia/Bangkok')
  const month = `${Mount}`;
  const year = Year.toString();
  // const yaerMonthDay = `${year}${month}${Day}`;


  let logPath = path.join(__dirname, '/..', '/..', '/..', '/logs/');
  if (!fs.existsSync(`${logPath}`)) {
    fs.mkdirSync(`${logPath}`);
  }
  logPath += 'detail/';
  if (!fs.existsSync(`${logPath}`)) {
    fs.mkdirSync(`${logPath}`);
  }
  // logPath += `${yaerMonthDay}/`;
  // if (!fs.existsSync(`${logPath}`)) {
  //   fs.mkdirSync(`${logPath}`);
  // }
  // const logfile = path.join(__dirname, '/..', '/..', '/..', '/logs/project/error.log');
}
async function initSummary() {
  const date = new Date();
  const timeStamp = new Date(date).getTime();
  // timeStamp += 7 * 60 * 60 * 1000;
  // const ts = new Date(timeStamp);
  // const timestring = ts.toString();
  const now = moment(timeStamp);
  const Year = now.tz('Asia/Bangkok').format('YYYY');
  const Mount = now.tz('Asia/Bangkok').format('MM');
  const Day = now.tz('Asia/Bangkok').format('DD');
  // tidatemenow.tz('Asia/Bangkok')
  const month = `${Mount}`;
  const year = Year.toString();
  // const yaerMonthDay = `${year}${month}${Day}`;


  let logPath = path.join(__dirname, '/..', '/..', '/..', '/logs/');
  if (!fs.existsSync(`${logPath}`)) {
    fs.mkdirSync(`${logPath}`);
  }
  logPath += 'summary/';
  if (!fs.existsSync(`${logPath}`)) {
    fs.mkdirSync(`${logPath}`);
  }
  // logPath += `${yaerMonthDay}/`;
  // if (!fs.existsSync(`${logPath}`)) {
  //   fs.mkdirSync(`${logPath}`);
  // }
  // const logfile = path.join(__dirname, '/..', '/..', '/..', '/logs/project/error.log');
}
async function getLogfileSummary(date) {
  await initSummary();
  const now = moment(date);
  let timeStamp = new Date(date).getTime();
  timeStamp += 7 * 60 * 60 * 1000;
  const ts = new Date(timeStamp).toISOString();
  const subtimehr = ts.substring(11, 13);
  const subtimemin = ts.substring(14, 16);
  const Year = now.tz('Asia/Bangkok').format('YYYY');
  const Mount = now.tz('Asia/Bangkok').format('MM');
  const Day = now.tz('Asia/Bangkok').format('DD');
  const month = `${Mount}`;
  const year = Year.toString();
  const yaerMonthDay = `${year}${month}${Day}`;
  let logfile;
  if (subtimemin < 15) {
    logfile = path.join(__dirname, '/..', '/..', '/..', `/logs/summary/${hostName}_Summary_${yaerMonthDay}${subtimehr}00_Raw.log`);
  } else if (subtimemin >= 15 && subtimemin < 30) {
    logfile = path.join(__dirname, '/..', '/..', '/..', `/logs/summary/${hostName}_Summary_${yaerMonthDay}${subtimehr}15_Raw.log`);
  } else if (subtimemin >= 30 && subtimemin < 45) {
    logfile = path.join(__dirname, '/..', '/..', '/..', `/logs/summary/${hostName}_Summary_${yaerMonthDay}${subtimehr}30_Raw.log`);
  } else if (subtimemin >= 45 && subtimemin < 60) {
    logfile = path.join(__dirname, '/..', '/..', '/..', `/logs/summary/${hostName}_Summary_${yaerMonthDay}${subtimehr}45_Raw.log`);
  }

  return logfile;
}
async function logSummary(
  transactionId, infoOrError, apiName,
  controllerName, input, output, status, message, startTime,
) {
  const date = new Date();
  const file = await getLogfileSummary(date);
  const timeStamp = new Date(date).getTime();
  console.log('timeStamp:===>', timeStamp);
  const time = parseFloat(timeStamp) - parseFloat(startTime);
  const ts = getDateTimeFormat(timeStamp);
  await logToFile(`${ts}|${transactionId}|${infoOrError}|${apiName}|${controllerName}|${JSON.stringify(input)}|${output}|${status}|${message}|${time}|`, file);
}
async function getLogfileDetail(date) {
  await initDetail();
  const now = moment(date);
  let timeStamp = new Date(date).getTime();
  timeStamp += 7 * 60 * 60 * 1000;
  const ts = new Date(timeStamp).toISOString();
  const subtimehr = ts.substring(11, 13);
  const subtimemin = ts.substring(14, 16);
  const Year = now.tz('Asia/Bangkok').format('YYYY');
  const Mount = now.tz('Asia/Bangkok').format('MM');
  const Day = now.tz('Asia/Bangkok').format('DD');
  const month = `${Mount}`;
  const year = Year.toString();
  const yaerMonthDay = `${year}${month}${Day}`;
  let logfile;
  if (subtimemin < 15) {
    logfile = path.join(__dirname, '/..', '/..', '/..', `/logs/detail/${hostName}_Detail_${yaerMonthDay}${subtimehr}00_Raw.log`);
  } else if (subtimemin >= 15 && subtimemin < 30) {
    logfile = path.join(__dirname, '/..', '/..', '/..', `/logs/detail/${hostName}_Detail_${yaerMonthDay}${subtimehr}15_Raw.log`);
  } else if (subtimemin >= 30 && subtimemin < 45) {
    logfile = path.join(__dirname, '/..', '/..', '/..', `/logs/detail/${hostName}_Detail_${yaerMonthDay}${subtimehr}30_Raw.log`);
  } else if (subtimemin >= 45 && subtimemin < 60) {
    logfile = path.join(__dirname, '/..', '/..', '/..', `/logs/detail/${hostName}_Detail_${yaerMonthDay}${subtimehr}45_Raw.log`);
  }
  return logfile;
}
async function logDetail(
  transactionId, infoOrError, apiName,
  controllerName, input, output, status, message, startTime,
) {
  const date = new Date();
  const file = await getLogfileDetail(date);
  const timeStamp = new Date(date).getTime();
  const time = parseFloat(timeStamp) - parseFloat(startTime);
  const ts = getDateTimeFormat(timeStamp);
  await logToFile(`${ts}|${transactionId}|${infoOrError}|${apiName}|${controllerName}|${JSON.stringify(input)}|${output}|${status}|${message}|${time}|`, file);
}

exports.test = async (req, res, next) => {
  res.json('test');
};

exports.genLog = async (body) => {
  console.log('==================genLog================');
  const {
    idToTack, summaryOrDetail, infoOrError, apiName,
    controllerName, input, output, statusCode, messages, timeStamp,
  } = body;
  const transactionId = idToTack;
  console.log(`==================${summaryOrDetail}================`);
  console.log('transactionId=======>', transactionId);
  console.log('infoOrError=======>', infoOrError);
  console.log('input:=====>', input);
  console.log('==================================');
  if (summaryOrDetail === 'Summary') {
    await logSummary(
      transactionId, infoOrError, apiName, controllerName,
      input, output, statusCode, messages, timeStamp,
    );
    await logDetail(
      transactionId, infoOrError, apiName, controllerName,
      input, output, statusCode, messages, timeStamp,
    );
  } else {
    await logDetail(
      transactionId, infoOrError, apiName, controllerName,
      input, output, statusCode, messages, timeStamp,
    );
  }
  return true;
};

exports.logAutoGen = async () => {
  const date = new Date();
  const fileDetail = await getLogfileDetail(date);
  const fileSummary = await getLogfileSummary(date);
  const timeStamp = new Date(date).getTime();
  const timeStampBefore = timeStamp - (15 * 60 * 1000);
  const dateBefore = new Date(timeStampBefore);
  const fileDetailBefore = await getLogfileDetail(dateBefore);
  const fileSummaryBefore = await getLogfileSummary(dateBefore);
  const arrNameDetailFile = fileDetailBefore.split('_Raw');
  const arrNameSummaryFile = fileSummaryBefore.split('_Raw');
  const finalFileNameDetail = arrNameDetailFile[0] + arrNameDetailFile[1];
  const finalFileNameSummary = arrNameSummaryFile[0] + arrNameSummaryFile[1];
  await changeNameLog(fileDetailBefore, finalFileNameDetail);
  await changeNameLog(fileSummaryBefore, finalFileNameSummary);
  // const ts = getDateTimeFormat(timeStamp);
  // console.log('input', input);
  await logToFile('', fileDetail);
  await logToFile('', fileSummary);
};
