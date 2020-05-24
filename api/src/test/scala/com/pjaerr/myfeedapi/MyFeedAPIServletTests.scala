package com.pjaerr.myfeedapi

import org.scalatra.test.scalatest._

class MyFeedAPIServletTests extends ScalatraFunSuite {

  addServlet(classOf[MyFeedAPIServlet], "/*")

  test("GET / on MyFeedAPIServlet should return status 200") {
    get("/") {
      status should equal (200)
    }
  }

}
