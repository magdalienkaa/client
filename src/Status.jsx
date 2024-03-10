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
            `https://client-production-8f11.up.railway.app/api/requests/${userSelect.id_student}`
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
