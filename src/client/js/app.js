window.onload = () => {
  const sendNotification = (sub, message) => {
    fetch("https://nkokz.sse.codesandbox.io/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body:
        "notification=" +
        JSON.stringify({
          subs: sub,
          message: message
        })
    });
  };

  const laddaBttn = Ladda.create(pushBttn);
  let isPageLoaded = false;
  let userSub = "";
  let prevSub = "";
  let swRegistration;
  const publicKey =
    "BBIUKA0LJRuHZ1cYCs4hvXTHJAP6Ex5zDUMgWNSw9LxSZOjGyh_ik21lqdE4a5VJyQmEo3ygoI6eLrKfscSB7GY";
  checkValidityTextArea();

  push_message_txt.oninput = () => {
    checkValidityTextArea();
  };

  pushBttn.onclick = () => {
    if (push_message_txt.value.replace(/\n/g, "") !== "") {
      //console.log(userSub);
      sendNotificationToEveryone();
    } else {
      Swal.fire({
        icon: "error",
        text: "Message must not be empty."
      });
    }
  };

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("sw.js")
      .then(function (reg) {
        swRegistration = reg;
        if ("PushManager" in window) {
          document.querySelector(".notifications-block").classList.add("show");
          notificationPermission(swRegistration);
          notifications_toggler.onchange = () => {
            isPageLoaded = true;
            if (notifications_toggler.checked) {
              notification_label.classList.replace(
                "text-secondary",
                "text-primary"
              );
              notificationPermission(swRegistration);
            } else {
              notification_label.classList.replace(
                "text-primary",
                "text-secondary"
              );
              unsubscribeUser(swRegistration);
            }
          };
        } else {
          Swal.fire({
            icon: "error",
            title: "Push API is not supported!",
            text: "Please use a browser that supports Push API!",
            allowOutsideClick: false,
            showConfirmButton: false
          });
        }
      })
      .catch(function (err) {
        Swal.fire({
          icon: "error",
          title: "error",
          text: err.message,
          allowOutsideClick: false,
          showConfirmButton: false
        });
      });
  }

  function checkValidityTextArea() {
    txt_length_span.innerText = `${
      push_message_txt.value.length
    }/${push_message_txt.getAttribute("maxlength")}`;
    if (
      push_message_txt.value.replace(/\n/g, "").replace(/ /g, "") === "" ||
      push_message_txt.value.length >
        parseInt(push_message_txt.getAttribute("maxlength"))
    ) {
      pushBttn.disabled = true;
      push_message_txt.classList.remove("valid-form");
      push_message_txt.classList.add("invalid-form");
    } else {
      pushBttn.disabled = false;
      push_message_txt.classList.remove("invalid-form");
      push_message_txt.classList.add("valid-form");
    }
    if (notifications_toggler.checked === false) {
      push_message_txt.disabled = true;
      push_message_txt.placeholder =
        "Please subscribe for notifications before sending a push notification.";
      txt_length_span.hidden = true;
    } else {
      push_message_txt.disabled = false;
      txt_length_span.hidden = false;
      push_message_txt.placeholder = "Enter a message that you want to push...";
    }
  }

  function subscribeUser(swReg) {
    swReg.pushManager
      .subscribe({
        userVisibleOnly: true,
        applicationServerKey: publicKey
      })
      .then(function (sub) {
        //console.log('Subscription object: ', sub);

        userSub = sub;
        notifications_toggler.checked = true;
        sendFirstNotification(
          JSON.stringify(userSub),
          JSON.stringify({
            title: "Push App",
            text: "Thanks for subscribing!",
            action_title: "LinkedIn",
            action_url:
              "https://www.linkedin.com/in/progressive-web-app-developer/",
            action_name: "url"
          })
        );
        checkValidityTextArea();
      })
      .catch(function (err) {
        if (Notification.permission === "denied") {
          Swal.fire({
            icon: "error",
            title: "Permission for notifications is denied!",
            text:
              "Please allow notifications in your browse for this website manually.",
            allowOutsideClick: false,
            showConfirmButton: false
          });
        } else {
          Swal.fire({
            icon: "error",
            title: err,
            allowOutsideClick: false,
            showConfirmButton: false
          });
        }
      });
  }

  function unsubscribeUser(swReg) {
    notifications_toggler.checked = false;
    swReg.pushManager
      .getSubscription()
      .then(function (subscription) {
        if (subscription) {
          removeSubscription(JSON.stringify(subscription));
          userSub = "";
          checkValidityTextArea();
          return subscription.unsubscribe();
        }
      })
      .catch(function (error) {
        Swal.fire({
          icon: "error",
          title: "Error unsubscribing",
          allowOutsideClick: false,
          showConfirmButton: false
        });
      })
      .then(function () {
        notifications_toggler.checked = false;
      });
  }

  function checkUsersSubscription(swReg) {
    swReg.pushManager.getSubscription().then(function (sub) {
      if (sub === null) {
        notifications_toggler.checked = false;
        //console.log('User is not subscribed for notifications');
        checkValidityTextArea();
        return false;
      } else {
        // There is a subscription
        //console.log(JSON.stringify(sub));
        userSub = sub;
        notifications_toggler.checked = true;
        checkValidityTextArea();
        return true;
      }
    });
  }

  function notificationPermission(swReg) {
    if (!("Notification" in window)) {
      Swal.fire({
        icon: "error",
        title: "Notification API is not supported!",
        text: "Please use a browser that supports Notification API!",
        allowOutsideClick: false,
        showConfirmButton: false
      });
    }
    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
      if (isPageLoaded) {
        subscribeUser(swReg);
      } else {
        swReg.pushManager.getSubscription().then(function (sub) {
          if (sub === null) {
            notifications_toggler.checked = false;
            checkValidityTextArea();
          } else {
            userSub = sub;
            console.log(userSub);
            notifications_toggler.checked = true;
            checkValidityTextArea();
          }
        });
      }
    }
    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== "denied" && isPageLoaded) {
      Notification.requestPermission().then(function (permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          swReg.pushManager.getSubscription().then(function (sub) {
            if (sub === null && isPageLoaded) {
              subscribeUser(swReg);
              notifications_toggler.checked = true;
              checkValidityTextArea();
            } else {
              userSub = sub;
              console.log(userSub);
              notifications_toggler.checked = true;
              checkValidityTextArea();
            }
          });
        }
      });
    } else if (Notification.permission === "denied" && isPageLoaded) {
      if (checkUsersSubscription) {
        unsubscribeUser(swReg);
      }
      notifications_toggler.checked = false;
      Swal.fire({
        icon: "info",
        text: `It looks like you have to allow notifications manually.
              Go to the browser's settings and allow notifications for this website.`
      });
    }
  }

  function sendFirstNotification(sub, message) {
    fetch("https://nkokz.sse.codesandbox.io/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body:
        "notification=" +
        JSON.stringify({
          subs: [sub],
          message: message
        })
    })
      .then((response) => response.text())
      .then((data) => {
        addSubscription(sub);
      });
  }

  function addSubscription(sub) {
    const json = { subscription: sub };
    fetch("https://5e2776456eeb440014536d38.mockapi.io/v1/subs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(json)
    }).then((response) => {
      if (response.status == 201) {
        //console.log(response.json());
      } else {
      }
    });
  }

  function removeSubscription(sub) {
    fetch("https://5e2776456eeb440014536d38.mockapi.io/v1/subs")
      .then((response) => response.json())
      .then((data) => {
        for (const d of data) {
          if (d.subscription === sub) {
            fetch(
              `https://5e2776456eeb440014536d38.mockapi.io/v1/subs/${d.id}`,
              {
                method: "DELETE"
              }
            ).then((response) => {
              if (response.status === 200) {
                //console.log(response.json());
              } else {
              }
            });
            break;
          }
        }
      });
  }

  function sendNotificationToEveryone() {
    fetch("https://5e2776456eeb440014536d38.mockapi.io/v1/subs")
      .then((response) => response.json())
      .then((data) => {
        let arrOfSubs = [];
        for (const d of data) {
          arrOfSubs.push(d.subscription);
        }
        sendNotification(
          arrOfSubs,
          JSON.stringify({
            title: "Push App",
            text: push_message_txt.value,
            action_title: "LinkedIn",
            action_url:
              "https://www.linkedin.com/in/progressive-web-app-developer/",
            action_name: "url"
          })
        );
      });
  }
};
