// export const API_URL = `${process.env.APP_URL}/api`;
export const API_SERVER_URL = `https://student-auction-server.onrender.com`; // http://192.168.1.6:4200

export const getAuthUrl = (string: string) => `/auth${string}`;
export const getAuctionsUrl = (string: string) => `/auction${string}`;
export const getFavoriteAuctionsUrl = (string: string) => `/favourite-auction${string}`;
export const getCategoriesUrl = (string: string) => `/category${string}`;
export const getChatsUrl = (string: string) => `/chat${string}`;
export const getLocationsUrl = (string: string) => `/location${string}`;
export const getNotificationsUrl = (string: string) => `/notification${string}`;
export const getTransactionsUrl = (string: string) => `/transaction${string}`;
export const getProfilesUrl = (string: string) => `/user/profile${string}`;
export const getReviewsUrl = (string: string) => `/review${string}`;
export const getUsersUrl = (string: string) => `/user${string}`;
export const getBidsUrl = (string: string) => `/bid${string}`;

export const getFileUrl = (string: string) => `${API_SERVER_URL}${string}`;
