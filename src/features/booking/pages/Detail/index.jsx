import { Button, Card, Spin, Col, Row } from "antd";
import { formatDate } from "common/utils/date";
import {
  fetchCinemasAction,
  fetchMovieDetailAction,
  fetchMovieScheduleAction,
} from "features/booking/action";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouteMatch } from "react-router-dom";
import { CustomCard } from '@tsamantanis/react-glassmorphism'

function Detail() {
  const match = useRouteMatch();
  const dispatch = useDispatch();


  const movieId = match.params.id;

  const selectedMovie = useSelector((state) => {
    return state.booking.selectedMovie;
  });

  const cinemas = useSelector((state) => {
    return state.booking.cinemas;
  });

  const schedule = useSelector((state) => {
    return state.booking.schedule;
  });

  const fetchMovieDetail = () => {
    dispatch(fetchMovieDetailAction(movieId));
  };

  const fetchCinemas = async () => {
    const data = await dispatch(fetchCinemasAction);
    fetchMovieSchedule(data[0].maHeThongRap);
  };

  const fetchMovieSchedule = (id) => {
    dispatch(fetchMovieScheduleAction(id));
  };

  useEffect(() => {
    fetchMovieDetail();
    fetchCinemas();
  }, []);

  if (!selectedMovie) {
    return <Spin></Spin>;
  }

  return (
    <div>
      <CustomCard
        style={{paddingTop:150 , minHeight:"100vh"}}
        effectColor="#fff" // required
        color="#fff" // default color is white
        blur={10} // default blur value is 10px
        borderRadius={0} // default border radius value is 10px
      >

      </CustomCard>
      <div>
        <Row gutter={20}>
          <Col xs={12} sm={12} md={6} lg={4} >
            <img style={{
              height: 400, objectFit: "cover",
              objectPosition: "center ", marginTop: 20, marginLeft: 40
            }} src={selectedMovie.hinhAnh} />
          </Col>
          <Col span={5} offset={6}>
            {selectedMovie.trailer.startsWith("https") && (
              <iframe
                width="1280"
                height="720"
                src={selectedMovie.trailer}
                title={selectedMovie.tenPhim}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}
          </Col>
        </Row>
      </div>
      <h1>{selectedMovie.tenPhim}</h1>

      <p>{selectedMovie.moTa}</p>
      <div style={{ margin: 30 }}>
        {cinemas?.map((item) => {
          return (
            <img
              style={{ width: 100, marginRight: 20 }}
              src={item.logo}
              alt=""
            />
          );
        })}

        {schedule?.lstCumRap.map((item) => {
          const currentMovie = item.danhSachPhim.find(
            (movie) => movie.maPhim.toString() === movieId
          );

          if (!currentMovie) return null;

          return (
            <Card style={{ margin: 20, background: "#000", color: "#fff" }}>
              <img src={item.hinhAnh} alt="" />
              <p style={{ fontSize: 30 }}>{item.tenCumRap}</p>
              {/* List các suất chiếu */}
              {currentMovie.lstLichChieuTheoPhim.map((show) => {
                return (
                  <Button type="default" style={{ marginRight: 10 }}>
                    {formatDate(show.ngayChieuGioChieu)}
                  </Button>
                );
              })}
            </Card>
          );
        })}
      </div>

    </div>
  );
}

export default Detail;
