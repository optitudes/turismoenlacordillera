import Axios from "axios";

export default function getProvinces() {
  Axios.get()
  .then(response => {
    return response.data;
  })
  .catch(e => {
    console.log(e);
  });

}