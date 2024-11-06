import { expect } from "chai";
import pkg from "pactum";
const { spec } = pkg;
import 'dotenv/config'
import { baseUrl,userID } from "../helpers/data.js";


describe("Api tests", () => {

it("Get request", async () => {
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
        userName: "EKtest1",
        password: process.env.SECRET_PASSWORD,
      })
      .inspect();

    expect(response.statusCode).to.eql(201);
    //

  });

  it.skip("Generate user", async () => {
    const response = await spec()
      .post(`${baseUrl}/Account/v1/GenerateToken`)
      .withBody({
        userName: "EKtest1",
        password: process.env.SECRET_PASSWORD,
      })
      .inspect();
  })

 
});
