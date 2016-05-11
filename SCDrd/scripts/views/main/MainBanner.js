define(['app', 'marionette', 'templates', 'Swiper'],
    function (app, Marionette, templates, Swiper) {
        "use strict"
        return Marionette.LayoutView.extend({
            template: templates.main.mainHeader,

            tagName: 'section',

            className: 'slider-parallax swiper_wrapper clearfix',

            attributes: {
                id: 'slider'
            },

            ui: {
                swiperParent: '.swiper-parent'

            },

            events: {
            },

            initialize: function () {

            },

            onAttach: function () {
                this.swiperSlider = new Swiper('.swiper-parent', {
                    paginationClickable: false,
                    slidesPerView: 1,
                    grabCursor: false,
                    onSwiperCreated: function (swiper) {
                        $('[data-caption-animate]').each(function () {
                            var $toAnimateElement = $(this);
                            var toAnimateDelay = $(this).attr('data-caption-delay');
                            var toAnimateDelayTime = 0;
                            if (toAnimateDelay) { toAnimateDelayTime = Number(toAnimateDelay) + 750; } else { toAnimateDelayTime = 750; }
                            if (!$toAnimateElement.hasClass('animated')) {
                                $toAnimateElement.addClass('not-animated');
                                var elementAnimation = $toAnimateElement.attr('data-caption-animate');
                                setTimeout(function () {
                                    $toAnimateElement.removeClass('not-animated').addClass(elementAnimation + ' animated');
                                }, toAnimateDelayTime);
                            }
                        });
                    },
                    onSlideChangeStart: function (swiper) {
                        $('#slide-number-current').html(swiper.activeIndex + 1);
                        $('[data-caption-animate]').each(function () {
                            var $toAnimateElement = $(this);
                            var elementAnimation = $toAnimateElement.attr('data-caption-animate');
                            $toAnimateElement.removeClass('animated').removeClass(elementAnimation).addClass('not-animated');
                        });
                    },
                    onSlideChangeEnd: function (swiper) {
                        this.$('.swiper-slide').each(function () {
                            if ($(this).find('video').length > 0) { $(this).find('video').get(0).pause(); }
                        });
                       this.$('.swiper-slide:not(".swiper-slide-active")').each(function () {
                            if ($(this).find('video').length > 0) {
                                if ($(this).find('video').get(0).currentTime != 0) $(this).find('video').get(0).currentTime = 0;
                            }
                        });
                       if (this.$('.swiper-slide.swiper-slide-active').find('video').length > 0) { this.$('.swiper-slide.swiper-slide-active').find('video').get(0).play(); }

                       this.$('.swiper-slide.swiper-slide-active [data-caption-animate]').each(function () {
                            var $toAnimateElement = $(this);
                            var toAnimateDelay = $(this).attr('data-caption-delay');
                            var toAnimateDelayTime = 0;
                            if (toAnimateDelay) { toAnimateDelayTime = Number(toAnimateDelay) + 300; } else { toAnimateDelayTime = 300; }
                            if (!$toAnimateElement.hasClass('animated')) {
                                $toAnimateElement.addClass('not-animated');
                                var elementAnimation = $toAnimateElement.attr('data-caption-animate');
                                setTimeout(function () {
                                    $toAnimateElement.removeClass('not-animated').addClass(elementAnimation + ' animated');
                                }, toAnimateDelayTime);
                            }
                        });
                    }
                });

                $('#slider-arrow-left').on('click', function (e) {
                    e.preventDefault();
                    this.swiperSlider.swipePrev();
                });

                $('#slider-arrow-right').on('click', function (e) {
                    e.preventDefault();
                    this.swiperSlider.swipeNext();
                });

                $('#slide-number-current').html(this.swiperSlider.activeIndex + 1);
                $('#slide-number-total').html(this.swiperSlider.slides.length);
            }
        });
    });