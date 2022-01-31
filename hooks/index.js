import { request } from "graphql-request";
import { useEffect, useState } from "react";
import { useSession } from "@clerk/nextjs";
import useSWR from "swr";

/**
 * Make authenticated GraphQL query request
 * @param {string} query GraphQL query or mutation
 * @param {Object} variables GraphQL Document variables
 * @param {boolean} blockRequest Request blocked if true
 * @returns useSWR object (data, error, isValidating, mutate)
 */
 export const useQuery = (query, variables, blockRequest) => {
  if (!query) {
    throw Error("No query provided to `useQuery`");
  }
  const { getToken } = useSession();
  const endpoint = process.env.NEXT_PUBLIC_HASURA_GRAPHQL_API;
  const fetcher = async () =>
    request(endpoint, query, variables, {
      authorization: `Bearer ${await getToken({ template: "hasura" })}`
    });

  return useSWR(query, blockRequest ? () => {} : fetcher);
};

/**
 * Make authenticated GraphQL upsert mutation with count
 * @param {number} count New count to set
 * @param {Object} data  Previous scoreboard count data 
 * @returns 
 */
export const useCountMutation = (count, data) => {
  const prevCount = data?.scoreboard[0]?.count ?? 0;
  const blockRequest = count < 1 || prevCount === count;

  // Block mutation if count is less than 1 or equal to previous value
  return useQuery(
    `mutation {
      insert_scoreboard_one(
        object: { count: ${count} }, 
        on_conflict: { constraint: scoreboard_pkey, update_columns: count }) {
        count
        user_id
      }
  }`,
    null,
    blockRequest
  );
};

/**
 * Keep track of current count and provide increment function
 * @returns {[ count: number, increment: () => void]}
 */
export const useScoreboard = () => {
  const [count, setCount] = useState(0);
  const { data } = useQuery(`query {
    scoreboard { count, user_id }
  }`);
  const increment = () => {
    setCount(count + 1);
  };

  // Perform mutation on count
  useCountMutation(count, data);

  useEffect(() => {
    if (!count && data?.scoreboard[0]) {
      // Set initial count from database
      setCount(data.scoreboard[0].count);
    }
  }, [count, data]);

  return [count, increment];
};