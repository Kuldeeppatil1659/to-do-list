import { useEffect, useState } from 'react';
import './App.css';
import { Table } from './components/Table';
import { Modal } from './components/Modal';
import { FcTodoList } from "react-icons/fc";

const API_URL = 'https://my-json-server.typicode.com/Kuldeeppatil1659/api/pages'; 

function App() {
    const [modalOpen, setModalOpen] = useState(false);
    const [rows, setRows] = useState([]);
    const [rowToEdit, setRowToEdit] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchRows();
    }, []);

    const fetchRows = async () => {
        const response = await fetch(API_URL);
        const data = await response.json();
        setRows(data);
    };

    const handleDeleteRow = async (targetIndex) => {
        const rowToDelete = rows[targetIndex];
        await fetch(`${API_URL}/${rowToDelete.id}`, {
            method: 'DELETE',
        });
        setRows(rows.filter((_, idx) => idx !== targetIndex));
    };

    const handleEditRow = (idx) => {
        setRowToEdit(idx);
        setModalOpen(true);
    };

    const handleSubmit = async (newRow) => {
        if (rowToEdit === null) {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newRow),
            });
            const createdRow = await response.json();
            setRows([...rows, createdRow]);
        } else {
            const rowToUpdate = rows[rowToEdit];
            await fetch(`${API_URL}/${rowToUpdate.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newRow),
            });
            setRows(rows.map((currRow, idx) => (idx !== rowToEdit ? currRow : newRow)));
        }
        setModalOpen(false);
        setRowToEdit(null);
    };

    // Filter rows based on search query
    const filteredRows = rows.filter(row => {
        return row.assignedto.toLowerCase().includes(searchQuery.toLowerCase()) || 
               row.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
               row.comments.toLowerCase().includes(searchQuery.toLowerCase());
    });

    return (
        <div className="App">
            <h1 className="title"><FcTodoList /> Task Manager</h1>

            
            <input 
                type="text" 
                placeholder="Search by Assigned To, Status or Comments..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-bar"
            />

            <Table rows={filteredRows} deleteRow={handleDeleteRow} editRow={handleEditRow} />

            <button className='btn' onClick={() => setModalOpen(true)}>Add</button>

            {modalOpen && (
                <Modal
                    closeModal={() => {
                        setModalOpen(false);
                        setRowToEdit(null);
                    }}
                    onSubmit={handleSubmit}
                    defaultValue={rows[rowToEdit] || {}}
                />
            )}
        </div>
    );
}

export default App;
