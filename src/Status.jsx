import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import User from "./User";

const Status = () => {
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState("all"); // Default filter is "all"
  const selector = useSelector((state) => state);
  const userSelect = selector.userStore.userData;

  useEffect(() => {
    const fetchUserRequests = async () => {
      try {
        const response = await fetch(
          `https://server-production-5a4b.up.railway.app/api/requests/${userSelect.id_student}`
        );

        const data = await response.json();
        setRequests(data);
      } catch (error) {
        console.error("Chyba pri načítavaní žiadostí.", error);
      }
    };

    if (userSelect && userSelect.id_student) {
      fetchUserRequests();
    }
  }, [userSelect]);

  const cancelRequest = async (id) => {
    try {
      const response = await fetch(
        `https://server-production-5a4b.up.railway.app/api/request/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setRequests(requests.filter((request) => request.id !== id));
      } else {
        console.error("Chyba pri rušení žiadosti.", response.statusText);
      }
    } catch (error) {
      console.error("Chyba.", error);
    }
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredRequests =
    filter === "all"
      ? requests
      : requests.filter((request) => request.stav === filter);

  return (
    <div>
      <User />
      <div className="status-container">
        <h2>Stav žiadostí</h2>
        <div className="request-filter">
          <label htmlFor="filter">Filtruj podľa stavu:</label>
          <select id="filter" value={filter} onChange={handleFilterChange}>
            <option value="all">Všetky</option>
            <option value="schválené">Schválené</option>
            <option value="zamietnuté">Zamietnuté</option>
            <option value="nevybavené">Nevybavené</option>
          </select>
        </div>
        {filteredRequests.length > 0 ? (
          filteredRequests.map((request) => (
            <div className="request" key={request.id}>
              <p>Číslo izby: {request.cislo_izby}</p>
              {userSelect && userSelect.role === "admin" && (
                <p>ID študenta: {request.id_student}</p>
              )}
              <p>Status: {request.stav ? request.stav : "Neznámy"}</p>
              {userSelect &&
              userSelect.role === "admin" &&
              request.stav !== "schválená" ? (
                <div>
                  <button
                    onClick={() =>
                      approveRequest(request.id, request.id_student)
                    }
                  >
                    Schváliť žiadosť
                  </button>
                  <button onClick={() => rejectRequest(request.id)}>
                    Zamietnuť žiadosť
                  </button>
                </div>
              ) : null}
              {userSelect &&
                userSelect.role !== "admin" &&
                request.stav !== "schválená" && (
                  <button onClick={() => cancelRequest(request.id)}>
                    Zrušiť žiadosť
                  </button>
                )}
            </div>
          ))
        ) : (
          <p>Neboli nájdené žiadne žiadosti.</p>
        )}
      </div>
    </div>
  );
};

export default Status;
