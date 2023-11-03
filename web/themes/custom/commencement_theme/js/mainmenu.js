(function(Drupal, $) {

    "use strict";

    Drupal.behaviors.commencement_main_menu = {
        attach: function(context, settings) {

            $('#navbar-collapse').on('hide.bs.collapse', () => {
                $('#menu-status').removeClass("menu-shown");
                $('div.main-container').css('display', 'block');
                $('footer.footer').css('display', 'block');
            });

            $('#navbar-collapse').on('show.bs.collapse', () => {
                $('#menu-status').addClass("menu-shown");
                $('div.main-container').css('display', 'none');
                $('footer.footer').css('display', 'none');
            });

            $('#block-searchform-2').on('hide.bs.collapse', () => {
                $('#menu-status').removeClass("search-shown");
            });

            $('#block-searchform-2').on('show.bs.collapse', () => {
                $('#menu-status').addClass("search-shown");
            });

            $('span.enter-as-click').on('keydown', function(e) { 
                if (e.which == 13) { 
                    $(this).click(); 
                }
            });            
        },
    }
})(Drupal, jQuery);