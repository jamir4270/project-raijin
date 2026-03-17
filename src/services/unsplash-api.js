const UNSPLASH_ACCESS_KEY = "zQKnuYuOWiygVy-R_CCy8nJS-nHaEY0F-G3t0tqlecg";
const UNSPLASH_BASE_URL = "https://api.unsplash.com";

export const getCityPhoto = async (city) => {
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
      return {
        url: data.results[0].urls.regular,
        photographer: data.results[0].user.name,
        photographerLink:
          data.results[0].user.portfolio_url || data.results[0].links.html,
        unsplashLink: data.results[0].links.html,
      };
    }

    return null;
  } catch (error) {
    console.error("Error fetching city photo:", error);
    return null;
  }
};
