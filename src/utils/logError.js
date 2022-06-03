import Cookie from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";

export function logError(error) {
  //Sentry Log --- --> ERROR
  console.log("ERROR HANDLER");
  const {
    response: { status, data },
  } = error;
  if (status) {
    switch (status) {
      case 400:
        toast.error(`Ups, Algo ha salido mal. Intente nuevamente.`);
        return status;
        break;
      case 401:
        Cookie.remove("access_token");
        delete axios.defaults.headers.Authorization;
        break;
      case 403:
        toast.info("No tiene los permisos para acceder a ese modulo");
        window.location.href = "/home";
        break;
      case 404:
        toast.error(data.message);
        break;
      case 409:
        toast.error(data.message);
        break;
      case 500:
        toast.error(`Ups, El servicio no está funcionando correctamente`);
        break;
      default:
        break;
    }
  } else {
    toast.error(`El servicio no está funcionando en este momento`);
  }
}
