/** @format */

const saveUserToDB = (userInfo) => {
  fetch("https://bistro-boss-server-shajib-dv.vercel.app/users", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(userInfo),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => console.log(error));
};

export default saveUserToDB;
