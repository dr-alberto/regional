import React from "react";

const DateTimeDisplay = ({ isoDatetime }) => {
  // Parse the ISO datetime string
  const parsedDate = new Date(isoDatetime);

  // Extract date, time, and timezone information
  const date = parsedDate.toISOString().split("T")[0];
  const time = parsedDate.toTimeString().split(" ")[0];
  const timezone = "UTC";

  return (
    <span>
      {date} {time} {timezone}
    </span>
  );
};

export default DateTimeDisplay;
