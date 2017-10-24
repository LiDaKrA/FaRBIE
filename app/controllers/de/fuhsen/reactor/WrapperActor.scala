package controllers.de.fuhsen.reactor

import java.net.URLEncoder

import akka.http.scaladsl.Http
import akka.http.scaladsl.model._
import akka.stream.{ActorMaterializer, ActorMaterializerSettings}

import scala.collection.immutable.HashSet
import akka.actor._
import akka.util.ByteString
import play.libs.Akka
import controllers.de.fuhsen.wrappers._
import org.apache.jena.rdf.model.ModelFactory
import org.apache.jena.riot.Lang
import utils.dataintegration.RDFUtil
import play.api.libs.concurrent.Execution.Implicits.defaultContext

/**
  * Created by dcollarana on 6/29/2017.
  **/
class WrapperActor(wrapper: RestApiWrapperTrait, out: ActorRef) extends Actor {

  val http = Http(context.system)
  final implicit val materializer: ActorMaterializer = ActorMaterializer(ActorMaterializerSettings(context.system))

  def receive = {
    case msg: StartSearch =>
      //To-do search
      //out ! ResultsFound(wrapper.sourceLocalName, staticMessage)
      http.singleRequest(HttpRequest( uri = wrapper.apiUrl+"?query="+URLEncoder.encode(wrapper.buildSparqlQuery(msg.query), "UTF-8"))).map( response =>
        response.entity.dataBytes.runFold(ByteString(""))(_ ++ _).foreach { body =>
          out ! ResultsFound(wrapper.sourceLocalName, wrapper.sourceLocalName+" "+body.utf8String)
        }
      )
  }

  val staticMessage =
    s"""
       |<http://dbpedia.org/resource/Mauricio_Macri>	<http://vocab.lidakra.de/fuhsen#birthPlace>	<http://dbpedia.org/resource/Argentina> .
       |<http://dbpedia.org/resource/Mauricio_Macri>	<http://vocab.lidakra.de/fuhsen#img>	"https://upload.wikimedia.org/wikipedia/commons/1/12/Mauricio_Macri_Foto_de_Prensa2.jpg" .
       |<http://dbpedia.org/resource/Mauricio_Macri>	<http://vocab.lidakra.de/fuhsen#birthDate>	"1959-02-08" .
       |<http://dbpedia.org/resource/Mauricio_Macri>	<http://vocab.lidakra.de/fuhsen#birthPlace>	"Tandil" .
       |<http://dbpedia.org/resource/Mauricio_Macri>	<http://vocab.lidakra.de/fuhsen#description>	"Mauricio Macri (Spanish pronunciation: [mau\u02C8\u027Eisjo \u02C8mak\u027Ei]; born 8 February 1959) is the current President of Argentina, in office since 2015. A former civil engineer, Macri won the first presidential runoff ballotage in Argentina's history (the runoff system had been introduced in 1994) and is the first democratically elected non-Radical or Peronist President since 1916. He was previously the Head of Government of the Autonomous City of Buenos Aires from 2007 to 2015 and represented the City of Buenos Aires in the lower house of the Argentine congress from 2005 to 2007."@en .
     """.stripMargin

}

class LogicKeeperActor(out: ActorRef) extends Actor {

  protected[this] val model = ModelFactory.createDefaultModel()

  protected[this] var watchers: HashSet[ActorRef] = HashSet(
    Akka.system.actorOf(Props(new WrapperActor(new DBpediaWrapper(), self))),
    Akka.system.actorOf(Props(new WrapperActor(new LinkedLeaksWrapper(), self)))
  )

  def receive = {
    case msg: String =>
      //Logger.info("Message received:"+msg)
      watchers.foreach(_ ! new StartSearch(msg))
    case msg: StartSearch =>
      watchers.foreach(_ ! msg)
    case msg: ResultsFound =>
      //model.add(RDFUtil.rdfStringToModel(msg.rdf, Lang.TURTLE))
      out ! msg.rdf
  }
}

object LogicKeeperActor {
  def props(out: ActorRef) = Props(new LogicKeeperActor(out))
}

case class StartSearch(query: String)
case class ResultsFound(wrapperName: String, rdf: String)
case class ResultsUpdate(rdf: String)
case class FacetsUpdate(rdf: String)
case class StatusUpdate(rdf: String)
