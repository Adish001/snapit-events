import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import useAdmin from "../hooks/useAdmin";
import ImageUpload from "../components/ImageUpload";

import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function SortableImage({ img, onDelete }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: img.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="border rounded shadow bg-white cursor-grab active:cursor-grabbing"
    >
      <img
        src={img.image_url}
        alt=""
        className="h-40 w-full object-cover"
      />

      <div className="p-2 text-xs space-y-1">
        <p><b>Category:</b> {img.category}</p>
        {img.sub_category && (
          <p><b>Lighting:</b> {img.sub_category}</p>
        )}

        <button
          onClick={() => onDelete(img)}
          className="text-red-600 hover:underline mt-1"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const { user, loading } = useAdmin();
  const navigate = useNavigate();

  const [images, setImages] = useState([]);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/admin-login", { replace: true });
    }
  }, [loading, user, navigate]);

  const fetchImages = async () => {
    const { data } = await supabase
      .from("gallery")
      .select("*")
      .order("position", { ascending: true });

    setImages(data || []);
  };

  useEffect(() => {
    if (user) fetchImages();
  }, [user]);

  const deleteImage = async (img) => {
    if (!window.confirm("Delete this image?")) return;

    const fileName = img.image_url.split("/").pop();
    await supabase.storage.from("gallery").remove([fileName]);
    await supabase.from("gallery").delete().eq("id", img.id);

    fetchImages();
  };

  /* 🔥 DRAG END HANDLER */
  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = images.findIndex(i => i.id === active.id);
    const newIndex = images.findIndex(i => i.id === over.id);

    const newOrder = arrayMove(images, oldIndex, newIndex);
    setImages(newOrder);

    // 🔐 Save positions to DB
    for (let i = 0; i < newOrder.length; i++) {
      await supabase
        .from("gallery")
        .update({ position: i + 1 })
        .eq("id", newOrder[i].id);
    }
  };

  if (loading) return <p className="p-6">Checking admin session...</p>;
  if (!user) return <p className="p-6">Redirecting...</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
      <p className="text-gray-600 mb-6">
        Drag & drop images to reorder gallery
      </p>

      <ImageUpload onUpload={fetchImages} />

      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={images.map(i => i.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
            {images.map(img => (
              <SortableImage
                key={img.id}
                img={img}
                onDelete={deleteImage}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
