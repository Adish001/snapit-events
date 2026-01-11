import { useState } from "react";
import { supabase } from "../supabase";

export default function ImageUpload({ onUpload }) {
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const uploadImage = async (e) => {
    e.preventDefault();

    if (!file || !category) {
      alert("Please select image and category");
      return;
    }

    if (category === "lighting" && !subCategory) {
      alert("Please select lighting type");
      return;
    }

    setLoading(true);

    const fileName = `${Date.now()}-${file.name}`;

    // Upload to storage
    const { error: uploadError } = await supabase.storage
      .from("gallery")
      .upload(fileName, file);

    if (uploadError) {
      alert(uploadError.message);
      setLoading(false);
      return;
    }

    // Get public URL
    const { data } = supabase.storage
      .from("gallery")
      .getPublicUrl(fileName);

    // Save to database
    await supabase.from("gallery").insert({
      image_url: data.publicUrl,
      category,
      sub_category: category === "lighting" ? subCategory : null,
    });

    setFile(null);
    setCategory("");
    setSubCategory("");
    setLoading(false);

    onUpload(); // refresh gallery
  };

  return (
    <form
      onSubmit={uploadImage}
      className="bg-white p-4 rounded shadow space-y-3"
    >
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
        required
      />

      {/* CATEGORY */}
      <select
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
          setSubCategory("");
        }}
        required
        className="border p-2 w-full"
      >
        <option value="">Select Category</option>
        <option value="sangeet">Sangeet</option>
        <option value="reception">Reception</option>
        <option value="wedding">Wedding</option>
        <option value="lighting">Lighting</option>
        <option value="corporate">Corporate</option>
      </select>

      {/* LIGHTING SUB-CATEGORY */}
      {category === "lighting" && (
        <select
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value)}
          required
          className="border p-2 w-full"
        >
          <option value="">Select Lighting Type</option>
          <option value="entrance">Entrance Lighting</option>
          <option value="roof">Roof Lighting</option>
        </select>
      )}

      <button
        disabled={loading}
        className="bg-black text-white px-4 py-2 rounded"
      >
        {loading ? "Uploading..." : "Upload Image"}
      </button>
    </form>
  );
}
