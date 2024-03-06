export const EXPIRE_TIME_MIN = 120

export const getExpireDate = ()=>{
    const currentDate = new Date();
    const futureDate = new Date(currentDate.getTime() + (EXPIRE_TIME_MIN * 60 * 1000)); 
    return futureDate.toISOString();
}

export const isLoginExpired = (time)=>{
    const futureDate = new Date(time);
    const currentDate = new Date();
    return futureDate < currentDate;
  }

export const getDate = (_date , time = true)=>{
    const date = new Date(_date)
    const arr = date.toLocaleDateString().split("/")
    return `${arr[1]}/${arr[0]}/${arr[2]}  ${time ?  date.toLocaleTimeString() : '' }`
}

export const getDaysBetweenDates = (startDate, endDate) =>{
    const startTimestamp = startDate.getTime();
    const endTimestamp = endDate.getTime();
    const difference = Math.abs(endTimestamp - startTimestamp);
    const daysDifference = Math.ceil(difference / (1000 * 3600 * 24));
    return daysDifference;
  }
  
export const getStatus = (date , nowDate )=>{
  const now = new Date(nowDate);
  const passedDate = new Date(date)
  // console.log(now.toDateString(),passedDate.toDateString() ,  now - passedDate , Math.floor( now - passedDate/ (1000 * 3600 * 24)));
  // Calculate the difference in milliseconds
  const differenceInMilliseconds =  passedDate - now  ;
  // Convert the difference from milliseconds to days
  const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 3600 * 24));
  return differenceInDays + 1 ;
}