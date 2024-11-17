const convetStringToNumber = (time) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

const checkMeetingLength = (startOfDay, endOfDay, startMeeting, meetingLeghth) => {
  const startDay = convetStringToNumber(startOfDay);
  const endDay = convetStringToNumber(endOfDay);
  const runMeeting = convetStringToNumber(startMeeting);
  const endMeeting = runMeeting + meetingLeghth;
  return runMeeting >= startDay && endMeeting <= endDay;
};

checkMeetingLength ();
