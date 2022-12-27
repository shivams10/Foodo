import axios from "axios";

 function useAxios() {
  return axios.get("/Food.json");
}
export default useAxios;