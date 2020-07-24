import axios from "axios";
import { headers, URL } from "./Constants";

export const axiosGet = (url, successCallback, failureCallback) => {
  axios
    .get(url, { headers })
    .then(
      successCallback ||
        function (response) {
          console.log(response);
        }
    )
    .catch(
      failureCallback ||
        function (error) {
          console.log(error);
        }
    );
  //thenCatchGet(doGet, successCallback, failureCallback);
};

export const axiosPost = (url, params, successCallback, failureCallback) => {
  let doPost =
    url === URL.login
      ? axios.post(url, params)
      : axios.post(url, params, { headers });
  thenCatchPost(doPost, successCallback, failureCallback);
};

const thenCatchPost = (doPost, successCallback, failureCallback) => {
  doPost
    .then(
      successCallback ||
        function (response) {
          console.log(response);
        }
    )
    .catch(
      failureCallback ||
        function (error) {
          console.log(error);
        }
    );
};

// const thenCatchGet = (doGet, successCallback, failureCallback) => {
//   doGet
//     .then(
//       successCallback ||
//         function (response) {
//           console.log(response);
//         }
//     )
//     .catch(
//       failureCallback ||
//         function (error) {
//           console.log(error);
//         }
//     );
// };
