import React from 'react';
import Navbar from '../components/navbar/navbar'; // Adjust path if needed
import { FaUsers, FaMicrochip, FaChartBar } from 'react-icons/fa';

const RechargeUnit = () => {
  return (
    <div>
      <Navbar />

      <div style={styles.container}>
        <h1 style={styles.heading}>Recharge Unit</h1>
        <p style={styles.subheading}>Welcome! Choose an action below:</p>

        <div style={styles.cardsContainer}>
          <div style={styles.card}>
            <FaUsers style={styles.icon} />
            <h3 style={styles.cardTitle}>Users</h3>
            <p>Manage user profiles, roles, and more.</p>
          </div>

          <div style={styles.card}>
            <FaMicrochip style={styles.icon} />
            <h3 style={styles.cardTitle}>Devices</h3>
            <p>Monitor, add, or update devices easily.</p>
          </div>

          <div style={styles.card}>
            <FaChartBar style={styles.icon} />
            <h3 style={styles.cardTitle}>Reports</h3>
            <p>View performance analytics and logs.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '80px 20px 40px',
    textAlign: 'center',
    backgroundColor: '#f0f4f8',
    minHeight: '100vh',
  },
  heading: {
    fontSize: '40px',
    color: '#2c3e50',
    marginBottom: '10px',
  },
  subheading: {
    fontSize: '18px',
    color: '#555',
    marginBottom: '40px',
  },
  cardsContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '30px',
    flexWrap: 'wrap',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '30px',
    borderRadius: '15px',
    width: '260px',
    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s',
    cursor: 'pointer',
  },
  cardTitle: {
    fontSize: '22px',
    color: '#333',
    marginTop: '15px',
  },
  icon: {
    fontSize: '50px',
    color: '#3498db',
  },
};

export default RechargeUnit;
