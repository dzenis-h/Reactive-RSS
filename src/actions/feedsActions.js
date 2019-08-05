import { REMOVE_FEEDS } from "../actions/types";

export const removeFeeds = feeds => {
  return {
    type: REMOVE_FEEDS,
    feeds
  };
};
