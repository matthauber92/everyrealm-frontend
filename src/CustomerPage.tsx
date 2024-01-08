import {useEffect} from "react";
import {BurritoService} from "./services";
import {AxiosError, AxiosResponse} from "axios";

const CustomerPage = () => {

  useEffect(() => {
    BurritoService.getBurritos().then((res: AxiosResponse) => {
      console.log(res, "BURRITOS")
    }).catch((e: AxiosError) => {
      console.log(e);
    });
  },[]);

  return (
    <h1>Customer Page</h1>
  )
}

export default CustomerPage