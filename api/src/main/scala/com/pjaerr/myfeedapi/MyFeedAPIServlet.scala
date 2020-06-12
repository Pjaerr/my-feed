package com.pjaerr.myfeedapi

import org.scalatra._
import ujson.Value
import scala.xml.XML
import scala.collection.mutable.ArrayBuffer

case class FeedItem(title: String, description: String, url: String, date: String);

class MyFeedAPIServlet extends ScalatraServlet with CorsSupport {
  options("/*"){
    response.setHeader("Access-Control-Allow-Origin", request.getHeader("Access-Control-Request-Headers"))
  }

  get("/") {
    "Try visiting the /api/get route and passing in a feeds parameter containing rss feed urls";
  }

  get("/api/get") {
    //Here we would go off to the relevant feeds and format them into something like the following:
    val feedsString: String = params("feeds");

    val feeds: Array[String] = feedsString.split(",");

    var result = new ArrayBuffer[ujson.Obj]();

    feeds.foreach(feed => {
      try {
        val xmlDoc = XML.load(feed);
    
        var feedItems = new ArrayBuffer[ujson.Obj]();
        
        xmlDoc \\ "item" map { node => 
            var title = (node \ "title").text;
            
            var description = "No Description";

            if ((node \ "description").nonEmpty) {
              description = (node \ "description").text;
            }

            var image = "https://www.vets4pets.com/siteassets/species/cat/kitten/tiny-kitten-in-field.jpg?w=585&scale=down";
            var url = (node \ "link").text;
            var date = (node \ "pubDate").text;
            
            feedItems += ujson.Obj(
              "title" -> title,
              "description" -> description,
              "image" -> image,
              "url" -> url,
              "date" -> date
            );
        }

        result += ujson.Obj(
            "feed" -> feed,
            "items" -> feedItems
        );
    }
    catch {
      case saxParseException: org.xml.sax.SAXParseException => result += ujson.Obj(
        "feed" -> feed,
        "items" -> ujson.Arr()
      );
      case unknownHostException: java.net.UnknownHostException => result += ujson.Obj(
        "feed" -> feed,
        "items" -> ujson.Arr()
      );
    }
    });

    response.setHeader("Content-Type", "application/json");

    ujson.Arr(result)
  }

}
