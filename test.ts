import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std/testing/asserts.ts";
import { urlBuild } from "./build.ts";

Deno.test({
  name: "init with undefined",
  fn(): void {
    assertThrows((): void => {
      urlBuild();
    });
  },
});

Deno.test({
  name: "init with null",
  fn(): void {
    assertThrows((): void => {
      urlBuild(null);
    });
  },
});

Deno.test({
  name: "init with empty string",
  fn(): void {
    assertThrows((): void => {
      urlBuild("");
    });
  },
});

Deno.test({
  name: "init with invalid url string",
  fn(): void {
    assertThrows((): void => {
      urlBuild("http:/example");
    });
  },
});

Deno.test({
  name: "init with valid url string",
  fn(): void {
    const url = urlBuild("https://google.com");

    assertEquals(url.protocol, "https:");
    assertEquals(url.hostname, "google.com");
    assertEquals(url.pathname, "/");
  },
});

Deno.test({
  name: "init with valid complexe url string",
  fn(): void {
    const url = urlBuild(
      "http://username:password@google.com/search?hello=world",
    );

    assertEquals(url.protocol, "http:");
    assertEquals(url.hostname, "google.com");
    assertEquals(url.pathname, "/search");
    assertEquals(url.username, "username");
    assertEquals(url.password, "password");
    assertEquals(url.search, "?hello=world");
  },
});

const urlBuilderData = {
  protocol: "https",
  hostname: "google.com",
  pathname: "search/hey",
  username: "username",
  password: "password",
  port: 3000,
  query: [{ key: "hello", value: "world" }],
};
// pathnameArray: ["search", "hey"],
// portString: "3000",

Deno.test({
  name: "init with empty object",
  fn(): void {
    assertThrows((): void => {
      urlBuild({});
    });
  },
});

Deno.test({
  name: "init with normal object",
  fn(): void {
    const url = urlBuild(urlBuilderData);

    assertEquals(url.protocol, "https:");
    assertEquals(url.hostname, "google.com");
    assertEquals(url.pathname, "/search/hey");
    assertEquals(url.username, "username");
    assertEquals(url.password, "password");
    assertEquals(url.search, "?hello=world");
  },
});

Deno.test({
  name: "init with normal object - port is string",
  fn(): void {
    const url = urlBuild(
      Object.assign(
        {},
        urlBuilderData,
        { port: urlBuilderData.port.toString() },
      ),
    );

    assertEquals(url.protocol, "https:");
    assertEquals(url.hostname, "google.com");
    assertEquals(url.port, "3000");
    assertEquals(url.pathname, "/search/hey");
    assertEquals(url.username, "username");
    assertEquals(url.password, "password");
    assertEquals(url.search, "?hello=world");
  },
});

Deno.test({
  name: "init with normal object - pathname is array of strings",
  fn(): void {
    const url = urlBuild(
      Object.assign(
        {},
        urlBuilderData,
        { pathname: ["search", "hey"] },
      ),
    );

    assertEquals(url.protocol, "https:");
    assertEquals(url.hostname, "google.com");
    assertEquals(url.port, "3000");
    assertEquals(url.pathname, "/search/hey");
    assertEquals(url.username, "username");
    assertEquals(url.password, "password");
    assertEquals(url.search, "?hello=world");
  },
});
