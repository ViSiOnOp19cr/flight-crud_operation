import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "./App.css";


// Main App
function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/add" element={<AddFlight />} />
        <Route path="/" element={<FlightList />} />
        <Route path="/edit/:id" element={<EditFlight />} />
      </Routes>
    </Router>
  );
}

export default App;

function AddFlight() {
  const [flight, setFlight] = useState({
    airlineName: "",
    source: "",
    destination: "",
    price: "",
    duration: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFlight({ ...flight, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/post", flight);
      toast.success(response.data.message);
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add flight");
    }
  };

  return (
    <div>
      <Link to="/">Back to Flight List</Link>
      <h2>Add Flight</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="airlineName"
          placeholder="Airline Name"
          value={flight.airlineName}
          onChange={handleChange}
        />
        <input
          name="source"
          placeholder="Source"
          value={flight.source}
          onChange={handleChange}
        />
        <input
          name="destination"
          placeholder="Destination"
          value={flight.destination}
          onChange={handleChange}
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          value={flight.price}
          onChange={handleChange}
        />
        <input
          name="duration"
          placeholder="Duration (e.g., 2h 30m)"
          value={flight.duration}
          onChange={handleChange}
        />
        <button type="submit">Add Flight</button>
      </form>
    </div>
  );
}

function EditFlight() {
  const { id } = useParams();
  const [flight, setFlight] = useState({
    airlineName: "",
    source: "",
    destination: "",
    price: "",
    duration: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFlight = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/getbyid/${id}`);
        setFlight(response.data.flight);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFlight();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFlight({ ...flight, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8000/update/${id}`, flight);
      toast.success(response.data.message);
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update flight");
    }
  };

  return (
    <div>
      <Link to="/">Back to Flight List</Link>
      <h2>Edit Flight</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="airlineName"
          placeholder="Airline Name"
          value={flight.airlineName}
          onChange={handleChange}
        />
        <input
          name="source"
          placeholder="Source"
          value={flight.source}
          onChange={handleChange}
        />
        <input
          name="destination"
          placeholder="Destination"
          value={flight.destination}
          onChange={handleChange}
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          value={flight.price}
          onChange={handleChange}
        />
        <input
          name="duration"
          placeholder="Duration (e.g., 2h 30m)"
          value={flight.duration}
          onChange={handleChange}
        />
        <button type="submit">Update Flight</button>
      </form>
    </div>
  );
}

function FlightList() {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get("http://localhost:8000/getall");
        setFlights(response.data.allflights);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFlights();
  }, []);

  const deleteFlight = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8000/delete/${id}`);
      setFlights(flights.filter((flight) => flight._id !== id));
      toast.success(response.data.message);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete flight");
    }
  };

  return (
    <div>
      <Link to="/add">Add Flight</Link>
      <h2>Flight List</h2>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Airline Name</th>
            <th>Source</th>
            <th>Destination</th>
            <th>Price</th>
            <th>Duration</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((flight, index) => (
            <tr key={flight._id}>
              <td>{index + 1}</td>
              <td>{flight.airlineName}</td>
              <td>{flight.source}</td>
              <td>{flight.destination}</td>
              <td>{flight.price}</td>
              <td>{flight.duration}</td>
              <td>
                <button onClick={() => deleteFlight(flight._id)}>Delete</button>
                <Link to={`/edit/${flight._id}`}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
