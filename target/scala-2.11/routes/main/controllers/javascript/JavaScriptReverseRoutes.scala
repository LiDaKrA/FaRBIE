
// @GENERATOR:play-routes-compiler
// @SOURCE:/Volumes/LuisBookSD/ThesisRepo/Original/FaRBIE/FaRBIE/conf/routes
// @DATE:Wed Aug 16 10:29:31 CEST 2017

import play.api.routing.JavaScriptReverseRoute
import play.api.mvc.{ QueryStringBindable, PathBindable, Call, JavascriptLiteral }
import play.core.routing.{ HandlerDef, ReverseRouteContext, queryString, dynamicString }


import _root_.controllers.Assets.Asset

// @LINE:6
package controllers.javascript {
  import ReverseRouteContext.empty

  // @LINE:46
  class ReverseWebJarAssets(_prefix: => String) {

    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:46
    def at: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.WebJarAssets.at",
      """
        function(file) {
          return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + "webjars/" + (""" + implicitly[PathBindable[String]].javascriptUnbind + """)("file", file)})
        }
      """
    )
  
  }

  // @LINE:45
  class ReverseAssets(_prefix: => String) {

    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:45
    def versioned: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.Assets.versioned",
      """
        function(file) {
          return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + "assets/" + (""" + implicitly[PathBindable[Asset]].javascriptUnbind + """)("file", file)})
        }
      """
    )
  
  }

  // @LINE:6
  class ReverseApplication(_prefix: => String) {

    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:9
    def getKeyword: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.Application.getKeyword",
      """
        function() {
          return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + "keyword"})
        }
      """
    )
  
    // @LINE:8
    def details: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.Application.details",
      """
        function(uid,eUri,entityType) {
          return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + "details" + _qS([(""" + implicitly[QueryStringBindable[String]].javascriptUnbind + """)("uid", uid), (""" + implicitly[QueryStringBindable[String]].javascriptUnbind + """)("eUri", eUri), (""" + implicitly[QueryStringBindable[String]].javascriptUnbind + """)("entityType", entityType)])})
        }
      """
    )
  
    // @LINE:7
    def results: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.Application.results",
      """
        function() {
          return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + "results"})
        }
      """
    )
  
    // @LINE:42
    def TokenLifeLength: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.Application.TokenLifeLength",
      """
        function(wrapperId) {
          return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + (""" + implicitly[PathBindable[String]].javascriptUnbind + """)("wrapperId", encodeURIComponent(wrapperId)) + "/getTokenLifeLength"})
        }
      """
    )
  
    // @LINE:6
    def index: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.Application.index",
      """
        function() {
          return _wA({method:"GET", url:"""" + _prefix + """"})
        }
      """
    )
  
  }


}