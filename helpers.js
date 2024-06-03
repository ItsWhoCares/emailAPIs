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

async function emalUsedIn(email) {
  return {
    zoho: await hasZohoAccount(email),
    adobe: await hasAdobeAccount(email),
  };
}

// emalUsedIn("aaa@gmail.com").then(console.log);

module.exports = emalUsedIn;

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

  let data2 = await res2.json();
  //   console.log(data2);
  return data2.status_code !== 400;
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
  let data = await res.json();
  //   console.log(data.length);
  return data.length > 0;
}
