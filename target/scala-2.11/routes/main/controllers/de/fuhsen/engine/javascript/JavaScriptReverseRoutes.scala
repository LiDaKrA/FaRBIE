
// @GENERATOR:play-routes-compiler
// @SOURCE:/Volumes/LuisBookSD/ThesisRepo/Original/FaRBIE/FaRBIE/conf/routes
// @DATE:Wed Aug 16 10:29:31 CEST 2017

import play.api.routing.JavaScriptReverseRoute
import play.api.mvc.{ QueryStringBindable, PathBindable, Call, JavascriptLiteral }
import play.core.routing.{ HandlerDef, ReverseRouteContext, queryString, dynamicString }


import _root_.controllers.Assets.Asset

// @LINE:10
package controllers.de.fuhsen.engine.javascript {
  import ReverseRouteContext.empty

  // @LINE:49
  class ReverseRdfGraphController(_prefix: => String) {

    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:49
    def mergeEntities: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.de.fuhsen.engine.RdfGraphController.mergeEntities",
      """
        function(graphUid,uri1,uri2) {
          return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + (""" + implicitly[PathBindable[String]].javascriptUnbind + """)("graphUid", encodeURIComponent(graphUid)) + "/merge" + _qS([(""" + implicitly[QueryStringBindable[String]].javascriptUnbind + """)("uri1", uri1), (""" + implicitly[QueryStringBindable[String]].javascriptUnbind + """)("uri2", uri2)])})
        }
      """
    )
  
    // @LINE:51
    def addToFavorites: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.de.fuhsen.engine.RdfGraphController.addToFavorites",
      """
        function(graphUid,uri) {
          return _wA({method:"POST", url:"""" + _prefix + { _defaultPrefix } + """" + (""" + implicitly[PathBindable[String]].javascriptUnbind + """)("graphUid", encodeURIComponent(graphUid)) + "/favorites" + _qS([(""" + implicitly[QueryStringBindable[String]].javascriptUnbind + """)("uri", uri)])})
        }
      """
    )
  
    // @LINE:50
    def getFavorites: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.de.fuhsen.engine.RdfGraphController.getFavorites",
      """
        function(graphUid) {
          return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + (""" + implicitly[PathBindable[String]].javascriptUnbind + """)("graphUid", encodeURIComponent(graphUid)) + "/favorites"})
        }
      """
    )
  
  }

  // @LINE:10
  class ReverseScreenshotController(_prefix: => String) {

    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:10
    def screenshots: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.de.fuhsen.engine.ScreenshotController.screenshots",
      """
        function(url) {
          return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + "screenshot" + _qS([(""" + implicitly[QueryStringBindable[String]].javascriptUnbind + """)("url", url)])})
        }
      """
    )
  
    // @LINE:11
    def checkOnionSite: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.de.fuhsen.engine.ScreenshotController.checkOnionSite",
      """
        function(site) {
          return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + "checkOnionSite" + _qS([(""" + implicitly[QueryStringBindable[String]].javascriptUnbind + """)("site", site)])})
        }
      """
    )
  
  }

  // @LINE:27
  class ReverseSemanticRankingController(_prefix: => String) {

    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:27
    def execute: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.de.fuhsen.engine.SemanticRankingController.execute",
      """
        function() {
          return _wA({method:"POST", url:"""" + _prefix + { _defaultPrefix } + """" + "engine/api/semanticranking"})
        }
      """
    )
  
  }

  // @LINE:14
  class ReverseSearchEngineController(_prefix: => String) {

    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:15
    def search: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.de.fuhsen.engine.SearchEngineController.search",
      """
        function(uid,entityType,facets,sources,types,exact,loadMoreResults) {
          return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + "engine/api/searches/" + (""" + implicitly[PathBindable[String]].javascriptUnbind + """)("uid", encodeURIComponent(uid)) + "/results" + _qS([(""" + implicitly[QueryStringBindable[String]].javascriptUnbind + """)("entityType", entityType), (""" + implicitly[QueryStringBindable[Option[String]]].javascriptUnbind + """)("facets", facets), (""" + implicitly[QueryStringBindable[String]].javascriptUnbind + """)("sources", sources), (""" + implicitly[QueryStringBindable[String]].javascriptUnbind + """)("types", types), (""" + implicitly[QueryStringBindable[Boolean]].javascriptUnbind + """)("exact", exact), (""" + implicitly[QueryStringBindable[Option[Boolean]]].javascriptUnbind + """)("loadMoreResults", loadMoreResults)])})
        }
      """
    )
  
    // @LINE:18
    def calculateSearchStat: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.de.fuhsen.engine.SearchEngineController.calculateSearchStat",
      """
        function(uid) {
          return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + "engine/api/searches/" + (""" + implicitly[PathBindable[String]].javascriptUnbind + """)("uid", encodeURIComponent(uid)) + "/results_stat"})
        }
      """
    )
  
    // @LINE:19
    def getSearchMetadata: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.de.fuhsen.engine.SearchEngineController.getSearchMetadata",
      """
        function(uid) {
          return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + "engine/api/searches/" + (""" + implicitly[PathBindable[String]].javascriptUnbind + """)("uid", encodeURIComponent(uid)) + "/metadata"})
        }
      """
    )
  
    // @LINE:16
    def stopSession: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.de.fuhsen.engine.SearchEngineController.stopSession",
      """
        function(uid) {
          return _wA({method:"DELETE", url:"""" + _prefix + { _defaultPrefix } + """" + "engine/api/searches/" + (""" + implicitly[PathBindable[String]].javascriptUnbind + """)("uid", encodeURIComponent(uid))})
        }
      """
    )
  
    // @LINE:14
    def startSession: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.de.fuhsen.engine.SearchEngineController.startSession",
      """
        function(query) {
          return _wA({method:"POST", url:"""" + _prefix + { _defaultPrefix } + """" + "engine/api/searches" + _qS([(""" + implicitly[QueryStringBindable[String]].javascriptUnbind + """)("query", query)])})
        }
      """
    )
  
  }

  // @LINE:17
  class ReverseFacetsController(_prefix: => String) {

    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:17
    def getGeneratedFacets: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.de.fuhsen.engine.FacetsController.getGeneratedFacets",
      """
        function(uid,entityType,lang,exact) {
          return _wA({method:"POST", url:"""" + _prefix + { _defaultPrefix } + """" + "engine/api/searches/" + (""" + implicitly[PathBindable[String]].javascriptUnbind + """)("uid", encodeURIComponent(uid)) + "/facets" + _qS([(""" + implicitly[QueryStringBindable[String]].javascriptUnbind + """)("entityType", entityType), (""" + implicitly[QueryStringBindable[String]].javascriptUnbind + """)("lang", lang), (""" + implicitly[QueryStringBindable[Boolean]].javascriptUnbind + """)("exact", exact)])})
        }
      """
    )
  
  }

  // @LINE:20
  class ReverseTestEngineController(_prefix: => String) {

    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:20
    def testEngine: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.de.fuhsen.engine.TestEngineController.testEngine",
      """
        function(query) {
          return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + "engine/api/searches/test" + _qS([(""" + implicitly[QueryStringBindable[String]].javascriptUnbind + """)("query", query)])})
        }
      """
    )
  
  }

  // @LINE:24
  class ReverseFederatedQueryController(_prefix: => String) {

    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:24
    def execute: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.de.fuhsen.engine.FederatedQueryController.execute",
      """
        function(loadMoreResults) {
          return _wA({method:"POST", url:"""" + _prefix + { _defaultPrefix } + """" + "engine/api/federatedquery" + _qS([(""" + implicitly[QueryStringBindable[Option[Boolean]]].javascriptUnbind + """)("loadMoreResults", loadMoreResults)])})
        }
      """
    )
  
  }

  // @LINE:25
  class ReverseDataCurationController(_prefix: => String) {

    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:25
    def execute: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.de.fuhsen.engine.DataCurationController.execute",
      """
        function() {
          return _wA({method:"POST", url:"""" + _prefix + { _defaultPrefix } + """" + "engine/api/datacuration"})
        }
      """
    )
  
  }

  // @LINE:26
  class ReverseEntitySummarizationController(_prefix: => String) {

    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:26
    def execute: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.de.fuhsen.engine.EntitySummarizationController.execute",
      """
        function() {
          return _wA({method:"POST", url:"""" + _prefix + { _defaultPrefix } + """" + "engine/api/entitysummarization"})
        }
      """
    )
  
    // @LINE:28
    def summarizeEntity: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.de.fuhsen.engine.EntitySummarizationController.summarizeEntity",
      """
        function(uid,entityType,uri) {
          return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + "engine/api/entitysummarization/" + (""" + implicitly[PathBindable[String]].javascriptUnbind + """)("uid", encodeURIComponent(uid)) + "/summarize" + _qS([(""" + implicitly[QueryStringBindable[String]].javascriptUnbind + """)("entityType", entityType), (""" + implicitly[QueryStringBindable[String]].javascriptUnbind + """)("uri", uri)])})
        }
      """
    )
  
  }

  // @LINE:31
  class ReverseSchemaController(_prefix: => String) {

    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:31
    def getSourceList: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.de.fuhsen.engine.SchemaController.getSourceList",
      """
        function() {
          return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + "engine/api/schema/datasources"})
        }
      """
    )
  
    // @LINE:32
    def getEntityTypeList: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.de.fuhsen.engine.SchemaController.getEntityTypeList",
      """
        function() {
          return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + "engine/api/schema/entitytypes"})
        }
      """
    )
  
  }


}