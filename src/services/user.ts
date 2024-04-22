import { httpRequest } from "@/utils/axios";

export const fetchUser = async () => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      return;
    }
    const { data } = await httpRequest({
      url: '/api/authenticated/me',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return data
  } catch (error) {
    console.error('Error fetching user:', error);
    localStorage.removeItem('accessToken');
  }
};

export const logout = async () => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      return;
    }
    localStorage.removeItem('accessToken');
    // httpRequest({
    //   url: '/api/authenticated/logout',
    //   method: 'POST',
    //   headers: {
    //     Authorization: `Bearer ${accessToken}`,
    //   },
    // });
  } catch (error) {
    console.error('Error logging out:', error);
  }
}