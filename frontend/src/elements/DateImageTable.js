import React, { useState } from "react";
import DateModal from "./DateModal";
import {
  Typography,
  Button,
  ImageList,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@mui/material";

function DateImageTable(props) {
  //Modal variables and handlers.
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState([]);
  return (
    <>
      <ImageList cols={4} rowHeight={500} gap={20}>
        {props.results.map((item) => (
          <Card key={item.id} sx={{ maxWidth: 345, boxShadow: 3 }}>
            <CardMedia
              component="img"
              height="200"
              width="200"
              image={item.thumbnail.path + "/portrait_fantastic" + ".jpg"}
              alt="item.title"
              onClick={() => {
                setModalData(item);
                setModalOpen(!modalOpen);
              }}
              sx={{ cursor: "pointer" }}
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {item.title.replace(/\([^()]*\)/g, "")}
              </Typography>

              {item.dates?.[0]?.date != 0 ? (
                <Typography variant="body2" color="text.darkgray">
                  Release Date:{" "}
                  {new Date(item.dates?.[0]?.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Typography>
              ) : (
                <Typography variant="body2" color="text.darkgray">
                  Release Date: Not Found
                </Typography>
              )}
            </CardContent>
            <CardActions>
              <Button
                size="small"
                color="secondary"
                onClick={() => {
                  setModalData(item);
                  setModalOpen(!modalOpen);
                }}
              >
                Book Info
              </Button>
            </CardActions>
          </Card>
        ))}
      </ImageList>
      <DateModal
        modalData={modalData}
        isOpen={modalOpen}
        handleClose={() => setModalOpen(!modalOpen)}
      />
    </>
  );
}

const propCompare = (prevProps, nextProps) => {
  return nextProps.results === prevProps.results;
};

export default React.memo(DateImageTable, propCompare);
