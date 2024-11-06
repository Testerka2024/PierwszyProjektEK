import { expect } from "chai";
import pkg from "pactum";
const { spec } = pkg;
import 'dotenv/config'
import { baseUrl,password,userID,user } from "../helpers/data.js";

let token_response;

describe("Api tests", () => {

it.skip("Get request", async () => {
    const response = await spec()
       .get(`${baseUrl}/BookStore/v1/Books`)
       .inspect();
      const responseB= JSON.stringify(response.body);
    
    expect(response.statusCode).to.eql(200);
    expect(response.body.books[7].title).to.eql("Understanding ECMAScript 6");
    expect(response.body.books[7].author).to.eql("Nicholas C. Zakas");
    expect(response.body.books[7].pages).to.eql(352);
    expect(responseB).to.include("The Definitive Guide for JavaScript Developers")
    console.log("dotenv works: "+ " "+ process.env.SECRET_PASSWORD)
});


  it.skip("Create a user", async () => {
    const response = await spec()
      .post(`${baseUrl}/Account/v1/User`)
      .withBody({
        userName: user,
        password: password,
      })
      .inspect();

    expect(response.statusCode).to.eql(201);
    //

  });
  
  it.only("Generate token", async () => {
    const response = await spec()
      .post(`${baseUrl}/Account/v1/GenerateToken`)
      .withBody({
        userName: user,
        password: password,
      })
      .inspect();
      token_response = response.body.token;
      console.log(token_response);
      expect(response.statusCode).to.eql(200);
      expect(response.body.result).to.eql("User authorized successfully.")
  })

  it.only("Check token", async () => {
    console.log("another is block" + token_response)
  })


});
