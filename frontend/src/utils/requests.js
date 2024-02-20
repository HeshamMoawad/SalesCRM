import axios from 'axios';
import Swal from 'sweetalert2';

const FETCH = "GET"
const ADD_NEW = "POST"
const UPDATE = "PUT"
const DELETE = "DELETE"

function range(start, end) {
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

const SUCCESS_STATUS_CODES = range(200,300 );

const Axios = axios.create({
  baseURL:"http://192.168.3.141:8000/api/",
  withCredentials: true,
})

 const request = async( url , method=FETCH , showAlert=[true,false] , query_params = {} , payload={} )=>{

    const headers = {
      Authorization : localStorage.getItem("Authorization"),
    }
    try {
        let fullUrl = url;
        if (Object.keys(query_params).length > 0) {
          fullUrl += '?' + new URLSearchParams(query_params).toString();
        }
        let response;
        if (method === FETCH) {
          response = await Axios.get(fullUrl  , {headers});
        } else if (method === ADD_NEW) {
          response = await Axios.post(fullUrl, payload  , {headers});
        } else if (method === UPDATE) {
          response = await Axios.put(fullUrl, payload , {headers});
        } else if (method === DELETE) {
          response = await Axios.delete(fullUrl , {headers});
        } 
        if (showAlert[0]){
          await Swal.fire({
              title:"success" ,
              text: String(response.data.message) ,
              icon:'info',
          })
        }
        return response;
        
      } catch (error) {
        // Handle errors here
        if (showAlert[1]){
          await Swal.fire({
            title:"message" ,
            text: String(error.response.data.message) ,
            icon:'error',
        })
        }
        console.error('Error making request:', error);
        // throw error;
        return error.response
      }
    }

export {
    FETCH ,
    ADD_NEW ,
    UPDATE ,
    DELETE , 
    SUCCESS_STATUS_CODES
};
export default request;