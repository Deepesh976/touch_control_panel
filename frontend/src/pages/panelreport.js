import React, { useState } from 'react';
import Navbar from '../components/navbar/navbar';
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { FiDownload, FiFilter } from 'react-icons/fi';
import { FaUsers } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';

const panelData = [
  {
    id: 1,
    panelNo: 'PNL001',
    location: 'Mumbai\nMaharashtra',
    dateTime: '2025-07-22 10:30',
    status: 'Active',
    roTrs: '350',
    roLtrsPerHr: '20',
    rWaterLtrs: '180',
    tds: '45',
    rwpAmps: '3.1',
  },
  {
    id: 2,
    panelNo: 'PNL002',
    location: 'Hyderabad\nTelangana',
    dateTime: '2025-07-22 09:15',
    status: 'Inactive',
    roTrs: '0',
    roLtrsPerHr: '0',
    rWaterLtrs: '0',
    tds: '70',
    rwpAmps: '0',
  },
  // Add more objects here for full pagination test
];

const PanelReport = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const handleDownload = () => {
    const headers = [
      'ID,Panel No,Location,Date Time,Status,RO TRS,RO Ltrs/Hr,R-water Ltrs,TDS,RWP Amps',
    ];
    const rows = panelData.map(row =>
      [
        row.id,
        row.panelNo,
        row.location.replace('\n', ' '),
        row.dateTime,
        row.status,
        row.roTrs,
        row.roLtrsPerHr,
        row.rWaterLtrs,
        row.tds,
        row.rwpAmps,
      ].join(',')
    );
    const csvContent = [...headers, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'panel-report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredData = panelData.filter(row => {
    const searchMatch =
      row.panelNo.toLowerCase().includes(searchText.toLowerCase()) ||
      row.location.toLowerCase().includes(searchText.toLowerCase());

    if (startDate && endDate) {
      const rowDate = new Date(row.dateTime);
      return searchMatch && rowDate >= startDate && rowDate <= endDate;
    }
    return searchMatch;
  });

  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const columns = [
    { name: '#', selector: (row, index) => (currentPage - 1) * rowsPerPage + index + 1, center: true },
    {
      name: 'Panel No',
      selector: row => row.panelNo,
      center: true,
      cell: row => (
        <span
          onClick={() => navigate(`/editdevice?panelNo=${row.panelNo}`)}
          style={{ color: '#007bff', cursor: 'pointer', textDecoration: 'underline' }}
        >
          {row.panelNo}
        </span>
      ),
    },
    {
      name: 'Location',
      selector: row => row.location,
      center: true,
      cell: row => <div style={{ whiteSpace: 'pre-line' }}>{row.location}</div>,
    },
    {
      name: 'Date Time',
      selector: row => row.dateTime,
      center: true,
      cell: row => (
        <div>{format(new Date(row.dateTime), 'yyyy/MM/dd HH:mm:ss')}</div>
      ),
    },
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
    { name: "Today's RO Ltrs", selector: row => row.roTrs, center: true },
    { name: 'RO LTRS/Hr', selector: row => row.roLtrsPerHr, center: true },
    { name: 'R-water Ltrs/Hr', selector: row => row.rWaterLtrs, center: true },
    { name: 'TDS', selector: row => row.tds, center: true },
    { name: 'RWP Amps', selector: row => row.rwpAmps, center: true },
  ];

  return (
    <div style={styles.page}>
      <Navbar />
      <div style={styles.wrapper}>
        <div style={styles.cardWrapper}>
          <InfoCard title="No of devices data received from in last 24 hours" count={0} />
          <InfoCard title="No of devices not data received from in last 7 days" count={1} />
        </div>

        <div style={styles.tableContainer}>
          <div style={styles.topBar}>
            <h5 style={styles.title}>Panel Report Table</h5>
            <div style={styles.searchActions}>
              <input
                type="text"
                placeholder="Search"
                value={searchText}
                onChange={e => {
                  setSearchText(e.target.value);
                  setCurrentPage(1);
                }}
                style={styles.searchInput}
              />
              <button onClick={() => setShowFilter(!showFilter)} style={styles.filterButton}>
                <FiFilter style={{ marginRight: 6 }} />
                Filter
              </button>
              <button onClick={handleDownload} style={styles.downloadButton}>
                <FiDownload style={{ marginRight: 6 }} />
                Download
              </button>
            </div>
          </div>

          {showFilter && (
            <div style={styles.filterContainer}>
              <h6 style={styles.filterTitle}>📅 Filter By Date</h6>
              <div style={styles.dateInputs}>
                <DatePicker
                  selected={startDate}
                  onChange={date => setStartDate(date)}
                  placeholderText="Start Date"
                  className="date-picker"
                />
                <DatePicker
                  selected={endDate}
                  onChange={date => setEndDate(date)}
                  placeholderText="End Date"
                  className="date-picker"
                />
              </div>
            </div>
          )}

          <DataTable
            columns={columns}
            data={paginatedData}
            pagination={false}
            noHeader
            customStyles={customStyles}
          />

          <div style={{ marginTop: 16, textAlign: 'center' }}>
            <button onClick={handlePrevious} disabled={currentPage === 1} style={styles.paginationButton}>
              ⬅ Previous
            </button>
            <span style={{ margin: '0 10px', fontWeight: 'bold' }}>
              {currentPage} of {totalPages}
            </span>
            <button onClick={handleNext} disabled={currentPage === totalPages} style={styles.paginationButton}>
              Next ➡
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
    maxWidth: 1500,
    margin: '0 auto',
    padding: '0 1rem 2rem',
  },
  cardWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: '1rem',
    marginBottom: '1.5rem',
  },
  infoCard: {
    flex: '1 1 calc(50% - 0.5rem)',
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
    overflowX: 'auto',
  },
  topBar: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
    gap: '1rem',
  },
  title: {
    margin: 0,
    color: '#0d6efd',
    fontWeight: 600,
  },
  searchActions: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
  },
  searchInput: {
    padding: '8px 12px',
    borderRadius: 6,
    border: '1px solid #ccc',
    minWidth: 200,
  },
  filterButton: {
    backgroundColor: '#ffc107',
    color: '#000',
    border: 'none',
    padding: '8px 14px',
    borderRadius: 6,
    fontWeight: 500,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  downloadButton: {
    backgroundColor: '#0d6efd',
    color: '#fff',
    border: 'none',
    padding: '8px 14px',
    borderRadius: 6,
    fontWeight: 500,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  filterContainer: {
    marginBottom: '1rem',
    padding: '1rem',
    backgroundColor: '#f8f9fa',
    borderRadius: 6,
  },
  filterTitle: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  dateInputs: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
  },
};

const customStyles = {
  headCells: {
    style: {
      fontWeight: '600',
      fontSize: '13px',
      backgroundColor: '#f1f3f5',
      whiteSpace: 'pre-line',
      wordBreak: 'break-word',
      textAlign: 'center',
      padding: '10px',
    },
  },
  cells: {
    style: {
      fontSize: '13px',
      whiteSpace: 'pre-line',
      wordBreak: 'break-word',
      textAlign: 'center',
      padding: '10px',
    },
  },
  rows: {
    style: {
      minHeight: '60px',
    },
  },
};

export default PanelReport;
