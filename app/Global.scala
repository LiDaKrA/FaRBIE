import java.io.FileReader

import controllers.de.fuhsen.engine.JenaGlobalSchema
import play.api.Play._
import play.api.{GlobalSettings, Application}
import play.Logger

/**
  * Created by dcollarana on 8/3/2016.
  */
object Global extends GlobalSettings {

  override def onStart(app: Application) {
    Logger.info("Application is started!!!")
    //val globalSchema = current.getFile("/public/ontofuhsen.ttl");
    //val fileReader = new FileReader(globalSchema)
    JenaGlobalSchema.load(staticOntology)
    Logger.info("Model loaded: "+JenaGlobalSchema.isLoaded())
  }

  val staticOntology =
    s"""
       |@prefix fs: <http://vocab.lidakra.de/fuhsen#> .
       |@prefix dc: <http://purl.org/dc/elements/1.1/> .
       |@prefix omv: <http://omv.ontoware.org/2005/05/ontology#> .
       |@prefix owl: <http://www.w3.org/2002/07/owl#> .
       |@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
       |@prefix xml: <http://www.w3.org/XML/1998/namespace> .
       |@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
       |@prefix prov: <http://www.w3.org/ns/prov#> .
       |@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
       |@prefix foaf: <http://xmlns.com/foaf/0.1/> .
       |@prefix gr: <http://purl.org/goodrelations/v1#> .
       |@base <http://vocab.lidakra.de/fuhsen#> .
       |#-------------------------------------------------------------
       |# Search entities definition
       |#-------------------------------------------------------------
       |
 |###  http://vocab.cs.uni-bonn.de/eis/fuhsen#SearchableEntity
       |fs:SearchableEntity rdf:type owl:Class ;
       |					rdfs:label "Suchbares Objekt"@de ,
       |                             "Searchable Entity"@en ;
       |					rdfs:comment "Abstrakte Repräsentierung von Objekten, die während einer Suche gefunden werden können"@de ,
       |                               "Abstract representation of an entity that can be found during a search process"@en .
       |
 |foaf:Agent rdf:type owl:Class ;
       |					rdfs:label "Agent"@de ,
       |                             "Agent"@en ;
       |					rdfs:subClassOf fs:SearchableEntity ;
       |					rdfs:comment "Basisklasse für foaf:Person und org:Organization"@de ,
       |                               "Agent is the base class for foaf:Person and org:Organization"@en .
       |
 |foaf:Person rdf:type owl:Class ;
       |					rdfs:label "Person"@de ,
       |                             "Person"@en ;
       |					fs:key "person";
       |					rdfs:subClassOf foaf:Agent;
       |					rdfs:comment "Represents a person"@de ,
       |                               "Represents a person"@en .
       |
 |foaf:Organization rdf:type owl:Class ;
       |					rdfs:label "Organisation"@de ,
       |                             "Organization"@en ;
       |					fs:key "organization";
       |					rdfs:subClassOf foaf:Agent;
       |					rdfs:comment "Represents an organization"@de ,
       |                               "Represents an organization"@en .
       |
 |gr:ProductOrService rdf:type owl:Class ;
       |					rdfs:label 	"Produkt"@de ,
       |								"Product"@en ;
       |					fs:key "product";
       |					rdfs:subClassOf fs:SearchableEntity;
       |					rdfs:comment	"Represents an product"@de ,
       |									"Represents an product"@en .
       |
 |
 |#-------------------------------------------------------------
       |# Data sources definition
       |#-------------------------------------------------------------
       |
 |fs:InformationSource 	rdf:type owl:Class ;
       |						rdfs:label 	"Information source"@de ,
       |									"Information source"@en ;
       |						rdfs:comment	"Information source for the federation of FuhSen"@de ,
       |										"Information source for the federation of FuhSen"@en .
       |
 |fs:GoogleKnowledgeGraph rdf:type fs:InformationSource;
       |						rdfs:label 	"Google Knowledge Graph";
       |						fs:help_url "https://en.wikipedia.org/wiki/Knowledge_Graph"@en,
       |                               "https://de.wikipedia.org/wiki/Google#Knowledge_Graph"@de;
       |						fs:finds "person";
       |                        fs:finds "organization";
       |						fs:key "gkb" .
       |
 |fs:DBpedia  rdf:type fs:InformationSource;
       |			rdfs:label 	"DBpedia";
       |			fs:help_url "http://wiki.dbpedia.org/"@en,
       |                        "http://wiki.dbpedia.org/"@de;
       |			fs:finds "person";
       |            fs:finds "organization";
       |            fs:finds "product";
       |			fs:key "dbpedia" .
       |
 |fs:LinkedLeaks	rdf:type	fs:InformationSource;
       |				rdfs:label 	"ICIJ Offshore Leaks";
       |                fs:help_url "https://offshoreleaks.icij.org"@en,
       |                       "https://offshoreleaks.icij.org"@de;
       |				fs:finds "person";
       |                fs:finds "organization";
       |				fs:key "linkedleaks" .
       |
 |#-------------------------------------------------------------
       |# Entity Properties definition
       |#-------------------------------------------------------------
       |fs:source rdf:type owl:DatatypeProperty;
       |         rdfs:label "Quelle"@de ,
       |                    "Source"@en ;
       |         rdfs:comment "Todo"@de ,
       |                      "Excerpt of the entity, part of the entity summarization process"@en ;
       |         rdfs:domain fs:SearchableEntity ;
       |         rdfs:range xsd:string .
       |
 |fs:name rdf:type owl:DatatypeProperty;
       |         rdfs:label "Name"@de ,
       |                    "Full Name"@en ;
       |         rdfs:comment "Todo"@de ,
       |                      "Excerpt of the entity, part of the entity summarization process"@en ;
       |          rdfs:domain fs:SearchableEntity ;
       |                   rdfs:range xsd:string .
       |
 |fs:label rdf:type owl:DatatypeProperty;
       |         rdfs:label "Titel"@de ,
       |                    "Title"@en ;
       |         rdfs:comment "Todo"@de ,
       |                      "Excerpt of the entity, part of the entity summarization process"@en;
       |          rdfs:domain fs:SearchableEntity ;
       |                   rdfs:range xsd:string .
       |
 |fs:family_name rdf:type owl:DatatypeProperty;
       |         rdfs:label "Familienname"@de ,
       |                    "Family Name"@en ;
       |         rdfs:comment "Todo"@de ,
       |                      "Excerpt of the entity, part of the entity summarization process"@en ;
       |         rdfs:domain fs:SearchableEntity ;
       |         rdfs:range xsd:string .
       |
 |fs:givenname rdf:type owl:DatatypeProperty;
       |         rdfs:label "Vorname"@de ,
       |                    "First Name"@en ;
       |         rdfs:comment "Todo"@de ,
       |                      "Excerpt of the entity, part of the entity summarization process"@en ;
       |         rdfs:domain fs:SearchableEntity ;
       |         rdfs:range xsd:string .
       |
 |
 |fs:gender rdf:type owl:DatatypeProperty;
       |         rdfs:label "Geschlecht"@de ,
       |                    "Gender"@en ;
       |         rdfs:comment "Todo"@de ,
       |                      "Excerpt of the entity, part of the entity summarization process"@en ;
       |         rdfs:domain fs:SearchableEntity ;
       |         rdfs:range xsd:string .
       |
 |fs:alias rdf:type owl:DatatypeProperty;
       |         rdfs:label "Spitzname"@de ,
       |                    "Nick Name"@en ;
       |         rdfs:comment "Todo"@de ,
       |                      "Excerpt of the entity, part of the entity summarization process"@en ;
       |         rdfs:domain fs:SearchableEntity ;
       |         rdfs:range xsd:string .
       |
 |fs:birthday rdf:type owl:DatatypeProperty;
       |         rdfs:label "Geburtstag"@de ,
       |                    "Birthday"@en ;
       |         rdfs:comment "Todo"@de ,
       |                      "Excerpt of the entity, part of the entity summarization process"@en ;
       |         rdfs:domain fs:SearchableEntity ;
       |         rdfs:range xsd:string .
       |
 |fs:location rdf:type owl:DatatypeProperty;
       |         rdfs:label "Ort"@de ,
       |                    "Location"@en ;
       |         rdfs:comment "Todo"@de ,
       |                      "Excerpt of the entity, part of the entity summarization process"@en ;
       |         rdfs:domain fs:SearchableEntity ;
       |         rdfs:range xsd:string .
       |
 |fs:country rdf:type owl:DatatypeProperty;
       |         rdfs:label "Land"@de ,
       |                    "Country"@en ;
       |         rdfs:comment "Todo"@de ,
       |                      "Excerpt of the entity, part of the entity summarization process"@en ;
       |         rdfs:domain fs:SearchableEntity ;
       |         rdfs:range xsd:string .
       |
 |
 |fs:occupation rdf:type owl:DatatypeProperty;
       |         rdfs:label "Beruf"@de ,
       |                    "Occupation"@en ;
       |         rdfs:comment "Todo"@de ,
       |                      "Excerpt of the entity, part of the entity summarization process"@en ;
       |         rdfs:domain fs:SearchableEntity ;
       |         rdfs:range xsd:string .
       |
 |fs:placeLived rdf:type owl:DatatypeProperty;
       |         rdfs:label "Lebt in"@de ,
       |                    "Lived In"@en ;
       |         rdfs:comment "Todo"@de ,
       |                      "Excerpt of the entity, part of the entity summarization process"@en ;
       |         rdfs:domain fs:SearchableEntity ;
       |        rdfs:range fs:SearchableEntity .
       |
 |fs:workedAt rdf:type owl:DatatypeProperty;
       |         rdfs:label "Arbeitet bei"@de ,
       |                    "Work"@en ;
       |         rdfs:comment "Todo"@de ,
       |                      "Excerpt of the entity, part of the entity summarization process"@en ;
       |         rdfs:domain fs:SearchableEntity ;
       |         rdfs:range fs:SearchableEntity .
       |
 |fs:studiedAt rdf:type owl:DatatypeProperty;
       |         rdfs:label "Studium an"@de ,
       |                    "Studies"@en ;
       |         rdfs:comment "Todo"@de ,
       |                      "Excerpt of the entity, part of the entity summarization process"@en ;
       |         rdfs:domain fs:SearchableEntity ;
       |         rdfs:range fs:SearchableEntity .
       |
 |fs:priceLabel rdf:type owl:DatatypeProperty;
       |         rdfs:label "Preis"@de ,
       |                    "Price"@en ;
       |         rdfs:comment "Todo"@de ,
       |                      "Excerpt of the entity, part of the entity summarization process"@en ;
       |         rdfs:domain fs:SearchableEntity ;
       |         rdfs:range xsd:string .
       |
 |fs:condition rdf:type owl:DatatypeProperty;
       |         rdfs:label "Zustand"@de ,
       |                    "Condition"@en ;
       |         rdfs:comment "Todo"@de ,
       |                      "Excerpt of the entity, part of the entity summarization process"@en ;
       |         rdfs:domain fs:SearchableEntity ;
       |         rdfs:range xsd:string .
       |
 |fs:extension rdf:type owl:DatatypeProperty;
       |         rdfs:label "Dateityp"@de ,
       |                    "File type"@en ;
       |         rdfs:comment "Todo"@de ,
       |                      "Excerpt of the entity, part of the entity summarization process"@en ;
       |         rdfs:domain fs:SearchableEntity ;
       |         rdfs:range xsd:string .
       |
 |fs:file_name rdf:type owl:DatatypeProperty;
       |         rdfs:label "Dateiname"@de ,
       |         "File Name"@en ;
       |         rdfs:comment "Todo"@de ,
       |            "Excerpt of the entity, part of the entity summarization process"@en ;
       |           rdfs:domain fs:SearchableEntity ;
       |                      rdfs:range xsd:string .
       |
 |fs:language rdf:type owl:DatatypeProperty;
       |                     rdfs:label "Sprache"@de ,
       |                                "Language"@en ;
       |                     rdfs:comment "Todo"@de ,
       |                                  "Excerpt of the entity, part of the entity summarization process"@en ;
       |                     rdfs:domain fs:SearchableEntity ;
       |                     rdfs:range xsd:string .
       |
 |fs:aPerson rdf:type owl:DatatypeProperty;
       |                     rdfs:label "Person"@de ,
       |                                "Person"@en ;
       |                     rdfs:comment "Todo"@de ,
       |                                  "Annotation type person"@en ;
       |                     rdfs:domain fs:SearchableEntity ;
       |                     rdfs:range fs:SearchableEntity .
       |
 |fs:aOrganization rdf:type owl:DatatypeProperty;
       |                     rdfs:label "Organization"@de ,
       |                                "Organization"@en ;
       |                     rdfs:comment "Todo"@de ,
       |                                  "Annotation type person"@en ;
       |                     rdfs:domain fs:SearchableEntity ;
       |                     rdfs:range fs:SearchableEntity .
       |
 |fs:aProduct rdf:type owl:DatatypeProperty;
       |                     rdfs:label "Produkt"@de ,
       |                                "Product"@en ;
       |                     rdfs:comment "Todo"@de ,
       |                                  "Annotation type person"@en ;
       |                     rdfs:domain fs:SearchableEntity ;
       |                     rdfs:range fs:SearchableEntity .
       |
 |fs:aEvent rdf:type owl:DatatypeProperty;
       |                     rdfs:label "Veranstaltung"@de ,
       |                                "Event"@en ;
       |                     rdfs:comment "Todo"@de ,
       |                                  "Annotation type person"@en ;
       |                     rdfs:domain fs:SearchableEntity ;
       |                     rdfs:range fs:SearchableEntity .
       |
 |fs:aPlace rdf:type owl:DatatypeProperty;
       |                     rdfs:label "Ort"@de ,
       |                                "Place"@en ;
       |                     rdfs:comment "Todo"@de ,
       |                                  "Annotation type person"@en ;
       |                     rdfs:domain fs:SearchableEntity ;
       |                     rdfs:range fs:SearchableEntity .
     """.stripMargin

}
