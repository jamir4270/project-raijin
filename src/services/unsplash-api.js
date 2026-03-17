const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
const UNSPLASH_BASE_URL = import.meta.env.VITE_UNSPLASH_BASE_URL;
import { cacheService } from "./cache-service";

export const getCityPhoto = async (city) => {
  if (!UNSPLASH_ACCESS_KEY || !UNSPLASH_BASE_URL) {
    console.error("Unsplash API credentials not configured");
    return null;
  }

  const cacheKey = `photo_${city.toLowerCase()}`;

  // Check cache first
  const cachedPhoto = cacheService.get(cacheKey);
  if (cachedPhoto) {
    console.log("Using cached photo for:", city);
    return cachedPhoto;
  }

  try {
    const response = await fetch(
      `${UNSPLASH_BASE_URL}/search/photos?query=${encodeURIComponent(city)}&client_id=${UNSPLASH_ACCESS_KEY}&per_page=1&orientation=portrait`,
      {
        headers: {
          "Accept-Version": "v1",
        },
      },
    );

    if (!response.ok) {
      console.error("Unsplash API error:", response.status);
      return null;
    }

    const data = await response.json();

    if (data.results && data.results.length > 0) {
      const result = data.results[0];
      // Use optimized image URL: specify width for responsive loading
      // Unsplash URLs support width param for automatic optimization
      const optimizedUrl = `${result.urls.raw}&w=400&q=75&fit=crop`;

      const photo = {
        url: optimizedUrl,
        photographer: result.user.name,
        photographerLink: result.user.portfolio_url || result.links.html,
        unsplashLink: result.links.html,
      };

      // Cache for 7 days (photos don't change often)
      cacheService.set(cacheKey, photo, 7 * 24 * 60 * 60 * 1000);
      return photo;
    }

    return null;
  } catch (error) {
    console.error("Error fetching city photo:", error);
    return null;
  }
};
