(function(Drupal, $) {

    "use strict";

    Drupal.behaviors.back_to_top = {
        attach: function(context, settings) {

            var $backToTop = $('#back-to-top');
            if ($backToTop.length == 0)
                return;

            $(document).once('back-to-top').scroll(() => {
                var offset = $(document).scrollTop();

                if (offset > 1000)
                {
                    $backToTop.removeClass('hidden');
                }
                else
                {
                    $backToTop.addClass('hidden');
                }
            });
            
            $backToTop.click(function() { 
                $(window).scrollTop(0);      
            });
        },
    }
})(Drupal, jQuery);