import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import kartinka1 from '../../assets/tempImages/swiperPic1.png'
import kartinka2 from '../../assets/tempImages/swiperPic2.png'
import kartinka3 from '../../assets/tempImages/swiperPic3.png'
import kartinka5 from '../../assets/tempImages/swiperPic5.png'

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper";
import { Box, Button, Card, Typography } from '@mui/material';
import useModal from '../../hooks/useModal';


const IntroSwiper = () => {

    const modal = useModal()

    const swiperRef = useRef();

    const onSignUpClick = () => {
        // TODO ВСПЛИВАШКА
        modal.close('intro-page')
        // localStorage.setItem('notFirstTime?', true)
        // window.location.reload();
        // //TODO redirect
    }

    return (
      <Swiper
        spaceBetween={100}
        onSwiper={swiper => {
          swiperRef.current = swiper;
        }}
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
        allowTouchMove={false}
      >
        {/* 1 slide */}
        <SwiperSlide>
          <Card
            variant="outlined"
            sx={{
              margin: '0 auto',
              maxWidth: '500px',
              px: '20px',
              border: '1px solid transparent',
            }}
          >
            <Typography
              sx={{
                fontSize: '24px',
                fontFamily: 'Roboto',
                fontWeight: 500,
                letterSpacing: '.1rem',
                textAlign: 'center',
                py: '15px',
              }}
            >
              Welcome to HoneyMoney!
            </Typography>

            <Box
              sx={{
                maxWidth: '200px',
                maxHeight: '800px',
                margin: '0 auto',
              }}
            >
              <img
                style={{ width: '100%', height: '100%' }}
                src={kartinka1}
                alt="kartinka1"
              />
            </Box>
            <Box>
              <Typography
                sx={{
                  fontSize: '18px',
                  fontFamily: 'Roboto',
                  fontWeight: 400,
                  letterSpacing: '.1rem',
                  textAlign: 'center',
                  pb: '20px',
                  pt: '10px',
                }}
              >
                HoneyMoney is an application that helps you to keep up eye on
                your wishes easily using banka.
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                pb: '25px',
                px: '30px',
              }}
            >
              <Button
                onClick={() => swiperRef.current.slideTo(3)}
                variant="outlined"
                color="secondary"
                sx={{}}
              >
                Skip
              </Button>
              <Button
                onClick={() => swiperRef.current.slideNext(200)}
                variant="outlined"
                sx={{}}
              >
                Next
              </Button>
            </Box>
          </Card>
        </SwiperSlide>

        {/* 2 slide */}
        <SwiperSlide style={{ height: 'auto' }}>
          <Card
            variant="outlined"
            sx={{
              margin: '0 auto',
              maxWidth: '500px',
              px: '20px',
              height: '100%',
              border: '1px solid transparent',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Typography
              sx={{
                fontSize: '24px',
                fontFamily: 'Roboto',
                fontWeight: 500,
                letterSpacing: '.1rem',
                textAlign: 'center',
                py: '15px',
              }}
            >
              What is banka?
            </Typography>

            <Box
              sx={{
                maxWidth: '200px',
                maxHeight: '800px',
                margin: '0 auto',
                flex: '0 1 50%',
              }}
            >
              <img
                style={{ width: '100%', height: '100%' }}
                src={kartinka5}
                alt="kartinka1"
              />
            </Box>
            <Box>
              <Typography
                sx={{
                  fontSize: '18px',
                  fontFamily: 'Roboto',
                  fontWeight: 400,
                  letterSpacing: '.1rem',
                  textAlign: 'center',
                  pb: '20px',
                  pt: '10px',
                }}
              >
                Banka is storage for your money, you can share it with your
                friend or even make it public.
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                pb: '25px',
                px: '30px',
              }}
            >
              <Button
                onClick={() => swiperRef.current.slidePrev(200)}
                variant="outlined"
                sx={{}}
              >
                Prev
              </Button>
              <Button
                onClick={() => swiperRef.current.slideNext(200)}
                variant="outlined"
                sx={{}}
              >
                Next
              </Button>
            </Box>
          </Card>
        </SwiperSlide>

        {/* 3 slide */}
        <SwiperSlide style={{ height: 'auto' }}>
          <Card
            variant="outlined"
            sx={{
              margin: '0 auto',
              maxWidth: '500px',
              px: '20px',
              height: '100%',
              border: '1px solid transparent',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Typography
              sx={{
                fontSize: '24px',
                fontFamily: 'Roboto',
                fontWeight: 500,
                letterSpacing: '.1rem',
                textAlign: 'center',
                py: '15px',
              }}
            >
              Handy wishlist
            </Typography>

            <Box
              sx={{
                maxWidth: '200px',
                maxHeight: '800px',
                margin: '0 auto',
                flex: '0 1 50%',
              }}
            >
              <img
                style={{
                  width: '150%',
                  height: '100%',
                  position: 'relative',
                  right: '25%',
                }}
                src={kartinka3}
                alt="kartinkaWishlist"
              />
            </Box>
            <Box>
              <Typography
                sx={{
                  fontSize: '18px',
                  fontFamily: 'Roboto',
                  fontWeight: 400,
                  letterSpacing: '.1rem',
                  textAlign: 'center',
                  pb: '20px',
                  pt: '10px',
                }}
              >
                You can easily transform items from wishlist to your banka and
                adjust them!
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                pb: '25px',
                px: '30px',
              }}
            >
              <Button
                onClick={() => swiperRef.current.slidePrev(200)}
                variant="outlined"
                sx={{}}
              >
                Prev
              </Button>
              <Button
                onClick={() => swiperRef.current.slideNext(200)}
                variant="outlined"
                sx={{}}
              >
                Next
              </Button>
            </Box>
          </Card>
        </SwiperSlide>

        {/* 4 slide */}
        <SwiperSlide style={{ height: 'auto' }}>
          <Card
            variant="outlined"
            sx={{
              margin: '0 auto',
              maxWidth: '500px',
              px: '20px',
              height: '100%',
              border: '1px solid transparent',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Typography
              sx={{
                fontSize: '24px',
                fontFamily: 'Roboto',
                fontWeight: 500,
                letterSpacing: '.1rem',
                textAlign: 'center',
                py: '15px',
              }}
            >
              Secure and reliable
            </Typography>

            <Box
              sx={{
                maxWidth: '200px',
                maxHeight: '800px',
                margin: '0 auto',
                flex: '0 1 50%',
              }}
            >
              <img
                style={{
                  width: '150%',
                  height: '100%',
                  position: 'relative',
                  right: '26%',
                }}
                src={kartinka2}
                alt="kartinka1"
              />
            </Box>
            <Box>
              <Typography
                sx={{
                  fontSize: '18px',
                  fontFamily: 'Roboto',
                  fontWeight: 400,
                  letterSpacing: '.1rem',
                  textAlign: 'center',
                  pb: '20px',
                  pt: '10px',
                }}
              >
                Your saves are save since you withdraw them and until you take
                them back. Go on and try!
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                pb: '25px',
                px: '30px',
              }}
            >
              <Button
                onClick={() => swiperRef.current.slidePrev(200)}
                variant="outlined"
                sx={{}}
              >
                Prev
              </Button>
              <Button
                onClick={onSignUpClick}
                variant="outlined"
                color="success"
                sx={{}}
              >
                Get In
              </Button>
            </Box>
          </Card>
        </SwiperSlide>
      </Swiper>
    );
}

export default IntroSwiper