import React from 'react';

const DeleteConfirmationModal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null; 

  return (
    <div className="modal fade show" tabIndex="-1" style={{ display: "block" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Are y0u sure?</h5>
            <button type="button" className="btn-close" onClick={onCancel} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <p>If you delete this thing the entire universe will go down!</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>Oh no!</button>
            <button type="button" className="btn btn-success" onClick={onConfirm}>Oh yes baby!</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
