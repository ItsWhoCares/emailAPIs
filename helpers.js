// const fetch = require("node-fetch");

function parseCookies(response) {
  const raw = response.headers.getSetCookie();
  return raw
    .map((entry) => {
      const parts = entry.split(";");
      const cookiePart = parts[0];
      return cookiePart;
    })
    .join("; ");
}

async function emailUsedIn(email) {
  return {
    google: await hasGoogleAccount(email),
    zoho: await hasZohoAccount(email),
    adobe: await hasAdobeAccount(email),
  };
}

// emalUsedIn("aaa@gmail.com").then(console.log);

module.exports = emailUsedIn;

async function hasZohoAccount(email) {
  let res2 = await fetch(`https://accounts.zoho.in/signin/v2/lookup/${email}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      Cookie:
        "6e73717622=94da0c17b67b4320ada519c299270f95; JSESSIONID=562578DC5686A922A23C08425C92597C; iamcsr=a2937bfb-95f0-4969-8b57-1b682ec38bef; _zcsr_tmp=a2937bfb-95f0-4969-8b57-1b682ec38bef; stk=12ff3f1176cd36a783ff5f2fb7b110cf; 6e73717622=4440853cd702ab2a51402c119608ee85; _zcsr_tmp=22d712af-1b39-4401-8b43-1503713c8b37; iamcsr=22d712af-1b39-4401-8b43-1503713c8b37; stk=7fd225c0cad8fd320dfbeb35a0491a58",
      "X-ZCSRF-TOKEN": "iamcsrcoo=a2937bfb-95f0-4969-8b57-1b682ec38bef",
    },
    body: new URLSearchParams({
      mode: "primary",
      cli_time: "1717327534858",
      servicename: "ZohoHome",
      signupurl: "https://www.zoho.com/signup.html",
      serviceurl: "https://www.zoho.com/all-products.html",
    }),
  });
  try {
    let data2 = await res2.json();
    return data2.status_code !== 400;
  } catch (e) {
    return false;
  }
  //   console.log(data2);
}

async function hasAdobeAccount(email) {
  let res = await fetch(
    "https://auth.services.adobe.com/signin/v2/users/accounts",

    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-ims-clientid": "homepage_milo",
      },
      body: JSON.stringify({ username: email, usernameType: "EMAIL" }),
    }
  );
  try {
    let data = await res.json();
    return data.length > 0;
  } catch (e) {
    return false;
  }
}

// const http = require("http");
const https = require("https");

// Disable all warnings from urllib3
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

function hasGoogleAccount(email) {
  /**
   * Verify the given email address.
   */
  // Replace *** in the URL with the email address
  const url = `https://calendar.google.com/calendar/ical/${email}/public/basic.ics`;

  return new Promise((resolve, reject) => {
    https
      .get(url, (response) => {
        // Check the response headers for the presence of the "x-frame-options: SAMEORIGIN" string
        if (
          response.headers["x-frame-options"] &&
          response.headers["x-frame-options"].toUpperCase() === "SAMEORIGIN"
        ) {
          // Append an asterisk if the HTTP response code is 200
          const asterisk = response.statusCode === 200 ? " *" : "";
          // resolve(`${email}${asterisk}`);
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .on("error", (error) => {
        reject(`An error occurred with ${email}: ${error.message}`);
      });
  });
}
