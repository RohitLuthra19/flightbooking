import { useState } from "react";
import "./App.css";
import FlightIcon from "./assets/flight-icon.png";

function FlightCard({ flight, onBookNow }) {
  const { departure, company, duration, destination, source, price } = flight;
  return (
    <div className="search-flight">
      <img className="icon" src={FlightIcon} alt="Flight Icon" />
      <div className="details">
        <h1>{departure}</h1>
        <p data-testid="company">{company}</p>
      </div>
      <div className="duration">
        <h1>{duration}</h1>
        <p>{`${source?.key} - ${destination?.key}`}</p>
      </div>
      <div className="price">
        <h1 data-testid="price">&#8377; {price}</h1>
        <button onClick={onBookNow} data-testid="booknow">
          Booknow
        </button>
      </div>
    </div>
  );
}

function FlightBooking() {
  // your code here
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [when, setWhen] = useState("");
  const [flightsData, setFlightsData] = useState([]);
  const [showBookNowForm, setShowBookNowForm] = useState(false);
  const [confirmBooking, setConfirmBooking] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const onChangeSource = (e) => {
    const { value } = e.target;
    setSource(value);
  };
  const onChangeDestination = (e) => {
    const { value } = e.target;
    setDestination(value);
  };
  const onChangeName = (e) => {
    const { value } = e.target;
    setName(value);
  };
  const onChangeEmail = (e) => {
    const { value } = e.target;
    setEmail(value);
  };
  const onChangeWhen = (e) => {
    const { value } = e.target;
    setWhen(value);
  };
  const onSearchFlight = (e) => {
    e.preventDefault();
    fetch("/flights", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((json) => {
        setFlightsData(json);
      })
      .catch((err) => console.log(err));
  };

  const onBookNowOrCancel = (e) => {
    e.preventDefault();
    setShowBookNowForm(!showBookNowForm);
  };

  const onClose = (e) => {
    e.preventDefault();
    setShowBookNowForm(!showBookNowForm);
    setConfirmBooking(false);
    setFlightsData([]);
  };

  const onConfirmBooking = (e) => {
    e.preventDefault();
    fetch("/booking", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((json) => {
        setConfirmBooking(!confirmBooking);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form className="container">
        <label>Flight Booking</label>
        <div className="search-bar">
          <input
            type="text"
            id="source"
            data-testid="source"
            name="source"
            placeholder="Source"
            value={source}
            onChange={onChangeSource}
          />
          <input
            type="text"
            data-testid="destination"
            id="destination"
            name="destination"
            placeholder="Destination"
            value={destination}
            onChange={onChangeDestination}
          />
          <input
            type="date"
            data-testid="when"
            id="when"
            name="when"
            placeholder="When"
            value={when}
            onChange={onChangeWhen}
          />
          <button type="submit" onClick={onSearchFlight}>
            Search Flight
          </button>
        </div>
        <div className="search-list">
          {flightsData != null &&
            flightsData?.length !== 0 &&
            flightsData?.map((flight) => {
              return (
                <FlightCard
                  flight={flight}
                  key={flight?.id}
                  onBookNow={onBookNowOrCancel}
                ></FlightCard>
              );
            })}
        </div>
      </form>
      {showBookNowForm && (
        <div className="booknow-frm">
          {!confirmBooking ? (
            <form className="container">
              <label>Your Details</label>
              <input
                data-testid="name"
                type="text"
                id="name"
                name="name"
                placeholder="Your Name"
                required
                value={name}
                onChange={onChangeName}
              />
              <input
                data-testid="email"
                type="email"
                id="email"
                name="email"
                placeholder="Your Email"
                required
                value={email}
                onChange={onChangeEmail}
              />

              <button
                type="submit"
                data-testid="confirm_booking"
                onClick={onConfirmBooking}
              >
                Confirm Booking
              </button>
              <button onClick={onBookNowOrCancel}>Cancel</button>
            </form>
          ) : (
            <div className="container">
              <p data-testid="result">Booking Confirmed!</p>
              <button onClick={onClose}>Close</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default FlightBooking;
