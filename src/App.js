import { useEffect, useState } from "react";
import "./App.css";

import AddForm from "./AddForm";
import axios from "axios";
import CarService from "./API/CarService";
import CarList from "./CarList";

function App() {
  const [cars, setCars] = useState([
    { id: 0, name: "BMW", price: 50000, brand: "bmw" },
    { id: 1, name: "BMW 2 ", price: 20000, brand: "bmw" },
    { id: 2, name: "BMW 3 ", price: 10000, brand: "bmw" },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [edited, setEdited] = useState({});

  function addCar(newCar) {
    const id = CarService.createCar(newCar);
    newCar.id = id;
    setCars([...cars, newCar]);
  }
  function removeCar(removedCar) {
    CarService.deleteCar(removedCar.id);
    setCars(cars.filter((p) => p.id !== removedCar.id));
  }
  function addNewCar() {
    setShowForm(!showForm);
  }
  function editCar(editedCar) {
    CarService.updateCar(editedCar);
    let newArr = [];
    cars.map((car) => {
      if (car.id === editedCar.id) {
        car.name = editedCar.name;
        car.lat = editedCar.lat;
        car.lon = editedCar.lon;
      }
      newArr.push(car);
    });
    /* newArr.map((hotel) => {
      if (hotel.id === editedHotel.id) {
        newArr[hotel.id] = {
          id: editedHotel.id,
          name: editedHotel.name,
          lat: editedHotel.lat,
          lon: editedHotel.lon,
        };
      }
    });*/

    setCars([...newArr]);
  }

  /*useEffect(() => {
    getApi();
  }, []);
  async function getApi() {
    const response = await HotelService.getAll();
    setHotels(response);
  }*/

  return (
    <div className="App">
      <div className="App__inner">
        <h1 className="list-title">Cars available</h1>
        <CarList cars={cars} remove={removeCar} edit={editCar} />
        <button className="hotel-btn addHotel-btn" onClick={addNewCar}>
          Add new
        </button>

        {showForm && (
          <AddForm
            add={addCar}
            edited={edited}
            setShowForm={setShowForm}
            showForm={showForm}
          />
        )}
      </div>
    </div>
  );
}

export default App;
