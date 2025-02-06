import {
  useMutation,
  useQueries,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  SuccessSuspensePost,
  SuspenseQueriesTest,
  SuspenseQueryTest,
  SuspenseTest,
} from "../Queries";

export const Information = () => {
  return useQuery({
    queryKey: ["dannydata"],
    queryFn: SuspenseTest,
    retry: 2,
  });
};
export const SuspenseInformation = () => {
  return useSuspenseQuery({
    queryKey: ["suspensedata"],
    queryFn: SuspenseQueryTest,
    retry: 2,
  });
};
export const SuspenseQueries = () => {
  return useQueries({
    queries: [
      {
        queryKey: ["posts"],
        queryFn: SuspenseQueryTest,
      },
      {
        queryKey: ["users"],
        queryFn: SuspenseQueriesTest,
      },
    ],
  });
};
// export const SuspenseInfinite = () => {
//   return useSuspenseInfiniteQuery({
//     queryKey: ["suspensedata"],
//     queryFn: SuspenseInfiniteQueryTest,
//   });
// };

export const SuccessSuspense = () => {
  return useMutation({
    mutationFn: (data: string) => SuccessSuspensePost(data),
  });
};

// export const DannyPostQuerry = () => {
//   const mutation = useMutation({
//     mutationFn: () => SuspenseDannyPost(),
//   });
// };

// export const mutation = useMutation({
//   mutationFn: () => SuspenseDannyPost(formData),
// });
