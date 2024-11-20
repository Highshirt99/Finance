import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

 export const registerUser = async (data) => {

  try {
    const response = await axios.post(`${baseUrl}/api/auth/register`, data);
    // console.log(response)
    return response
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  
  }
}


export const loginUser = async (data) => {
    try {
        const response = await axios.post(`${baseUrl}/api/auth/login`, data);
        // console.log(response)
        return response
    } catch (error) {
      if (error.response && error.response.data.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error(error.message);
    
    }
    }