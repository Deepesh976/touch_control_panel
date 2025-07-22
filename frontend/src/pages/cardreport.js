import React, { useState } from 'react';
import Navbar from '../components/navbar/navbar';

const CardReport = () => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const data = [
    {
      id: 1,
      rcuId: '100004',
      name: 'A Ravinder Reddy',
      cardNumber: 'CARD123456',
      phoneNumber: '09959777666',
      rechargeAmount: 828867,
      balance: 7971,
      rechargeDate: '2025-07-21T10:15:00'
    },
    {
      id: 2,
      rcuId: '100270',
      name: 'Prasanth',
      cardNumber: 'CARD789012',
      phoneNumber: '09848393907',
      rechargeAmount: 49999,
      balance: 49858,
      rechargeDate: '2025-07-20T16:45:30'
    },
    // Add more rows as needed
  ];

  const filteredData = data.filter(
    (item) =>
      item.rcuId.toLowerCase().includes(search.toLowerCase()) ||
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.cardNumber.toLowerCase().includes(search.toLowerCase()) ||
      item.phoneNumber.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIdx, startIdx + itemsPerPage);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const formatDate = (iso) => {
    const date = new Date(iso);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');
    return `${yyyy}/${mm}/${dd} ${hh}:${min}:${ss}`;
  };

  return (
    <div style={styles.page}>
      <Navbar />
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.heading}>Card Report</h2>
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search..."
            style={styles.searchInput}
          />
        </div>

        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                {['S.No.', 'RCU Id', 'Name', 'Card Number', 'Phone Number', 'Recharge Amount (₹)', 'Balance in Card', 'Recharge Date'].map((header, i) => (
                  <th key={i} style={styles.th}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item, index) => (
                <tr key={item.id}>
                  <td style={styles.td}>{startIdx + index + 1}</td>
                  <td style={styles.td}>{item.rcuId}</td>
                  <td style={styles.td}>{item.name}</td>
                  <td style={{ ...styles.td, ...styles.clickable }}>{item.cardNumber}</td>
                  <td style={styles.td}>{item.phoneNumber}</td>
                  <td style={styles.td}>{item.rechargeAmount}</td>
                  <td style={styles.td}>{item.balance}</td>
                  <td style={styles.td}>{formatDate(item.rechargeDate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div style={styles.pagination}>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            style={styles.pageBtn}
          >
            Previous
          </button>
          <span style={styles.pageInfo}>
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            style={styles.pageBtn}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    background: '#f4f7fb',
    minHeight: '100vh',
    paddingTop: '80px',
  },
  container: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '2rem',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
  },
  heading: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#003366',
  },
  searchInput: {
    padding: '0.5rem',
    borderRadius: 5,
    border: '1px solid #ccc',
    fontSize: 14,
    width: 200,
  },
  tableWrapper: {
    overflowX: 'auto',
    backgroundColor: '#fff',
    borderRadius: 8,
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    padding: '0.8rem',
    background: '#e9f1f7',
    textAlign: 'center',
    fontWeight: 'bold',
    borderBottom: '1px solid #ccc',
  },
  td: {
    padding: '0.8rem',
    textAlign: 'center',
    borderBottom: '1px solid #eee',
    fontSize: 14,
  },
  clickable: {
    color: '#007bff',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
  pagination: {
    marginTop: '1.5rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1rem',
  },
  pageBtn: {
    padding: '0.5rem 1rem',
    background: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
    fontSize: 14,
  },
  pageInfo: {
    fontSize: 14,
  },
};

export default CardReport;
