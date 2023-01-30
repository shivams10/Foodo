import axios from "axios";

 function useAxios() {
  return axios.get("http://localhost:1337/api/");
}
export default useAxios;