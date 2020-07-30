export const localstorage = {
  userId: localStorage.getItem("userId"),
  name: localStorage.getItem("name"),
  username: localStorage.getItem("username"),
};

//export const server = "https://shrouded-thicket-89855.herokuapp.com";
export const server = "http://localhost:8080";

export const URL = {
  login: `${server}/login`,
  signup: `${server}/signup`,
  getProfile: `${server}/profile/`,
  getPosts: `${server}/post/`,
  insertPost: `${server}/post/insert`,
  deletePost: `${server}/post/delete`,
  updateProfile: `${server}/profile/update`,
  getAllUsers: `${server}/all`,
  follow: `${server}/followers/follow`,
  unfollow: `${server}/followers/unfollow`,
  getProfileStats: `${server}/profile/stats`,
};
