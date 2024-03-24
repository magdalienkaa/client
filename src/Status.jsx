import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import User from "./User";

const Status = () => {
  const [requests, setRequests] = useState([]);
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

  const approveRequest = async (id) => {
    try {
      const response = await fetch(
        `https://server-production-5a4b.up.railway.app/api/approve/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id_student: userSelect.id_student }),
        }
      );

      if (response.ok) {
        setRequests(requests.filter((request) => request.id !== id));
      } else {
        console.error("Chyba pri potrvdzovaní žiadosti.", response.statusText);
      }
    } catch (error) {
      console.error("Chyba.", error);
    }
  };

  return (
    <div>
      <User />
      <div className="status-container">
        <h2>Stav žiadostí</h2>
        {requests.length > 0 ? (
          requests.map((request) => (
            <div className="request" key={request.id}>
              <p>Číslo izby: {request.cislo_izby}</p>
              {userSelect && userSelect.role === "admin" && (
                <p>ID študenta: {request.id_student}</p>
              )}
              <p>Status: {request.stav}</p>
              {userSelect && userSelect.role === "admin" ? (
                <div>
                  <button onClick={() => approveRequest(request.id)}>
                    Potvrdiť žiadosť
                  </button>
                  <button onClick={() => cancelRequest(request.id)}>
                    Zamietnuť žiadosť
                  </button>
                </div>
              ) : (
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
