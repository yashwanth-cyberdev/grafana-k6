import http from "k6/http";
import { check } from "k6";

export const options = {
  vus: 10,
  duration: "5s",
  iterations: 25,
};

const url = "https://reqres.in/api/users";

const payload = open("./data.json");

// const payload = {
//   name: "user555454665654",
//   job: "dev",
// };

export default function () {
  const response = http.post(url, payload);

  const responseBody = JSON.parse(response.body);
  console.log("*** Response Body *** ", responseBody);

  check(response, {
    "status code validation": (response) => response.status === 201,
    "Response body includes id": (response) => response.body.includes("id"),
  });
}
