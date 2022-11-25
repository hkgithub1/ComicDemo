import React from "react";
import { Link } from "react-router-dom";
import { Box, ImageList, ImageListItem, ImageListItemBar } from "@mui/material";

export default function ImageTable(props) {
  return (
    <Box sx={{ px: 2, py: 1 }}>
      <ImageList
        cols={props.columns}
        rowHeight={props.rheight}
        gap={props.gapsize}
      >
        {props.results.map((item) => (
          <Link to={`/book/${item.id}`} state={item} key={item.id}>
            <ImageListItem key={item.id}>
              <img
                src={"../../static/images/" + item.first_image + ".jpg"}
                alt={item.book_name}
                loading="lazy"
              />
              <ImageListItemBar
                position="bottom"
                title={item.book_name + " " + item.book_issues}
                subtitle={
                  item.book_author +
                  "/ " +
                  item.book_publisher +
                  " $" +
                  item.book_price
                }
                sx={{ mb: 1 }}
              />
            </ImageListItem>
          </Link>
        ))}
      </ImageList>
    </Box>
  );
}
