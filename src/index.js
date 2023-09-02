const http = require("http");
const qs = require("querystring");
const webPush = require("web-push");
const fs = require("fs");

function getQueryFromStringURL(url, letiable) {
  let query = url.slice(url.indexOf("?"), url.length).substring(1);
  let lets = query.split("&");
  for (let i = 0; i < lets.length; i++) {
    let pair = lets[i].split("=");
    if (pair[0] === letiable) {
      return pair[1];
    }
  }
  return false;
}

http
  .createServer((request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    let body = "";
    if (request.method === "POST") {
      request.on("data", (chunk) => {
        body += chunk;
      });
      request.on("end", () => {
        try {
          const post = qs.parse(body);
          if (post.notification) {
            const n = JSON.parse(post.notification);
            const payload = n.message;
            const options = {
              vapidDetails: {
                subject: "mailto:vladkvaskov123@gmail.com",
                publicKey:
                  "BBIUKA0LJRuHZ1cYCs4hvXTHJAP6Ex5zDUMgWNSw9LxSZOjGyh_ik21lqdE4a5VJyQmEo3ygoI6eLrKfscSB7GY",
                privateKey: "nlVZHSoWV5JgqfVkFnE6YCiIbSsY-8DMKshln0IcK9Y"
              },
              TTL: 60
            };
            for (let subscription of n.subs) {
              let pushSubscription = JSON.parse(subscription);
              //start for Microsoft Edge
              if (getQueryFromStringURL(pushSubscription.endpoint, "token")) {
                let endpoint = pushSubscription.endpoint;
                const newToken = getQueryFromStringURL(endpoint, "token")
                  .replace(/\//g, "%2f")
                  .replace(/\+/g, "%2b");
                pushSubscription.endpoint = pushSubscription.endpoint.replace(
                  getQueryFromStringURL(pushSubscription.endpoint, "token"),
                  newToken
                );
              }
              //end for Microsoft Edge
              webPush
                .sendNotification(pushSubscription, payload, options)
                .then((res) => {
                  // response.write('success');
                  // response.end();
                  return res;
                })
                .catch((err) => {
                  // console.log(err);
                  // response.write('fail');
                  // response.end();
                });
            }
          }
          response.write("Node.js!", () => {
            response.end();
          });
        } catch (err) {
          response.write("error");
          response.end();
        }
      });
    } else {
      fs.readFile(
        `src/client${
          request.url === "/" ? "/notifications.html" : request.url
        }`,
        function (fileError, content) {
          if (fileError) {
            throw fileError;
          }

          if (request.url.endsWith(".js")) {
            response.setHeader("Content-Type", "application/javascript");
          } else if (request.url === "/" || request.url.endsWith(".html")) {
            response.setHeader("Content-Type", "text/html");
          } else if (request.url.endsWith(".json")) {
            response.setHeader("Content-Type", "application/json");
          } else if (request.url.endsWith(".png")) {
            response.setHeader("Content-Type", "image/png");
          } else if (request.url.endsWith(".css")) {
            response.setHeader("Content-Type", "text/css");
          }

          response.write(content);
          response.end();
        }
      );
    }
  })
  .listen(50090);
