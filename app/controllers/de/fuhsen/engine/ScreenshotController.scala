package controllers.de.fuhsen.engine

import java.net.ConnectException
import javax.inject.Inject

import com.typesafe.config.ConfigFactory
import play.Logger
import play.api.libs.iteratee.Enumerator
import play.api.mvc.{Action, Controller, ResponseHeader, Result}
import play.api.libs.ws.{WSClient, WSResponse}
import play.api.libs.concurrent.Execution.Implicits.defaultContext
import play.api.libs.json._

import scala.concurrent.Future
/**
  * Created by dcollarana on 8/3/2016.
  */
class ScreenshotController @Inject()(ws: WSClient) extends Controller {

  def screenshots(url: String) = Action.async { request =>
    val data = Json.obj(
      "url" -> url
    )

    print(url)

    val futureResponse: Future[WSResponse] = ws.url(ConfigFactory.load.getString("snapshot.pdf.rest.api.url")).withHeaders("Content-Type" -> "application/json").post(data)

    futureResponse.map {
      r =>
        Result(
          header = ResponseHeader(200),
          body = Enumerator(r.bodyAsBytes)
        ).withHeaders( CONTENT_TYPE -> "application/pdf")
    }
  }

  def checkOnionSite(site: String) = Action.async { request =>

    var site_to = site.replaceFirst(".onion/", ".onion.to/")
    site_to = site.replaceFirst(".onion?", ".onion.to/?")
    //var site_to = site

    ws.url(site_to)
      .withRequestTimeout(5000)
      .get
      .map { response =>
              if (response.status / 100 != 2) {
                Logger.info(s"Validating Onion site error response ${response.status}")
                Ok(Json.obj("valid" -> false))
              } else {
                if (response.body.contains("Tor2web Error: Generic Socks Error")) {
                  Logger.info("Validating Onion Site 'Tor2Web Generic Socks Error' detected")
                  Ok(Json.obj("valid" -> false))
                } else {
                  Logger.info("Valid Onion Site")
                  Ok(Json.obj("valid" -> true))
                }
              }
      }.recover {
      case e: Exception =>
        Logger.warn(s"Generic Exception during wrapper execution ${e.getMessage}")
        Ok(Json.obj("valid" -> false))
    }
  }

}