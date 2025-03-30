// export const API_URL = `${process.env.APP_URL}/api`;
export const API_SERVER_URL = `https://student-auction-server.onrender.com`;

export const getAuthUrl = (string: string) => `/auth${string}`;
export const getAuctionsUrl = (string: string) => `/auction${string}`;
export const getFavoriteAuctionsUrl = (string: string) => `/favourite-auction${string}`;
export const getCategoriesUrl = (string: string) => `/category${string}`;
export const getProfilesUrl = (string: string) => `/user/profile${string}`;
