
// @GENERATOR:play-routes-compiler
// @SOURCE:/Volumes/LuisBookSD/ThesisRepo/Original/FaRBIE/FaRBIE/conf/routes
// @DATE:Wed Aug 16 10:29:31 CEST 2017

import play.api.routing.JavaScriptReverseRoute
import play.api.mvc.{ QueryStringBindable, PathBindable, Call, JavascriptLiteral }
import play.core.routing.{ HandlerDef, ReverseRouteContext, queryString, dynamicString }


import _root_.controllers.Assets.Asset

// @LINE:35
package controllers.de.fuhsen.wrappers.javascript {
  import ReverseRouteContext.empty

  // @LINE:35
  class ReverseWrapperController(_prefix: => String) {

    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:35
    def search: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.de.fuhsen.wrappers.WrapperController.search",
      """
        function(wrapperId,query) {
          return _wA({method:"POST", url:"""" + _prefix + { _defaultPrefix } + """" + "ldw/restApiWrapper/id/" + (""" + implicitly[PathBindable[String]].javascriptUnbind + """)("wrapperId", encodeURIComponent(wrapperId)) + "/search" + _qS([(""" + implicitly[QueryStringBindable[String]].javascriptUnbind + """)("query", query)])})
        }
      """
    )
  
    // @LINE:37
    def wrapperIds: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.de.fuhsen.wrappers.WrapperController.wrapperIds",
      """
        function() {
          return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + "ldw/restApiWrapper"})
        }
      """
    )
  
    // @LINE:36
    def searchMultiple: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.de.fuhsen.wrappers.WrapperController.searchMultiple",
      """
        function(query,wrapperIds) {
          return _wA({method:"POST", url:"""" + _prefix + { _defaultPrefix } + """" + "ldw/restApiWrapper/search" + _qS([(""" + implicitly[QueryStringBindable[String]].javascriptUnbind + """)("query", query), (""" + implicitly[QueryStringBindable[String]].javascriptUnbind + """)("wrapperIds", wrapperIds)])})
        }
      """
    )
  
  }


}