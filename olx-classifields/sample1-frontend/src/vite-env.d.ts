/// <reference types="vite/client" />

interface dataType{
    name:string, description:string, category:string, image:string, location:string, postedAt:string,
     price:string,signatureID?:string|number,id?:string|number,_id?:string|number
}


interface stateType{
    loading:boolean,
    error:boolean,
    data:{}
}