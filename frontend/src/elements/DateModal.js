import React from "react";
import DatePageCarousel from "./DatePageCarousel";
import CloseIcon from "@mui/icons-material/Close";
import {
  Grid,
  Stack,
  Box,
  Typography,
  IconButton,
  Divider,
  Modal,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.tertiary",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
};

export default function DateModal(props) {
  //Check if price is available if not check if it is found in description.
  const renderPrice = () => {
    const string = props.modalData.description;
    const regexFilter = /(\$[0-9]\.+([0-9]+)?)/g;
    const matches = [];
    let price = 0;
    let hit = null;
    do {
      hit = regexFilter.exec(string);
      if (hit) {
        matches.push(hit[0]);
      }
    } while (hit);

    if (props.modalData.prices?.[0]?.price != 0)
      price = props.modalData.prices?.[0]?.price.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    else if (matches != 0) price = matches;
    else price = "Not Found";

    return (
      <Typography variant="body2" color="text.gray">
        Original Price: {price}
      </Typography>
    );
  };

  return (
    <Modal
      open={props.isOpen}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Stack spacing={1} flexDirection="row" width={1100}>
          <Box>
            <DatePageCarousel {...props.modalData} ht={580} wd={385} />
          </Box>
          <Stack spacing={0.65} sx={{ px: 3 }} width={800}>
            <Stack flexDirection="row" justifyContent="space-between">
              <Typography variant="h5">
                {props.modalData.title?.replace(/\([^()]*\)/g, "")}
              </Typography>
              <IconButton onClick={props.handleClose}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Stack>
            <Stack flexDirection="row" justifyContent="space-between">
              {props.modalData.dates?.[0]?.date != 0 ? (
                <Typography variant="body2" color="text.gray">
                  Release Date:{" "}
                  {new Date(
                    props.modalData.dates?.[0]?.date
                  ).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Typography>
              ) : (
                <Typography variant="body2" color="text.gray">
                  Release Date: Not Found
                </Typography>
              )}

              {renderPrice()}
            </Stack>

            <Divider sx={{ bgcolor: "secondary.main" }} />

            {props.modalData.series?.name != 0 ? (
              <Typography variant="body1">
                Series: {props.modalData.series?.name}
              </Typography>
            ) : (
              <Typography variant="body1">Series: Not Found</Typography>
            )}

            <Stack flexDirection="row" justifyContent="space-between">
              <Grid container spacing={1} display="flex" flexDirection="row">
                <Grid item>
                  <Typography variant="body1">
                    {props.modalData.creators?.items?.[0]?.name}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2" color="text.gray">
                    {props.modalData.creators?.items?.[0]?.role}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={1} display="flex" flexDirection="row">
                <Grid item>
                  <Typography variant="body1">
                    {props.modalData.creators?.items?.[6]?.name}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2" color="text.gray">
                    {props.modalData.creators?.items?.[6]?.role}
                  </Typography>
                </Grid>
              </Grid>
            </Stack>

            <Stack flexDirection="row" justifyContent="space-between">
              <Grid container spacing={1} display="flex" flexDirection="row">
                <Grid item>
                  <Typography variant="body1">
                    {props.modalData.creators?.items?.[1]?.name}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2" color="text.gray">
                    {props.modalData.creators?.items?.[1]?.role}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={1} display="flex" flexDirection="row">
                <Grid item>
                  <Typography variant="body1">
                    {props.modalData.creators?.items?.[7]?.name}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2" color="text.gray">
                    {props.modalData.creators?.items?.[7]?.role}
                  </Typography>
                </Grid>
              </Grid>
            </Stack>

            <Stack flexDirection="row" justifyContent="space-between">
              <Grid container spacing={1} display="flex" flexDirection="row">
                <Grid item>
                  <Typography variant="body1">
                    {props.modalData.creators?.items?.[2]?.name}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2" color="text.gray">
                    {props.modalData.creators?.items?.[2]?.role}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={1} display="flex" flexDirection="row">
                <Grid item>
                  <Typography variant="body1">
                    {props.modalData.creators?.items?.[8]?.name}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2" color="text.gray">
                    {props.modalData.creators?.items?.[8]?.role}
                  </Typography>
                </Grid>
              </Grid>
            </Stack>

            <Stack flexDirection="row" justifyContent="space-between">
              <Grid container spacing={1} display="flex" flexDirection="row">
                <Grid item>
                  <Typography variant="body1">
                    {props.modalData.creators?.items?.[3]?.name}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2" color="text.gray">
                    {props.modalData.creators?.items?.[3]?.role}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={1} display="flex" flexDirection="row">
                <Grid item>
                  <Typography variant="body1">
                    {props.modalData.creators?.items?.[9]?.name}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2" color="text.gray">
                    {props.modalData.creators?.items?.[9]?.role}
                  </Typography>
                </Grid>
              </Grid>
            </Stack>

            <Stack flexDirection="row" justifyContent="space-between">
              <Grid container spacing={1} display="flex" flexDirection="row">
                <Grid item>
                  <Typography variant="body1">
                    {props.modalData.creators?.items?.[4]?.name}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2" color="text.gray">
                    {props.modalData.creators?.items?.[4]?.role}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={1} display="flex" flexDirection="row">
                <Grid item>
                  <Typography variant="body1">
                    {props.modalData.creators?.items?.[10]?.name}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2" color="text.gray">
                    {props.modalData.creators?.items?.[10]?.role}
                  </Typography>
                </Grid>
              </Grid>
            </Stack>

            <Stack flexDirection="row" justifyContent="space-between">
              <Grid container spacing={1} display="flex" flexDirection="row">
                <Grid item>
                  <Typography variant="body1">
                    {props.modalData.creators?.items?.[5]?.name}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2" color="text.gray">
                    {props.modalData.creators?.items?.[5]?.role}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={1} display="flex" flexDirection="row">
                <Grid item>
                  <Typography variant="body1">
                    {props.modalData.creators?.items?.[11]?.name}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2" color="text.gray">
                    {props.modalData.creators?.items?.[11]?.role}
                  </Typography>
                </Grid>
              </Grid>
            </Stack>

            <Divider sx={{ bgcolor: "secondary.main" }} />

            <Typography variant="body1" sx={{ lineHeight: 1.3 }}>
              {props.modalData.description
                ?.replace(/<\/?[^>]+(>|$)/g, "")
                .replace(/(&lsquo;)/g, "'")
                .replace(/(&rsquo;)/g, "'")
                .replace(/(&ldquo;)/g, '"')
                .replace(/(&rdquo;)/g, '"')
                .replace(/(&hellip;)/g, "...")
                .replace(/(&amp;)/g, "&")}
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
}
