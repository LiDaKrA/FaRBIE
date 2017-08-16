
package views.html

import play.twirl.api._
import play.twirl.api.TemplateMagic._


     object results_Scope0 {
import models._
import controllers._
import play.api.i18n._
import views.html._
import play.api.templates.PlayMagic._
import play.api.mvc._
import play.api.data._

class results extends BaseScalaTemplate[play.twirl.api.HtmlFormat.Appendable,Format[play.twirl.api.HtmlFormat.Appendable]](play.twirl.api.HtmlFormat) with play.twirl.api.Template0[play.twirl.api.HtmlFormat.Appendable] {

  /**/
  def apply():play.twirl.api.HtmlFormat.Appendable = {
    _display_ {
      {

def /*6.2*/scripts/*6.9*/:play.twirl.api.HtmlFormat.Appendable = {_display_(

Seq[Any](format.raw/*6.13*/("""
    """),format.raw/*7.5*/("""<script type='text/javascript' src='"""),_display_(/*7.42*/routes/*7.48*/.Assets.versioned("javascripts/graph.js")),format.raw/*7.89*/("""'></script>
    <script type='text/javascript' src='"""),_display_(/*8.42*/routes/*8.48*/.Assets.versioned("javascripts/translation.js")),format.raw/*8.95*/("""'></script>
    <script type='text/javascript' src='"""),_display_(/*9.42*/routes/*9.48*/.Assets.versioned("javascripts/search.js")),format.raw/*9.90*/("""'></script>
    <script type='text/javascript' src='"""),_display_(/*10.42*/routes/*10.48*/.Assets.versioned("javascripts/utilities.js")),format.raw/*10.93*/("""'></script>
    <script type='text/javascript' src='"""),_display_(/*11.42*/routes/*11.48*/.Assets.versioned("javascripts/results_table.js")),format.raw/*11.97*/("""'></script>
	<script type='text/javascript' src='"""),_display_(/*12.39*/routes/*12.45*/.Assets.versioned("javascripts/results.js")),format.raw/*12.88*/("""'></script>
""")))};
Seq[Any](_display_(/*1.2*/main("Search results", false, scripts)/*1.40*/ {_display_(Seq[Any](format.raw/*1.42*/("""
    """),format.raw/*2.5*/("""<div id="skeleton" class="row">
    </div>
""")))}),format.raw/*4.2*/("""

"""),format.raw/*13.2*/("""
"""))
      }
    }
  }

  def render(): play.twirl.api.HtmlFormat.Appendable = apply()

  def f:(() => play.twirl.api.HtmlFormat.Appendable) = () => apply()

  def ref: this.type = this

}


}

/**/
object results extends results_Scope0.results
              /*
                  -- GENERATED --
                  DATE: Wed Aug 16 10:29:32 CEST 2017
                  SOURCE: /Volumes/LuisBookSD/ThesisRepo/Original/FaRBIE/FaRBIE/app/views/results.scala.html
                  HASH: 7a7a6e1f0a712419e9e9ec2028c6771afd5f9f27
                  MATRIX: 597->93|611->100|691->104|722->109|785->146|799->152|860->193|939->246|953->252|1020->299|1099->352|1113->358|1175->400|1255->453|1270->459|1336->504|1416->557|1431->563|1501->612|1578->662|1593->668|1657->711|1708->1|1754->39|1793->41|1824->46|1897->90|1926->724
                  LINES: 24->6|24->6|26->6|27->7|27->7|27->7|27->7|28->8|28->8|28->8|29->9|29->9|29->9|30->10|30->10|30->10|31->11|31->11|31->11|32->12|32->12|32->12|34->1|34->1|34->1|35->2|37->4|39->13
                  -- GENERATED --
              */
          