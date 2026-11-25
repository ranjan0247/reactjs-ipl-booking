import { useEffect, useState } from "react";
import { supabase } from "./supabase";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import MatchCard from "./Components/MatchCard";
import Footer from "./Components/Footer";
import "./App.css";

function App() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchMatches = async () => {
    const { data, error } = await supabase
      .from("matches")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error("Error fetching matches:", error);
      setErrorMsg(error.message);
    } else {
      setErrorMsg("");
      setMatches(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMatches();

    const channel = supabase
      .channel("matches-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "matches" },
        (payload) => {
          if (payload.eventType === "UPDATE") {
            setMatches((prev) =>
              prev.map((m) => (m.id === payload.new.id ? payload.new : m))
            );
          } else {
            fetchMatches();
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleBookTicket = async (match) => {
    if (match.available_seats <= 0) return;

    const { error: bookingError } = await supabase
      .from("bookings")
      .insert([
        {
          match_id: match.id,
          user_name: "Ranjan",
          match_title: `${match.team1} vs ${match.team2}`,
          tickets: 1,
          total_price: match.price,
        },
      ]);

    if (bookingError) {
      alert("Booking error: " + bookingError.message);
      return;
    }

    const { error: updateError } = await supabase
      .from("matches")
      .update({ available_seats: match.available_seats - 1 })
      .eq("id", match.id);

    if (updateError) {
      alert("Seat update error: " + updateError.message);
    }
  };

  return (
    <div className="app">
      <Navbar />
      <Hero />

      <main id="matches" className="matches-section">
        <h2>Upcoming Matches</h2>

        {loading && <p>Loading matches from database...</p>}
        {errorMsg && <p style={{ color: "red", marginTop: "1rem" }}>Database Error: {errorMsg}</p>}
        {!loading && !errorMsg && matches.length === 0 && (
          <p style={{ marginTop: "1rem" }}>No matches found in the database table.</p>
        )}

        <div className="matches-grid">
          {matches.map((match) => (
            <MatchCard
              key={match.id}
              team1={match.team1}
              team2={match.team2}
              date={match.date}
              venue={match.venue}
              price={match.price}
              availableSeats={match.available_seats}
              onBook={() => handleBookTicket(match)}
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;