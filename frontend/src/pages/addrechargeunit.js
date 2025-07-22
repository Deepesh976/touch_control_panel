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
    fontSize: '1.6rem',
    marginBottom: '1.8rem',
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
    color: '#333',
  },
  required: {
    color: 'red',
    marginLeft: 4,
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
  checkboxGroup: {
    display: 'flex',
    gap: '1.5rem',
    marginTop: '0.8rem',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
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
  radioRow: {
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '1rem',
  marginBottom: '2rem',
  padding: '0 1rem',
},
radioItem: {
  fontWeight: '500',
  fontSize: '1rem',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  width: '30%',
},

};

const AddRechargeUnit = () => {
  const [formData, setFormData] = useState({
    permissions: [],
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      setFormData((prev) => {
        const newPermissions = prev.permissions.includes(value)
          ? prev.permissions.filter((p) => p !== value)
          : [...prev.permissions, value];
        return { ...prev, permissions: newPermissions };
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted:', formData);
  };

  return (
    <>
      <Navbar />
      <div style={styles.page}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>Add</h2>
          <form onSubmit={handleSubmit}>
            <div style={styles.formLayout}>
              {/* Left Column */}
              <div style={styles.column}>
                {[
                  { label: 'ATM Number', name: 'atmNumber', required: true },
                  { label: 'Village Name', name: 'villageName', required: true },
                  { label: 'IMEI', name: 'imei', required: true },
                  { label: 'Operator Email', name: 'operatorEmail', required: true },
                  { label: 'Mobile', name: 'mobile', required: true },
                ].map(({ label, name, required }) => (
                  <div style={styles.inputGroup} key={name}>
                    <label style={styles.label}>
                      {label}
                      {required && <span style={styles.required}>*</span>}
                    </label>
                    <input
                      type="text"
                      name={name}
                      required={required}
                      style={styles.input}
                      onChange={handleChange}
                    />
                  </div>
                ))}
              </div>

              {/* Right Column */}
              <div style={styles.column}>
                {[
                  { label: 'RCU Id', name: 'rcuId', required: true },
                  { label: 'Address', name: 'address' },
                  { label: 'Operator Name', name: 'operatorName' },
                  { label: 'Password', name: 'password', required: true },
                  {
                    label: 'Status',
                    name: 'status',
                    type: 'select',
                    options: ['Active', 'Inactive'],
                    required: true,
                  },
                ].map(({ label, name, type, options, required }) => (
                  <div style={styles.inputGroup} key={name}>
                    <label style={styles.label}>
                      {label}
                      {required && <span style={styles.required}>*</span>}
                    </label>
                    {type === 'select' ? (
                      <select
                        name={name}
                        required={required}
                        style={styles.select}
                        onChange={handleChange}
                      >
                        <option value="">Select Status</option>
                        {options.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        name={name}
                        required={required}
                        style={styles.input}
                        onChange={handleChange}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <hr style={styles.hr} />

{/* Permissions Section */}
<h3 style={styles.sectionTitle}>Permissions</h3>
<div style={styles.radioRow}>
  <label style={styles.radioItem}>
    <input
      type="checkbox"
      name="activateCard"
      onChange={handleChange}
    />{' '}
    Activate Card
  </label>
  <label style={styles.radioItem}>
    <input
      type="checkbox"
      name="registerCard"
      onChange={handleChange}
    />{' '}
    Register Card
  </label>
  <label style={styles.radioItem}>
    <input
      type="checkbox"
      name="rechargeCard"
      onChange={handleChange}
    />{' '}
    Recharge Card
  </label>
</div>

            {/* Panel Number */}
            <div style={{ ...styles.inputGroup, marginTop: '1.5rem' }}>
              <label style={styles.label}>Panel Number</label>
              <select
                name="panelNumber"
                style={styles.select}
                onChange={handleChange}
              >
                <option value="">Select Panel</option>
                <option value="Panel 1">Panel 1</option>
                <option value="Panel 2">Panel 2</option>
                <option value="Panel 3">Panel 3</option>
              </select>
            </div>

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

export default AddRechargeUnit;
