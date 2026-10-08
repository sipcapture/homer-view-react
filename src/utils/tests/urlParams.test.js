/**
 * Test urlParams helper
 */

import getAllUrlParams from "../urlParams";

describe("getAllUrlParams", () => {
  it("should parse simple parameters", () => {
    const params = getAllUrlParams("http://localhost/?from=1&to=2&callid=abc");

    expect(params.from).toBe("1");
    expect(params.to).toBe("2");
    expect(params.callid).toBe("abc");
  });

  it("should keep case consistent", () => {
    const params = getAllUrlParams("http://localhost/?CALLID=ABC");

    expect(params.callid).toBe("abc");
  });

  it("should collect repeated parameters into an array", () => {
    const params = getAllUrlParams("http://localhost/?callid=a&callid=b");

    expect(params.callid).toEqual(["a", "b"]);
  });

  it("should collect bracketed parameters into an array", () => {
    const params = getAllUrlParams(
      "http://localhost/?colors[]=red&colors[]=blue"
    );

    expect(params.colors).toEqual(["red", "blue"]);
  });

  it("should place indexed bracketed parameters at the given position", () => {
    const params = getAllUrlParams("http://localhost/?colors[1]=blue");

    expect(params.colors[1]).toBe("blue");
  });

  it("should not pollute Object.prototype from a bracketed key", () => {
    getAllUrlParams("http://localhost/?__proto__[polluted]=yes");

    expect({}.polluted).toBeUndefined();
  });

  it("should not pollute Object.prototype from a plain key", () => {
    getAllUrlParams("http://localhost/?constructor[prototype][polluted]=yes");

    expect({}.polluted).toBeUndefined();
  });

  it("should ignore reserved bracketed keys", () => {
    const params = getAllUrlParams("http://localhost/?__proto__[]=yes");

    expect(Object.keys(params)).toEqual([]);
  });
});
