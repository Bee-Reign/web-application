import CheckPermission from "@utils/checkPermission";

export default function History() {
  CheckPermission("/product-output");
  return <div>history</div>;
}
