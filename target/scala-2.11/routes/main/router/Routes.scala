
// @GENERATOR:play-routes-compiler
// @SOURCE:/Volumes/LuisBookSD/ThesisRepo/Original/FaRBIE/FaRBIE/conf/routes
// @DATE:Wed Aug 16 10:29:31 CEST 2017

package router

import play.core.routing._
import play.core.routing.HandlerInvokerFactory._
import play.core.j._

import play.api.mvc._

import _root_.controllers.Assets.Asset

class Routes(
  override val errorHandler: play.api.http.HttpErrorHandler, 
  // @LINE:6
  Application_14: controllers.Application,
  // @LINE:10
  ScreenshotController_2: controllers.de.fuhsen.engine.ScreenshotController,
  // @LINE:14
  SearchEngineController_9: controllers.de.fuhsen.engine.SearchEngineController,
  // @LINE:17
  FacetsController_1: controllers.de.fuhsen.engine.FacetsController,
  // @LINE:20
  TestEngineController_6: controllers.de.fuhsen.engine.TestEngineController,
  // @LINE:24
  FederatedQueryController_8: controllers.de.fuhsen.engine.FederatedQueryController,
  // @LINE:25
  DataCurationController_11: controllers.de.fuhsen.engine.DataCurationController,
  // @LINE:26
  EntitySummarizationController_5: controllers.de.fuhsen.engine.EntitySummarizationController,
  // @LINE:27
  SemanticRankingController_4: controllers.de.fuhsen.engine.SemanticRankingController,
  // @LINE:31
  SchemaController_0: controllers.de.fuhsen.engine.SchemaController,
  // @LINE:35
  WrapperController_3: controllers.de.fuhsen.wrappers.WrapperController,
  // @LINE:39
  TokenRetrievalController_7: controllers.de.fuhsen.wrappers.security.TokenRetrievalController,
  // @LINE:45
  Assets_12: controllers.Assets,
  // @LINE:46
  WebJarAssets_13: controllers.WebJarAssets,
  // @LINE:49
  RdfGraphController_10: controllers.de.fuhsen.engine.RdfGraphController,
  val prefix: String
) extends GeneratedRouter {

   @javax.inject.Inject()
   def this(errorHandler: play.api.http.HttpErrorHandler,
    // @LINE:6
    Application_14: controllers.Application,
    // @LINE:10
    ScreenshotController_2: controllers.de.fuhsen.engine.ScreenshotController,
    // @LINE:14
    SearchEngineController_9: controllers.de.fuhsen.engine.SearchEngineController,
    // @LINE:17
    FacetsController_1: controllers.de.fuhsen.engine.FacetsController,
    // @LINE:20
    TestEngineController_6: controllers.de.fuhsen.engine.TestEngineController,
    // @LINE:24
    FederatedQueryController_8: controllers.de.fuhsen.engine.FederatedQueryController,
    // @LINE:25
    DataCurationController_11: controllers.de.fuhsen.engine.DataCurationController,
    // @LINE:26
    EntitySummarizationController_5: controllers.de.fuhsen.engine.EntitySummarizationController,
    // @LINE:27
    SemanticRankingController_4: controllers.de.fuhsen.engine.SemanticRankingController,
    // @LINE:31
    SchemaController_0: controllers.de.fuhsen.engine.SchemaController,
    // @LINE:35
    WrapperController_3: controllers.de.fuhsen.wrappers.WrapperController,
    // @LINE:39
    TokenRetrievalController_7: controllers.de.fuhsen.wrappers.security.TokenRetrievalController,
    // @LINE:45
    Assets_12: controllers.Assets,
    // @LINE:46
    WebJarAssets_13: controllers.WebJarAssets,
    // @LINE:49
    RdfGraphController_10: controllers.de.fuhsen.engine.RdfGraphController
  ) = this(errorHandler, Application_14, ScreenshotController_2, SearchEngineController_9, FacetsController_1, TestEngineController_6, FederatedQueryController_8, DataCurationController_11, EntitySummarizationController_5, SemanticRankingController_4, SchemaController_0, WrapperController_3, TokenRetrievalController_7, Assets_12, WebJarAssets_13, RdfGraphController_10, "/")

  import ReverseRouteContext.empty

  def withPrefix(prefix: String): Routes = {
    router.RoutesPrefix.setPrefix(prefix)
    new Routes(errorHandler, Application_14, ScreenshotController_2, SearchEngineController_9, FacetsController_1, TestEngineController_6, FederatedQueryController_8, DataCurationController_11, EntitySummarizationController_5, SemanticRankingController_4, SchemaController_0, WrapperController_3, TokenRetrievalController_7, Assets_12, WebJarAssets_13, RdfGraphController_10, prefix)
  }

  private[this] val defaultPrefix: String = {
    if (this.prefix.endsWith("/")) "" else "/"
  }

  def documentation = List(
    ("""GET""", this.prefix, """controllers.Application.index()"""),
    ("""GET""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """results""", """controllers.Application.results()"""),
    ("""GET""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """details""", """controllers.Application.details(uid:String, eUri:String, entityType:String)"""),
    ("""GET""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """keyword""", """controllers.Application.getKeyword()"""),
    ("""GET""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """screenshot""", """controllers.de.fuhsen.engine.ScreenshotController.screenshots(url:String)"""),
    ("""GET""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """checkOnionSite""", """controllers.de.fuhsen.engine.ScreenshotController.checkOnionSite(site:String)"""),
    ("""POST""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """engine/api/searches""", """controllers.de.fuhsen.engine.SearchEngineController.startSession(query:String)"""),
    ("""GET""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """engine/api/searches/$uid<[^/]+>/results""", """controllers.de.fuhsen.engine.SearchEngineController.search(uid:String, entityType:String, facets:Option[String], sources:String, types:String, exact:Boolean, loadMoreResults:Option[Boolean])"""),
    ("""DELETE""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """engine/api/searches/$uid<[^/]+>""", """controllers.de.fuhsen.engine.SearchEngineController.stopSession(uid:String)"""),
    ("""POST""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """engine/api/searches/$uid<[^/]+>/facets""", """controllers.de.fuhsen.engine.FacetsController.getGeneratedFacets(uid:String, entityType:String, lang:String, exact:Boolean)"""),
    ("""GET""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """engine/api/searches/$uid<[^/]+>/results_stat""", """controllers.de.fuhsen.engine.SearchEngineController.calculateSearchStat(uid:String)"""),
    ("""GET""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """engine/api/searches/$uid<[^/]+>/metadata""", """controllers.de.fuhsen.engine.SearchEngineController.getSearchMetadata(uid:String)"""),
    ("""GET""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """engine/api/searches/test""", """controllers.de.fuhsen.engine.TestEngineController.testEngine(query:String)"""),
    ("""POST""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """engine/api/federatedquery""", """controllers.de.fuhsen.engine.FederatedQueryController.execute(loadMoreResults:Option[Boolean])"""),
    ("""POST""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """engine/api/datacuration""", """controllers.de.fuhsen.engine.DataCurationController.execute"""),
    ("""POST""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """engine/api/entitysummarization""", """controllers.de.fuhsen.engine.EntitySummarizationController.execute"""),
    ("""POST""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """engine/api/semanticranking""", """controllers.de.fuhsen.engine.SemanticRankingController.execute"""),
    ("""GET""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """engine/api/entitysummarization/$uid<[^/]+>/summarize""", """controllers.de.fuhsen.engine.EntitySummarizationController.summarizeEntity(uid:String, entityType:String, uri:String)"""),
    ("""GET""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """engine/api/schema/datasources""", """controllers.de.fuhsen.engine.SchemaController.getSourceList"""),
    ("""GET""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """engine/api/schema/entitytypes""", """controllers.de.fuhsen.engine.SchemaController.getEntityTypeList"""),
    ("""POST""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """ldw/restApiWrapper/id/$wrapperId<[^/]+>/search""", """controllers.de.fuhsen.wrappers.WrapperController.search(wrapperId:String, query:String)"""),
    ("""POST""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """ldw/restApiWrapper/search""", """controllers.de.fuhsen.wrappers.WrapperController.searchMultiple(query:String, wrapperIds:String)"""),
    ("""GET""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """ldw/restApiWrapper""", """controllers.de.fuhsen.wrappers.WrapperController.wrapperIds()"""),
    ("""GET""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """$wrapperId<[^/]+>/getToken""", """controllers.de.fuhsen.wrappers.security.TokenRetrievalController.getToken(wrapperId:String)"""),
    ("""GET""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """$wrapperId<[^/]+>/code2token""", """controllers.de.fuhsen.wrappers.security.TokenRetrievalController.code2token(code:String, wrapperId:String)"""),
    ("""GET""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """$wrapperId<[^/]+>/code2tokenX""", """controllers.de.fuhsen.wrappers.security.TokenRetrievalController.code2tokenX(wrapperId:String, oauth_token:String, oauth_verifier:String)"""),
    ("""GET""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """$wrapperId<[^/]+>/getTokenLifeLength""", """controllers.Application.TokenLifeLength(wrapperId:String)"""),
    ("""GET""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """assets/$file<.+>""", """controllers.Assets.versioned(path:String = "/public", file:Asset)"""),
    ("""GET""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """webjars/$file<.+>""", """controllers.WebJarAssets.at(file:String)"""),
    ("""GET""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """$graphUid<[^/]+>/merge""", """controllers.de.fuhsen.engine.RdfGraphController.mergeEntities(graphUid:String, uri1:String, uri2:String)"""),
    ("""GET""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """$graphUid<[^/]+>/favorites""", """controllers.de.fuhsen.engine.RdfGraphController.getFavorites(graphUid:String)"""),
    ("""POST""", this.prefix + (if(this.prefix.endsWith("/")) "" else "/") + """$graphUid<[^/]+>/favorites""", """controllers.de.fuhsen.engine.RdfGraphController.addToFavorites(graphUid:String, uri:String)"""),
    Nil
  ).foldLeft(List.empty[(String,String,String)]) { (s,e) => e.asInstanceOf[Any] match {
    case r @ (_,_,_) => s :+ r.asInstanceOf[(String,String,String)]
    case l => s ++ l.asInstanceOf[List[(String,String,String)]]
  }}


  // @LINE:6
  private[this] lazy val controllers_Application_index0_route = Route("GET",
    PathPattern(List(StaticPart(this.prefix)))
  )
  private[this] lazy val controllers_Application_index0_invoker = createInvoker(
    Application_14.index(),
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.Application",
      "index",
      Nil,
      "GET",
      """ User Interface routes""",
      this.prefix + """"""
    )
  )

  // @LINE:7
  private[this] lazy val controllers_Application_results1_route = Route("GET",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("results")))
  )
  private[this] lazy val controllers_Application_results1_invoker = createInvoker(
    Application_14.results(),
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.Application",
      "results",
      Nil,
      "GET",
      """""",
      this.prefix + """results"""
    )
  )

  // @LINE:8
  private[this] lazy val controllers_Application_details2_route = Route("GET",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("details")))
  )
  private[this] lazy val controllers_Application_details2_invoker = createInvoker(
    Application_14.details(fakeValue[String], fakeValue[String], fakeValue[String]),
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.Application",
      "details",
      Seq(classOf[String], classOf[String], classOf[String]),
      "GET",
      """""",
      this.prefix + """details"""
    )
  )

  // @LINE:9
  private[this] lazy val controllers_Application_getKeyword3_route = Route("GET",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("keyword")))
  )
  private[this] lazy val controllers_Application_getKeyword3_invoker = createInvoker(
    Application_14.getKeyword(),
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.Application",
      "getKeyword",
      Nil,
      "GET",
      """""",
      this.prefix + """keyword"""
    )
  )

  // @LINE:10
  private[this] lazy val controllers_de_fuhsen_engine_ScreenshotController_screenshots4_route = Route("GET",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("screenshot")))
  )
  private[this] lazy val controllers_de_fuhsen_engine_ScreenshotController_screenshots4_invoker = createInvoker(
    ScreenshotController_2.screenshots(fakeValue[String]),
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.de.fuhsen.engine.ScreenshotController",
      "screenshots",
      Seq(classOf[String]),
      "GET",
      """""",
      this.prefix + """screenshot"""
    )
  )

  // @LINE:11
  private[this] lazy val controllers_de_fuhsen_engine_ScreenshotController_checkOnionSite5_route = Route("GET",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("checkOnionSite")))
  )
  private[this] lazy val controllers_de_fuhsen_engine_ScreenshotController_checkOnionSite5_invoker = createInvoker(
    ScreenshotController_2.checkOnionSite(fakeValue[String]),
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.de.fuhsen.engine.ScreenshotController",
      "checkOnionSite",
      Seq(classOf[String]),
      "GET",
      """""",
      this.prefix + """checkOnionSite"""
    )
  )

  // @LINE:14
  private[this] lazy val controllers_de_fuhsen_engine_SearchEngineController_startSession6_route = Route("POST",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("engine/api/searches")))
  )
  private[this] lazy val controllers_de_fuhsen_engine_SearchEngineController_startSession6_invoker = createInvoker(
    SearchEngineController_9.startSession(fakeValue[String]),
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.de.fuhsen.engine.SearchEngineController",
      "startSession",
      Seq(classOf[String]),
      "POST",
      """ Search Engine API routes""",
      this.prefix + """engine/api/searches"""
    )
  )

  // @LINE:15
  private[this] lazy val controllers_de_fuhsen_engine_SearchEngineController_search7_route = Route("GET",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("engine/api/searches/"), DynamicPart("uid", """[^/]+""",true), StaticPart("/results")))
  )
  private[this] lazy val controllers_de_fuhsen_engine_SearchEngineController_search7_invoker = createInvoker(
    SearchEngineController_9.search(fakeValue[String], fakeValue[String], fakeValue[Option[String]], fakeValue[String], fakeValue[String], fakeValue[Boolean], fakeValue[Option[Boolean]]),
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.de.fuhsen.engine.SearchEngineController",
      "search",
      Seq(classOf[String], classOf[String], classOf[Option[String]], classOf[String], classOf[String], classOf[Boolean], classOf[Option[Boolean]]),
      "GET",
      """""",
      this.prefix + """engine/api/searches/$uid<[^/]+>/results"""
    )
  )

  // @LINE:16
  private[this] lazy val controllers_de_fuhsen_engine_SearchEngineController_stopSession8_route = Route("DELETE",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("engine/api/searches/"), DynamicPart("uid", """[^/]+""",true)))
  )
  private[this] lazy val controllers_de_fuhsen_engine_SearchEngineController_stopSession8_invoker = createInvoker(
    SearchEngineController_9.stopSession(fakeValue[String]),
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.de.fuhsen.engine.SearchEngineController",
      "stopSession",
      Seq(classOf[String]),
      "DELETE",
      """""",
      this.prefix + """engine/api/searches/$uid<[^/]+>"""
    )
  )

  // @LINE:17
  private[this] lazy val controllers_de_fuhsen_engine_FacetsController_getGeneratedFacets9_route = Route("POST",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("engine/api/searches/"), DynamicPart("uid", """[^/]+""",true), StaticPart("/facets")))
  )
  private[this] lazy val controllers_de_fuhsen_engine_FacetsController_getGeneratedFacets9_invoker = createInvoker(
    FacetsController_1.getGeneratedFacets(fakeValue[String], fakeValue[String], fakeValue[String], fakeValue[Boolean]),
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.de.fuhsen.engine.FacetsController",
      "getGeneratedFacets",
      Seq(classOf[String], classOf[String], classOf[String], classOf[Boolean]),
      "POST",
      """""",
      this.prefix + """engine/api/searches/$uid<[^/]+>/facets"""
    )
  )

  // @LINE:18
  private[this] lazy val controllers_de_fuhsen_engine_SearchEngineController_calculateSearchStat10_route = Route("GET",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("engine/api/searches/"), DynamicPart("uid", """[^/]+""",true), StaticPart("/results_stat")))
  )
  private[this] lazy val controllers_de_fuhsen_engine_SearchEngineController_calculateSearchStat10_invoker = createInvoker(
    SearchEngineController_9.calculateSearchStat(fakeValue[String]),
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.de.fuhsen.engine.SearchEngineController",
      "calculateSearchStat",
      Seq(classOf[String]),
      "GET",
      """""",
      this.prefix + """engine/api/searches/$uid<[^/]+>/results_stat"""
    )
  )

  // @LINE:19
  private[this] lazy val controllers_de_fuhsen_engine_SearchEngineController_getSearchMetadata11_route = Route("GET",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("engine/api/searches/"), DynamicPart("uid", """[^/]+""",true), StaticPart("/metadata")))
  )
  private[this] lazy val controllers_de_fuhsen_engine_SearchEngineController_getSearchMetadata11_invoker = createInvoker(
    SearchEngineController_9.getSearchMetadata(fakeValue[String]),
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.de.fuhsen.engine.SearchEngineController",
      "getSearchMetadata",
      Seq(classOf[String]),
      "GET",
      """""",
      this.prefix + """engine/api/searches/$uid<[^/]+>/metadata"""
    )
  )

  // @LINE:20
  private[this] lazy val controllers_de_fuhsen_engine_TestEngineController_testEngine12_route = Route("GET",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("engine/api/searches/test")))
  )
  private[this] lazy val controllers_de_fuhsen_engine_TestEngineController_testEngine12_invoker = createInvoker(
    TestEngineController_6.testEngine(fakeValue[String]),
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.de.fuhsen.engine.TestEngineController",
      "testEngine",
      Seq(classOf[String]),
      "GET",
      """""",
      this.prefix + """engine/api/searches/test"""
    )
  )

  // @LINE:24
  private[this] lazy val controllers_de_fuhsen_engine_FederatedQueryController_execute13_route = Route("POST",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("engine/api/federatedquery")))
  )
  private[this] lazy val controllers_de_fuhsen_engine_FederatedQueryController_execute13_invoker = createInvoker(
    FederatedQueryController_8.execute(fakeValue[Option[Boolean]]),
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.de.fuhsen.engine.FederatedQueryController",
      "execute",
      Seq(classOf[Option[Boolean]]),
      "POST",
      """Mini-task services enriching the results graph
POST    /engine/api/queryprocessing                         controllers.de.fuhsen.engine.QueryProcessingController.execute""",
      this.prefix + """engine/api/federatedquery"""
    )
  )

  // @LINE:25
  private[this] lazy val controllers_de_fuhsen_engine_DataCurationController_execute14_route = Route("POST",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("engine/api/datacuration")))
  )
  private[this] lazy val controllers_de_fuhsen_engine_DataCurationController_execute14_invoker = createInvoker(
    DataCurationController_11.execute,
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.de.fuhsen.engine.DataCurationController",
      "execute",
      Nil,
      "POST",
      """""",
      this.prefix + """engine/api/datacuration"""
    )
  )

  // @LINE:26
  private[this] lazy val controllers_de_fuhsen_engine_EntitySummarizationController_execute15_route = Route("POST",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("engine/api/entitysummarization")))
  )
  private[this] lazy val controllers_de_fuhsen_engine_EntitySummarizationController_execute15_invoker = createInvoker(
    EntitySummarizationController_5.execute,
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.de.fuhsen.engine.EntitySummarizationController",
      "execute",
      Nil,
      "POST",
      """""",
      this.prefix + """engine/api/entitysummarization"""
    )
  )

  // @LINE:27
  private[this] lazy val controllers_de_fuhsen_engine_SemanticRankingController_execute16_route = Route("POST",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("engine/api/semanticranking")))
  )
  private[this] lazy val controllers_de_fuhsen_engine_SemanticRankingController_execute16_invoker = createInvoker(
    SemanticRankingController_4.execute,
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.de.fuhsen.engine.SemanticRankingController",
      "execute",
      Nil,
      "POST",
      """""",
      this.prefix + """engine/api/semanticranking"""
    )
  )

  // @LINE:28
  private[this] lazy val controllers_de_fuhsen_engine_EntitySummarizationController_summarizeEntity17_route = Route("GET",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("engine/api/entitysummarization/"), DynamicPart("uid", """[^/]+""",true), StaticPart("/summarize")))
  )
  private[this] lazy val controllers_de_fuhsen_engine_EntitySummarizationController_summarizeEntity17_invoker = createInvoker(
    EntitySummarizationController_5.summarizeEntity(fakeValue[String], fakeValue[String], fakeValue[String]),
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.de.fuhsen.engine.EntitySummarizationController",
      "summarizeEntity",
      Seq(classOf[String], classOf[String], classOf[String]),
      "GET",
      """""",
      this.prefix + """engine/api/entitysummarization/$uid<[^/]+>/summarize"""
    )
  )

  // @LINE:31
  private[this] lazy val controllers_de_fuhsen_engine_SchemaController_getSourceList18_route = Route("GET",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("engine/api/schema/datasources")))
  )
  private[this] lazy val controllers_de_fuhsen_engine_SchemaController_getSourceList18_invoker = createInvoker(
    SchemaController_0.getSourceList,
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.de.fuhsen.engine.SchemaController",
      "getSourceList",
      Nil,
      "GET",
      """ Global Schema API routes""",
      this.prefix + """engine/api/schema/datasources"""
    )
  )

  // @LINE:32
  private[this] lazy val controllers_de_fuhsen_engine_SchemaController_getEntityTypeList19_route = Route("GET",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("engine/api/schema/entitytypes")))
  )
  private[this] lazy val controllers_de_fuhsen_engine_SchemaController_getEntityTypeList19_invoker = createInvoker(
    SchemaController_0.getEntityTypeList,
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.de.fuhsen.engine.SchemaController",
      "getEntityTypeList",
      Nil,
      "GET",
      """""",
      this.prefix + """engine/api/schema/entitytypes"""
    )
  )

  // @LINE:35
  private[this] lazy val controllers_de_fuhsen_wrappers_WrapperController_search20_route = Route("POST",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("ldw/restApiWrapper/id/"), DynamicPart("wrapperId", """[^/]+""",true), StaticPart("/search")))
  )
  private[this] lazy val controllers_de_fuhsen_wrappers_WrapperController_search20_invoker = createInvoker(
    WrapperController_3.search(fakeValue[String], fakeValue[String]),
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.de.fuhsen.wrappers.WrapperController",
      "search",
      Seq(classOf[String], classOf[String]),
      "POST",
      """ REST API Wrappers""",
      this.prefix + """ldw/restApiWrapper/id/$wrapperId<[^/]+>/search"""
    )
  )

  // @LINE:36
  private[this] lazy val controllers_de_fuhsen_wrappers_WrapperController_searchMultiple21_route = Route("POST",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("ldw/restApiWrapper/search")))
  )
  private[this] lazy val controllers_de_fuhsen_wrappers_WrapperController_searchMultiple21_invoker = createInvoker(
    WrapperController_3.searchMultiple(fakeValue[String], fakeValue[String]),
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.de.fuhsen.wrappers.WrapperController",
      "searchMultiple",
      Seq(classOf[String], classOf[String]),
      "POST",
      """""",
      this.prefix + """ldw/restApiWrapper/search"""
    )
  )

  // @LINE:37
  private[this] lazy val controllers_de_fuhsen_wrappers_WrapperController_wrapperIds22_route = Route("GET",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("ldw/restApiWrapper")))
  )
  private[this] lazy val controllers_de_fuhsen_wrappers_WrapperController_wrapperIds22_invoker = createInvoker(
    WrapperController_3.wrapperIds(),
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.de.fuhsen.wrappers.WrapperController",
      "wrapperIds",
      Nil,
      "GET",
      """""",
      this.prefix + """ldw/restApiWrapper"""
    )
  )

  // @LINE:39
  private[this] lazy val controllers_de_fuhsen_wrappers_security_TokenRetrievalController_getToken23_route = Route("GET",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), DynamicPart("wrapperId", """[^/]+""",true), StaticPart("/getToken")))
  )
  private[this] lazy val controllers_de_fuhsen_wrappers_security_TokenRetrievalController_getToken23_invoker = createInvoker(
    TokenRetrievalController_7.getToken(fakeValue[String]),
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.de.fuhsen.wrappers.security.TokenRetrievalController",
      "getToken",
      Seq(classOf[String]),
      "GET",
      """""",
      this.prefix + """$wrapperId<[^/]+>/getToken"""
    )
  )

  // @LINE:40
  private[this] lazy val controllers_de_fuhsen_wrappers_security_TokenRetrievalController_code2token24_route = Route("GET",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), DynamicPart("wrapperId", """[^/]+""",true), StaticPart("/code2token")))
  )
  private[this] lazy val controllers_de_fuhsen_wrappers_security_TokenRetrievalController_code2token24_invoker = createInvoker(
    TokenRetrievalController_7.code2token(fakeValue[String], fakeValue[String]),
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.de.fuhsen.wrappers.security.TokenRetrievalController",
      "code2token",
      Seq(classOf[String], classOf[String]),
      "GET",
      """""",
      this.prefix + """$wrapperId<[^/]+>/code2token"""
    )
  )

  // @LINE:41
  private[this] lazy val controllers_de_fuhsen_wrappers_security_TokenRetrievalController_code2tokenX25_route = Route("GET",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), DynamicPart("wrapperId", """[^/]+""",true), StaticPart("/code2tokenX")))
  )
  private[this] lazy val controllers_de_fuhsen_wrappers_security_TokenRetrievalController_code2tokenX25_invoker = createInvoker(
    TokenRetrievalController_7.code2tokenX(fakeValue[String], fakeValue[String], fakeValue[String]),
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.de.fuhsen.wrappers.security.TokenRetrievalController",
      "code2tokenX",
      Seq(classOf[String], classOf[String], classOf[String]),
      "GET",
      """""",
      this.prefix + """$wrapperId<[^/]+>/code2tokenX"""
    )
  )

  // @LINE:42
  private[this] lazy val controllers_Application_TokenLifeLength26_route = Route("GET",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), DynamicPart("wrapperId", """[^/]+""",true), StaticPart("/getTokenLifeLength")))
  )
  private[this] lazy val controllers_Application_TokenLifeLength26_invoker = createInvoker(
    Application_14.TokenLifeLength(fakeValue[String]),
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.Application",
      "TokenLifeLength",
      Seq(classOf[String]),
      "GET",
      """""",
      this.prefix + """$wrapperId<[^/]+>/getTokenLifeLength"""
    )
  )

  // @LINE:45
  private[this] lazy val controllers_Assets_versioned27_route = Route("GET",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("assets/"), DynamicPart("file", """.+""",false)))
  )
  private[this] lazy val controllers_Assets_versioned27_invoker = createInvoker(
    Assets_12.versioned(fakeValue[String], fakeValue[Asset]),
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.Assets",
      "versioned",
      Seq(classOf[String], classOf[Asset]),
      "GET",
      """ Map static resources from the /public folder to the /assets URL path""",
      this.prefix + """assets/$file<.+>"""
    )
  )

  // @LINE:46
  private[this] lazy val controllers_WebJarAssets_at28_route = Route("GET",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), StaticPart("webjars/"), DynamicPart("file", """.+""",false)))
  )
  private[this] lazy val controllers_WebJarAssets_at28_invoker = createInvoker(
    WebJarAssets_13.at(fakeValue[String]),
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.WebJarAssets",
      "at",
      Seq(classOf[String]),
      "GET",
      """""",
      this.prefix + """webjars/$file<.+>"""
    )
  )

  // @LINE:49
  private[this] lazy val controllers_de_fuhsen_engine_RdfGraphController_mergeEntities29_route = Route("GET",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), DynamicPart("graphUid", """[^/]+""",true), StaticPart("/merge")))
  )
  private[this] lazy val controllers_de_fuhsen_engine_RdfGraphController_mergeEntities29_invoker = createInvoker(
    RdfGraphController_10.mergeEntities(fakeValue[String], fakeValue[String], fakeValue[String]),
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.de.fuhsen.engine.RdfGraphController",
      "mergeEntities",
      Seq(classOf[String], classOf[String], classOf[String]),
      "GET",
      """ RDF Graph Services""",
      this.prefix + """$graphUid<[^/]+>/merge"""
    )
  )

  // @LINE:50
  private[this] lazy val controllers_de_fuhsen_engine_RdfGraphController_getFavorites30_route = Route("GET",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), DynamicPart("graphUid", """[^/]+""",true), StaticPart("/favorites")))
  )
  private[this] lazy val controllers_de_fuhsen_engine_RdfGraphController_getFavorites30_invoker = createInvoker(
    RdfGraphController_10.getFavorites(fakeValue[String]),
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.de.fuhsen.engine.RdfGraphController",
      "getFavorites",
      Seq(classOf[String]),
      "GET",
      """""",
      this.prefix + """$graphUid<[^/]+>/favorites"""
    )
  )

  // @LINE:51
  private[this] lazy val controllers_de_fuhsen_engine_RdfGraphController_addToFavorites31_route = Route("POST",
    PathPattern(List(StaticPart(this.prefix), StaticPart(this.defaultPrefix), DynamicPart("graphUid", """[^/]+""",true), StaticPart("/favorites")))
  )
  private[this] lazy val controllers_de_fuhsen_engine_RdfGraphController_addToFavorites31_invoker = createInvoker(
    RdfGraphController_10.addToFavorites(fakeValue[String], fakeValue[String]),
    HandlerDef(this.getClass.getClassLoader,
      "router",
      "controllers.de.fuhsen.engine.RdfGraphController",
      "addToFavorites",
      Seq(classOf[String], classOf[String]),
      "POST",
      """""",
      this.prefix + """$graphUid<[^/]+>/favorites"""
    )
  )


  def routes: PartialFunction[RequestHeader, Handler] = {
  
    // @LINE:6
    case controllers_Application_index0_route(params) =>
      call { 
        controllers_Application_index0_invoker.call(Application_14.index())
      }
  
    // @LINE:7
    case controllers_Application_results1_route(params) =>
      call { 
        controllers_Application_results1_invoker.call(Application_14.results())
      }
  
    // @LINE:8
    case controllers_Application_details2_route(params) =>
      call(params.fromQuery[String]("uid", None), params.fromQuery[String]("eUri", None), params.fromQuery[String]("entityType", None)) { (uid, eUri, entityType) =>
        controllers_Application_details2_invoker.call(Application_14.details(uid, eUri, entityType))
      }
  
    // @LINE:9
    case controllers_Application_getKeyword3_route(params) =>
      call { 
        controllers_Application_getKeyword3_invoker.call(Application_14.getKeyword())
      }
  
    // @LINE:10
    case controllers_de_fuhsen_engine_ScreenshotController_screenshots4_route(params) =>
      call(params.fromQuery[String]("url", None)) { (url) =>
        controllers_de_fuhsen_engine_ScreenshotController_screenshots4_invoker.call(ScreenshotController_2.screenshots(url))
      }
  
    // @LINE:11
    case controllers_de_fuhsen_engine_ScreenshotController_checkOnionSite5_route(params) =>
      call(params.fromQuery[String]("site", None)) { (site) =>
        controllers_de_fuhsen_engine_ScreenshotController_checkOnionSite5_invoker.call(ScreenshotController_2.checkOnionSite(site))
      }
  
    // @LINE:14
    case controllers_de_fuhsen_engine_SearchEngineController_startSession6_route(params) =>
      call(params.fromQuery[String]("query", None)) { (query) =>
        controllers_de_fuhsen_engine_SearchEngineController_startSession6_invoker.call(SearchEngineController_9.startSession(query))
      }
  
    // @LINE:15
    case controllers_de_fuhsen_engine_SearchEngineController_search7_route(params) =>
      call(params.fromPath[String]("uid", None), params.fromQuery[String]("entityType", None), params.fromQuery[Option[String]]("facets", None), params.fromQuery[String]("sources", None), params.fromQuery[String]("types", None), params.fromQuery[Boolean]("exact", None), params.fromQuery[Option[Boolean]]("loadMoreResults", None)) { (uid, entityType, facets, sources, types, exact, loadMoreResults) =>
        controllers_de_fuhsen_engine_SearchEngineController_search7_invoker.call(SearchEngineController_9.search(uid, entityType, facets, sources, types, exact, loadMoreResults))
      }
  
    // @LINE:16
    case controllers_de_fuhsen_engine_SearchEngineController_stopSession8_route(params) =>
      call(params.fromPath[String]("uid", None)) { (uid) =>
        controllers_de_fuhsen_engine_SearchEngineController_stopSession8_invoker.call(SearchEngineController_9.stopSession(uid))
      }
  
    // @LINE:17
    case controllers_de_fuhsen_engine_FacetsController_getGeneratedFacets9_route(params) =>
      call(params.fromPath[String]("uid", None), params.fromQuery[String]("entityType", None), params.fromQuery[String]("lang", None), params.fromQuery[Boolean]("exact", None)) { (uid, entityType, lang, exact) =>
        controllers_de_fuhsen_engine_FacetsController_getGeneratedFacets9_invoker.call(FacetsController_1.getGeneratedFacets(uid, entityType, lang, exact))
      }
  
    // @LINE:18
    case controllers_de_fuhsen_engine_SearchEngineController_calculateSearchStat10_route(params) =>
      call(params.fromPath[String]("uid", None)) { (uid) =>
        controllers_de_fuhsen_engine_SearchEngineController_calculateSearchStat10_invoker.call(SearchEngineController_9.calculateSearchStat(uid))
      }
  
    // @LINE:19
    case controllers_de_fuhsen_engine_SearchEngineController_getSearchMetadata11_route(params) =>
      call(params.fromPath[String]("uid", None)) { (uid) =>
        controllers_de_fuhsen_engine_SearchEngineController_getSearchMetadata11_invoker.call(SearchEngineController_9.getSearchMetadata(uid))
      }
  
    // @LINE:20
    case controllers_de_fuhsen_engine_TestEngineController_testEngine12_route(params) =>
      call(params.fromQuery[String]("query", None)) { (query) =>
        controllers_de_fuhsen_engine_TestEngineController_testEngine12_invoker.call(TestEngineController_6.testEngine(query))
      }
  
    // @LINE:24
    case controllers_de_fuhsen_engine_FederatedQueryController_execute13_route(params) =>
      call(params.fromQuery[Option[Boolean]]("loadMoreResults", None)) { (loadMoreResults) =>
        controllers_de_fuhsen_engine_FederatedQueryController_execute13_invoker.call(FederatedQueryController_8.execute(loadMoreResults))
      }
  
    // @LINE:25
    case controllers_de_fuhsen_engine_DataCurationController_execute14_route(params) =>
      call { 
        controllers_de_fuhsen_engine_DataCurationController_execute14_invoker.call(DataCurationController_11.execute)
      }
  
    // @LINE:26
    case controllers_de_fuhsen_engine_EntitySummarizationController_execute15_route(params) =>
      call { 
        controllers_de_fuhsen_engine_EntitySummarizationController_execute15_invoker.call(EntitySummarizationController_5.execute)
      }
  
    // @LINE:27
    case controllers_de_fuhsen_engine_SemanticRankingController_execute16_route(params) =>
      call { 
        controllers_de_fuhsen_engine_SemanticRankingController_execute16_invoker.call(SemanticRankingController_4.execute)
      }
  
    // @LINE:28
    case controllers_de_fuhsen_engine_EntitySummarizationController_summarizeEntity17_route(params) =>
      call(params.fromPath[String]("uid", None), params.fromQuery[String]("entityType", None), params.fromQuery[String]("uri", None)) { (uid, entityType, uri) =>
        controllers_de_fuhsen_engine_EntitySummarizationController_summarizeEntity17_invoker.call(EntitySummarizationController_5.summarizeEntity(uid, entityType, uri))
      }
  
    // @LINE:31
    case controllers_de_fuhsen_engine_SchemaController_getSourceList18_route(params) =>
      call { 
        controllers_de_fuhsen_engine_SchemaController_getSourceList18_invoker.call(SchemaController_0.getSourceList)
      }
  
    // @LINE:32
    case controllers_de_fuhsen_engine_SchemaController_getEntityTypeList19_route(params) =>
      call { 
        controllers_de_fuhsen_engine_SchemaController_getEntityTypeList19_invoker.call(SchemaController_0.getEntityTypeList)
      }
  
    // @LINE:35
    case controllers_de_fuhsen_wrappers_WrapperController_search20_route(params) =>
      call(params.fromPath[String]("wrapperId", None), params.fromQuery[String]("query", None)) { (wrapperId, query) =>
        controllers_de_fuhsen_wrappers_WrapperController_search20_invoker.call(WrapperController_3.search(wrapperId, query))
      }
  
    // @LINE:36
    case controllers_de_fuhsen_wrappers_WrapperController_searchMultiple21_route(params) =>
      call(params.fromQuery[String]("query", None), params.fromQuery[String]("wrapperIds", None)) { (query, wrapperIds) =>
        controllers_de_fuhsen_wrappers_WrapperController_searchMultiple21_invoker.call(WrapperController_3.searchMultiple(query, wrapperIds))
      }
  
    // @LINE:37
    case controllers_de_fuhsen_wrappers_WrapperController_wrapperIds22_route(params) =>
      call { 
        controllers_de_fuhsen_wrappers_WrapperController_wrapperIds22_invoker.call(WrapperController_3.wrapperIds())
      }
  
    // @LINE:39
    case controllers_de_fuhsen_wrappers_security_TokenRetrievalController_getToken23_route(params) =>
      call(params.fromPath[String]("wrapperId", None)) { (wrapperId) =>
        controllers_de_fuhsen_wrappers_security_TokenRetrievalController_getToken23_invoker.call(TokenRetrievalController_7.getToken(wrapperId))
      }
  
    // @LINE:40
    case controllers_de_fuhsen_wrappers_security_TokenRetrievalController_code2token24_route(params) =>
      call(params.fromQuery[String]("code", None), params.fromPath[String]("wrapperId", None)) { (code, wrapperId) =>
        controllers_de_fuhsen_wrappers_security_TokenRetrievalController_code2token24_invoker.call(TokenRetrievalController_7.code2token(code, wrapperId))
      }
  
    // @LINE:41
    case controllers_de_fuhsen_wrappers_security_TokenRetrievalController_code2tokenX25_route(params) =>
      call(params.fromPath[String]("wrapperId", None), params.fromQuery[String]("oauth_token", None), params.fromQuery[String]("oauth_verifier", None)) { (wrapperId, oauth_token, oauth_verifier) =>
        controllers_de_fuhsen_wrappers_security_TokenRetrievalController_code2tokenX25_invoker.call(TokenRetrievalController_7.code2tokenX(wrapperId, oauth_token, oauth_verifier))
      }
  
    // @LINE:42
    case controllers_Application_TokenLifeLength26_route(params) =>
      call(params.fromPath[String]("wrapperId", None)) { (wrapperId) =>
        controllers_Application_TokenLifeLength26_invoker.call(Application_14.TokenLifeLength(wrapperId))
      }
  
    // @LINE:45
    case controllers_Assets_versioned27_route(params) =>
      call(Param[String]("path", Right("/public")), params.fromPath[Asset]("file", None)) { (path, file) =>
        controllers_Assets_versioned27_invoker.call(Assets_12.versioned(path, file))
      }
  
    // @LINE:46
    case controllers_WebJarAssets_at28_route(params) =>
      call(params.fromPath[String]("file", None)) { (file) =>
        controllers_WebJarAssets_at28_invoker.call(WebJarAssets_13.at(file))
      }
  
    // @LINE:49
    case controllers_de_fuhsen_engine_RdfGraphController_mergeEntities29_route(params) =>
      call(params.fromPath[String]("graphUid", None), params.fromQuery[String]("uri1", None), params.fromQuery[String]("uri2", None)) { (graphUid, uri1, uri2) =>
        controllers_de_fuhsen_engine_RdfGraphController_mergeEntities29_invoker.call(RdfGraphController_10.mergeEntities(graphUid, uri1, uri2))
      }
  
    // @LINE:50
    case controllers_de_fuhsen_engine_RdfGraphController_getFavorites30_route(params) =>
      call(params.fromPath[String]("graphUid", None)) { (graphUid) =>
        controllers_de_fuhsen_engine_RdfGraphController_getFavorites30_invoker.call(RdfGraphController_10.getFavorites(graphUid))
      }
  
    // @LINE:51
    case controllers_de_fuhsen_engine_RdfGraphController_addToFavorites31_route(params) =>
      call(params.fromPath[String]("graphUid", None), params.fromQuery[String]("uri", None)) { (graphUid, uri) =>
        controllers_de_fuhsen_engine_RdfGraphController_addToFavorites31_invoker.call(RdfGraphController_10.addToFavorites(graphUid, uri))
      }
  }
}