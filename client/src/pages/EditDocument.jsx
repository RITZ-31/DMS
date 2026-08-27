import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

function EditDocument() {
  const { id } = useParams();

  const [document, setDocument] = useState(null);
  const [title, setTitle] = useState("");
const [category, setCategory] = useState("");
  useEffect(() => {
    fetchDocument();
  }, []);

  const fetchDocument = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get(`/documents/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);

      setDocument(response.data);
      setTitle(response.data.title);
setCategory(response.data.category);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  if (!document) {
    return <h2>Loading...</h2>;
  }
  const handleUpdate = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.put(
      `/documents/${id}`,
      {
        title,
        category,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response.data);

    alert("Document updated successfully!");

  } catch (error) {
    console.log(error.response?.data || error.message);
  }
};

  return (
  <div
    style={{
      maxWidth: "500px",
      margin: "50px auto",
      padding: "20px",
      border: "1px solid #ddd",
      borderRadius: "10px",
    }}
  >
    <h2>Edit Document</h2>

    <label>Title</label>

    <input
      type="text"
      value={title}
onChange={(e) => setTitle(e.target.value)}
      style={{
        width: "100%",
        padding: "10px",
        marginBottom: "15px",
      }}
    />

    <label>Category</label>

    <input
      type="text"
      value={category}
onChange={(e) => setCategory(e.target.value)}
      style={{
        width: "100%",
        padding: "10px",
        marginBottom: "15px",
      }}
    />

   <button
  onClick={handleUpdate}
  style={{
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
  }}
>
  Update Document
</button>
  </div>
);
   
}

export default EditDocument;