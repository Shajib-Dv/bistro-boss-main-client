/** @format */

const saveUserToDB = (userInfo) => {
  fetch("http://localhost:5000/users", {
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
