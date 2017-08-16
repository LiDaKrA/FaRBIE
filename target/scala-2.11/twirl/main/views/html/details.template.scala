
package views.html

import play.twirl.api._
import play.twirl.api.TemplateMagic._


     object details_Scope0 {
import models._
import controllers._
import play.api.i18n._
import views.html._
import play.api.templates.PlayMagic._
import play.api.mvc._
import play.api.data._

class details extends BaseScalaTemplate[play.twirl.api.HtmlFormat.Appendable,Format[play.twirl.api.HtmlFormat.Appendable]](play.twirl.api.HtmlFormat) with play.twirl.api.Template3[String,String,String,play.twirl.api.HtmlFormat.Appendable] {

  /**/
  def apply/*1.2*/(uid: String,eUri: String,entityType: String ):play.twirl.api.HtmlFormat.Appendable = {
    _display_ {
      {

def /*12.2*/scripts/*12.9*/:play.twirl.api.HtmlFormat.Appendable = {_display_(

Seq[Any](format.raw/*12.13*/("""
"""),format.raw/*13.1*/("""<script type='text/javascript' src='"""),_display_(/*13.38*/routes/*13.44*/.Assets.versioned("javascripts/translation.js")),format.raw/*13.91*/("""'></script>
<script type='text/javascript' src='"""),_display_(/*14.38*/routes/*14.44*/.Assets.versioned("javascripts/search.js")),format.raw/*14.86*/("""'></script>
<!--<script type='text/javascript' src='"""),_display_(/*15.42*/routes/*15.48*/.Assets.versioned("javascripts/utilities.js")),format.raw/*15.93*/("""'></script>-->
<!--<script type='text/javascript' src='"""),_display_(/*16.42*/routes/*16.48*/.Assets.versioned("javascripts/results_table.js")),format.raw/*16.97*/("""'></script>-->
<!--<script type='text/javascript' src='"""),_display_(/*17.42*/routes/*17.48*/.Assets.versioned("javascripts/results.js")),format.raw/*17.91*/("""'></script>-->
<script type='text/javascript' src='"""),_display_(/*18.38*/routes/*18.44*/.Assets.versioned("javascripts/details.js")),format.raw/*18.87*/("""'></script>
""")))};
Seq[Any](format.raw/*1.48*/("""
"""),_display_(/*2.2*/main("Details Page", false, scripts)/*2.38*/ {_display_(Seq[Any](format.raw/*2.40*/("""
    """),format.raw/*3.5*/("""<script>
        var uid = """"),_display_(/*4.21*/uid),format.raw/*4.24*/("""";
        var eUri = """"),_display_(/*5.22*/eUri),format.raw/*5.26*/("""";
        var eType = """"),_display_(/*6.23*/entityType),format.raw/*6.33*/("""";
    </script>
<div id="skeleton" class="row">
</div>
""")))}),format.raw/*10.2*/("""

"""))
      }
    }
  }

  def render(uid:String,eUri:String,entityType:String): play.twirl.api.HtmlFormat.Appendable = apply(uid,eUri,entityType)

  def f:((String,String,String) => play.twirl.api.HtmlFormat.Appendable) = (uid,eUri,entityType) => apply(uid,eUri,entityType)

  def ref: this.type = this

}


}

/**/
object details extends details_Scope0.details
              /*
                  -- GENERATED --
                  DATE: Wed Aug 16 10:29:31 CEST 2017
                  SOURCE: /Volumes/LuisBookSD/ThesisRepo/Original/FaRBIE/FaRBIE/app/views/details.scala.html
                  HASH: 02c355bbfbf977972e7ed64214fe45f5b19aa4e9
                  MATRIX: 545->1|670->247|685->254|766->258|794->259|858->296|873->302|941->349|1017->398|1032->404|1095->446|1175->499|1190->505|1256->550|1339->606|1354->612|1424->661|1507->717|1522->723|1586->766|1665->818|1680->824|1744->867|1796->47|1823->49|1867->85|1906->87|1937->92|1992->121|2015->124|2065->148|2089->152|2140->177|2170->187|2257->244
                  LINES: 20->1|24->12|24->12|26->12|27->13|27->13|27->13|27->13|28->14|28->14|28->14|29->15|29->15|29->15|30->16|30->16|30->16|31->17|31->17|31->17|32->18|32->18|32->18|34->1|35->2|35->2|35->2|36->3|37->4|37->4|38->5|38->5|39->6|39->6|43->10
                  -- GENERATED --
              */
          