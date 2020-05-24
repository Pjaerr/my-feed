package com.pjaerr.myfeedapi

import org.scalatra._

import ujson.Value

class MyFeedAPIServlet extends ScalatraServlet {

  get("/") {
    "Hello World!";
  }

  get("/api/get") {
    //Here we would go off to the relevant feeds and format them into something like the following:
    val feedsString: String = params("feeds");

    val feeds: Array[String] = feedsString.split(",");

    ujson.Arr(
      ujson.Obj(
        "feed" -> feeds(0),
        "items" -> ujson.Arr(
          ujson.Obj(
            "title" -> "Building a Desktop App using Svelte and Electron",
            "image" -> "https://joshuaj.co.uk/building-desktop-app-svelte-electron/cover_image.jpg",
            "description" -> "In this blogpost I show you how easy it is to build a basic markdown editor for desktop using Svelte and Electron.",
            "url" -> "joshuaj.co.uk",
            "date" -> "Sat, 22 Feb 2020"
          ),
          ujson.Obj(
            "title" -> "Building a Desktop App using Svelte and Electron",
            "image" -> "https://joshuaj.co.uk/building-desktop-app-svelte-electron/cover_image.jpg",
            "description" -> "In this blogpost I show you how easy it is to build a basic markdown editor for desktop using Svelte and Electron.",
            "url" -> "joshuaj.co.uk",
            "date" -> "Sat, 22 Feb 2020"
          ),
          ujson.Obj(
            "title" -> "Building a Desktop App using Svelte and Electron",
            "image" -> "https://joshuaj.co.uk/building-desktop-app-svelte-electron/cover_image.jpg",
            "description" -> "In this blogpost I show you how easy it is to build a basic markdown editor for desktop using Svelte and Electron.",
            "url" -> "joshuaj.co.uk",
            "date" -> "Sat, 22 Feb 2020"
          )
        )
      )
    );
  }

}
