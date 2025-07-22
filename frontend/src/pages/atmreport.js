import React, { useState } from 'react';
import Navbar from '../components/navbar/navbar';
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { FiDownload } from 'react-icons/fi';
import { FaUsers } from 'react-icons/fa';
import dayjs from 'dayjs';

const userData = [
  {
    id: 1,
    atmNo: 'ATM001',
    status: 'Active',
    location: 'Mumbai\nMaharashtra',
    date: '2025-07-20T14:30:00',
    dispensed: '500 Ltrs',
    cardAmount: '₹1500',
    atwRecharge: '₹3000',
    coinCollected: '₹250'
  },
  {
    id: 2,
    atmNo: 'ATM002',
    status: 'Inactive',
    location: 'Hyderabad\nTelangana',
    date: '2025-07-21T09:15:00',
    dispensed: '1000 Ltrs',
    cardAmount: '₹2200',
    atwRecharge: '₹1800',
    coinCollected: '₹100'
  },
  {
    id: 3,
    atmNo: 'ATM003',
    status: 'Active',
    location: 'Ahmedabad\nGujarat',
    date: '2025-07-22T08:00:00',
    dispensed: '800 Ltrs',
    cardAmount: '₹2000',
    atwRecharge: '₹2500',
    coinCollected: '₹500'
  },
  // ... add more up to at least 10 for full testing
];

const AtmReport = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredData = userData.filter(item =>
    Object.values(item).some(val =>
      String(val).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const pageCount = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDownload = () => {
    const headers = [
      'ID,ATM No,Status,Location,Date,Total Dispensed Water,Total Card Swiped Amount,ATW Total Recharged Amount,Coin Collected Amount'
    ];
    const rows = userData.map(row =>
      [
        row.id,
        row.atmNo,
        row.status,
        row.location.replace('\n', ' '),
        dayjs(row.date).format('YYYY/MM/DD HH:mm:ss'),
        row.dispensed,
        row.cardAmount,
        row.atwRecharge,
        row.coinCollected
      ].join(',')
    );
    const csvContent = [...headers, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'atm_reports.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const columns = [
    {
      name: '#',
      selector: (_, index) => (currentPage - 1) * itemsPerPage + index + 1,
      center: true
    },
    {
      name: 'ATM No',
      selector: row => row.atmNo,
      center: true,
      cell: row => (
        <span
          onClick={() => navigate('/editdevice')}
          style={{ color: '#0d6efd', cursor: 'pointer', textDecoration: 'underline' }}
        >
          {row.atmNo}
        </span>
      )
    },
    {
      name: 'Status',
      selector: row => row.status,
      center: true,
      cell: row => (
        <span
          style={{
            padding: '4px 10px',
            borderRadius: '20px',
            fontWeight: 'bold',
            color: row.status === 'Active' ? '#0c7c59' : '#b00020',
            backgroundColor: row.status === 'Active' ? '#e6f4ea' : '#fdecea'
          }}
        >
          {row.status}
        </span>
      )
    },
    {
      name: 'Location',
      selector: row => row.location,
      center: true,
      cell: row => <span style={{ whiteSpace: 'pre-line' }}>{row.location}</span>
    },
    {
      name: 'Date',
      selector: row => row.date,
      center: true,
      cell: row => dayjs(row.date).format('YYYY/MM/DD HH:mm:ss')
    },
    {
      name: 'Dispensed Water',
      selector: row => row.dispensed,
      center: true
    },
    {
      name: 'Card Swiped ₹',
      selector: row => row.cardAmount,
      center: true
    },
    {
      name: 'ATW Recharge ₹',
      selector: row => row.atwRecharge,
      center: true
    },
    {
      name: 'Coin Collected ₹',
      selector: row => row.coinCollected,
      center: true
    }
  ];

  return (
    <div style={styles.page}>
      <Navbar />
      <div style={styles.wrapper}>
        <div style={styles.cardWrapper}>
          <InfoCard title="No of devices data received (24h)" count={3} />
          <InfoCard title="No of devices not received (7d)" count={12} />
        </div>

        <div style={styles.tableContainer}>
          <div style={styles.header}>
            <h5 style={styles.title}>ATM Reports Table</h5>
            <div style={styles.buttonGroup}>
              <input
                type="text"
                placeholder="Search..."
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                  setCurrentPage(1); // reset to first page
                }}
                style={styles.searchInput}
              />
              <button style={styles.downloadButton} onClick={handleDownload}>
                <FiDownload style={{ marginRight: 6 }} />
                Download
              </button>
            </div>
          </div>

          <DataTable
            columns={columns}
            data={paginatedData}
            customStyles={customStyles}
            noHeader
          />

          <div style={styles.pagination}>
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              style={styles.pageBtn}
            >
              Previous
            </button>
            <span style={styles.pageText}>
              {currentPage} of {pageCount}
            </span>
            <button
              disabled={currentPage === pageCount}
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, pageCount))}
              style={styles.pageBtn}
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
    paddingTop: '6rem'
  },
  wrapper: {
    maxWidth: 1500,
    margin: '0 auto',
    padding: '0 1rem 2rem'
  },
  cardWrapper: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
    marginBottom: '1.5rem'
  },
  infoCard: {
    flex: '1 1 280px',
    backgroundColor: '#fff',
    padding: '1rem 1.5rem',
    borderRadius: 8,
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  infoIcon: {
    backgroundColor: '#007bff',
    color: '#fff',
    width: 50,
    height: 50,
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  infoTitle: {
    margin: 0,
    fontSize: 14,
    color: '#888'
  },
  infoCount: {
    margin: 0,
    fontWeight: 'bold',
    fontSize: 22
  },
  tableContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: '1rem',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
    flexWrap: 'wrap',
    gap: '1rem'
  },
  title: {
    margin: 0,
    color: '#0d6efd',
    fontWeight: 600
  },
  buttonGroup: {
    display: 'flex',
    gap: '0.75rem',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  searchInput: {
    padding: '6px 12px',
    borderRadius: 4,
    border: '1px solid #ccc',
    fontSize: 14
  },
  downloadButton: {
    backgroundColor: '#0d6efd',
    color: '#fff',
    border: 'none',
    padding: '8px 16px',
    borderRadius: 6,
    cursor: 'pointer',
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center'
  },
  pagination: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '1rem',
    marginTop: '1rem',
    alignItems: 'center'
  },
  pageBtn: {
    padding: '6px 12px',
    border: '1px solid #0d6efd',
    borderRadius: 4,
    backgroundColor: '#fff',
    color: '#0d6efd',
    cursor: 'pointer'
  },
  pageText: {
    fontWeight: 500
  }
};

const customStyles = {
  headCells: {
    style: {
      fontWeight: 600,
      fontSize: '13px',
      backgroundColor: '#f1f3f5',
      textAlign: 'center'
    }
  },
  cells: {
    style: {
      fontSize: '13px',
      textAlign: 'center'
    }
  }
};

export default AtmReport;
