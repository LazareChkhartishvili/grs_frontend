import { Video } from "../types/category";

interface VideoPlayerProps {
  video: Video;
}

const getLocale = (): "ka" | "en" | "ru" => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("locale");
    if (stored === "ka" || stored === "en" || stored === "ru") {
      return stored;
    }
  }
  return "ka";
};

const getLocalizedText = (
  field: { ka: string; en: string; ru: string },
  locale: "ka" | "en" | "ru"
) => {
  return field[locale] || field.ka || field.en || field.ru;
};

const VideoPlayer = ({ video }: VideoPlayerProps) => {
  const locale = getLocale();

  return (
    <div>
      <div className="aspect-w-16 aspect-h-9 mb-4">
        <video
          src={video.urls.hd || video.urls.sd}
          controls
          className="rounded-lg w-full h-full object-cover"
          poster={video.thumbnail || "/default-thumbnail.jpg"}
        />
      </div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">
          {getLocalizedText(video.title, locale)}
        </h3>
        <p className="text-gray-600">
          {getLocalizedText(video.description, locale)}
        </p>
      </div>
    </div>
  );
};

export default VideoPlayer;
