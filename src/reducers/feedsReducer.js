import { REMOVE_FEEDS } from "../actions/types";

const initialState = {
  feeds: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case REMOVE_FEEDS:
      return {
        ...state,
        feeds: action.feeds
      };
    default:
      return state;
  }
}
