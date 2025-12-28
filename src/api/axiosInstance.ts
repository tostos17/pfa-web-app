// // src/axiosInstance.ts
// import axios from 'axios';
// import { useAuth } from '../context/UserContext';

// // Create a function to get an axios instance with the current access token
// export const useAxios = () => {
//   const { user } = useAuth();

//   const axiosInstance = axios.create({
//     baseURL: `${import.meta.env.VITE_BASE_API_URL}`, 
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: user?.accessToken ? `Bearer ${user.accessToken}` : '',
//     },
//   });

//   // Add response interceptor to handle token expiration, etc.
//   axiosInstance.interceptors.response.use(
//     (response) => response,
//     (error) => {
//       if (error.response && error.response.status === 401) {
//         // Handle token expiration or unauthorized error
//         console.error('Token expired or unauthorized');
//       }
//       return Promise.reject(error);
//     }
//   );

//   return axiosInstance;
// };
