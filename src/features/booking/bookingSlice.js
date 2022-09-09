import produce from "immer";
import {
  SET_CAROUSEL,
  SET_CINEMAS,
  SET_MOVIES,
  SET_SCHEDULE,
  SET_SELECTED_MOVIE,
} from "./action";

const initialState = {
  movies: null,
  selectedMovie: null,
  cinemas: null,
  schedule: null,
  carousell: null,
};

// shallow
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MOVIES: {
      const nextState = produce(state, (draft) => {
        draft.movies = action.payload;
      });
      return nextState;
    }

    case SET_SELECTED_MOVIE: {
      const nextState = produce(state, (draft) => {
        draft.selectedMovie = action.payload;
      });
      return nextState;
    }

    case SET_CINEMAS: {
      const nextState = produce(state, (draft) => {
        draft.cinemas = action.payload;
      });
      return nextState;
    }

    case SET_SCHEDULE: {
      const nextState = produce(state, (draft) => {
        draft.schedule = action.payload[0];
      });
      return nextState;
    }
    case SET_CAROUSEL: {
      const nextState = produce(state, (draft) => {
        draft.carousell = action.payload;
      });
      return nextState;
    }

    default:
      return state;
  }
};

export default reducer;
