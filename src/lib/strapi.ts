// Strapi API configuration
const STRAPI_URL = process.env.REACT_APP_STRAPI_URL || 'http://localhost:1337';

export const strapiApi = {
  baseURL: STRAPI_URL,
  
  // Helper function to build API URLs
  buildUrl: (endpoint: string) => `${STRAPI_URL}/api/${endpoint}`,
  
  // Helper function to get image URL
  getImageUrl: (imageData: any) => {
    if (!imageData) return null;
    if (typeof imageData === 'string') return imageData;
    if (imageData.data?.attributes?.url) {
      return `${STRAPI_URL}${imageData.data.attributes.url}`;
    }
    return null;
  }
};

export default strapiApi;