import { Axios } from "axios";

export default getCities = () => {
  Axios.get('https://api-colombia.com/api/v1/Department')
  .then(response => {
    return response.data;
  })
  .catch(e => {
    console.log(e);
  });

}