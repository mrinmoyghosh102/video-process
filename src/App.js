import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";
import Outputs from "./components/Outputs";
import FaceComponents from "./components/FaceComponents";

function App() {
  const [source, setSource] = useState({
    image: "",
    video: "",
  });
  // const [activityType, setActivityType] = useState("");
  const [resVideoURL, setResVideoURL] = useState();
  const [status, setStatus] = useState(false);
  const [imageStatus, setImageStatus] = useState(false);
  const [videoStatus, setVideoStatus] = useState(false);
  const [upload, setUpload] = useState({
    image: "",
    video: "",
  });
  function ValidateImage() {
    var image = document.getElementById("image").value;
    if (image !== "") {
      var checkimg = image.toLowerCase();
      // validation of file extension
      if (!checkimg.match(/(\.jpg|\.png|\.JPG|\.PNG|\.jpeg|\.JPEG |\.webp|\.WEBP)$/)) {
        document.getElementById("image").focus();
        alert("Wrong file selected");
        setImageStatus(false);
        return false;
      }
      // var img = document.getElementById("image");s
      // alert(img.files[0].size);
      // validation according to file size
      // if (img.files[0].size < 1048576) {
      //   alert("Image size too short");
      //   setImageStatus(false);
      //   return false;
      // }
      setImageStatus(true);
      return true;
    }
  }

  function ValidateVideo() {
    var video = document.getElementById("video").value;
    if (video !== "") {
      var checkimg = video.toLowerCase();
      // validation of file extension
      if (!checkimg.match(/(\.mp4|\.MP4|\.flv|\.FLV|\.mkv|\.MKV)$/)) {
        document.getElementById("video").focus();
        alert("Wrong file selected");
        setVideoStatus(false);
        return false;
      }
      // var vid = document.getElementById("video");
      // alert(vid.files[0].size);
      // validation according to file size
      // if (vid.files[0].size < 1048576) {
      //   alert("Video size too short");
      //   setVideoStatus(false);
      //   return false;
      // }
      setVideoStatus(true);
      return true;
    }
  }

  const handleImageChange = (event) => {
    const urlImage = URL.createObjectURL(event.target.files[0]);
    setUpload({ ...upload, image: event.target.files[0] });
    setSource({ ...source, image: urlImage });
    ValidateImage();
  };

  const handleVideoChange = (event) => {
    const urlVideo = URL.createObjectURL(event.target.files[0]);
    setUpload({ ...upload, video: event.target.files[0] });
    setSource({ ...source, video: urlVideo });
    ValidateVideo();
  };
  useEffect(() => {
    if (imageStatus && videoStatus) {
      setStatus(true);
    }
  }, [upload.video, upload.image]);

  const submitHandler = async (e) => {
    console.log(upload)
    if (status) {
      var formData = new FormData();
      formData.append("image", upload.image);
      formData.append("video", upload.video);
      try {
        await axios({
          method: "POST",
          url: "http://10.12.1.151:80/img_upload/",
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        })
          .then(function (response) {
            console.log("Success: ", response.data);

            if (response.data.status === "success") {
              setResVideoURL(response.data.video_url);
              alert("File uploaded successfully");
              setImageStatus(false);
              setVideoStatus(false);
            } else {
              alert("Error Something went wrong!");
            }
          })
          .catch(function (response) {
            console.log("Error: ", response);
          });
      } catch (ex) {
        console.log(ex);
      }
    } else {
      alert("Please select both image and video to upload");
    }
  };

  return (
    <>
      <div className="header">
        <h1>Video Analytics For suspicious Activity Detection</h1>

        {/* <div className="header_choose">
          <label>Choose Your Usecase</label> <br />
          <div className="h_radios">
            <div className="header_radio">
              <input
                type="radio"
                id="face"
                name="activity_type"
                value="Face Recognition"
              />
              <label htmlFor="face">Face Recognition</label>
            </div>
            <div className="header_radio">
              <input
                type="radio"
                id="weapon"
                name="activity_type"
                value="Weapon Recognition"
              />
              <label htmlFor="weapon">Weapon Recognition</label>
            </div>
          </div>
        </div> */}

        <FaceComponents
          handleImageChange={handleImageChange}
          handleVideoChange={handleVideoChange}
          submitHandler={submitHandler}
        />
      </div>

      <Outputs source={source} resVideoURL={resVideoURL} />
    </>
  );
}

export default App;
