export default function TermsModal({ open, onClose }) {
  if (!open) return null;

  return (
    <dialog className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg text-joygreen mb-4">
          Terms & Conditions
        </h3>

        <p className="text-sm mb-2">1. Stay is residential only.</p>
        <p className="text-sm mb-2">2. No illegal activities.</p>
        <p className="text-sm mb-2">3. Property damages chargeable.</p>
        <p className="text-sm mb-4">4. Dummy content.</p>

        <div className="modal-action">
          <button className="btn btn-success" onClick={onClose}>
            I Agree
          </button>
        </div>
      </div>
    </dialog>
  );
}
