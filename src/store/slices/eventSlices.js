import { createSlice } from "@reduxjs/toolkit";

const initialEvents = [
  {
    id: 1,
    name: "Taylor Swift Concert",
    date: "2025-03-15",
    time: "20:00",
    venue: "Madison Square Garden",
    totalSeats: 50,
    availableSeats: Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      isBooked: false,
    })),
    price: 150,
    description: "Experience the Eras Tour live!",
  },
  {
    id: 2,
    name: "Hamilton Musical",
    date: "2025-03-20",
    time: "19:30",
    venue: "Broadway Theatre",
    totalSeats: 40,
    availableSeats: Array.from({ length: 40 }, (_, i) => ({
      id: i + 1,
      isBooked: false,
    })),
    price: 200,
    description: "Don't miss the award-winning musical phenomenon!",
  },
];

const eventSlice = createSlice({
  name: "events",
  initialState: {
    events: initialEvents,
    selectedEvent: null,
    selectedSeats: [],
    bookingStatus: "",
  },
  reducers: {
    setEvents: (state, action) => {
      state.events = action.payload;
    },
    setSelectedEvent: (state, action) => {
      state.selectedEvent = action.payload;
      state.selectedSeats = [];
      state.bookingStatus = "";
    },
    toggleSeatSelection: (state, action) => {
      const seatId = action.payload;
      if (state.selectedSeats.includes(seatId)) {
        state.selectedSeats = state.selectedSeats.filter((id) => id !== seatId);
      } else {
        state.selectedSeats = [...state.selectedSeats, seatId];
      }
    },
    bookSeats: (state, action) => {
      const { eventId, seats, userId } = action.payload;
      state.events = state.events.map((event) => {
        if (event.id === eventId) {
          const updatedSeats = event.availableSeats.map((seat) => ({
            ...seat,
            isBooked: seats.includes(seat.id) ? true : seat.isBooked,
            bookedBy: seats.includes(seat.id) ? userId : seat.bookedBy,
          }));
          return { ...event, availableSeats: updatedSeats };
        }
        return event;
      });
      state.selectedSeats = [];
      state.bookingStatus = "Booking successful!";
    },
    setBookingStatus: (state, action) => {
      state.bookingStatus = action.payload;
    },
  },
});

export const {
  setEvents,
  setSelectedEvent,
  toggleSeatSelection,
  bookSeats,
  setBookingStatus,
} = eventSlice.actions;
export default eventSlice.reducer;
