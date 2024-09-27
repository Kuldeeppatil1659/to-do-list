import React from 'react';
import './Table.css';
import { BsFillPencilFill, BsFillTrashFill } from 'react-icons/bs';

export const Table = ({ rows, deleteRow, editRow }) => {
    return (
        <div className='table-wrapper'>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Assigned To</th>
                        <th>Status</th>
                        <th>Due Date</th>
                        <th>Priority</th>
                        <th className='expand'>Comments</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        rows.map((row,idx) => {
                            const statusText = row.status.charAt(0).toUpperCase() + row.status.slice(1);
                            return (
                                <tr key={idx}> 
                                    <td>{row.assignedto}</td>
                                    <td>
                                        <span className={`label label-${row.status}`}>{statusText}</span>
                                    </td>
                                    <td>{row.duedate}</td>
                                    <td>
                                        <span>{row.priority}</span>
                                    </td>
                                    <td className='expand'>{row.comments}</td>
                                    
                                    <td>
                                        <span className='actions'>
                                            <BsFillTrashFill className='delete-btn' onClick={() => deleteRow(row.id)} />
                                            <BsFillPencilFill onClick={() => editRow(idx)} />
                                        </span>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    );
};
