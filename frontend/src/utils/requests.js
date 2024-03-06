import axios from 'axios';
import Swal from 'sweetalert2';

const GET = "GET"
const POST = "POST"
const PUT = "PUT"
const DELETE = "DELETE"

function range(start, end) {
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

const SUCCESS_STATUS_CODES = range(200,300 );

const Axios = axios.create({
  // baseURL:"http://192.168.3.141:8000/api/",
  baseURL:"/api/",
  withCredentials: true,
})

 const request = async( url , method=GET , showAlert=[true,false] , query_params = {} , payload={}  , CancelToken=undefined)=>{

    const headers = {
      Authorization : localStorage.getItem("Authorization"),
    }
    try {
        let fullUrl = url;
        if (Object.keys(query_params).length > 0) {
          fullUrl += '?' + new URLSearchParams(query_params).toString();
        }
        let response;
        if (method === GET) {
          response = await Axios.get(fullUrl  , {headers:headers , cancelToken:CancelToken} );
        } else if (method === POST) {
          response = await Axios.post(fullUrl, payload  ,  {headers:headers , cancelToken:CancelToken});
        } else if (method === PUT) {
          response = await Axios.put(fullUrl, payload ,  {headers:headers , cancelToken:CancelToken});
        } else if (method === DELETE) {
          response = await Axios.delete(fullUrl ,  {headers:headers , cancelToken:CancelToken});
        } 
        if (showAlert[0]){
          await Swal.fire({
              title:"success" ,
              text: String(response.data.message) ,
              icon:'success',
              
          })
        }
        return response;
        
      } catch (error) {
        // Handle errors here
        if (showAlert[1]&& !axios.isCancel(error)){
          await Swal.fire({
            title:"message" ,
            text:  String(error) ,
            icon: 'error',
        })
        }
        // throw error;
        return error
      }
    }

export {
      GET ,
      POST ,
      PUT ,
      DELETE ,
      SUCCESS_STATUS_CODES
};
export default request;