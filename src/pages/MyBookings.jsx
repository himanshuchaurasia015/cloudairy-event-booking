import { useSelector } from "react-redux";
import { Typography, Card, CardContent, Grid, Box } from "@mui/material";

const MyBookings = () => {
  const user = useSelector((state) => state.auth.user);
  const events = useSelector((state) => state.events.events);

  const userBookings = events.flatMap((event) => {
    const bookedSeats = event.availableSeats.filter(
      (seat) => seat.bookedBy === user.id
    );
    if (bookedSeats.length === 0) return [];

    return [
      {
        eventId: event.id,
        eventName: event.name,
        date: event.date,
        time: event.time,
        venue: event.venue,
        seats: bookedSeats.map((seat) => seat.id),
        totalAmount: bookedSeats.length * event.price,
      },
    ];
  });

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        My Bookings
      </Typography>

      {userBookings.length === 0 ? (
        <Typography>No bookings found.</Typography>
      ) : (
        <Grid container spacing={3}>
          {userBookings.map((booking) => (
            <Grid item xs={12} key={booking.eventId}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {booking.eventName}
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography>
                        <strong>Date:</strong> {booking.date}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography>
                        <strong>Time:</strong> {booking.time}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography>
                        <strong>Venue:</strong> {booking.venue}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography>
                        <strong>Seats:</strong> {booking.seats.join(", ")}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography>
                        <strong>Total Amount:</strong> ${booking.totalAmount}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default MyBookings;
