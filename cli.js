#!/usr/bin/env node
import * as ReadConfig from "read-config-file";
import xdg from "@folder/xdg";
import fs from "fs";
import path from "path";
const dirs = xdg();
import open from "open";
import blessed from "blessed";
import got from "got";
const screen = blessed.screen({
  autoPadding: true,
});

if (!fs.existsSync(path.join(dirs.config, "/nytui/nytui.json"))) {
  let data = {
    API_KEY: "API_KEY_EXAMPLE",
  };
  fs.writeFile(
    path.join(dirs.config, "/nytui/nytui.json"),
    JSON.stringify(data),
    (error) => {
      console.log(error);
    }
  );
}

ReadConfig.findAndReadConfig({
  configFilename: "nytui",
  projectDir: path.join(dirs.config, "/nytui"),
}).then((response) => (process.env.API_KEY = response.result["API_KEY"]));

const getData = async (section) => {
  let response = await got(
    `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${process.env.API_KEY}`
  ).json();
  const results = response.results;
  const articles = results.map((result) => result);
  return articles;
};

const mainbox = blessed.box({
  tags: true,
  style: {
    fg: "white",
  },
});

screen.append(mainbox);

const setData = (articles) => {
  articleView.clearItems();
  articles.forEach((article) => articleView.add(article.title));
  global.articles = articles;
  screen.render();
};

const inputArea = blessed.listbar({
  parent: mainbox,
  top: "80%",
  width: "100%",
  focusable: true,
  clickable: true,
  keyable: true,
  keys: true,
  style: {
    selected: {
      fg: "blue",
    },
  },
  items: {
    top: {
      keys: "t",
      callback: async () => {
        getData("home").then((response) => setData(response));
      },
    },
    sports: {
      keys: "s",
      callback: async () => {
        getData("sports").then((response) => setData(response));
      },
    },
    books: {
      keys: "b",
      callback: async () => {
        getData("books").then((response) => setData(response));
      },
    },
    arts: {
      keys: "a",
      callback: async () => {
        getData("arts").then((response) => setData(response));
      },
    },
    opinion: {
      keys: "o",
      callback: async () => {
        getData("opinion").then((response) => setData(response));
      },
    },
  },
  border: {
    type: "line",
  },
});

const articleView = blessed.list({
  parent: mainbox,
  focusable: true,
  top: "0%",
  height: "80%",
  width: "100%",
  border: "line",
  keys: true,
  fg: "white",
  interactive: true,
  label: "Top Stories",
  clickable: true,
});

screen.key(["enter"], async function (ch, key) {
  let selected = articleView.selected;
  await open(`${articles[selected].url}`);
});

screen.key(["backspace"], function (ch, key) {
  screen.remove(viewbox);
  screen.append(mainbox);
  articleView.focus();
  screen.render();
});

screen.key(["escape", "q", "C-c"], function (ch, key) {
  return process.exit(0);
});

mainbox.focus();
articleView.focus();

screen.render();
