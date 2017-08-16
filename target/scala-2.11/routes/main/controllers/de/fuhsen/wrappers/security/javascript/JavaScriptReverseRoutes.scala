
// @GENERATOR:play-routes-compiler
// @SOURCE:/Volumes/LuisBookSD/ThesisRepo/Original/FaRBIE/FaRBIE/conf/routes
// @DATE:Wed Aug 16 10:29:31 CEST 2017

import play.api.routing.JavaScriptReverseRoute
import play.api.mvc.{ QueryStringBindable, PathBindable, Call, JavascriptLiteral }
import play.core.routing.{ HandlerDef, ReverseRouteContext, queryString, dynamicString }


import _root_.controllers.Assets.Asset

// @LINE:39
package controllers.de.fuhsen.wrappers.security.javascript {
  import ReverseRouteContext.empty

  // @LINE:39
  class ReverseTokenRetrievalController(_prefix: => String) {

    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:39
    def getToken: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.de.fuhsen.wrappers.security.TokenRetrievalController.getToken",
      """
        function(wrapperId) {
          return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + (""" + implicitly[PathBindable[String]].javascriptUnbind + """)("wrapperId", encodeURIComponent(wrapperId)) + "/getToken"})
        }
      """
    )
  
    // @LINE:41
    def code2tokenX: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.de.fuhsen.wrappers.security.TokenRetrievalController.code2tokenX",
      """
        function(wrapperId,oauth_token,oauth_verifier) {
          return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + (""" + implicitly[PathBindable[String]].javascriptUnbind + """)("wrapperId", encodeURIComponent(wrapperId)) + "/code2tokenX" + _qS([(""" + implicitly[QueryStringBindable[String]].javascriptUnbind + """)("oauth_token", oauth_token), (""" + implicitly[QueryStringBindable[String]].javascriptUnbind + """)("oauth_verifier", oauth_verifier)])})
        }
      """
    )
  
    // @LINE:40
    def code2token: JavaScriptReverseRoute = JavaScriptReverseRoute(
      "controllers.de.fuhsen.wrappers.security.TokenRetrievalController.code2token",
      """
        function(code,wrapperId) {
          return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + (""" + implicitly[PathBindable[String]].javascriptUnbind + """)("wrapperId", encodeURIComponent(wrapperId)) + "/code2token" + _qS([(""" + implicitly[QueryStringBindable[String]].javascriptUnbind + """)("code", code)])})
        }
      """
    )
  
  }


}