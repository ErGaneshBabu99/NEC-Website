export type GalleryPhoto = {
  id: string;
  url: string;
  category: "Field Survey" | "Site Progress" | "Aerial / Drone" | "Community";
  caption: string;
  isPhotoOfTheWeek?: boolean;
};

// Sample/placeholder set — replace these with real site photos as they come
// in. Set isPhotoOfTheWeek on whichever one should feature at the top;
// only one should carry it at a time.
export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1683576657026-e8862b54e13c?fm=jpg&q=80&w=1600&auto=format&fit=crop",
    category: "Site Progress",
    caption: "Bridge structure under construction",
    isPhotoOfTheWeek: true,
  },
  {
    id: "2",
    url: "https://images.unsplash.com/photo-1693907986952-3cd372e4c9d8?fm=jpg&q=80&w=1600&auto=format&fit=crop",
    category: "Field Survey",
    caption: "Water supply pipeline survey",
  },
  {
    id: "3",
    url: "https://images.unsplash.com/photo-1760708626681-59a5373819a6?fm=jpg&q=80&w=1600&auto=format&fit=crop",
    category: "Site Progress",
    caption: "Road construction and grading works",
  },
  {
    id: "4",
    url: "https://necnepal.com/wp-content/uploads/2024/09/1.jpg",
    category: "Community",
    caption: "Rana Tharu and Tharu Homestay project",
  },
  {
    id: "5",
    url: "https://necnepal.com/wp-content/uploads/2024/09/1-1.jpg",
    category: "Site Progress",
    caption: "Maghi Sports Complex",
  },
  {
    id: "6",
    url: "https://necnepal.com/wp-content/uploads/2023/09/Screenshot-141.png",
    category: "Community",
    caption: "Jwalamai Mandir project",
  },
];

export const GALLERY_CATEGORIES = ["All", "Field Survey", "Site Progress", "Aerial / Drone", "Community"] as const;
