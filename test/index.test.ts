import nock from "nock";
import { server } from "../src/index";
import supertest from "supertest";
const request = supertest(server);

const mockUrl = "http://127.0.0.1:9000";

describe("Test server", () => {
  afterAll(async () => {
    server.close();
  });

  it("should start app and return with 200 ok status", async (done) => {
    nock(mockUrl).get("/").reply(200);

    const res = await request.get("/");
    expect(res.status).toEqual(200);
    done();
  });

  it("should call app with 404 when request is not found", async (done) => {
    nock(mockUrl).get("/badrequest").reply(404);

    const res = await request.get("/badrequest");
    expect(res.status).toEqual(404);
    done();
  });
});
