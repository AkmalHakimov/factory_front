import axios from "axios";
import { ErrorNotify } from "../../utils/ErrorNotify/ErrorNotify";
import AxiosInterSeptor from "../AxiosInterceptor/AxiosInterSeptor"
export const BASE_URL = "http://localhost:8081/";
// export const BASE_URL = "http://212.67.8.94:8081/";  
  

export default function ApiRequestSec (url, method, data,params) {

  let x = localStorage.getItem("access_token")
  return AxiosInterSeptor({
    baseURL: BASE_URL,
    url: "/api" + url,
    method,
    data,
    params,
    headers:{
      "Authorization": `Bearer ${x}`
  }
    }).catch((err) => {
      switch (err.response?.status) {
                case 401:
                  ErrorNotify(err.response.data);
                  break;
                case 404:
                  ErrorNotify(err.response.data);
                  break;
                 case 403:
                  ErrorNotify("You don't have permission");
                  break;
                case 500:
                  ErrorNotify('Serverda xatolik yuz berdi');
                  break;
                default:
                  ErrorNotify("An error has ocurred")
                  // Handle other status codes as needed
                  break;
              }
    });
};





