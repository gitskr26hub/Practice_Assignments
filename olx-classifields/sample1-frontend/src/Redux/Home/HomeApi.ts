import axios from "axios";

export const fetchWholeData =  (
  page: string | number,
  category: string,
  token: string
) => {

  
  return axios.post(import.meta.env.VITE_GET_DATA_URL +
    `?size=8&page=${page}&category=${category}`,{},{
        headers: {
            Authorization: token,
            "Content-type": "application/json; charset=UTF-8",
          }
    }).then((res)=>{
        // console.log(res.data)
        return res
       })
 
}

