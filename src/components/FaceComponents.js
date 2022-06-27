import React from "react";

const FaceComponents = ({
  handleImageChange,
  handleVideoChange,
  submitHandler,
}) => {
  return (
    <>
      <div className="row">
        <div className="col-md-6 col-12 mt-2">
          <div className="input">
            <h2>Upload Targetted Image</h2>
            <input
              type="file"
              className="form-control"
              onChange={handleImageChange}
              accept=".jpg, .jpeg, .png, .webp"
              id="image"
              name="image"
            />
          </div>
        </div>
        <div className="col-md-6 col-12 mt-2">
          <div className="input">
            <h2>Upload Source Video</h2>
            <input
              name="video"
              type="file"
              className="form-control"
              onChange={handleVideoChange}
              accept=".mov,.mp4"
              id="video"
            />
          </div>
        </div>
        <div className="col-12 mt-2">
          <button
            className="btn_style"
            name="submit"
            onClick={() => submitHandler()}
          >
            <span>Process Now</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default FaceComponents;
