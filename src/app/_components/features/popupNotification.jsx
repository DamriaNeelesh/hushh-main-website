"use client";
import React, { useState, useEffect } from "react";
// import notification from '../../assets/audio/notification.wav';

const PopupNotification = ({ message }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);

    const timeout = setTimeout(() => {
      setShow(false);
    }, 8000);

    return () => clearTimeout(timeout);
  }, []);

  //   const notificationSound = new Audio(notification);

  function playNotificationSound() {
    new Audio("assets/audio/notification.wav").play();
  }

  function useBotpressChatWithSoundAndNotification() {
    useEffect(() => {
      playNotificationSound();

      const delayedExecution = () => {
        playNotificationSound();
        // showPopupNotification();
      };

      //   // Set a timeout to delay the execution by 2 seconds (3000-4000 milliseconds)
      //   const timeoutId = setTimeout(delayedExecution, Math.random() * 1000);

      //   // Clean up the timeout when the component unmounts
      //   return () => clearTimeout(timeoutId);
    }, []);
  }
  useBotpressChatWithSoundAndNotification();

  if (!show) return null;

  return (
    <>
      <div className="popup" onLoad={useBotpressChatWithSoundAndNotification}>
        {message}
      </div>
      ;
    </>
  );
};

export default PopupNotification;
