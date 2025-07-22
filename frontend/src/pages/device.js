import React, { useState } from 'react';
import Navbar from '../components/navbar/navbar';
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { FiDownload } from 'react-icons/fi';
import { FaUsers } from 'react-icons/fa';

const userData = [ /* your same data here */ ];

const Device = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredData = userData.filter(row =>
    Object.values(row).some(
      val => val.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const columns = [
    { name: '#', selector: (row, index) => (currentPage - 1) * itemsPerPage + index + 1, center: true },
    {
      name: 'ATM/Panel No',
      selector: row => row.atmPanelNo,
      center: true,
      cell: row => (
        <span
          onClick={() => navigate('/editdevice')}
          style={{ color: '#0d6efd', cursor: 'pointer', textDecoration: 'underline' }}
        >
          {row.atmPanelNo}
        </span>
      ),
    },
    { name: 'User Name', selector: row => row.name, center: true },
    { name: 'Device Sim No', selector: row => row.simNo, center: true },
    { name: 'Location', selector: row => row.location, center: true },
    {
      name: 'Status',
      selector: row => row.status,
      center: true,
      cell: row => (
        <span
          style={{
            padding: '6px 12px',
            borderRadius: '20px',
            fontWeight: 'bold',
            color: row.status === 'Active' ? '#0c7c59' : '#b00020',
            backgroundColor: row.status === 'Active' ? '#e6f4ea' : '#fdecea',
          }}
        >
          {row.status}
        </span>
      ),
    },
    { name: 'Device Type', selector: row => row.deviceType, center: true },
    { name: 'Project Region', selector: row => row.region, center: true },
    {
      name: 'Actions',
      center: true,
      cell: row => (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button style={styles.editButton} onClick={() => navigate('/editdevice')}>
            Edit
          </button>
          <button
            style={styles.deleteButton}
            onClick={() => alert(`Delete user ID: ${row.id}`)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const handleDownload = () => {
    const headers = [
      'ID,ATM/Panel No,User Name,Device Sim No,Location,Status,Device Type,Project Region',
    ];
    const rows = userData.map(row =>
      [
        row.id,
        row.atmPanelNo,
        `"${row.name}"`,
        row.simNo,
        row.location,
        row.status,
        row.deviceType,
        row.region,
      ].join(',')
    );
    const csvContent = [...headers, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'devices.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={styles.page}>
      <Navbar />
      <div style={styles.wrapper}>
        <div style={styles.cardWrapper}>
          <InfoCard title="Total Devices" count={userData.length} />
          <InfoCard title="Inactive Devices" count={userData.filter(d => d.status !== 'Active').length} />
        </div>

        <div style={styles.tableContainer}>
          <div style={styles.header}>
            <h5 style={styles.title}>Device Table</h5>
            <div style={styles.buttonGroup}>
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={e => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // reset to page 1 on search
                }}
                style={{
                  padding: '6px 10px',
                  borderRadius: 4,
                  border: '1px solid #ccc',
                  marginRight: 10,
                }}
              />
              <button style={styles.button} onClick={() => navigate('/adddevice')}>
                + Add Device
              </button>
              <button style={styles.button} onClick={handleDownload}>
                <FiDownload style={{ marginRight: 6 }} />
                Download
              </button>
            </div>
          </div>

          <DataTable
            columns={columns}
            data={paginatedData}
            noHeader
            customStyles={customStyles}
            pagination={false}
          />

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              style={{ ...styles.button, backgroundColor: '#6c757d' }}
            >
              Previous
            </button>
            <span style={{ paddingTop: 8, fontWeight: 'bold' }}>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              style={{ ...styles.button, backgroundColor: '#6c757d' }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoCard = ({ title, count }) => (
  <div style={styles.infoCard}>
    <div style={styles.infoIcon}>
      <FaUsers size={24} />
    </div>
    <div>
      <h6 style={styles.infoTitle}>{title}</h6>
      <h4 style={styles.infoCount}>{count}</h4>
    </div>
  </div>
);

const styles = {
  page: {
    backgroundColor: '#f5f7fa',
    minHeight: '100vh',
    paddingTop: '6rem',
  },
  wrapper: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '0 1rem 2rem',
  },
  cardWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '1rem',
    marginBottom: '1.5rem',
  },
  infoCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: '1rem 1.5rem',
    borderRadius: 8,
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  infoIcon: {
    backgroundColor: '#007bff',
    color: '#fff',
    width: 50,
    height: 50,
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoTitle: {
    margin: 0,
    fontSize: 14,
    color: '#888',
  },
  infoCount: {
    margin: 0,
    fontWeight: 'bold',
    fontSize: 22,
  },
  tableContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: '1rem',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  title: {
    margin: 0,
    color: '#0d6efd',
    fontWeight: 600,
  },
  buttonGroup: {
    display: 'flex',
    gap: '0.75rem',
  },
  button: {
    backgroundColor: '#0d6efd',
    color: '#fff',
    border: 'none',
    padding: '8px 16px',
    borderRadius: 6,
    cursor: 'pointer',
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: 'rgba(233, 218, 16, 0.9)',
    color: '#000',
    border: 'none',
    padding: '5px 10px',
    borderRadius: 4,
    cursor: 'pointer',
    fontSize: 12,
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    borderRadius: 4,
    cursor: 'pointer',
    fontSize: 12,
  },
};

const customStyles = {
  headCells: {
    style: {
      fontWeight: '600',
      fontSize: '13px',
      backgroundColor: '#f1f3f5',
      textAlign: 'center',
      whiteSpace: 'normal',
      wordBreak: 'break-word',
      padding: '8px',
    },
  },
  cells: {
    style: {
      fontSize: '13px',
      textAlign: 'center',
      whiteSpace: 'normal',
      wordBreak: 'break-word',
      padding: '8px',
    },
  },
  rows: {
    style: {
      minHeight: '52px',
    },
  },
};

export default Device;
