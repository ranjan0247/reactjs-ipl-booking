import { useState } from "react";

function MatchCard({
  team1,
  team2,
  date,
  venue,
  price,
  availableSeats,
  onBook,
}) {
  const [isBooking, setIsBooking] = useState(false);

  const handleClick = async () => {
    setIsBooking(true);
    await onBook();
    setIsBooking(false);
  };

  return (
    <div className="match-card">
      <h3>{team1} vs {team2}</h3>
      <p className="match-info">{date}</p>
      <p className="match-venue">{venue}</p>
      <p className="match-seats">
        Available Seats: <strong>{availableSeats}</strong>
      </p>

      <div className="match-footer">
        <span className="match-price">₹{price}</span>
        <button
          className={availableSeats === 0 ? "book-btn sold-out" : "book-btn"}
          onClick={handleClick}
          disabled={isBooking || availableSeats === 0}
        >
          {availableSeats === 0
            ? "Sold Out"
            : isBooking
            ? "Booking..."
            : "Book Ticket"}
        </button>
      </div>
    </div>
  );
}

export default MatchCard;