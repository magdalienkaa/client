import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./App.css";

const Room = ({ filters }) => {
  const [roomData, setRoomData] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [requestStatus, setRequestStatus] = useState(null);
  const selector = useSelector((state) => state);
  const userSelect = selector.userStore.userData;

  const fetchUserRequest = async (userId, roomId) => {
    try {
      const response = await fetch(`/api/user-request/${userId}/${roomId}`);
      const data = await response.json();
      setRequestStatus(data);
    } catch (error) {
      console.error("Error fetching user request:", error);
    }
  };

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const response = await fetch(
          "https://server-production-5a4b.up.railway.app/api/izba"
        );
        const data = await response.json();
        setRoomData(data);
      } catch (error) {
        console.error("Error fetching room data:", error);
      }
    };

    fetchRoomData();
  }, []);

  const showAlert = (message) => {
    alert(message);
  };

  const handleSelectRoom = async (id_izba) => {
    try {
      if (userSelect.id_izba) {
        showAlert("Už si si zvolil/a izbu.");
        return;
      }

      const response = await fetch(
        `https://server-production-5a4b.up.railway.app/api/select/${id_izba}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id_student: userSelect.id_student }),
        }
      );
      const data = await response.json();
      if (!data.success) {
        showAlert(data.error);
        return;
      }

      setSelectedRoom(id_izba);
      showAlert("Izba bola úspešne zvolená.");
      fetchUserRequest(userSelect.id_student, id_izba);
    } catch (error) {
      console.error("Error selecting room:", error);
    }
  };

  const filteredRooms = roomData.filter((room) => {
    return (
      (!filters.orientation || room.orientacia === filters.orientation) &&
      (!filters.block || room.blok === filters.block) &&
      (!filters.floor || room.poschodie === parseInt(filters.floor)) &&
      (!filters.roomType || room.typ_izby === filters.roomType) &&
      (!filters.reconstructionStatus ||
        room.stav_rekonstrukcie === filters.reconstructionStatus) &&
      (!filters.locationOnCorridor ||
        room.umiestnenie_na_chodbe === filters.locationOnCorridor) &&
      // Táto podmienka zabezpečí, že sa izba nezobrazí, ak je už zvolená alebo je v tabuľke žiadostí
      room.id_izba !== selectedRoom &&
      !requestStatus
    );
  });

  return (
    <div className="room-container">
      <div>
        {filteredRooms.length > 0 ? (
          filteredRooms.map((room) => (
            <div
              key={room.id_izba}
              className={`room-box ${
                selectedRoom === room.id_izba ? "selected" : ""
              }`}
              onClick={() => handleSelectRoom(room.id_izba)}
            >
              <p style={{ flex: 2 }}>Internát: {room.nazov}</p>
              <p style={{ flex: 1 }}>{room.cislo_izby}</p>
              <p style={{ flex: 1 }}>{room.orientacia}</p>
              <p style={{ flex: 2 }}>{room.typ_izby}</p>
              <p style={{ flex: 2 }}>{room.stav_rekonstrukcie}</p>
              <p style={{ flex: 3 }}>{room.poschodie} .poschodie</p>
              <p style={{ flex: 2 }}>BLOK {room.blok}</p>
              <p style={{ flex: 2 }}>{room.cena} €</p>
              <img
                src="/images/next.svg"
                alt="Next"
                className="select"
                onClick={() => handleSelectRoom(room.id_izba)}
              />
            </div>
          ))
        ) : (
          <p>Kritériam nevyhovujú žiadne izby.</p>
        )}
      </div>
    </div>
  );
};

export default Room;
