import React from 'react';
import Navbar from '../components/navbar/navbar';
import { FaUsers } from 'react-icons/fa';
import DataTable from 'react-data-table-component';
import { Button } from 'react-bootstrap';
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

// Table columns
const columns = [
  { name: '#', selector: row => row.id, sortable: true, center: true, wrap: true, maxWidth: '50px' },
  { name: 'Name', selector: row => row.name, sortable: true, wrap: true, center: true },
  { name: 'Mobile', selector: row => row.mobile, sortable: true, wrap: true, center: true },
  { name: 'City', selector: row => row.city, sortable: true, wrap: true, center: true },
  { name: 'State', selector: row => row.state, sortable: true, wrap: true, center: true },
  { name: 'User ID', selector: row => row.userId, sortable: true, wrap: true, center: true },
  { name: 'Created', selector: row => row.created, sortable: true, wrap: true, center: true },
  { name: 'ATMs', selector: row => row.atm, sortable: true, wrap: true, center: true },
  { name: 'RO Panels', selector: row => row.roPanel, sortable: true, wrap: true, center: true },
  { name: 'Recharges', selector: row => row.recharge, sortable: true, wrap: true, center: true },
  { name: 'Due Date', selector: row => row.dueDate, sortable: true, wrap: true, center: true },
  {
    name: 'Status',
    selector: row => row.status,
    sortable: true,
    center: true,
    wrap: true,
    cell: row => (
      <span
        className={`badge px-3 py-2 rounded-pill fw-semibold ${
          row.status === 'Active' ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'
        }`}
      >
        {row.status}
      </span>
    ),
  },
];

// Custom styles for DataTable
const customStyles = {
  table: {
    style: {
      tableLayout: 'fixed',
      width: '100%',
    },
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
  rows: {
    style: {
      minHeight: '52px',
    },
  },
};

const User = () => {
  return (
    <div style={{ backgroundColor: '#f5f7fa', minHeight: '100vh', paddingTop: '6rem' }}>
      <Navbar />

      <section className="container-fluid px-4 pb-4">
        {/* Info Cards */}
        <div className="row g-4 mb-4">
          <div className="col-md-6">
            <InfoCard title="Total Users" count={28} />
          </div>
          <div className="col-md-6">
            <InfoCard title="Active Users" count={28} />
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded shadow p-3">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0 text-primary fw-semibold">User List</h5>
            <Button variant="primary">+ Add User</Button>
          </div>

          <div className="table-responsive">
            <DataTable
              columns={columns}
              data={userData}
              pagination
              noHeader
              customStyles={customStyles}
            />
          </div>
        </div>
      </section>
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

export default User;
