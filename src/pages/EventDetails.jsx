import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Alert,
  ToggleButton,
  Divider,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

import { ArrowBack } from "@mui/icons-material";
import {
  // setEvents,
  setSelectedEvent,
  toggleSeatSelection,
  bookSeats,
  setBookingStatus,
} from "../store/slices/eventSlices.js";
import { useNavigate, useParams } from "react-router-dom";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedEvent, selectedSeats, bookingStatus, events } = useSelector(
    (state) => state.events
  );
  useEffect(() => {
    const eve = events.find((e) => e.id == id);
    dispatch(setSelectedEvent(eve));
  }, [id]);
  const user = useSelector((state) => state.auth.user);

  const handleBooking = () => {
    if (!user || !selectedEvent) return;

    if (selectedSeats.length === 0) {
      dispatch(setBookingStatus("Please select at least one seat."));
      return;
    }

    dispatch(
      bookSeats({
        eventId: selectedEvent.id,
        seats: selectedSeats,
        userId: user.id,
      })
    );
  };

  if (!selectedEvent) return null;

  return (
    <Box>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => {
          dispatch(setSelectedEvent(null));
          navigate("/");
        }}
        sx={{ mb: 2 }}
      >
        Back to Events
      </Button>

      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {selectedEvent.name}
          </Typography>

          <Typography variant="body1" sx={{ mb: 3 }}>
            {selectedEvent.description}
          </Typography>

          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">
                <strong>Date:</strong> {selectedEvent.date}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">
                <strong>Time:</strong> {selectedEvent.time}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">
                <strong>Venue:</strong> {selectedEvent.venue}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">
                <strong>Price:</strong> ${selectedEvent.price}
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom>
            Select Seats
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(10, 1fr)",
              gap: 1,
              mb: 3,
            }}
          >
            {selectedEvent.availableSeats.map((seat) => (
              <ToggleButton
                key={seat.id}
                value={seat.id}
                selected={selectedSeats.includes(seat.id)}
                onChange={() =>
                  !seat.isBooked && dispatch(toggleSeatSelection(seat.id))
                }
                disabled={seat.isBooked}
                sx={{
                  p: 1,
                  minWidth: 0,
                  aspectRatio: "1",
                }}
              >
                {seat.id}
              </ToggleButton>
            ))}
          </Box>

          {bookingStatus && (
            <Alert
              severity={
                bookingStatus.includes("successful") ? "success" : "error"
              }
              sx={{ mb: 2 }}
            >
              {bookingStatus}
            </Alert>
          )}

          {selectedSeats.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Selected Seats: {selectedSeats.join(", ")}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Total Price: ${selectedSeats.length * selectedEvent.price}
              </Typography>
              <Button
                variant="contained"
                fullWidth
                onClick={handleBooking}
                sx={{ mt: 2 }}
              >
                Book Tickets
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};
export default EventDetails;
