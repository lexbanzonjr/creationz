import CategoryForm from "../../components/admin/CategoryForm";
import CategoryList from "../../components/admin/CategoryList";
import { useAuth } from "../../context/AuthContext";
import { Category } from "../../types/global";

interface CategoryPageProps {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}

const CategoryPage: React.FC<CategoryPageProps> = (props) => {
  const { getAccessToken } = useAuth();

  const handleAddCategory = async (category: Category) => {
    try {
      await axios.post("https://localhost:5000/category", category, {
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

    props.setCategories((prevCategories) => [...prevCategories, category]);
  };

  const handleDeleteCategory = async (category: Category) => {
    try {
      await axios.delete("https://localhost:5000/category", {
        params: { _id: category._id },
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

    props.setCategories((prevCategories) =>
      prevCategories.filter((cat) => cat._id !== category._id)
    );
  };

  return (
    <div>
      <CategoryForm />
      <CategoryList />
    </div>
  );
};

export default CategoryPage;
