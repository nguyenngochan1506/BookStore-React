const MyModal = ({id}) => {
  return (
    <>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <dialog id={id} className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          {/* content */}
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default MyModal;
