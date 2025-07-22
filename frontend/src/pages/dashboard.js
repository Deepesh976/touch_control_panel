import React, { useState } from 'react';
import Navbar from '../components/navbar/navbar';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import Chart from 'react-apexcharts';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 20.5937,
  lng: 78.9629,
};

const locations = [
  { lat: 17.385044, lng: 78.486671 }, // Hyderabad
  { lat: 28.704060, lng: 77.102493 }, // Delhi
  { lat: 26.912434, lng: 75.787270 }, // Jaipur
  { lat: 13.082680, lng: 80.270721 }, // Chennai
  { lat: 11.016844, lng: 76.955833 }, // Coimbatore
  { lat: 24.585445, lng: 73.712479 }, // Udaipur
];

const Dashboard = () => {
  const [chartData] = useState({
    series: [269, 0],
    options: {
      chart: { type: 'donut' },
      labels: ['Active', 'Inactive'],
      colors: ['#00C49F', '#FF5B5B'],
      legend: { position: 'bottom' },
      dataLabels: { enabled: true },
    },
  });

  return (
    <div style={{ backgroundColor: '#f1f3fa', minHeight: '100vh', paddingTop: '80px' }}>
      <Navbar />

      {/* Summary Cards */}
      <div style={{ display: 'flex', gap: '1rem', padding: '1rem', justifyContent: 'space-around' }}>
        <SummaryCard title="Number of Devices" value="269" icon="📟" />
        <SummaryCard title="Number of Users" value="28" icon="👤" />
        <SummaryCard title="Number of Inactive Users" value="0" icon="❌" />
      </div>

      {/* Map */}
      <div style={{ margin: '1rem', borderRadius: '12px', overflow: 'hidden' }}>
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
          <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={4}>
            {locations.map((loc, index) => (
              <Marker key={index} position={loc} />
            ))}
          </GoogleMap>
        </LoadScript>
      </div>

      {/* Pie Chart */}
      <div style={{ maxWidth: 600, margin: '2rem auto', background: '#fff', borderRadius: 12, padding: '1rem' }}>
        <h3 style={{ textAlign: 'center' }}>Total Devices</h3>
        <p style={{ textAlign: 'center', margin: 0 }}>Total Plants: 269</p>
        <Chart options={chartData.options} series={chartData.series} type="donut" width="100%" />
        <p style={{ textAlign: 'center', color: '#888', fontSize: 12 }}>
          100% Active &nbsp;&nbsp;|&nbsp;&nbsp; 0% Inactive
        </p>
      </div>

      <h2 style={{ textAlign: 'center', marginTop: '2rem' }}>Devices</h2>
    </div>
  );
};

const SummaryCard = ({ title, value, icon }) => (
  <div
    style={{
      background: '#fff',
      borderRadius: 12,
      padding: '1rem 2rem',
      flex: 1,
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      alignItems: 'flex-start',
    }}
  >
    <div style={{ fontSize: '2rem' }}>{icon}</div>
    <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{title}</div>
    <div style={{ fontSize: '1.5rem', color: '#00C49F' }}>{value}</div>
  </div>
);

export default Dashboard;
