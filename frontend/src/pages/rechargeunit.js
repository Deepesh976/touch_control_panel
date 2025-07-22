import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar/navbar';
import { FaEdit, FaTrash, FaEye, FaRupeeSign, FaDownload } from 'react-icons/fa';

const ITEMS_PER_PAGE = 5;

const RechargeUnit = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewData, setViewData] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showRechargeModal, setShowRechargeModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [amount, setAmount] = useState('');
  const [promo, setPromo] = useState('');

  const data = [
    {
      id: 1,
      rcuId: '100004',
      village: 'Vennampally\nTelangana',
      operator: 'A Ravinder Reddy',
      mobile: '09959777666',
      totalCards: 243,
      totalRecharge: 828867,
      activeBalance: 7971,
    },
    {
      id: 2,
      rcuId: '100270',
      village: 'Veerapoor\nTelangana',
      operator: 'Prasanth',
      mobile: '09848393907',
      totalCards: 2,
      totalRecharge: 49999,
      activeBalance: 49858,
    },
    // Add more dummy records here for testing pagination
  ];

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [data, search]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure to delete this record?')) {
      console.log('Deleted row id:', id);
    }
  };

  const openViewModal = (row) => {
    setViewData(row);
    setShowViewModal(true);
  };

  const openRechargeModal = (row) => {
    setSelectedRow(row);
    setShowRechargeModal(true);
  };

  const total = Number(amount || 0) + Number(promo || 0);

  return (
    <div style={styles.page}>
      <Navbar />
      <div style={styles.container}>
        <div style={styles.topBar}>
          <input
            type="text"
            placeholder="Search..."
            style={styles.searchInput}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1); // reset page on search
            }}
          />
          <h2 style={styles.heading}>Recharge Unit</h2>
          <div style={styles.buttonGroup}>
            <button style={styles.downloadBtn}>
              <FaDownload style={{ marginRight: '6px' }} />
              Download
            </button>
            <button style={styles.addButton} onClick={() => navigate('/addrechargeunit')}>
              Add New
            </button>
          </div>
        </div>

        {/* Table */}
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                {['S.No.', 'RCU ID', 'Village Name', 'Operator Name', 'Mobile', 'Total Cards Activated', 'Total Recharge Amount', 'Active Balance', 'Actions'].map((text, i) => (
                  <th key={i} style={styles.th}>{text}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedData.length === 0 ? (
                <tr><td colSpan={9} style={styles.tdCenter}>No results found.</td></tr>
              ) : (
                paginatedData.map((row, i) => (
                  <tr key={row.id}>
                    <td style={styles.tdCenter}>{(currentPage - 1) * ITEMS_PER_PAGE + i + 1}</td>
                    <td style={styles.tdCenter}>
                      <span style={{ color: '#007bff', cursor: 'pointer' }}>{row.rcuId}</span>
                    </td>
                    <td style={styles.tdCenter}>{row.village.split('\n').map((line, i) => <div key={i}>{line}</div>)}</td>
                    <td style={styles.tdCenter}>{row.operator}</td>
                    <td style={styles.tdCenter}>{row.mobile}</td>
                    <td style={styles.tdCenter}>{row.totalCards}</td>
                    <td style={styles.tdCenter}>{row.totalRecharge}</td>
                    <td style={styles.tdCenter}>{row.activeBalance}</td>
                    <td style={styles.tdActions}>
                      <div style={styles.actionGrid}>
                        <FaEdit style={styles.icon} color="blue" title="Edit" onClick={() => navigate('/editrechargeunit')} />
                        <FaTrash style={styles.icon} color="red" title="Delete" onClick={() => handleDelete(row.id)} />
                        <FaEye style={styles.icon} title="View" onClick={() => openViewModal(row)} />
                        <FaRupeeSign style={styles.icon} color="green" title="Recharge" onClick={() => openRechargeModal(row)} />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
<div style={styles.pagination}>
  <button
    style={{
      ...styles.pageButton,
      cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
      opacity: currentPage === 1 ? 0.5 : 1,
    }}
    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
    disabled={currentPage === 1}
  >
    &laquo; Previous
  </button>

  <span style={styles.pageInfo}>
    Page {currentPage} of {totalPages}
  </span>

  <button
    style={{
      ...styles.pageButton,
      cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
      opacity: currentPage === totalPages ? 0.5 : 1,
    }}
    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
    disabled={currentPage === totalPages}
  >
    Next &raquo;
  </button>
</div>


        {/* View Modal */}
        {showViewModal && viewData && (
          <div style={styles.modal}>
            <div style={styles.modalContent}>
              <h3>Operator Info</h3>
              <p><strong>Village:</strong> {viewData.village}</p>
              <p><strong>Operator:</strong> {viewData.operator}</p>
              <p><strong>Mobile:</strong> {viewData.mobile}</p>
              <p><strong>Cards:</strong> {viewData.totalCards}</p>
              <button style={styles.closeBtn} onClick={() => setShowViewModal(false)}>Close</button>
            </div>
          </div>
        )}

        {/* Recharge Modal */}
        {showRechargeModal && (
          <div style={styles.modal}>
            <div style={styles.modalContent}>
              <h3 style={{ marginBottom: '1rem' }}>Recharge Amount</h3>
              <label>Amount (mandatory)</label>
              <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} style={styles.input} required />
              <label>Promotional Cashback</label>
              <input type="number" value={promo} onChange={(e) => setPromo(e.target.value)} style={styles.input} />
              <label>Total</label>
              <input type="text" value={total} readOnly style={styles.input} />
              <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
                <button style={styles.saveBtn}>Save</button>
                <button style={styles.closeBtn} onClick={() => setShowRechargeModal(false)}>Close</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ===== STYLES =====
const styles = {
  page: { background: '#f5f8fa', minHeight: '100vh' },
  container: { padding: '2rem', marginTop: '80px' },
  topBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '1rem',
    marginBottom: '1.5rem',
    flexWrap: 'wrap',
  },
  heading: {
    flex: 1,
    textAlign: 'center',
    fontSize: '1.6rem',
    fontWeight: 'bold',
    color: '#003366',
  },
  searchInput: {
    padding: '0.5rem',
    width: '180px',
    borderRadius: 5,
    border: '1px solid #ccc',
    fontSize: 14,
  },
  buttonGroup: {
    display: 'flex',
    gap: '0.5rem',
  },
  downloadBtn: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: 5,
    cursor: 'pointer',
  },
  addButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: 5,
    cursor: 'pointer',
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
    textAlign: 'center',
  },
  th: {
    padding: '0.8rem',
    borderBottom: '1px solid #ddd',
  },
  tdCenter: {
    padding: '0.8rem',
    borderBottom: '1px solid #eee',
  },
  tdActions: {
    padding: '0.8rem',
    borderBottom: '1px solid #eee',
  },
  actionGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '0.5rem',
  },
  icon: {
    cursor: 'pointer',
    fontSize: '1.1rem',
  },
  modal: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    background: '#fff',
    padding: '2rem',
    borderRadius: 10,
    width: '90%',
    maxWidth: '400px',
    boxShadow: '0 0 15px rgba(0,0,0,0.2)',
  },
  input: {
    width: '100%',
    padding: '0.5rem',
    marginBottom: '1rem',
    borderRadius: 5,
    border: '1px solid #ccc',
  },
  closeBtn: {
    backgroundColor: '#ccc',
    color: '#000',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: 5,
    cursor: 'pointer',
  },
  saveBtn: {
    backgroundColor: '#28a745',
    color: '#fff',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: 5,
    cursor: 'pointer',
  },
pagination: {
  marginTop: '1.5rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '1rem',
  flexWrap: 'wrap',
  fontSize: '14px',
},
pageButton: {
  padding: '6px 12px',
  border: '1px solid #ccc',
  borderRadius: 5,
  backgroundColor: '#fff',
  color: '#007bff',
  fontWeight: 'bold',
},
pageInfo: {
  fontSize: '14px',
  color: '#333',
  fontWeight: 500,
},

};

export default RechargeUnit;
