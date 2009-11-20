/* version 2ed */
jetpack.future.import("storage.simple");
jetpack.future.import("slideBar");
var storage = jetpack.storage.simple;
storage.url = [];
storage.title = [];
storage.show = [];
function add_bookmark(storage){
   storage.url.push(jetpack.tabs.focused.url);
   storage.show.push("true");
   jetpack.tabs.focused.contentDocument.title.length>20?storage.title.push(jetpack.tabs.focused.contentDocument.title.substr(0,20)+"..."):storage.title.push(jetpack.tabs.focused.contentDocument.title);;
   jetpack.notifications.show("add '"+jetpack.tabs.focused.contentDocument.title+"' page!");
   reflesh(slider);
}
jetpack.statusBar.append({
   html: "add!",
   onReady: function(widget){
      $(widget).click(function()
        {add_bookmark(storage);});
   }
});
function reflesh(slider){
   $("ol",slider.contentDocument.body).text("");
   for (var i=0;i<storage.url.length;i++){
      var tab_contain = $("<div />", slider.contentDocument.body).attr("id",i).addClass("b1");
      var img_c = $("<img />", slider.contentDocument.body);
      img_c.attr("src","http://moon.cse.yzu.edu.tw/~s951440/close.png").attr("align","MIDDLE").click(function(i){
         storage.show[$(this).parent().attr("id")] = "false";
         $(this).parent().fadeOut(500);
      });
      var p = $("<span />", slider.contentDocument.body);
      p.addClass("dtab").text(storage.title[i]).attr("id",i).click(function(){
         jetpack.tabs.open(storage.url[$(this).attr("id")]);
         jetpack.tabs[jetpack.tabs.length-1].focus();
      });
      tab_contain.append(img_c).append(p);
      tab_contain.mouseover(function(){$(this).css("background-color","#ADD8E6");}).mouseout(function(){$(this).css("background-color","rgb(214,221,229)");});
      if (storage.show[i]=="true")
          $("ol", slider.contentDocument.body).append(tab_contain);
}}
jetpack.slideBar.append({ 
	width: 180,
	persist: true,
	html:<html><style><![CDATA[BODY {background-color:rgb(214,221,229);font-size:11px;margin-left:-15%;}.dtab{cursor: pointer;background-color:#ADD8E6;height:30px;}.b1{cursor: pointer;}]]></style><body><ol class="test"></ol></body></html>,
    onReady: function (){},
	onClick: function (slider) {
       reflesh(slider);
    }    
});