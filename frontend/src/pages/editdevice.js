import React, { useState } from 'react';
import Navbar from '../components/navbar/navbar';

const styles = {
  page: {
    paddingTop: '80px',
    fontFamily: 'Segoe UI, sans-serif',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
  },
  container: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '2rem',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 0 20px rgba(0,0,0,0.1)',
  },
  sectionTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '1.4rem',
    marginBottom: '1.5rem',
    color: '#333',
  },
  formLayout: {
    display: 'flex',
    gap: '2rem',
    flexWrap: 'wrap',
  },
  column: {
    flex: '1',
    minWidth: '300px',
  },
  inputGroup: {
    marginBottom: '1.2rem',
  },
  label: {
    display: 'block',
    fontWeight: '600',
    marginBottom: '0.5rem',
  },
  input: {
    width: '100%',
    padding: '0.6rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  select: {
    width: '100%',
    padding: '0.6rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '1rem',
    marginTop: '2rem',
  },
  button: {
    padding: '0.7rem 1.5rem',
    fontSize: '1rem',
    fontWeight: '600',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    transition: '0.3s',
  },
  saveButton: {
    backgroundColor: '#0d6efd',
    color: '#fff',
  },
  closeButton: {
    backgroundColor: '#ccc',
    color: '#000',
  },
  hr: {
    margin: '2rem 0',
    border: 'none',
    borderTop: '1px solid #ddd',
  },
};

const EditDevice = () => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted:', formData);
    // Submit to backend or validation logic here
  };

  return (
    <>
      <Navbar />
      <div style={styles.page}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>Edit Device</h2>
          <form onSubmit={handleSubmit}>
            <div style={styles.formLayout}>

              {/* Left Column */}
              <div style={styles.column}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>User Name*</label>
                  <input type="text" name="userName" required style={styles.input} onChange={handleChange} />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Date of Contract*</label>
                  <input type="date" name="contractDate" required style={styles.input} onChange={handleChange} />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Longitude</label>
                  <input type="text" name="longitude" style={styles.input} onChange={handleChange} />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Constituency</label>
                  <input type="text" name="constituency" style={styles.input} onChange={handleChange} />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Panchayat</label>
                  <input type="text" name="panchayat" style={styles.input} onChange={handleChange} />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Population</label>
                  <input type="number" name="population" style={styles.input} onChange={handleChange} />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Device Sim No</label>
                  <input type="text" name="deviceSimNo" style={styles.input} onChange={handleChange} />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Phase</label>
                  <input type="text" name="phase" style={styles.input} onChange={handleChange} />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Status*</label>
                  <select name="status" required style={styles.select} onChange={handleChange}>
                    <option value="">Select Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Project Region</label>
                  <input type="text" name="projectRegion" style={styles.input} onChange={handleChange} />
                </div>
              </div>

              {/* Right Column */}
              <div style={styles.column}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>ATM No / Panel Device No*</label>
                  <input type="text" name="deviceNo" required style={styles.input} onChange={handleChange} />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Latitude</label>
                  <input type="text" name="latitude" style={styles.input} onChange={handleChange} />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>District</label>
                  <input type="text" name="district" style={styles.input} onChange={handleChange} />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Block</label>
                  <input type="text" name="block" style={styles.input} onChange={handleChange} />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Village</label>
                  <input type="text" name="village" style={styles.input} onChange={handleChange} />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Household</label>
                  <input type="number" name="household" style={styles.input} onChange={handleChange} />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Contractor</label>
                  <input type="text" name="contractor" style={styles.input} onChange={handleChange} />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Location*</label>
                  <input type="text" name="location" required style={styles.input} onChange={handleChange} />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Device Type</label>
                  <input type="text" name="deviceType" style={styles.input} onChange={handleChange} />
                </div>
              </div>
            </div>

            <hr style={styles.hr} />

            {/* Buttons */}
            <div style={styles.buttons}>
              <button type="button" style={{ ...styles.button, ...styles.closeButton }}>
                Close
              </button>
              <button
                type="submit"
                style={{ ...styles.button, ...styles.saveButton }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#000';
                  e.target.style.color = '#fff';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = '#0d6efd';
                  e.target.style.color = '#fff';
                }}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditDevice;
