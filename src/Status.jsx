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
        if (userSelect && userSelect.id_student) {
          const response = await fetch(
            `https://server-production-5a4b.up.railway.app/api/requests/${userSelect.id_student}`
          );

          const data = await response.json();
          setRequests(data);
        }
      } catch (error) {
        console.error("Error fetching user requests:", error);
      }
    };

    fetchUserRequests();
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
        console.error("Error cancelling request:", response.statusText);
      }
    } catch (error) {
      console.error("Error.", error);
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
              <p>Status: {request.stav}</p>
              <button onClick={() => cancelRequest(request.id)}>
                Zrušiť žiadosť
              </button>
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
