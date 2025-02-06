import axios from "axios";
import { SuspensePostType } from "../../types/SuspenseType";

// export const SuspenseTest = async () => {
//   await axios
//     .get("https://jsonplaceholder.typicode.com/posts")
//     .then((res) => {
//       return res.data;
//     })
//     .catch(() => {
//       (error: string) => {
//         console.log(error);
//       };
//     });
// };

export const SuspenseTest = async () => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/photos"
    );
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const SuspenseQueryTest = async () => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    return response.data;
  } catch (err) {
    console.error(err);
  }
};
export const SuspenseQueriesTest = async () => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    return response.data;
  } catch (err) {
    console.error(err);
  }
};
export const SuspenseInfiniteQueryTest = async ({ pageParam = 1 }) => {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/users?_page=${pageParam}&_limit=5`
  );
  const totalUsers = 10;
  const hasNextPage = pageParam * 5 < totalUsers;
  return {
    users: response.data,
    nextPage: hasNextPage ? pageParam + 1 : undefined,
  };
};

// export const SuspenseDannyPost = (data: SuspensePostType) => {
//   axios
//     .post("https://jsonplaceholder.typicode.com/posts", data)
//     .then((res) => res.data)
//     .catch((err) => {
//       console.log(err);
//     })
//     .finally(() => {
//       console.log("Success");
//     });
// };

export const SuspenseDannyPost = async (data: SuspensePostType) => {
  try {
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/posts",
      data
    );

    return response.data;
  } catch (err) {
    console.log(err);
  }
};
export const SuccessSuspensePost = async (data?: string) => {
  try {
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/comments",
      data
    );

    return response.data;
  } catch (err) {
    console.log(err);
  }
};
