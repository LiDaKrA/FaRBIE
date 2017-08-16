
package views.html

import play.twirl.api._
import play.twirl.api.TemplateMagic._


     object main_Scope0 {
import models._
import controllers._
import play.api.i18n._
import views.html._
import play.api.templates.PlayMagic._
import play.api.mvc._
import play.api.data._

class main extends BaseScalaTemplate[play.twirl.api.HtmlFormat.Appendable,Format[play.twirl.api.HtmlFormat.Appendable]](play.twirl.api.HtmlFormat) with play.twirl.api.Template4[String,Boolean,Html,Html,play.twirl.api.HtmlFormat.Appendable] {

  /**/
  def apply/*1.2*/(title: String, addHeader: Boolean, scripts: Html)(content: Html):play.twirl.api.HtmlFormat.Appendable = {
    _display_ {
      {


Seq[Any](format.raw/*1.67*/("""

"""),format.raw/*3.1*/("""<!DOCTYPE html>

<html lang="en">
    <head>
        <title>"""),_display_(/*7.17*/title),format.raw/*7.22*/("""</title>

        <link rel='stylesheet' href='"""),_display_(/*9.39*/routes/*9.45*/.WebJarAssets.at(WebJarAssets.locate("css/bootstrap.min.css"))),format.raw/*9.107*/("""'>
        <link rel="stylesheet" media="screen" href=""""),_display_(/*10.54*/routes/*10.60*/.Assets.versioned("stylesheets/main.css")),format.raw/*10.101*/("""">
        <link rel="shortcut icon" type="image/png" href=""""),_display_(/*11.59*/routes/*11.65*/.Assets.versioned("images/FaRBIE_ico-gray.png")),format.raw/*11.112*/("""">
        <link rel="stylesheet" media="screen" href=""""),_display_(/*12.54*/routes/*12.60*/.Assets.versioned("stylesheets/results.css")),format.raw/*12.104*/("""">
        <link rel="stylesheet" media="screen" href=""""),_display_(/*13.54*/routes/*13.60*/.Assets.versioned("stylesheets/graph.css")),format.raw/*13.102*/("""">
        <link rel="stylesheet" media="screen" href=""""),_display_(/*14.54*/routes/*14.60*/.Assets.versioned("stylesheets/details.css")),format.raw/*14.104*/("""">
        <link rel='stylesheet' href='"""),_display_(/*15.39*/routes/*15.45*/.WebJarAssets.at(WebJarAssets.locate("css/font-awesome.min.css"))),format.raw/*15.110*/("""'>
    </head>
    <body data-context=""""),_display_(/*17.26*/play/*17.30*/.Play.application().configuration().getString("play.http.context")),format.raw/*17.96*/("""">
        <noscript>
            <div class="container">
                <div class="row">
                    <div class="col-md-12 warning">
                        <span>Warning Non Javascript</span>
                    </div>
                </div>
            </div>
        </noscript>

        <script type='text/javascript' src='"""),_display_(/*28.46*/routes/*28.52*/.WebJarAssets.at(WebJarAssets.locate("jquery.min.js"))),format.raw/*28.106*/("""'></script>
        <script type='text/javascript' src='"""),_display_(/*29.46*/routes/*29.52*/.WebJarAssets.at(WebJarAssets.locate("JSXTransformer.js"))),format.raw/*29.110*/("""'></script>
        <script type='text/javascript' src='"""),_display_(/*30.46*/routes/*30.52*/.WebJarAssets.at(WebJarAssets.locate("jszip.js"))),format.raw/*30.101*/("""'></script>
        <script type='text/javascript' src='"""),_display_(/*31.46*/routes/*31.52*/.WebJarAssets.at(WebJarAssets.locate("FileSaver.js"))),format.raw/*31.105*/("""'></script>
        <script type='text/javascript' src='"""),_display_(/*32.46*/routes/*32.52*/.WebJarAssets.at(WebJarAssets.fullPath("react", "react.js"))),format.raw/*32.112*/("""'></script>
        <script src="http://d3js.org/d3.v3.min.js"></script>
        """),_display_(/*34.10*/if(addHeader)/*34.23*/ {_display_(Seq[Any](format.raw/*34.25*/("""
            """),format.raw/*35.13*/("""<header class="hidden-phone">
                <h1 class="invisible-but-readable">ddbnext.Heading_Header</h1>
            </header>
        """)))}),format.raw/*38.10*/("""

        """),format.raw/*40.9*/("""<div id="main-container" class="container" role="main">
            """),_display_(/*41.14*/content),format.raw/*41.21*/("""
        """),format.raw/*42.9*/("""</div>

        """),_display_(/*44.10*/scripts),format.raw/*44.17*/("""

    """),format.raw/*46.5*/("""</body>
</html>
"""))
      }
    }
  }

  def render(title:String,addHeader:Boolean,scripts:Html,content:Html): play.twirl.api.HtmlFormat.Appendable = apply(title,addHeader,scripts)(content)

  def f:((String,Boolean,Html) => (Html) => play.twirl.api.HtmlFormat.Appendable) = (title,addHeader,scripts) => (content) => apply(title,addHeader,scripts)(content)

  def ref: this.type = this

}


}

/**/
object main extends main_Scope0.main
              /*
                  -- GENERATED --
                  DATE: Wed Aug 16 10:54:09 CEST 2017
                  SOURCE: /Volumes/LuisBookSD/ThesisRepo/Original/FaRBIE/FaRBIE/app/views/main.scala.html
                  HASH: 5dc409cb69b655eaf157dc4d5749ec581eabab05
                  MATRIX: 543->1|703->66|731->68|818->129|843->134|917->182|931->188|1014->250|1097->306|1112->312|1175->353|1263->414|1278->420|1347->467|1430->523|1445->529|1511->573|1594->629|1609->635|1673->677|1756->733|1771->739|1837->783|1905->824|1920->830|2007->895|2074->935|2087->939|2174->1005|2540->1344|2555->1350|2631->1404|2715->1461|2730->1467|2810->1525|2894->1582|2909->1588|2980->1637|3064->1694|3079->1700|3154->1753|3238->1810|3253->1816|3335->1876|3444->1958|3466->1971|3506->1973|3547->1986|3718->2126|3755->2136|3851->2205|3879->2212|3915->2221|3959->2238|3987->2245|4020->2251
                  LINES: 20->1|25->1|27->3|31->7|31->7|33->9|33->9|33->9|34->10|34->10|34->10|35->11|35->11|35->11|36->12|36->12|36->12|37->13|37->13|37->13|38->14|38->14|38->14|39->15|39->15|39->15|41->17|41->17|41->17|52->28|52->28|52->28|53->29|53->29|53->29|54->30|54->30|54->30|55->31|55->31|55->31|56->32|56->32|56->32|58->34|58->34|58->34|59->35|62->38|64->40|65->41|65->41|66->42|68->44|68->44|70->46
                  -- GENERATED --
              */
          