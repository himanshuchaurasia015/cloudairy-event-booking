import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { EventSeat, AccessTime, LocationOn } from "@mui/icons-material";

const Home = () => {
  const navigate = useNavigate();
  const { events } = useSelector((state) => state.events);

  return (
    <Grid container spacing={3}>
      {events.map((event) => (
        <Grid size={12} md={6} key={event.id}>
          <Card
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                {event.name}
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Box display="flex" alignItems="center" mb={1}>
                  <AccessTime sx={{ mr: 1 }} />
                  <Typography variant="body1">
                    {event.date} at {event.time}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" mb={1}>
                  <LocationOn sx={{ mr: 1 }} />
                  <Typography variant="body1">{event.venue}</Typography>
                </Box>
                <Box display="flex" alignItems="center">
                  <EventSeat sx={{ mr: 1 }} />
                  <Typography variant="body1">
                    Available Seats:{" "}
                    {
                      event.availableSeats.filter((seat) => !seat.isBooked)
                        .length
                    }
                  </Typography>
                </Box>
              </Box>
            </CardContent>
            <CardActions sx={{ mt: "auto", p: 2 }}>
              <Button
                variant="contained"
                fullWidth
                onClick={() => {
                  console.log(event);
                  // dispatch(setSelectedEvent(event));
                  navigate(`/events/${event.id}`);
                }}
              >
                View Details & Book
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
export default Home;
