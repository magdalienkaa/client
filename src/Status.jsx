import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import User from "./User";

const Status = () => {
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sortByPoints, setSortByPoints] = useState("");
  const [sortByTime, setSortByTime] = useState("");
  const selector = useSelector((state) => state);
  const userSelect = selector.userStore.userData;

  useEffect(() => {
    const fetchUserRequests = async () => {
      try {
        let url = `https://server-production-5a4b.up.railway.app/api/requests/${userSelect.id_student}`;

        if (sortByPoints) {
          url += `?sortByPoints=${sortByPoints}`;
        }

        if (sortByTime) {
          url += `&sortByTime=${sortByTime}`;
        }

        const response = await fetch(url);
        const data = await response.json();
        setRequests(data);
      } catch (error) {
        console.error("Chyba pri načítavaní žiadostí.", error);
      }
    };

    if (userSelect && userSelect.id_student) {
      fetchUserRequests();
    }
  }, [userSelect, sortByPoints, sortByTime]);

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

  const approveRequest = async (id, id_student) => {
    try {
      const response = await fetch(
        `https://server-production-5a4b.up.railway.app/api/approve/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_student: id_student,
          }),
        }
      );

      const responseData = await response.json();

      if (response.ok) {
        const updatedRequests = requests.map((request) =>
          request.id === id ? { ...request, stav: responseData.stav } : request
        );
        setRequests(updatedRequests);
        console.log("Žiadosť bola úspešne schválená.");
      } else {
        console.error("Chyba pri schvaľovaní žiadosti:", responseData.error);
      }
    } catch (error) {
      console.error("Chyba:", error);
    }
  };

  const rejectRequest = async (id) => {
    try {
      const response = await fetch(
        `https://server-production-5a4b.up.railway.app/api/reject/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseData = await response.json();

      if (response.ok) {
        const updatedRequests = requests.map((request) =>
          request.id === id ? { ...request, stav: responseData.stav } : request
        );
        setRequests(updatedRequests);
        console.log("Žiadosť bola úspešne zamietnutá.");
      } else {
        console.error("Chyba pri zamietaní žiadosti:", responseData.error);
      }
    } catch (error) {
      console.error("Chyba:", error);
    }
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortByPoints(e.target.value);
  };

  const getRequestColor = (stav) => {
    switch (stav) {
      case "schválené":
        return "green";
      case "zamietnuté":
        return "red";
      default:
        return "black";
    }
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
        <div className="filter-dropdown">
          <label htmlFor="filter">Zoradiť podľa stavu:</label>
          <select
            id="filter"
            value={filter}
            onChange={handleFilterChange}
            className="status-filter"
          >
            <option value="all">Všetky</option>
            <option value="schválené">Schválené</option>
            <option value="zamietnuté">Zamietnuté</option>
            <option value="nevybavené">Nevybavené</option>
          </select>
        </div>
        <div className="filter-dropdown">
          <label htmlFor="sortByTime">Zoradiť podľa času žiadosti:</label>
          <select
            id="sortByTime"
            value={sortByTime}
            onChange={(e) => setSortByTime(e.target.value)}
            className="status-filter"
          >
            <option value="">Nezoradené</option>
            <option value="asc">Od najstaršej po najnovšiu</option>
            <option value="desc">Od najnovšej po najstaršiu</option>
          </select>
        </div>

        {userSelect && userSelect.role === "admin" && (
          <div className="filter-dropdown">
            <label htmlFor="sortByPoints">Zoradiť podľa bodov:</label>
            <select
              id="sortByPoints"
              value={sortByPoints}
              onChange={handleSortChange}
              className="status-filter"
            >
              <option value="">Nezoradené</option>
              <option value="asc">Od najmenej po najviac</option>
              <option value="desc">Od najviac po najmenej</option>
            </select>
          </div>
        )}

        {filteredRequests.length > 0 ? (
          filteredRequests.map((request) => (
            <div
              className="request"
              key={request.id}
              style={{ color: getRequestColor(request.stav) }}
            >
              <p>Číslo izby: {request.cislo_izby}</p>
              {userSelect && userSelect.role === "admin" && (
                <p>ID študenta: {request.id_student}</p>
              )}
              <p>Body: {request.body}</p>
              <p>Stav: {request.stav ? request.stav : "Neznámy"}</p>
              {userSelect && userSelect.role === "admin" && (
                <div>
                  <button
                    onClick={() =>
                      approveRequest(request.id, request.id_student)
                    }
                    className="admin-button approve-button"
                  >
                    Potvrdiť žiadosť
                  </button>
                  <button
                    onClick={() => rejectRequest(request.id)}
                    className="admin-button reject-button"
                  >
                    Zamietnuť žiadosť
                  </button>
                </div>
              )}
              {userSelect &&
                userSelect.role !== "admin" &&
                request.stav === "nevybavené" && (
                  <button
                    onClick={() => cancelRequest(request.id)}
                    className="user-button cancel-button"
                  >
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
