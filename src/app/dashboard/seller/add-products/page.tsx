import { getUserSession } from "@/lib/core/session";
import CreateProductPage from "./CrerateProduct";

const ProductPage = async () => {
  const user = await getUserSession();

  return (
    <div>
      <CreateProductPage user={user} />
    </div>
  );
};

export default ProductPage;
