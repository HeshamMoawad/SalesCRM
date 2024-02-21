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
  