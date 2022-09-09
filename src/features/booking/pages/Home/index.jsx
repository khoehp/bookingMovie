import { Pagination } from "antd";
import { fetchMoviesAction } from "features/booking/action";

import MovieList from "features/booking/components/MovieList";
import HomeCarousel from "features/booking/components/HomeCarousel"
import React from "react";
import { useState } from "react";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";

function Home() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();


  const currentPage = new URLSearchParams(location.search).get("page");

  const [config, setConfig] = useState({
    currentPage: +currentPage || 1,
    pageSize: 8,
    totalCount: 0,
  });

  const [count, setCount] = useState(0);

  const changeTotalCount = (total) => {
    setConfig({ ...config, totalCount: total });
  };

  const fetchMovies = async () => {
    dispatch(fetchMoviesAction(config, changeTotalCount));
  };

  const handleChangePage = (page) => {
    //search params
    history.push(`/?page=${page}&a=1`);
    setConfig({ ...config, currentPage: page });
  };

  useEffect(() => {
    fetchMovies();
  }, [config.currentPage]);

  return (
    <div>
     <HomeCarousel />
      <h1 style={{ textAlign: "center", fontSize: 40 }}>Danh sách phim</h1>
      <MovieList />
      <Pagination
        style={{ display: "flex", justifyContent: "center", marginTop: 40 }}
        onChange={handleChangePage}
        current={config.currentPage}
        pageSize={config.pageSize}
        total={config.totalCount}
      />
    </div>

  );
}

export default Home;
