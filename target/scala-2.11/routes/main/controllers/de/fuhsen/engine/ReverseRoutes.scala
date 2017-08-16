
// @GENERATOR:play-routes-compiler
// @SOURCE:/Volumes/LuisBookSD/ThesisRepo/Original/FaRBIE/FaRBIE/conf/routes
// @DATE:Wed Aug 16 10:29:31 CEST 2017

import play.api.mvc.{ QueryStringBindable, PathBindable, Call, JavascriptLiteral }
import play.core.routing.{ HandlerDef, ReverseRouteContext, queryString, dynamicString }


import _root_.controllers.Assets.Asset

// @LINE:10
package controllers.de.fuhsen.engine {

  // @LINE:49
  class ReverseRdfGraphController(_prefix: => String) {
    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:49
    def mergeEntities(graphUid:String, uri1:String, uri2:String): Call = {
      import ReverseRouteContext.empty
      Call("GET", _prefix + { _defaultPrefix } + implicitly[PathBindable[String]].unbind("graphUid", dynamicString(graphUid)) + "/merge" + queryString(List(Some(implicitly[QueryStringBindable[String]].unbind("uri1", uri1)), Some(implicitly[QueryStringBindable[String]].unbind("uri2", uri2)))))
    }
  
    // @LINE:51
    def addToFavorites(graphUid:String, uri:String): Call = {
      import ReverseRouteContext.empty
      Call("POST", _prefix + { _defaultPrefix } + implicitly[PathBindable[String]].unbind("graphUid", dynamicString(graphUid)) + "/favorites" + queryString(List(Some(implicitly[QueryStringBindable[String]].unbind("uri", uri)))))
    }
  
    // @LINE:50
    def getFavorites(graphUid:String): Call = {
      import ReverseRouteContext.empty
      Call("GET", _prefix + { _defaultPrefix } + implicitly[PathBindable[String]].unbind("graphUid", dynamicString(graphUid)) + "/favorites")
    }
  
  }

  // @LINE:10
  class ReverseScreenshotController(_prefix: => String) {
    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:10
    def screenshots(url:String): Call = {
      import ReverseRouteContext.empty
      Call("GET", _prefix + { _defaultPrefix } + "screenshot" + queryString(List(Some(implicitly[QueryStringBindable[String]].unbind("url", url)))))
    }
  
    // @LINE:11
    def checkOnionSite(site:String): Call = {
      import ReverseRouteContext.empty
      Call("GET", _prefix + { _defaultPrefix } + "checkOnionSite" + queryString(List(Some(implicitly[QueryStringBindable[String]].unbind("site", site)))))
    }
  
  }

  // @LINE:27
  class ReverseSemanticRankingController(_prefix: => String) {
    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:27
    def execute(): Call = {
      import ReverseRouteContext.empty
      Call("POST", _prefix + { _defaultPrefix } + "engine/api/semanticranking")
    }
  
  }

  // @LINE:14
  class ReverseSearchEngineController(_prefix: => String) {
    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:15
    def search(uid:String, entityType:String, facets:Option[String], sources:String, types:String, exact:Boolean, loadMoreResults:Option[Boolean]): Call = {
      import ReverseRouteContext.empty
      Call("GET", _prefix + { _defaultPrefix } + "engine/api/searches/" + implicitly[PathBindable[String]].unbind("uid", dynamicString(uid)) + "/results" + queryString(List(Some(implicitly[QueryStringBindable[String]].unbind("entityType", entityType)), Some(implicitly[QueryStringBindable[Option[String]]].unbind("facets", facets)), Some(implicitly[QueryStringBindable[String]].unbind("sources", sources)), Some(implicitly[QueryStringBindable[String]].unbind("types", types)), Some(implicitly[QueryStringBindable[Boolean]].unbind("exact", exact)), Some(implicitly[QueryStringBindable[Option[Boolean]]].unbind("loadMoreResults", loadMoreResults)))))
    }
  
    // @LINE:18
    def calculateSearchStat(uid:String): Call = {
      import ReverseRouteContext.empty
      Call("GET", _prefix + { _defaultPrefix } + "engine/api/searches/" + implicitly[PathBindable[String]].unbind("uid", dynamicString(uid)) + "/results_stat")
    }
  
    // @LINE:19
    def getSearchMetadata(uid:String): Call = {
      import ReverseRouteContext.empty
      Call("GET", _prefix + { _defaultPrefix } + "engine/api/searches/" + implicitly[PathBindable[String]].unbind("uid", dynamicString(uid)) + "/metadata")
    }
  
    // @LINE:16
    def stopSession(uid:String): Call = {
      import ReverseRouteContext.empty
      Call("DELETE", _prefix + { _defaultPrefix } + "engine/api/searches/" + implicitly[PathBindable[String]].unbind("uid", dynamicString(uid)))
    }
  
    // @LINE:14
    def startSession(query:String): Call = {
      import ReverseRouteContext.empty
      Call("POST", _prefix + { _defaultPrefix } + "engine/api/searches" + queryString(List(Some(implicitly[QueryStringBindable[String]].unbind("query", query)))))
    }
  
  }

  // @LINE:17
  class ReverseFacetsController(_prefix: => String) {
    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:17
    def getGeneratedFacets(uid:String, entityType:String, lang:String, exact:Boolean): Call = {
      import ReverseRouteContext.empty
      Call("POST", _prefix + { _defaultPrefix } + "engine/api/searches/" + implicitly[PathBindable[String]].unbind("uid", dynamicString(uid)) + "/facets" + queryString(List(Some(implicitly[QueryStringBindable[String]].unbind("entityType", entityType)), Some(implicitly[QueryStringBindable[String]].unbind("lang", lang)), Some(implicitly[QueryStringBindable[Boolean]].unbind("exact", exact)))))
    }
  
  }

  // @LINE:20
  class ReverseTestEngineController(_prefix: => String) {
    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:20
    def testEngine(query:String): Call = {
      import ReverseRouteContext.empty
      Call("GET", _prefix + { _defaultPrefix } + "engine/api/searches/test" + queryString(List(Some(implicitly[QueryStringBindable[String]].unbind("query", query)))))
    }
  
  }

  // @LINE:24
  class ReverseFederatedQueryController(_prefix: => String) {
    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:24
    def execute(loadMoreResults:Option[Boolean]): Call = {
      import ReverseRouteContext.empty
      Call("POST", _prefix + { _defaultPrefix } + "engine/api/federatedquery" + queryString(List(Some(implicitly[QueryStringBindable[Option[Boolean]]].unbind("loadMoreResults", loadMoreResults)))))
    }
  
  }

  // @LINE:25
  class ReverseDataCurationController(_prefix: => String) {
    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:25
    def execute(): Call = {
      import ReverseRouteContext.empty
      Call("POST", _prefix + { _defaultPrefix } + "engine/api/datacuration")
    }
  
  }

  // @LINE:26
  class ReverseEntitySummarizationController(_prefix: => String) {
    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:26
    def execute(): Call = {
      import ReverseRouteContext.empty
      Call("POST", _prefix + { _defaultPrefix } + "engine/api/entitysummarization")
    }
  
    // @LINE:28
    def summarizeEntity(uid:String, entityType:String, uri:String): Call = {
      import ReverseRouteContext.empty
      Call("GET", _prefix + { _defaultPrefix } + "engine/api/entitysummarization/" + implicitly[PathBindable[String]].unbind("uid", dynamicString(uid)) + "/summarize" + queryString(List(Some(implicitly[QueryStringBindable[String]].unbind("entityType", entityType)), Some(implicitly[QueryStringBindable[String]].unbind("uri", uri)))))
    }
  
  }

  // @LINE:31
  class ReverseSchemaController(_prefix: => String) {
    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:31
    def getSourceList(): Call = {
      import ReverseRouteContext.empty
      Call("GET", _prefix + { _defaultPrefix } + "engine/api/schema/datasources")
    }
  
    // @LINE:32
    def getEntityTypeList(): Call = {
      import ReverseRouteContext.empty
      Call("GET", _prefix + { _defaultPrefix } + "engine/api/schema/entitytypes")
    }
  
  }


}