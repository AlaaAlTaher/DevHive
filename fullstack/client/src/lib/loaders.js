import apiRequest from "./apiRequest";
import { defer } from '/src/lib/apiRequest.js';
export const singlePageLoader = async ({ request, params }) => {
  console.log(request)
  const res = await apiRequest("/posts/" + params.id);
  return res.data;
};
export const listPageLoader = async ({ request, params }) => {
  console.log(request)
  const query = request.url.split("?")[1];
  const res = await apiRequest("/posts?" + query); // to take the part after the ? in the search
  return res.data;


  //const postPromise = apiRequest("/posts?" + query);
  //return defer({
  //  postResponse: postPromise,
  //});
};


export const profilePageLoader = async () => {
  const postPromise = apiRequest("/users/profilePosts");
  //const chatPromise = apiRequest("/chats");
  return defer({
    postResponse: postPromise,
    //chatResponse: chatPromise,
  });
};
