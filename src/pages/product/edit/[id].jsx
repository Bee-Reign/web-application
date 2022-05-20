import Link from "next/link";
import { ViewGridIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { getProduct } from "@service/api/product";
import EditProduct from "@components/Product/Form/EditProduct";

export default function Edit() {
  const [product, setProduct] = useState(undefined);
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    async function getResult() {
      const result = await getProduct(id);
      setProduct(result);
    }
    getResult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router?.isReady]);

  return (
    <>
      <section className="mx-3 xl:mx-6 flex items-center justify-between">
        <div className="flex justify-start items-center">
          <Link href="/product">
            <a>
              <ViewGridIcon className="w-12 text-beereign_silver" />
            </a>
          </Link>
          <p className="ml-2 font-sans font-normal text-2xl">
            Editar Producto
          </p>
        </div>
      </section>

      <section className="mx-3 xl:mx-6 text-center">
        <h2 className="mt-5 text-lg">Información del Producto</h2>
        <EditProduct product={product} />
      </section>
    </>
  );
}
