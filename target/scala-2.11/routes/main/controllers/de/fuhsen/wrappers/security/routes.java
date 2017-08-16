
// @GENERATOR:play-routes-compiler
// @SOURCE:/Volumes/LuisBookSD/ThesisRepo/Original/FaRBIE/FaRBIE/conf/routes
// @DATE:Wed Aug 16 10:29:31 CEST 2017

package controllers.de.fuhsen.wrappers.security;

import router.RoutesPrefix;

public class routes {
  
  public static final controllers.de.fuhsen.wrappers.security.ReverseTokenRetrievalController TokenRetrievalController = new controllers.de.fuhsen.wrappers.security.ReverseTokenRetrievalController(RoutesPrefix.byNamePrefix());

  public static class javascript {
    
    public static final controllers.de.fuhsen.wrappers.security.javascript.ReverseTokenRetrievalController TokenRetrievalController = new controllers.de.fuhsen.wrappers.security.javascript.ReverseTokenRetrievalController(RoutesPrefix.byNamePrefix());
  }

}
