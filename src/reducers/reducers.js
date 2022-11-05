export function postsReducer(state, action) {
  switch (action.type) {
    case "FEEDS_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FEEDS_SUCCESS":
      return { ...state, loading: false, feeds: action.payload, error: "" };
    case "FEEDS_ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
