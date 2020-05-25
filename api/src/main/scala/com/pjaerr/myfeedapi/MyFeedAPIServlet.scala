package com.pjaerr.myfeedapi

import org.scalatra._
import ujson.Value
import scala.xml.XML
import scala.collection.mutable.ArrayBuffer

case class FeedItem(title: String, description: String, url: String, date: String);

class MyFeedAPIServlet extends ScalatraServlet {

  get("/") {
    "Hello World!";
  }

  get("/api/get") {
    //Here we would go off to the relevant feeds and format them into something like the following:
    val feedsString: String = params("feeds");

    val feeds: Array[String] = feedsString.split(",");

    var result = new ArrayBuffer[ujson.Obj]();

    feeds.foreach(feed => {
      val xmlDoc = XML.load(feed);
  
      var feedItems = new ArrayBuffer[ujson.Obj]();
      
      xmlDoc \\ "item" map { node => 
          var title = (node \ "title").text;
          var description = "No Description";

          if ((node \ "description").nonEmpty) {
            description = (node \ "description").text;
          }

          var url = (node \ "link").text;
          var date = (node \ "pubDate").text;
    
          feedItems += ujson.Obj(
            "title" -> title,
            "description" -> description,
            "url" -> url,
            "date" -> date
          );
      }

      result += ujson.Obj(
          "feed" -> feed,
          "items" -> feedItems
      );
    });

    ujson.Arr(result);
  }

}
