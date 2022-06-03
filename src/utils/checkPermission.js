import { useRouter } from "next/router";

import useAuth from "@hooks/useAuth";
import { toast } from "react-toastify";

export default function CheckPermission(path) {
  const {
    auth: { employee },
  } = useAuth();
  const router = useRouter();
  let allow = false;
  employee.modules.map((module) => {
    if (module.path === path) {
      allow = true;
    }
  });
  if (allow === false) {
    toast.info("No Puede acceder a ese modulo");
    router.push("/home");
  }
}
