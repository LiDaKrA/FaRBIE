
// @GENERATOR:play-routes-compiler
// @SOURCE:/Volumes/LuisBookSD/ThesisRepo/Original/FaRBIE/FaRBIE/conf/routes
// @DATE:Wed Aug 16 10:29:31 CEST 2017

import play.api.mvc.{ QueryStringBindable, PathBindable, Call, JavascriptLiteral }
import play.core.routing.{ HandlerDef, ReverseRouteContext, queryString, dynamicString }


import _root_.controllers.Assets.Asset

// @LINE:35
package controllers.de.fuhsen.wrappers {

  // @LINE:35
  class ReverseWrapperController(_prefix: => String) {
    def _defaultPrefix: String = {
      if (_prefix.endsWith("/")) "" else "/"
    }

  
    // @LINE:35
    def search(wrapperId:String, query:String): Call = {
      import ReverseRouteContext.empty
      Call("POST", _prefix + { _defaultPrefix } + "ldw/restApiWrapper/id/" + implicitly[PathBindable[String]].unbind("wrapperId", dynamicString(wrapperId)) + "/search" + queryString(List(Some(implicitly[QueryStringBindable[String]].unbind("query", query)))))
    }
  
    // @LINE:37
    def wrapperIds(): Call = {
      import ReverseRouteContext.empty
      Call("GET", _prefix + { _defaultPrefix } + "ldw/restApiWrapper")
    }
  
    // @LINE:36
    def searchMultiple(query:String, wrapperIds:String): Call = {
      import ReverseRouteContext.empty
      Call("POST", _prefix + { _defaultPrefix } + "ldw/restApiWrapper/search" + queryString(List(Some(implicitly[QueryStringBindable[String]].unbind("query", query)), Some(implicitly[QueryStringBindable[String]].unbind("wrapperIds", wrapperIds)))))
    }
  
  }


}