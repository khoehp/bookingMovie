import instance from "api/instance";

export const SET_MOVIES = "booking/SET_MOVIES";
export const SET_SELECTED_MOVIE = "booking/SET_SELECTED_MOVIE";
export const SET_CINEMAS = "booking/SET_CINEMAS";
export const SET_SCHEDULE = "booking/SET_SCHEDULE";
export const SET_CAROUSEL = "booking/SET_CAROUSEL";

//async action
export const fetchMoviesAction = (config, cb) => {
  return async (dispatch) => {
    try {
      console.log("call api in thunk");
      const res = await instance.request({
        url: "/api/QuanLyPhim/LayDanhSachPhimPhanTrang",
        method: "GET",
        params: {
          maNhom: "GP02",
          soTrang: config.currentPage,
          soPhanTuTrenTrang: config.pageSize,
        },
      });
      cb(res.data.content.totalCount);
      dispatch({
        type: SET_MOVIES,
        payload: res.data.content,
      });
    } catch (err) {}
  };
};

export const fetchMovieDetailAction = (id) => {
  return async (dispatch) => {
    try {
      const res = await instance.request({
        url: "/api/QuanLyPhim/LayThongTinPhim",
        method: "GET",
        params: {
          MaPhim: id,
        },
      });

      dispatch({
        type: SET_SELECTED_MOVIE,
        payload: res.data.content,
      });
    } catch (err) {}
  };
};

export const fetchCinemasAction = async (dispatch) => {
  try {
    const res = await instance.request({
      url: "/api/QuanLyRap/LayThongTinHeThongRap",
      method: "GET",
    });

    dispatch({
      type: SET_CINEMAS,
      payload: res.data.content,
    });

    return res.data.content;
  } catch (err) {}
};

export const fetchMovieScheduleAction = (id) => {
  return async (dispatch) => {
    try {
      const res = await instance.request({
        url: "/api/QuanLyRap/LayThongTinLichChieuHeThongRap",
        method: "GET",
        params: {
          maHeThongRap: id,
          maNhom: "GP02",
        },
      });

      dispatch({
        type: SET_SCHEDULE,
        payload: res.data.content,
      });
    } catch (err) {}
  };
};

export const fetchMovieCarouselAction = async (dispatch) => {
  try {
    const res = await instance.request({
      url: "/api/QuanLyPhim/LayDanhSachBanner",
      method: "GET",
    });

    dispatch({
      type: SET_CAROUSEL,
      payload: res.data.content,
    });

    return res.data.content;
  } catch (err) {}
};
