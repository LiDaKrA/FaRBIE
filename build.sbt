name := """farbie"""

version := "1.1.0"

lazy val root = (project in file(".")).enablePlugins(PlayScala, SbtWeb)

scalaVersion := "2.11.6"

libraryDependencies ++= Seq(
  //javaJdbc,
  cache,
  javaWs,
  "org.apache.jena" % "apache-jena-libs" % "3.0.1",
  "junit" % "junit" % "4.12" % "test",
  "org.mockito" % "mockito-all" % "1.9.5" % "test",
  "org.scalatest" %% "scalatest" % "2.2.6" % "test"
)

libraryDependencies ++= Seq(
  "com.typesafe.play" %% "anorm" 				% "2.4.0",
  "org.webjars" 		%% "webjars-play" 		% "2.4.0-1",
  "org.webjars" % "bootstrap" % "3.3.7",
  "org.webjars"       %  "flat-ui"            % "bcaf2de95e",
  "org.webjars" 		%  "react" 				% "0.13.3",
  "org.webjars" 		%  "marked" 			% "0.3.2",
  "org.webjars" 		%  "font-awesome" 			% "4.7.0",
  "org.webjars" % "jszip" % "3.1.0",
  "org.webjars" % "jszip-utils" % "0.0.2",
  "org.webjars.bower" % "FileSaver.js" % "0.0.2"
)

resolvers += "scalaz-bintray" at "http://dl.bintray.com/scalaz/releases"

enablePlugins(SbtNativePackager)

// Play provides two styles of routers, one expects its actions to be injected, the
// other, legacy style, accesses its actions statically.
routesGenerator := InjectedRoutesGenerator

herokuAppName in Compile := "pacific-everglades-72884"

fork in run := true