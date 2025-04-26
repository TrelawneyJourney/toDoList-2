import Modal from "./Modal";
import { useState } from "react";

const ListHeader = ({ listName }) => {
  const [showModal, setShowModal] = useState(false);

  const signnOut = () => {
    console.log("signout");
  };

  return (
    <div className="list-header flex flex-col md:flex-row justify-start md:justify-between items-start md:items-center mb-3 py-4 gap-4">
      <h1 className="text-[clamp(0.2rem,6vw,3.5rem)] text-td5">{listName}</h1>

      <div className="flex-container">
        <button className="create" onClick={() => setShowModal(true)}>
          ADD NEW
        </button>
        <button className="signout" onClick={signnOut}>
          SIGN OUT
        </button>
      </div>
      {showModal && <Modal mode={"create"} setShowModal={setShowModal} />}
    </div>
  );
};

export default ListHeader;
