import React, { useState } from "react";
import IconX from "./IconX";
import { SERVER_URL } from "../../config";
import { useCookies } from "react-cookie";

const Modal = ({ mode, setShowModal, getData, task }) => {
  const editMode = mode === "edit" ? true : false;
  const [cookies, setCookie, removeCookie] = useCookies(null);

  const initialItems = {
    user_email: editMode ? task.user_email : cookies.Email,
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
      const response = await fetch(`${SERVER_URL}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.status === 200) {
        console.log("worked!");
        setShowModal(false);
        getData();
      }
      // console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  //edit data
  const editData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${SERVER_URL}/todos/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.status === 200) {
        setShowModal(false);
        getData();
      }
    } catch (error) {
      console.error(error);
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
            <h3 className="text-xl font-semibold">Let's {mode} you task</h3>
            <IconX onClick={() => setShowModal(false)} />
          </div>
          <form className="flex flex-col gap-3">
            <input
              type="text"
              required
              maxLength={30}
              placeholder=" Your task goes here"
              name="title"
              value={data.title}
              onChange={handleChange}
              className="input-text mb-2"
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
              className="mb-4"
            />

            <button
              className={mode}
              type="submit"
              value="ADD"
              onClick={editMode ? editData : postData}
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
