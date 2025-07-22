import React, { useState } from 'react';
import Navbar from '../components/navbar/navbar';
import { FaUsers } from 'react-icons/fa';
import DataTable from 'react-data-table-component';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FiDownload } from 'react-icons/fi';
import 'bootstrap/dist/css/bootstrap.min.css';

const userData = [
  {
    id: 1,
    name: 'Raji Reddy',
    mobile: '9948820670',
    city: 'Kasimpet',
    state: 'TELANGANA',
    userId: 98,
    created: '2024-10-22 10:09:28',
    atm: 1,
    roPanel: 1,
    recharge: 1,
    dueDate: '2024-09-21',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Aqua shine water technology , warora',
    mobile: '8805812312',
    city: 'Chandrapur',
    state: 'Maharastra',
    userId: 96,
    created: '2024-09-21 08:56:53',
    atm: 2,
    roPanel: 1,
    recharge: 2,
    dueDate: '2024-09-21',
    status: 'Active',
  },
  {
    id: 3,
    name: 'RANJITH NEERUKATTU',
    mobile: '8179196272',
    city: 'Bapatla',
    state: 'Andhra Pradesh',
    userId: 95,
    created: '2024-09-11 06:01:08',
    atm: 1,
    roPanel: 1,
    recharge: 1,
    dueDate: '2024-09-11',
    status: 'Active',
  },
];

const User = () => {
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState(null);

  const handleAddUser = () => navigate('/adduser');

  const handleDownload = () => {
    const headers = ['ID,Name,Mobile,City,State,UserID,Created,ATMs,RO Panels,Recharges,Due Date,Status'];
    const rows = userData.map(row => [
      row.id, `"${row.name}"`, row.mobile, row.city, row.state, row.userId,
      row.created, row.atm, row.roPanel, row.recharge, row.dueDate, row.status
    ].join(','));
    const csvContent = [...headers, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'users.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const columns = [
    { name: '#', selector: row => row.id, sortable: true, center: true, wrap: true, maxWidth: '50px' },
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
      center: true,
      wrap: true,
      cell: row => (
        <span
          onClick={() => setSelectedUser(row)}
          style={{
            color: '#0d6efd',
            cursor: 'pointer',
            textDecoration: 'underline',
            fontWeight: 500,
          }}
        >
          {row.name}
        </span>
      ),
    },
    { name: 'Mobile', selector: row => row.mobile, sortable: true, center: true, wrap: true },
    { name: 'City', selector: row => row.city, sortable: true, center: true, wrap: true },
    { name: 'State', selector: row => row.state, sortable: true, center: true, wrap: true },
    { name: 'User ID', selector: row => row.userId, sortable: true, center: true, wrap: true },
    { name: 'Created', selector: row => row.created, sortable: true, center: true, wrap: true },
    { name: 'ATMs', selector: row => row.atm, sortable: true, center: true, wrap: true },
    { name: 'RO Panels', selector: row => row.roPanel, sortable: true, center: true, wrap: true },
    { name: 'Recharges', selector: row => row.recharge, sortable: true, center: true, wrap: true },
    { name: 'Due Date', selector: row => row.dueDate, sortable: true, center: true, wrap: true },
    {
      name: 'Status',
      selector: row => row.status,
      sortable: true,
      center: true,
      wrap: true,
      cell: row => (
        <span
          className={`badge px-3 py-2 rounded-pill fw-semibold ${row.status === 'Active'
            ? 'bg-success-subtle text-success'
            : 'bg-danger-subtle text-danger'
            }`}
        >
          {row.status}
        </span>
      ),
    },
  ];

  const customStyles = {
    table: {
      style: { tableLayout: 'fixed', width: '100%' },
    },
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
    rows: { style: { minHeight: '52px' } },
  };

  return (
    <div style={{ backgroundColor: '#f5f7fa', minHeight: '100vh', paddingTop: '6rem' }}>
      <Navbar />

      <section className="container-fluid px-4 pb-4">
        <div className="row g-4 mb-4">
          <div className="col-md-6"><InfoCard title="Total Users" count={28} /></div>
          <div className="col-md-6"><InfoCard title="Active Users" count={28} /></div>
        </div>

        <div className="bg-white rounded shadow p-3">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0 text-primary fw-semibold">User List</h5>
            <div className="d-flex gap-2">
              <Button variant="primary" onClick={handleAddUser}>+ Add User</Button>
              <Button variant="primary" onClick={handleDownload}><FiDownload className="me-2" />Download</Button>
            </div>
          </div>

          <DataTable
            columns={columns}
            data={userData}
            pagination
            noHeader
            customStyles={customStyles}
          />
        </div>
      </section>

      {selectedUser && (
        <div style={modalStyles.overlay}>
          <div style={modalStyles.modal}>
            <h4 style={{ marginBottom: '10px' }}>{selectedUser.name}</h4>
            <p><strong>Mobile:</strong> {selectedUser.mobile}</p>
            <p><strong>City:</strong> {selectedUser.city}</p>
            <p><strong>State:</strong> {selectedUser.state}</p>
            <p><strong>User ID:</strong> {selectedUser.userId}</p>
            <p><strong>Created:</strong> {selectedUser.created}</p>
            <p><strong>Due Date:</strong> {selectedUser.dueDate}</p>
            <p><strong>Status:</strong> {selectedUser.status}</p>
            <div style={{ marginTop: '20px', textAlign: 'right' }}>
              <Button variant="secondary" onClick={() => setSelectedUser(null)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const InfoCard = ({ title, count }) => (
  <div className="bg-white rounded shadow p-4 d-flex align-items-center gap-3">
    <div
      className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center"
      style={{ width: 50, height: 50 }}
    >
      <FaUsers size={24} />
    </div>
    <div>
      <h6 className="mb-1 text-muted">{title}</h6>
      <h4 className="mb-0 fw-bold">{count}</h4>
    </div>
  </div>
);

const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0,
    width: '100%', height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: '20px 30px',
    minWidth: '320px',
    maxWidth: '500px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
    animation: 'fadeIn 0.3s ease-in-out',
  },
};

export default User;
