import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import MatchCard from "./Components/MatchCard";
import Footer from "./Components/Footer";
import "./App.css";

const matches = [
  {
    id: 1,
    team1: "RCB",
    team2: "CSK",
    date: "April 12, 2026",
    time: "7:30 PM IST",
    venue: "M. Chinnaswamy Stadium, Bengaluru",
    price: 1500,
  },
  {
    id: 2,
    team1: "MI",
    team2: "KKR",
    date: "April 14, 2026",
    time: "7:30 PM IST",
    venue: "Wankhede Stadium, Mumbai",
    price: 1800,
  },
  {
    id: 3,
    team1: "SRH",
    team2: "GT",
    date: "April 16, 2026",
    time: "3:30 PM IST",
    venue: "Rajiv Gandhi Intl. Stadium, Hyderabad",
    price: 1200,
  },
  {
    id: 4,
    team1: "RR",
    team2: "DC",
    date: "April 18, 2026",
    time: "7:30 PM IST",
    venue: "Sawai Mansingh Stadium, Jaipur",
    price: 1400,
  },
];

function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />

      <main id="matches" className="matches-section">
        <h2>Upcoming Matches</h2>
        <div className="matches-grid">
          {matches.map((match) => (
            <MatchCard
              key={match.id}
              team1={match.team1}
              team2={match.team2}
              date={match.date}
              time={match.time}
              venue={match.venue}
              price={match.price}
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;