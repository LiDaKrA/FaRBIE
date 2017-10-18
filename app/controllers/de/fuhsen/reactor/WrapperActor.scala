package controllers.de.fuhsen.reactor

import play.Logger
import play.api.libs.ws.{WSClient, WSResponse}
import play.api.mvc._
import play.api.libs.concurrent.Execution.Implicits.defaultContext
import play.api.libs.json.Json
import scala.collection.immutable.HashSet
import scala.concurrent.Future
import play.api.Play.current
import akka.actor._
import javax.inject._

import play.libs.Akka
import controllers.de.fuhsen.wrappers.{FacebookWrapper, _}

/**
  * Created by dcollarana on 6/29/2017.
  **/
class WrapperActor(wrapper: RestApiWrapperTrait, out: ActorRef) extends Actor {

  def receive = {
    case msg: StartSearch =>
      out ! ("I received your message: " + msg)
  }

}

class LogicKeeperActor(out: ActorRef) extends Actor {

  protected[this] var watchers: HashSet[ActorRef] = HashSet(
    Akka.system.actorOf(Props(new WrapperActor(new FacebookWrapper(), self))),
    Akka.system.actorOf(Props(new WrapperActor(new TwitterWrapper(), self)))
  )

  def receive = {
    case msg: StartSearch =>
      out ! ("I received your message: " + msg)
  }

}

object LogicKeeperActor {
  lazy val logicKeeperActor: ActorRef = Akka.system.actorOf(Props(classOf[LogicKeeperActor]))
}


case class StartSearch(query: String)

case class ResultsFound(rdf: String)

case class ResultsUpdate(rdf: String)

case class FacetsUpdate(rdf: String)

case class StatusUpdate(rdf: String)
