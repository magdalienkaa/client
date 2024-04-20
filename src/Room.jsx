import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./App.css";

const Room = ({ filters }) => {
  const [roomData, setRoomData] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [requestStatus, setRequestStatus] = useState(null);
  const selector = useSelector((state) => state);
  const userSelect = selector.userStore.userData;

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const response = await fetch(
          "https://server-production-5a4b.up.railway.app/api/izba"
        );
        const data = await response.json();
        setRoomData(data);
      } catch (error) {
        console.error("Chyba pri načítaní informácií o izbách:", error);
      }
    };

    fetchRoomData();
  }, []);

  const showAlert = (message) => {
    alert(message);
  };

  const handleSelectRoom = async (id_izba) => {
    try {
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
    } catch (error) {
      console.error("Chyba pri výbere izby:", error);
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
      room.id_izba !== selectedRoom &&
      !(requestStatus && requestStatus.stav !== "zamietnuté") &&
      (!filters.roomName ||
        room.nazov.toLowerCase().includes(filters.roomName.toLowerCase()))
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
            >
              <p className="room-name">{room.nazov}</p>
              <p>{room.cislo_izby}</p>
              <p>{room.orientacia}</p>
              <p>{room.typ_izby}</p>
              <p>{room.stav_rekonstrukcie}</p>
              <p>{room.poschodie}.poschodie</p>
              <p>BLOK {room.blok}</p>
              <p>{parseInt(room.cena)}€</p>
              <button
                onClick={() => handleSelectRoom(room.id_izba)}
                className="room-button"
              >
                Zvoliť
              </button>
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
