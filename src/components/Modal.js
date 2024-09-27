import React, { useState } from 'react';
import './Modal.css';

export const Modal = ({ closeModal, onSubmit, defaultValue }) => {
    const [formState, setFormState] = useState(defaultValue || {
        assignedto: "",
        status: "completed",
        duedate: "",
        priority: "Low",
        comments: ""
    });

    const [errors, setErrors] = useState(""); // Tracks validation errors

    const validateForm = () => {
        const errorFields = [];
        // Check if each form field is filled out
        if (!formState.assignedto) errorFields.push("Assigned To");
        if (formState.status === "") errorFields.push("Status");
        if (formState.duedate === "") errorFields.push("Due Date");
        if (formState.priority === "") errorFields.push("Priority");
        if (formState.comments === "") errorFields.push("Comments");
    
        if (errorFields.length > 0) {
            setErrors(`Please fill in: ${errorFields.join(", ")}`);
            return false;
        }
    
        setErrors(""); 
        return true;
    };

    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return; // Validate form before submitting
        onSubmit(formState);
        closeModal();
    };

    return (
        <div className='modal-container' onClick={(e) => {
            if (e.target.className === 'modal-container') closeModal();
        }}>
            <div className='modal'>
                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor='assignedto'>Assigned To</label>
                        <input
                            name='assignedto'
                            value={formState.assignedto}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className='form-group'>
                        <label htmlFor='status'>Status</label>
                        <select
                            name='status'
                            value={formState.status}
                            onChange={handleChange}
                            required
                        >
                            <option value="select">Please Select Status</option>
                            <option value="completed">Completed</option>
                            <option value="inprogress">In Progress</option>
                            <option value="notstarted">Not Started</option>
                        </select>
                    </div>

                    <div className='form-group'>
                        <label htmlFor='duedate'>Due Date</label>
                        <input
                            type='date'
                            name='duedate'
                            value={formState.duedate}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className='form-group'>
                        <label htmlFor='priority'>Priority</label>
                        <select
                            name='priority'
                            value={formState.priority}
                            onChange={handleChange}
                            required
                        >
                            <option value="selectprivority">Please Select Privority</option>
                            <option value="Low">Low</option>
                            <option value="High">High</option>
                            <option value="Normal">Normal</option>
                        </select>
                    </div>

                    <div className='form-group'>
                        <label htmlFor='comments'>Comments</label>
                        <textarea
                            name='comments'
                            value={formState.comments}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {errors && <div className='error'>{errors}</div>} 

                    <button type='submit' className='btn'>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};
