import React, { useState, useEffect } from "react";
import Accommodation from "./Accommodation";
import User from "./User";

const Home = () => {
  const [accommodations, setAccommodations] = useState([]);

  async function internat() {
    try {
      const response = await fetch(
        "https://server-production-5a4b.up.railway.app/api/home"
      );
      const data = await response.json();
      setAccommodations(data);
      console.log(response);
      console.log(data);
    } catch (error) {
      console.error("Chyba pri načítavaní informácií o internátoch.", error);
    }
  }

  useEffect(() => {
    internat();
  }, []);

  return (
    <div>
      <div className="user-box">
        <User />
      </div>

      <div className="accommodation-box">
        {accommodations.map((accommodation) => (
          <Accommodation key={accommodation.id_internat} data={accommodation} />
        ))}
      </div>
    </div>
  );
};

export default Home;
