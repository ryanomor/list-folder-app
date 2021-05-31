import fs from "fs";
import util from "util";

describe("Test CLI app", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  afterAll(async (done) => {
    // end tests
  });

  it("should close CLI app", () => {
    jest.mock("readline", () => {
      return {
        createInterface: jest.fn().mockReturnValue({
          setPrompt: jest.fn().mockImplementationOnce(() => undefined),
          prompt: jest.fn().mockImplementationOnce(() => undefined),
          on: jest.fn().mockImplementationOnce((_lineEventTest, cb) => cb("y")),
          close: jest.fn().mockImplementationOnce(() => undefined),
        }),
      };
    });

    const getFiles = require("../src/getFiles").getFiles;

    getFiles();
  });

  it("should list files from the source folder", () => {
    jest.mock("readline", () => {
      return {
        createInterface: jest.fn().mockReturnValue({
          setPrompt: jest.fn().mockImplementationOnce(() => undefined),
          prompt: jest.fn().mockImplementationOnce(() => undefined),
          on: jest
            .fn()
            .mockImplementationOnce((_lineEventTest, cb) =>
              cb("path/to/source/folder")
            ),
          close: jest.fn().mockImplementationOnce(() => undefined),
        }),
      };
    });

    const getFiles = require("../src/getFiles").getFiles;
    const exports = require("../src/getFiles");

    const spy = spyOn(exports, "listFiles").and.callFake(() => "listed files");

    getFiles();

    expect(spy).toHaveBeenCalled();
  });

  it("should throw error when source folder path not found", () => {
    jest.mock("readline", () => {
      return {
        createInterface: jest.fn().mockReturnValue({
          setPrompt: jest.fn().mockImplementationOnce(() => undefined),
          prompt: jest.fn().mockImplementationOnce(() => undefined),
          on: jest
            .fn()
            .mockImplementationOnce((_lineEventTest, cb) =>
              cb("path/to/source/folder")
            ),
          close: jest.fn().mockImplementationOnce(() => undefined),
        }),
      };
    });

    const getFiles = require("../src/getFiles").getFiles;
    const exports = require("../src/getFiles");

    const spy = spyOn(exports, "listFiles").and.throwError("listed files");

    getFiles();

    expect(spy).toHaveBeenCalled();
    expect(spy).toThrowError();
  });

  it("should successfully call listFiles", () => {
    const mockFilesArr = ["file-1", "file-2", "file-3"];

    spyOn(fs, "readdirSync").and.returnValue(mockFilesArr);
    spyOn(util, "promisify").and.returnValue(() =>
      Promise.resolve({ size: 0, mtime: "time" })
    );

    const listFiles = require("../src/getFiles").listFiles;
    const exports = require("../src/getFiles");

    const spy = spyOn(exports, "listFiles");

    listFiles("path/to/source/folder");

    expect(spy).not.toThrowError();
  });
});
