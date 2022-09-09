import React from 'react'
import { Carousel } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchMovieCarouselAction } from 'features/booking/action';

const contentStyle = {
    height: '400px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    backgroundPosition: 'center',
    backgroundSize: '100%',
    backgroundRepeat: 'no-repeat'
};

function HomeCarousel() {
    const dispatch = useDispatch()

    const carousel = useSelector((state) => {
        return state.booking.carousell;
    })
    useEffect(() => {
        dispatch(fetchMovieCarouselAction)
    }, [])

    const renderImg = () => {
        return carousel?.map((item) => {
            return <div style={{ ...contentStyle, backgroundImage: `url(${item.hinhAnh})` }}>
                <img style={{ width: "100vh" }} src={item.hinhAnh} />
            </div>


        })
    }
    return (
        <Carousel effect="fade">
            {renderImg()}

        </Carousel>
    )
}

export default HomeCarousel;