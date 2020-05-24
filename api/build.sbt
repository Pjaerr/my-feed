ThisBuild / scalaVersion := "2.13.2"
ThisBuild / organization := "com.example"

lazy val hello = (project in file("."))
  .settings(
    name := "My-Feed-API",
    libraryDependencies += "com.lihaoyi" %% "cask" % "0.6.3"
  )
