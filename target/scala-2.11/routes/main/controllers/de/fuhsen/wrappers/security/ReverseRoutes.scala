
// @GENERATOR:play-routes-compiler
// @SOURCE:/Volumes/LuisBookSD/ThesisRepo/Original/FaRBIE/FaRBIE/conf/routes
// @DATE:Wed Aug 16 10:29:31 CEST 2017

import play.api.mvc.{ QueryStringBindable, PathBindable, Call, JavascriptLiteral }
import play.core.routing.{ HandlerDef, ReverseRouteContext, queryString, dynamicString }


import _root_.controllers.Assets.Asset

// @LINE:39
package controllers.de.fuhsen.wrappers.security {

  // @LINE:39
  class ReverseTokenRetrievalController(_prefix: => String) {
    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:39
    def getToken(wrapperId:String): Call = {
      import ReverseRouteContext.empty
      Call("GET", _prefix + { _defaultPrefix } + implicitly[PathBindable[String]].unbind("wrapperId", dynamicString(wrapperId)) + "/getToken")
    }
  
    // @LINE:41
    def code2tokenX(wrapperId:String, oauth_token:String, oauth_verifier:String): Call = {
      import ReverseRouteContext.empty
      Call("GET", _prefix + { _defaultPrefix } + implicitly[PathBindable[String]].unbind("wrapperId", dynamicString(wrapperId)) + "/code2tokenX" + queryString(List(Some(implicitly[QueryStringBindable[String]].unbind("oauth_token", oauth_token)), Some(implicitly[QueryStringBindable[String]].unbind("oauth_verifier", oauth_verifier)))))
    }
  
    // @LINE:40
    def code2token(code:String, wrapperId:String): Call = {
      import ReverseRouteContext.empty
      Call("GET", _prefix + { _defaultPrefix } + implicitly[PathBindable[String]].unbind("wrapperId", dynamicString(wrapperId)) + "/code2token" + queryString(List(Some(implicitly[QueryStringBindable[String]].unbind("code", code)))))
    }
  
  }


}