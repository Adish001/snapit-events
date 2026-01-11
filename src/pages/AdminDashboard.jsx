import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import useAdmin from "../hooks/useAdmin";
import ImageUpload from "../components/ImageUpload";

export default function AdminDashboard() {
  const { user, loading } = useAdmin();
  const navigate = useNavigate();

  const [images, setImages] = useState([]);
  const [fetching, setFetching] = useState(false);

  // 🔐 Redirect if not admin
  useEffect(() => {
    if (!loading && !user) {
      navigate("/admin-login", { replace: true });
    }
  }, [loading, user, navigate]);

  // 📸 Fetch images
  const fetchImages = async () => {
    setFetching(true);

    const { data, error } = await supabase
      .from("gallery")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setImages(data || []);
    setFetching(false);
  };

  useEffect(() => {
    if (user) fetchImages();
  }, [user]);

  // ⏳ Loading states
  if (loading) {
    return <p className="p-6">Checking admin session...</p>;
  }

  if (!user) {
    return <p className="p-6">Redirecting to login...</p>;
  }

  // 🗑 Delete image
  const deleteImage = async (img) => {
    if (!window.confirm("Delete this image?")) return;

    const fileName = img.image_url.split("/").pop();

    await supabase.storage.from("gallery").remove([fileName]);
    await supabase.from("gallery").delete().eq("id", img.id);

    fetchImages();
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
      <p className="text-gray-600 mb-6">
        Manage SnapIt Events gallery
      </p>

      {/* ⬆️ IMAGE UPLOAD COMPONENT */}
      <ImageUpload onUpload={fetchImages} />

      {/* 🖼 IMAGE LIST */}
      {fetching ? (
        <p className="mt-6">Loading images...</p>
      ) : images.length === 0 ? (
        <p className="mt-6 text-gray-500">
          No images uploaded yet.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
          {images.map((img) => (
            <div
              key={img.id}
              className="border rounded overflow-hidden shadow-sm"
            >
              <img
                src={img.image_url}
                alt=""
                className="h-40 w-full object-cover"
              />

              <div className="p-2 text-xs">
                <p>
                  <b>Category:</b> {img.category}
                </p>

                {img.sub_category && (
                  <p>
                    <b>Lighting:</b> {img.sub_category}
                  </p>
                )}

                <button
                  onClick={() => deleteImage(img)}
                  className="mt-2 text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
