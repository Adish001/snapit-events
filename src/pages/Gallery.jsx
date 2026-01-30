import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import PageWrapper from "../components/PageWrapper";
import Section from "../components/Section";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeCategory, setActiveCategory] = useState("all");
  const [lightingType, setLightingType] = useState("all");
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const { data } = await supabase
      .from("gallery")
      .select("*")
      .order("position", { ascending: true });

    setImages(data || []);
    setLoading(false);
  };

  const filteredImages = images.filter((img) => {
    if (activeCategory === "all") return true;

    if (activeCategory === "lighting") {
      if (lightingType === "all") return img.category === "lighting";
      return (
        img.category === "lighting" &&
        img.sub_category === lightingType
      );
    }

    return img.category === activeCategory;
  });

  return (
    <PageWrapper>
      <Section
        title="Our Events Gallery"
        subtitle="A glimpse of moments we’ve crafted"
      >
        {loading ? (
          <div className="py-20 text-center text-gray-400">
            Loading gallery...
          </div>
        ) : (
          <>
            {/* CATEGORY FILTERS */}
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {[
                "all",
                "sangeet",
                "reception",
                "wedding",
                "lighting",
                "corporate",
              ].map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setLightingType("all");
                  }}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                    activeCategory === cat
                      ? "bg-gold text-primary"
                      : "border border-gray-600 text-gray-300 hover:bg-gray-800"
                  }`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>

            {/* LIGHTING SUB FILTER */}
            {activeCategory === "lighting" && (
              <div className="flex justify-center gap-3 mb-10">
                {["all", "entrance", "roof"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setLightingType(type)}
                    className={`px-4 py-1 rounded-full text-sm transition ${
                      lightingType === type
                        ? "bg-gold text-primary"
                        : "border border-gray-600 text-gray-300 hover:bg-gray-800"
                    }`}
                  >
                    {type === "all"
                      ? "All Lighting"
                      : type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            )}

            {/* IMAGE GRID */}
            {filteredImages.length === 0 ? (
              <p className="text-center text-gray-400">
                No images found for this category.
              </p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {filteredImages.map((img) => (
                  <div
                    key={img.id}
                    className="group cursor-pointer"
                    onClick={() => setSelectedImage(img.image_url)}
                  >
                    <div className="relative overflow-hidden rounded-xl shadow-lg">
                      <img
                        src={img.image_url}
                        alt=""
                        className="h-56 w-full object-cover group-hover:scale-110 transition duration-300"
                      />

                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                        <span className="text-white text-sm tracking-wide">
                          View
                        </span>
                      </div>
                    </div>

                    <div className="mt-2 text-xs text-gray-400 text-center">
                      {img.category}
                      {img.sub_category && ` • ${img.sub_category}`}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* LIGHTBOX */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
            onClick={() => setSelectedImage(null)}
          >
            <img
              src={selectedImage}
              alt=""
              className="max-h-[90vh] max-w-[90vw] rounded-lg"
            />
          </div>
        )}
      </Section>
    </PageWrapper>
  );
}
