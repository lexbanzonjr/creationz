import ProductForm from "../../components/admin/ProductForm";
import ProductList from "../../components/admin/ProductList";
import { useAuth } from "../../context/AuthContext";
import { Product } from "../../types/global";

interface ProductPageProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const ProductPage: React.FC<ProductPageProps> = (props) => {
  const { getAccessToken } = useAuth();

  const handleAddProduct = async (product: Product) => {
    try {
      await axios.post("https://localhost:5000/product", product, {
        headers: {
          Authorization: `Basic ${getAccessToken}`,
        },
      });
    } catch (error: any) {
      if (error.response.status !== 200)
        alert(
          "Status code: " +
            error.response.status +
            ". " +
            error.response.data.error
        );
    }

    props.setProducts((prevProducts) => [...prevProducts, product]);
  };

  const handleDeleteProduct = async (product: Product) => {
    try {
      await axios.delete("https://localhost:5000/product", {
        params: { _id: product._id },
        headers: {
          Authorization: `Basic ${getAccessToken}`,
        },
      });
    } catch (error: any) {
      if (error.response.status !== 200)
        alert(
          "Status code: " +
            error.response.status +
            ". " +
            error.response.data.error
        );
    }

    props.setProducts((prevProducts) =>
      prevProducts.filter((prod) => prod._id !== product._id)
    );
  };

  return (
    <div>
      <ProductForm />
      <ProductList />
    </div>
  );
};

export default ProductPage;
