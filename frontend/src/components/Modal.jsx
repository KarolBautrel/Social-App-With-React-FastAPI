import "./Modal.css";

export const Modal = ({ children, handleCloseModal }) => {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        {children}
        <button onClick={handleCloseModal} className="modal-button">
          Close
        </button>
      </div>
    </div>
  );
};
