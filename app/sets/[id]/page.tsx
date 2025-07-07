"use client";

import React, { useEffect, useState } from "react";
import { Set } from "../../hooks/useSets";
import { useParams } from "next/navigation";

const SetDetails = () => {
  const params = useParams();
  const [set, setSet] = useState<Set | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);

  useEffect(() => {
    const fetchSet = async () => {
      try {
        setLoading(true);
        setError(null);

        const { apiRequest, API_CONFIG } = await import("../../config/api");
        const endpoint = API_CONFIG.ENDPOINTS.SETS.BY_ID(params.id as string);

        console.log("🔗 Fetching set from:", endpoint);

        const data = await apiRequest<Set>(endpoint);
        setSet(data);
        
        // თუ სეტს აქვს ვიდეოები, პირველი ვიდეო ავირჩიოთ
        if (data.videos.length > 0) {
          setSelectedVideo(0);
        }
      } catch (err) {
        console.error("❌ Error fetching set:", err);
        setError(err instanceof Error ? err.message : "Error loading set");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchSet();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-purple-600 border-t-transparent"></div>
      </div>
    );
  }

  if (error || !set) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 mb-2">შეცდომა სეტის ჩატვირთვაში</p>
        <p className="text-gray-500 text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{set.name}</h1>
          <p className="text-gray-600 mb-6">{set.description}</p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* ვიდეო ფლეიერი */}
            <div className="lg:col-span-2">
              {selectedVideo !== null && set.videos[selectedVideo] && (
                <div className="aspect-w-16 aspect-h-9 mb-4">
                  <video
                    src={set.videos[selectedVideo].url}
                    controls
                    className="rounded-lg w-full h-full object-cover"
                    poster={set.videos[selectedVideo].thumbnail}
                  />
                </div>
              )}
              {selectedVideo !== null && set.videos[selectedVideo] && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {set.videos[selectedVideo].title}
                  </h3>
                  <p className="text-gray-600">
                    {set.videos[selectedVideo].description}
                  </p>
                </div>
              )}
            </div>

            {/* სეტის ინფორმაცია და ვიდეოების სია */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold mb-4">გამოწერის გეგმები</h3>
                <div className="space-y-3">
                  {set.subscriptionPlans.map((plan, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm"
                    >
                      <span className="text-gray-700">{plan.period} თვე</span>
                      <span className="font-semibold text-purple-600">
                        {plan.price} ₾
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">ვიდეოები</h3>
                <div className="space-y-2">
                  {set.videos.map((video, index) => (
                    <button
                      key={video.id}
                      onClick={() => setSelectedVideo(index)}
                      className={`w-full text-left p-3 rounded-lg transition-colors duration-200 ${
                        selectedVideo === index
                          ? "bg-purple-100 text-purple-700"
                          : "bg-gray-50 hover:bg-gray-100"
                      }`}
                    >
                      <div className="font-medium">{video.title}</div>
                      {video.duration && (
                        <div className="text-sm text-gray-500">
                          {Math.floor(video.duration / 60)}:
                          {(video.duration % 60).toString().padStart(2, "0")}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetDetails; 