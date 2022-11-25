import React from "react";
import Carousel from "react-material-ui-carousel";

export default function DatePageCarousel(props) {
  var carouselImages = [];
  if (props.images?.[0]?.path) {
    carouselImages.push({ img: props.images[0].path });
  }
  if (props.images?.[1]?.path) {
    carouselImages.push({ img: props.images[1].path });
  }
  if (props.images?.[2]?.path) {
    carouselImages.push({ img: props.images[2].path });
  }
  if (props.images?.[3]?.path) {
    carouselImages.push({ img: props.images[3].path });
  }
  if (props.images?.[4]?.path) {
    carouselImages.push({ img: props.images[4].path });
  }
  if (props.images?.[5]?.path) {
    carouselImages.push({ img: props.images[5].path });
  }
  if (props.images?.[6]?.path) {
    carouselImages.push({ img: props.images[6].path });
  }
  if (props.images?.[7]?.path) {
    carouselImages.push({ img: props.images[7].path });
  }

  return (
    <Carousel
      navButtonsAlwaysVisible={false}
      cycleNavigation={true}
      indicators={false}
      autoPlay={false}
      sx={{ height: props.ht, width: props.wd }}
      fullHeightHover={false}
      navButtonsProps={{
        style: {
          color: "black",
        },
      }}
      navButtonsWrapperProps={{
        style: {},
      }}
      indicatorIconButtonProps={{
        style: {
          padding: "2px",
          color: "white",
        },
      }}
      activeIndicatorIconButtonProps={{
        style: {
          backgroundColor: "cornflowerblue",
        },
      }}
      indicatorContainerProps={{
        style: {
          marginTop: "8px",
          textAlign: "center",
        },
      }}
    >
      {carouselImages.map((item, i) => (
        <CarItem key={i} item={item} />
      ))}
    </Carousel>
  );
}

function CarItem(props) {
  return (
    <img
      src={`${props.item.img}/portrait_uncanny.jpg`}
      alt={props.item.img}
      loading="lazy"
      width="100%"
    />
  );
}
