import React, { useState } from 'react';


export default  function FlightForm({ onSubmit, initialData, buttonText = 'Add Flight' }) {
  const [formData, setFormData] = useState({
    flightName: initialData?.flightName || '',
    source: initialData?.source || '',
    destination: initialData?.destination || '',
    price: initialData?.price || 0,
    duration: initialData?.duration || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    if (!initialData) {
      setFormData({
        flightName: '',
        source: '',
        destination: '',
        price: 0,
        duration: ''
      });
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Flight Name</label>
          <input
            type="text"
            name="flightName"
            value={formData.flightName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Source</label>
            <input
              type="text"
              name="source"
              value={formData.source}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Destination</label>
            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              required
            />
          </div>
          <div className="form-group">
            <label>Duration</label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="e.g., 2h 30m"
              required
            />
          </div>
        </div>
        <button type="submit" className="add-button">
          <Plus className="h-4 w-4 mr-2" />
          {buttonText}
        </button>
      </form>
    </div>
  );
}