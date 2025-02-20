import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import EventDetails from "./pages/EventDetails.jsx";
import Login from "./pages/Login.jsx";
import MyBookings from "./pages/MyBookings.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const App = () => {
  return (
    // <Provider store={store}>
    //   <PersistGate loading={null} persistor={persistor}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="events/:id"
            element={
              <ProtectedRoute>
                <EventDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="my-bookings"
            element={
              <ProtectedRoute>
                <MyBookings />
              </ProtectedRoute>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
    //   </PersistGate>
    // </Provider>
  );
};

export default App;
