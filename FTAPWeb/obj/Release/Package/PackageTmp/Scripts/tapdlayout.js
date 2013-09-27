$(document).ready(function () {

    $('.fancybox').fancybox();

    $("#dashboard_outr_icon").click(function () {

        $("#dashboard_outr").slideToggle("slow", function () {

        });
    });


    $("#slider4").responsiveSlides({
        auto: false,
        pager: false,
        nav: true,
        speed: 500,
        namespace: "callbacks",
        before: function () {
            $('.events').append("<li>before event fired.</li>");
        },
        after: function () {
            $('.events').append("<li>after event fired.</li>");
        }
    });

    (function ($) {
        // constants
        var SHOW_CLASS = 'show',
            HIDE_CLASS = 'hide',
            ACTIVE_CLASS = 'active';


        $('.tabs').on('click', 'li a', function (e) {
            e.preventDefault();
            var $tab = $(this),
                 href = $tab.attr('href');

            $('.active').removeClass(ACTIVE_CLASS);
            $tab.addClass(ACTIVE_CLASS);

            $('.show')
               .removeClass(SHOW_CLASS)
               .addClass(HIDE_CLASS)
               .hide();
            $(href)
			.removeClass(HIDE_CLASS)
			.addClass(SHOW_CLASS)
			.hide()
			.fadeIn(550);
        });

    })(jQuery);

    (function ($) {
        // constants

        var SHOW_CLASS1 = 'show2',
             HIDE_CLASS1 = 'hide2',
             ACTIVE_CLASS1 = 'active2';

        $('.tabs1').on('click', 'li a', function (e) {
            e.preventDefault();
            var $tab = $(this),
                 href = $tab.attr('href');

            $('.active2').removeClass(ACTIVE_CLASS1);
            $tab.addClass(ACTIVE_CLASS1);

            $('.show2')
               .removeClass(SHOW_CLASS1)
               .addClass(HIDE_CLASS1)
               .hide();
            $(href)
              .removeClass(HIDE_CLASS1)
              .addClass(SHOW_CLASS1)
              .hide()
              .fadeIn(550);
        });

    })(jQuery);
});