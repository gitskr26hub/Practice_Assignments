import axios from "axios";

const fetchWholeBySingleUserData = async (token: string) => {
  return axios
    .post(
      import.meta.env.VITE_GET_DATA_ONLY_BYUSER_URL ,
      {},
      {
        headers: {
          Authorization: token,
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
    .then((res) => {
      // console.log(res.data)
      return res
    });
};


const fetchDeleteDataByUser = async (token: string,id:string|number) => {
    return axios.delete(import.meta.env.VITE_GET_DATA_DELETE_URL, {
        headers: {
          Authorization: token,
        },
        data: {
          id: id,
        },
      }).then((res)=>{
        return res.data
      })
}



export {fetchDeleteDataByUser,fetchWholeBySingleUserData,}