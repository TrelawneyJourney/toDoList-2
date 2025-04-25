import React from "react";

const Modal = () => {
  const mode = "edit";
  const handleChange = () => {
    console.log("changing!");
  };

  return (
    <div className="">
      <div className="overlay absolute left-0 top-0 w-screen min-h-screen flex justify-center items-center bg-td7">
        <div className="modal">
          <div className="form-title-container">
            <h3>Let's {mode} you task</h3>
            <button>x</button>
          </div>
          <form>
            <input
              required
              maxLength={30}
              placeholder=" Your task goes here"
              name="title"
              value={""}
              onChange={handleChange}
            />

            <input
              required
              type="range"
              min={0}
              max={100}
              name="progress"
              value={""}
              onChange={handleChange}
            />

            <input className={mode} type="submit" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
