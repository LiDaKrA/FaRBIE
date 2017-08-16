
package views.html

import play.twirl.api._
import play.twirl.api.TemplateMagic._


     object index_Scope0 {
import models._
import controllers._
import play.api.i18n._
import views.html._
import play.api.templates.PlayMagic._
import play.api.mvc._
import play.api.data._

class index extends BaseScalaTemplate[play.twirl.api.HtmlFormat.Appendable,Format[play.twirl.api.HtmlFormat.Appendable]](play.twirl.api.HtmlFormat) with play.twirl.api.Template0[play.twirl.api.HtmlFormat.Appendable] {

  /**/
  def apply():play.twirl.api.HtmlFormat.Appendable = {
    _display_ {
      {

def /*6.2*/scripts/*6.9*/:play.twirl.api.HtmlFormat.Appendable = {_display_(

Seq[Any](format.raw/*6.13*/("""
    """),format.raw/*7.5*/("""<script type='text/javascript' src='"""),_display_(/*7.42*/routes/*7.48*/.Assets.versioned("javascripts/translation.js")),format.raw/*7.95*/("""'></script>
    <script type='text/javascript' src='"""),_display_(/*8.42*/routes/*8.48*/.Assets.versioned("javascripts/search.js")),format.raw/*8.90*/("""'></script>
""")))};
Seq[Any](_display_(/*1.2*/main("FaRBIE", true, scripts)/*1.31*/ {_display_(Seq[Any](format.raw/*1.33*/("""
    """),format.raw/*2.5*/("""<div class="col-md-12" id="containersearch">
    </div>
""")))}),format.raw/*4.2*/("""

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
object index extends index_Scope0.index
              /*
                  -- GENERATED --
                  DATE: Wed Aug 16 10:54:09 CEST 2017
                  SOURCE: /Volumes/LuisBookSD/ThesisRepo/Original/FaRBIE/FaRBIE/app/views/index.scala.html
                  HASH: ece4538421f327f04d7e1bcd2616721c81e76eeb
                  MATRIX: 593->97|607->104|687->108|718->113|781->150|795->156|862->203|941->256|955->262|1017->304|1068->1|1105->30|1144->32|1175->37|1261->94
                  LINES: 24->6|24->6|26->6|27->7|27->7|27->7|27->7|28->8|28->8|28->8|30->1|30->1|30->1|31->2|33->4
                  -- GENERATED --
              */
          