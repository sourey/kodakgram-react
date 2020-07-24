export const headers = {
  Authorization: `Bearer ${getAccessToken()}`,
};

export function getAccessToken() {
  return localStorage.getItem("token");
}

export const server = "https://shrouded-thicket-89855.herokuapp.com";

export const URL = {
  login: `${server}/login`,
  getProfile: `${server}/profile/`,
  insertPost: `${server}/post/insert`,
};
