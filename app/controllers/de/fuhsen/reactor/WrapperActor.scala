package controllers.de.fuhsen.reactor

import play.api.libs.ws.WSClient

import scala.collection.immutable.HashSet
import akka.actor._
import play.libs.Akka
import controllers.de.fuhsen.wrappers._
import org.apache.jena.rdf.model.ModelFactory
import org.apache.jena.riot.Lang
import utils.dataintegration.RDFUtil

/**
  * Created by dcollarana on 6/29/2017.
  **/
class WrapperActor(wrapper: RestApiWrapperTrait, out: ActorRef) extends Actor {

  def receive = {
    case msg: StartSearch =>
      //To-do search
      out ! ResultsFound(wrapper.sourceLocalName, staticMessage)
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
    Akka.system.actorOf(Props(new WrapperActor(new LinkedLeaksWrapper(), self))),
    Akka.system.actorOf(Props(new WrapperActor(new GoogleKnowledgeGraphWrapper(), self)))
  )

  def receive = {
    case msg: String =>
      //Logger.info("Message received:"+msg)
      watchers.foreach(_ ! new StartSearch(msg))
    case msg: StartSearch =>
      watchers.foreach(_ ! msg)
    case msg: ResultsFound =>
      model.add(RDFUtil.rdfStringToModel(msg.rdf, Lang.TURTLE))
      //out ! RDFUtil.modelToTripleString(model, Lang.JSONLD)
      out ! model.size.toString
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
