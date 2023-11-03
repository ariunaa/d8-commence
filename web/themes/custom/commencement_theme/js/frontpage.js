(function(Drupal, $) {

    "use strict";

    Drupal.behaviors.commencement = {
        attach: function(context, settings) {

            if ($('body.path-frontpage').length == 0)
                return;

            $(window).once('frontpage-image-resize').resize(Drupal.behaviors.commencement.resizeImages)
            Drupal.behaviors.commencement.resizeImages();
        },

        resizeImages: function(event) {

            var viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
            console.log(`width: ${viewportWidth}`);

            if (viewportWidth < 768) 
            {
                $('body.path-frontpage section .odd .frame').css("margin-right", "0px"); //.css("width", "auto");
                $('body.path-frontpage section .even .frame').css("margin-left", "0px"); //.css("width", "auto");
    
                return;
            }

            var $body = $('body').first();
            var $frame = $('section.odd .photo').first();

            var frameRect = $frame[0].getBoundingClientRect();
            var bodyRect = $body[0].getBoundingClientRect();
            var rightDelta = bodyRect.right - frameRect.right;
            var leftDelta = frameRect.left - bodyRect.left;
            //console.log(`LeftDelta: ${leftDelta}, rightDelta: ${rightDelta}`);
            //console.log(`frame: ${frameRect.left}, body: ${bodyRect.left}`);
            $('body.path-frontpage section .odd .frame').css("margin-right", -rightDelta + "px").css("width", "auto");
            $('body.path-frontpage section .even .frame').css("margin-left", -rightDelta + "px").css("width", "auto");
        }
    }

})(Drupal, jQuery);
