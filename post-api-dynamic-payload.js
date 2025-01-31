import http from "k6/http";
import { check } from "k6";
import { randomString } from "https://jslib.k6.io/k6-utils/1.2.0/index.js";
import faker from "https://cdnjs.cloudflare.com/ajax/libs/Faker/3.1.0/faker.min.js";

export const options = {
  vus: 5,
  duration: "2s",
  iterations: 20,
};

const url = "https://reqres.in/api/users";

const payload = {
  //   name: `user_${randomString(8)}`,
  name: faker.name.findName(),
  job: "dev",
};

export default function () {
  const response = http.post(url, payload);
  console.log("*** Payload *** ", payload);

  const responseBody = JSON.parse(response.body);
  console.log("*** Response Body *** ", responseBody);

  check(response, {
    "status code validation": (response) => response.status === 201,
    "Response body includes id": (response) => response.body.includes("id"),
    "Job role is dev": () => responseBody.job === "dev",
  });
}
