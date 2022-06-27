import React from "react";

const Outputs = ({ source, resVideoURL }) => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4 col-12">
            <div className="card">
              <h2>Targeted Image</h2>
              {source.image ? (
                <img src={source.image} alt="" />
              ) : (
                <p>Upload Targeted Image First</p>
              )}
            </div>
          </div>
          <div className="col-md-4 col-12">
            <div className="card">
              <h2>Source Video</h2>
              {source.video ? (
                <video src={source.video} controls />
              ) : (
                <p>Upload Source Video First</p>
              )}
            </div>
          </div>
          <div className="col-md-4 col-12">
            <div className="card">
              <h2>Findings</h2>
              {resVideoURL ? (
                <video src={resVideoURL} controls />
              ) : (
                <p>Click on Process Now Button</p>
              )}
              {/* <video src={video} controls /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Outputs;
