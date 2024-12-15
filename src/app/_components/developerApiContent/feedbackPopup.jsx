import React from "react";
import logo from "../svg/hushhlogo";
import FeedBack from "react-feedback-popup";
import "../../globals.css";

function FeedbackPopup() {
  return (
    <div className="feedbackForm" style={{background:'transparent'}}>
      <FeedBack
        style={{ zIndex: "2", marginLeft: "20px", position: "fixed",color:'black',gap:'2rem',innerHeight:'10rem', outerHeight:'10rem'}}
        position="right"
        numberOfStars={5}
        headerText="Feedback on our API's"
        bodyText="Please share you experience with us"
        buttonText="Send Us Your Feedback 🤫"
        handleClose={() => console.log("handleclose")}
        handleSubmit={(data) =>
          fetch("xxxxxx", {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            method: "POST", // or 'PUT'
            body: JSON.stringify(data),
          })
            .then((response) => {
              if (!response.ok) {
                return Promise.reject(
                  "Our servers are having issues! We couldn't send your feedback!"
                );
              }
              response.json();
            })
            .then(() => {
              alert("Success!");
            })
            .catch((error) => {
              alert(
                "Our servers are having issues! We couldn't send your feedback!",
                error
              );
            })
        }
        handleButtonClick={() => console.log("handleButtonClick")}
      />
    
    </div>
  );
}

export default FeedbackPopup;
