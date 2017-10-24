/*
 * Copyright (C) 2016 EIS Uni-Bonn
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package controllers.de.fuhsen.wrappers

import com.typesafe.config.ConfigFactory
import controllers.de.fuhsen.wrappers.dataintegration.{SilkTransformableTrait, SilkTransformationTask}

/**
  * Wrapper for the Linked Leaks REST API.
  */
class DBpediaWrapper extends RestApiWrapperTrait with SilkTransformableTrait {

  /** Query parameters that should be added to the request. */
  override def queryParams: Map[String, String] = Map()

  override def buildSparqlQuery(queryString: String): String = {
    s"""
      |PREFIX foaf: <http://xmlns.com/foaf/0.1/>
      |
      |CONSTRUCT { ?x foaf:name ?name }
      |WHERE {
      | ?x foaf:name ?name
      | .FILTER regex(str(?name), 'Macri')
      |} LIMIT 20
      """.stripMargin
  }

  /** Headers that should be added to the request. */
  override def headersParams: Map[String, String] = Map("Accept" -> "application/json")

  /** Returns for a given query string the representation as query parameter for the specific API. */
  override def searchQueryAsParam(queryString: String): Map[String, String] = {

    Map("query" -> java.net.URLEncoder.encode(buildSparqlQuery(queryString), "UTF-8"))
  }

  /** The REST endpoint URL */
  override def apiUrl: String = ConfigFactory.load.getString("dbpedia.sparql.endpoint.url")

  /**
    * Returns the globally unique URI String of the source that is wrapped. This is used to track provenance.
    */
  override def sourceLocalName: String = "dbpedia"

  /** SILK Transformation Trait **/
  override def silkTransformationRequestTasks = Seq(
    SilkTransformationTask(
      transformationTaskId = "LinkedLeaksEntityTransformation",
      createSilkTransformationRequestBody(
        basePath = "results/bindings",
        uriPattern = "http://vocab.cs.uni-bonn.de/fuhsen/search/entity/linkedleaks/{node_id/value}"
      )
    )
  )

  /** The type of the transformation input. */
  override def datasetPluginType: DatasetPluginType = DatasetPluginType.JsonDatasetPlugin

  /** The project id of the Silk project */
  override def projectId: String = ConfigFactory.load.getString("silk.socialApiProject.id")

}
