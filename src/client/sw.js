self.addEventListener("install", function (e) {
  //console.log('install');
});

self.addEventListener("fetch", function (e) {
  //console.log('fetch');
});

self.addEventListener("push", function (event) {
  const notificationData = JSON.parse(event.data.text());
  const title = notificationData.title;
  let options = {};
  if (notificationData.action_url !== "") {
    options.actions = [
      {
        action: notificationData.action_name,
        title: notificationData.action_title
      },
      { action: "close", title: "Close" }
    ];
    options.data = { url: notificationData.action_url };
  }
  options.body = notificationData.text;
  options.icon = "icons/Push-Notifications-App-512.png";
  console.log(event.data.text());
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", function (e) {
  if (e.action === "url") {
    if (clients.openWindow) clients.openWindow(e.notification.data.url);
  }
  self.registration.getNotifications().then(function (notifications) {
    //notifications.forEach(function(notification) {
    //  notification.close();
    //});
  });
});
