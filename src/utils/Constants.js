export const userId = localStorage.getItem("userId");
export const name = localStorage.getItem("name");
export const username = localStorage.getItem("username");

export const server = "https://shrouded-thicket-89855.herokuapp.com";
// export const server = "http://localhost:8080";

export const URL = {
  login: `${server}/login`,
  signup: `${server}/signup`,
  getProfile: `${server}/profile/`,
  getPosts: `${server}/post/`,
  getFeedPosts: `${server}/post/feed`,
  insertPost: `${server}/post/insert`,
  deletePost: `${server}/post/delete`,
  updateProfile: `${server}/profile/update`,
  getAllUsers: `${server}/all`,
  getFollowers: `${server}/followers/followers`,
  getFollowing: `${server}/followers/following/`,
  follow: `${server}/followers/follow`,
  unfollow: `${server}/followers/unfollow`,
  getProfileStats: `${server}/profile/stats`,
  likePost: `${server}/post/like`,
  getPostLikers: `${server}/post/likers`,
  getUserByUsername: `${server}/username`,
  insertComment: `${server}/post/comment`,
  deleteComment: `${server}/post/comment/delete`,
};
