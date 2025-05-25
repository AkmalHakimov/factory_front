import axios from "axios";
import { BASE_URL } from "../../configure/ApiRequestor/ApiRequest";

const DownloadExcel = (endpoint, fileName) => {
  axios({
      method: 'get',
      url: `${BASE_URL}${endpoint}`,
      responseType: 'blob',
      headers: {
        'Content-Type': 'application/octet-stream',
        // Authorization: `Bearer ${access_token}`
      }
    })  
    .then(response => {
      // Create a URL for the blob
      const url = URL.createObjectURL(response.data);
  
      // Create a temporary <a> element and set its attributes
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
  
      // Append the <a> element to the document body
      document.body.appendChild(link);
  
      // Programmatically click the link to start the download
      link.click();
  
      // Clean up the temporary <a> element and URL object
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    })
    .catch(error => {
      console.error('Error downloading Excel file:', error);
    });
};

export default DownloadExcel;
