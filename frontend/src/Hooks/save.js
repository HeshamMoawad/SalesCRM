// {
//     "username": "saif",
//     "first_name": "saif",
//     "project": {
//       "name": "asdsad",
//       "logo": "/media/projects-logo/2111.w013.n001.577B.p30.577_ihxrxlP.jpg"
//     },
//     "is_active": true,
//     "role": "MANAGER",
//     "Authorization": ".."
//   }
export const AUTH_KEY = "AUTH"
export const PERM_KEY = "PERM"

export const saveLogin = (auth)=>{
    localStorage.setItem( AUTH_KEY ,JSON.stringify(auth)) 
};

export const loadLogin = ()=>{
    return JSON.parse(localStorage.getItem(AUTH_KEY))
}

export const savePermission = (permission)=>{
    localStorage.setItem( PERM_KEY ,JSON.stringify(permission)) 
};
export const loadPermission = ()=>{
    return JSON.parse(localStorage.getItem(PERM_KEY))
}



