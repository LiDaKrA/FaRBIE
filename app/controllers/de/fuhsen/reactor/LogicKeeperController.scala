package controllers.de.fuhsen.reactor

import play.Logger
import play.api.libs.ws.{WSClient, WSResponse}
import play.api.mvc._
import play.api.libs.concurrent.Execution.Implicits.defaultContext
import play.api.libs.json.Json
import scala.concurrent.Future
import play.api.Play.current
import akka.actor._
import javax.inject._


/**
  * Created by dcollarana on 6/29/2017.
  */
@Singleton
class LogicKeeperController @Inject()(ws: WSClient) extends Controller {

  def socket = WebSocket.acceptWithActor[String, String] { request => out =>
    PingSocketActor.props(out)
  }

}

object PingSocketActor {
  def props(out: ActorRef) = Props(new PingSocketActor(out))
}

class PingSocketActor(out: ActorRef) extends Actor {

  def receive = {
    case msg: String =>
      out ! ("I received your message: " + msg)
  }



}
