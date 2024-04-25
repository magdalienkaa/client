import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addUserData } from "./reducers/UserReducer";
import User from "./User";

const Status = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setfilteredRequests] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sortByPoints, setSortByPoints] = useState("");
  const [sortByTime, setSortByTime] = useState("desc");
  const selector = useSelector((state) => state);
  const dispatch = useDispatch();
  const userSelect = selector.userStore.userData;

  const [fetchDone, setFetchDone] = useState(false);

  useEffect(() => {
    const fetchMe = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(
          `https://server-production-5a4b.up.railway.app/api/me`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token: token,
            }),
          }
        );

        const responseData = await response.json();

        dispatch(addUserData(responseData.user));
        setFetchDone(true);
      } catch (error) {
        console.error("Chyba:", error);
      }
    };
    fetchMe();
  }, []);

  useEffect(() => {
    const fetchUserRequests = async () => {
      if (!userSelect) return;

      try {
        let url = `https://server-production-5a4b.up.railway.app/api/requests/${userSelect.id_student}`;

        const response = await fetch(url);
        const data = await response.json();

        setRequests(data);
        setfilteredRequests(data);
      } catch (error) {
        console.error("Chyba pri načítavaní žiadostí.", error);
      }
    };

    fetchUserRequests();
  }, [fetchDone]);

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
          request.id === id ? { ...request, stav: "schválené" } : request
        );
        setfilteredRequests(updatedRequests);
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
          request.id === id ? { ...request, stav: "zamietnuté" } : request
        );
        setfilteredRequests(updatedRequests);
        console.log("Žiadosť bola úspešne zamietnutá.");
      } else {
        console.error("Chyba pri zamietaní žiadosti:", responseData.error);
      }
    } catch (error) {
      console.error("Chyba:", error);
    }
  };

  const handleTimeChange = (e) => {
    setSortByTime(e.target.value);
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

  // Filter
  useEffect(() => {
    let temp = [...requests];

    if (sortByTime === "asc") {
      const reversedTemp = [...temp].reverse(); // Create a shallow copy and then reverse
      temp = [...reversedTemp];
    }

    if (filter === "all") {
      temp = [...temp];
    } else {
      temp = temp.filter((request) => request.stav === filter);
    }

    if (sortByPoints) {
      if (sortByPoints === "asc") {
        temp.sort((a, b) => a.body - b.body); // Sort by points ascending
      } else {
        temp.sort((a, b) => b.body - a.body); // Sort by points descending
      }
    }

    setfilteredRequests(temp);
  }, [filter, sortByPoints, sortByTime]);

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
            onChange={handleTimeChange}
            className="status-filter"
          >
            <option value="desc">Od najnovšej po najstaršiu</option>
            <option value="asc">Od najstaršej po najnovšiu</option>
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
              <div className="request-info">
                <p className="info-item">Číslo izby: {request.cislo_izby}</p>
                {userSelect && userSelect.role === "admin" && (
                  <p className="info-item">ID študenta: {request.id_student}</p>
                )}
                {userSelect && userSelect.role === "admin" && (
                  <p className="info-item">Body: {request.body}</p>
                )}
                <p className="info-item">Stav: {request.stav}</p>

                {/* Conditionally render the admin buttons */}
                <div className="admin-buttons">
                  {userSelect && userSelect.role === "admin" && (
                    <>
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
                    </>
                  )}
                  {/* Render an empty space if user-button is not needed */}
                  {userSelect &&
                    userSelect.role !== "admin" &&
                    request.stav !== "nevybavené" && (
                      <div className="empty-space" />
                    )}
                </div>

                {/* Render user-button */}
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
