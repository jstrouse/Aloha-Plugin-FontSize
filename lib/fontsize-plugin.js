define(
[ 'aloha',
	'aloha/jquery',
	'aloha/plugin',
	'aloha/floatingmenu',
	'i18n!fontsize/nls/i18n',
	'i18n!aloha/nls/i18n',
        'css!fontsize/css/fontsize.css'],
function (Aloha, jQuery, Plugin, FloatingMenu,i18n, i18nCore){
    "use strict";
 
    return Plugin.create( 'fontsize', {
      languages: ['en'],
      init: function() {
        if (!Aloha.settings.plugins.fontsize) {
          Aloha.settings.plugins.fontsize = {}
        }
        var that = this,
            buttons = [],
            names = ['increase', 'decrease'],
            tooltips = ['Increase Font Size', 'Decrease Font Size'];
        
        jQuery.each(names, function(index, value){
          buttons.push(new Aloha.ui.Button({
            "name": value,
            "iconClass" : "GENTICS_button_" + value,
            "size" : "small",
            'tooltip': tooltips[index],
            "onclick": function () {
              if (Aloha.activeEditable) {
  		Aloha.activeEditable.obj[0].focus()
  	      }

  	      var newSize,
  	      markup = jQuery('<span class="cfs"></span>'),
              rangeObject = Aloha.Selection.rangeObject,
  	      foundMarkup = rangeObject.findMarkup(function() {
                var retval;
                try {
                  retval = this.nodeName.toLowerCase() == markup.get(0).nodeName.toLowerCase() && this.className.toLowerCase() == markup.get(0).className.toLowerCase();
                }
                catch(err) {
                  retval = false;
                }
                return retval;
  	      }, Aloha.activeEditable.obj);

  	      if (foundMarkup) {  			  
  		newSize = (parseInt(jQuery(foundMarkup).css('font-size')) + (index === 0?1:-1)) + 'px';
  		jQuery(foundMarkup).css('font-size', newSize);  				
  		} else {
  		GENTICS.Utils.Dom.addMarkup(rangeObject, markup)
  	      }

  	      rangeObject.select();
  	      return false
            }
          }));
        });
  
        for (var i=0; i < names.length; i++) {
          FloatingMenu.addButton(
            "Aloha.continuoustext", 
            buttons[i], 
            i18nCore.t("floatingmenu.tab.format"), 
            1
          );
        }
      }
    });
});
