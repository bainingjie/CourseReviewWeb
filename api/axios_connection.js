import axios from "axios";

export default () => {
  return axios.create({
    baseURL:  process.env.NODE_ENV == "production"? `https://ocean.mxyr.tech`:`http://localhost:3000`
  });
};

// export default () => {
//   return axios.create({
//     baseURL:  `https://ocean.mxyr.tech`
//   });
// };