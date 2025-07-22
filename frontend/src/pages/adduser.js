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
  },
  radioGroup: {
    display: 'flex',
    gap: '1.5rem',
    flexWrap: 'wrap',
    marginTop: '0.5rem',
  },
  devicesRow: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '1rem',
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
permissionRowSingleLine: {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '1rem',
},

permissionItemSingle: {
  flex: '1',
  minWidth: '120px',
  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem',
  fontSize: '1rem',
},
};

const AddUser = () => {
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
    console.log(formData);
  };

  return (
    <>
      <Navbar />
      <div style={styles.page}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>Add User</h2>
          <form onSubmit={handleSubmit}>
            <div style={styles.formLayout}>
              {/* Left Column */}
              <div style={styles.column}>
                {[
                  ['Company Name', 'companyName'],
                  ['User Address', 'address'],
                  ['State', 'state'],
                  ['Zipcode', 'zipcode'],
                  ['Email', 'email', 'email'],
                  ['Phone', 'phone', 'tel'],
                ].map(([label, name, type = 'text']) => (
                  <div key={name} style={styles.inputGroup}>
                    <label style={styles.label}>{label}*</label>
                    <input
                      type={type}
                      name={name}
                      required
                      style={styles.input}
                      onChange={handleChange}
                    />
                  </div>
                ))}

                <div style={styles.inputGroup}>
                  <label style={styles.label}>User Type*</label>
                  <div style={styles.radioGroup}>
                    <label>
                      <input type="radio" name="userType" value="OEM" required onChange={handleChange} /> OEM User
                    </label>
                    <label>
                      <input type="radio" name="userType" value="End" onChange={handleChange} /> End User
                    </label>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div style={styles.column}>
                {[
                  ['City', 'city'],
                  ['Country', 'country'],
                  ['Validity', 'validity', 'date'],
                  ['Password', 'password', 'password'],
                ].map(([label, name, type = 'text']) => (
                  <div key={name} style={styles.inputGroup}>
                    <label style={styles.label}>{label}*</label>
                    <input
                      type={type}
                      name={name}
                      required
                      style={styles.input}
                      onChange={handleChange}
                    />
                  </div>
                ))}

                <div style={styles.inputGroup}>
                  <label style={styles.label}>User Status*</label>
                  <select name="status" required style={styles.select} onChange={handleChange}>
                    <option value="">Select status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>User Logo</label>
                  <input type="file" name="logo" style={styles.input} onChange={handleChange} />
                </div>
              </div>
            </div>

            <hr style={styles.hr} />

            {/* Devices Section */}
            <h3 style={styles.sectionTitle}>Number of Devices</h3>
            <div style={styles.devicesRow}>
              {['ATM', 'RO Panel', 'Recharge Unit'].map((device) => (
                <div key={device} style={{ flex: 1 }}>
                  <label style={styles.label}>{device}*</label>
                  <input
                    type="number"
                    name={device.toLowerCase().replace(/ /g, '')}
                    required
                    style={styles.input}
                    onChange={handleChange}
                  />
                </div>
              ))}
            </div>

            <hr style={{ ...styles.hr, marginTop: '1.5rem', marginBottom: '1.5rem' }} />

<div style={styles.inputGroup}>
  <label style={styles.label}>Users</label>
  <div style={styles.permissionRowSingleLine}>
    {['Add User', 'View User', 'Edit User', 'Delete User'].map((perm) => (
      <label key={perm} style={styles.permissionItemSingle}>
        <input
          type="checkbox"
          name="userPermissions"
          value={perm}
          onChange={handleChange}
        />{' '}
        {perm}
      </label>
    ))}
  </div>
</div>

{/* PERMISSION */}
<div style={styles.inputGroup}>
  <label style={styles.label}>Device</label>
  <div style={styles.permissionRowSingleLine}>
    {['Add Device', 'View Device', 'Edit Device', 'Delete Device'].map((perm) => (
      <label key={perm} style={styles.permissionItemSingle}>
        <input
          type="checkbox"
          name="devicePermissions"
          value={perm}
          onChange={handleChange}
        />{' '}
        {perm}
      </label>
    ))}
  </div>
</div>
            {/* Buttons */}
            <div style={styles.buttons}>
              <button
                type="button"
                style={{ ...styles.button, ...styles.closeButton }}
              >
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

export default AddUser;
