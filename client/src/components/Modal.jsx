import React, { useState } from "react";
import IconX from "./IconX";

const Modal = ({ mode, setShowModal, task }) => {
  const editMode = mode === "edit" ? true : false;

  const initialItems = {
    user_email: editMode ? task.user_email : "anto@test.com",
    title: editMode ? task.title : "",
    progress: editMode ? task.progress : 50,
    date: editMode ? task.date : new Date(),
  };
  const [data, setData] = useState(initialItems);

  // const [data, setData] = useState({
  //   user_email: editMode ? task.user_email : null,
  //   title: editMode ? task.title : "",
  //   progress: editMode ? task.progress : 50,
  //   date: editMode ? task.date : new Date(),
  // });

  //send it to database

  const postData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    // console.log("changing!", e);
    const { name, value } = e.target;

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(data);
  };

  return (
    <div className="">
      <div className="overlay absolute left-0 top-0 w-screen min-h-screen flex justify-center items-center">
        <div className="modal">
          <div className="form-title-container flex justify-between mb-6">
            <h3>Let's {mode} you task</h3>
            <IconX onClick={() => setShowModal(false)} />
          </div>
          <form className="flex flex-col gap-3 caret-td3 accent-td3">
            <input
              type="text"
              required
              maxLength={30}
              placeholder=" Your task goes here"
              name="title"
              value={data.title}
              onChange={handleChange}
              className="bg-transparent border border-td1 text-td4 text-sm rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-td1 placeholder-td1 placeholder-opacity-60 focus:placeholder-opacity-0"
            />
            <label htmlFor="range">Drag to select your current progress</label>
            <input
              required
              type="range"
              id="range"
              min={0}
              max={100}
              name="progress"
              value={data.progress}
              onChange={handleChange}
            />

            <button
              className={mode}
              type="submit"
              value="ADD"
              onClick={editMode ? "" : postData}
            >
              {" "}
              ADD
            </button>

            {/* <input
              className={mode}
              type="submit"
              value="ADD"
              onClick={editMode ? "" : postData}
            /> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
