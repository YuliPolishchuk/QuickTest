import moment from "moment";

export function convertUtcToLocal(datetime)
{
    let date = new Date(datetime);
      const milliseconds = Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
      );
      const localTime = new Date(milliseconds);
      localTime.getDate() // local date
      localTime.getHours() // local hour
      return moment(localTime).local().format("MM-DD-YYYY hh:mm a");
}  

export function convertUtcToLocalTime(datetime)
{
  // return datetime;
    //we hardcoded date just because we need only time
    let date = new Date(`1/01/1990 ${datetime}`);
      const milliseconds = Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
      );
      const localTime = new Date(milliseconds);
      localTime.getDate() // local date
      localTime.getHours() // local hour
      return moment(localTime).local().format("hh:mm a");
}     