(function ($, Drupal) {

    "use strict";

    Drupal.behaviors.vertical_slider = {
        
        currentSlideIndex: 0,
        slideCount: 4,
        lastScrollTop: 0,
        transitionDisabled: false,
        initialized: false,

        attach: function (context, settings) {
            
            if ($('#frontpage-vertical-slider').length == 0)
            {
                //console.log('Skipping vertical slide init, we are not on frontpage?');
                return;
            }

            if (!this.initialized) {
                this.init();
                this.initialized = true;
            }
        },

        init: function() {
            this.slideCount = $('#frontpage-vertical-slider .slide').length;

            if (this.slideCount == 1)
                $('#slide-indicator').addClass('hidden');

            var self = this;
            $(document).keyup((event) => {
                if (event.which == 38)
                    self.prevSlide();

                if (event.which == 40)
                    self.nextSlide();

                event.preventDefault();
            });

            window.addEventListener('wheel', function(event)
            {
                if (event.deltaY < 0)
                {
                    //console.log('scrolling up');
                    self.prevSlide();
                }
                else if (event.deltaY > 0)
                {
                    //console.log('scrolling down');
                    self.nextSlide();
                }
            });

            $('#frontpage-vertical-slider').on('swipeup', () => { 
                //console.log('swipeup'); 
                self.nextSlide();
            }).on('swipedown', () => {
                //console.log('swipedown');
                self.prevSlide();
            });
            
            $('.slide-indicator').click(function(event) {
                var index = event.target.id.replace('slide-indicator-', '');
                //console.log(`Indicator clicked: ${index}`);
                self.setActiveSlide(index);
            });

            $('#frontpage-vertical-slider span.next-slide').click(function(event) {
                self.nextSlide();
            });
            
            //console.log("vertical slider initialized...");
        },

        nextSlide: function() {
            if (this.transitionDisabled)
                return;

            this.currentSlideIndex = Math.min(this.currentSlideIndex + 1, this.slideCount - 1)
            this.setActiveSlide(this.currentSlideIndex);
        },

        prevSlide: function() {
            if (this.transitionDisabled)
                return;
            
            this.currentSlideIndex = Math.max(this.currentSlideIndex - 1, 0);
            this.setActiveSlide(this.currentSlideIndex);
        },

        setIndicator: function(index) {
            $('.slide-indicator').removeClass('active');
            $('#slide-indicator-' + index).addClass('active');
        },

        setActiveSlide: function(index) {
            if (this.transitionDisabled)
                return;

            //console.log(`setActiveSlide(${index})`);
            if (index < 0 || index > this.slideCount - 1)
                return;

            this.currentSlideIndex = index;
            this.transitionDisabled = true;

            $.each($('.slide'), (i, item) => {
                if (i >= index)
                {
                    //console.log(`Slide ${i} in`);
                    $(item).removeClass('out');
                }
                else
                {
                    //console.log(`Slide ${i} out`);
                    $(item).addClass('out');
                }
            });

            this.setIndicator(index);            
            window.setTimeout(() => this.transitionDisabled = false, 700);
        }
    }
})(jQuery, Drupal);