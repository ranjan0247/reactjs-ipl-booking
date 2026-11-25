import { useState } from "react";

function MatchCard({ team1, team2, date, time, venue, price }) {
  const [tickets, setTickets] = useState(0);

  return (
    <div className="match-card">
      <h3>{team1} vs {team2}</h3>
      <p className="match-info">{date} • {time}</p>
      <p className="match-venue">{venue}</p>

      <div className="match-footer">
        <span className="match-price">₹{price}</span>
        <button
          className={tickets > 0 ? "book-btn booked" : "book-btn"}
          onClick={() => setTickets(tickets + 1)}
        >
          {tickets > 0 ? `Booked (${tickets})` : "Book Ticket"}
        </button>
      </div>
    </div>
  );
}

export default MatchCard;