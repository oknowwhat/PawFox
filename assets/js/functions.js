var disqus_shortname=theme_config.disqus_shortname;!function(){var e=document.createElement("script");e.async=!0,e.type="text/javascript",e.src="//"+disqus_shortname+".disqus.com/count.js",document.getElementsByTagName("BODY")[0].appendChild(e)}();

(function($){
	/* All Images Loaded */
	$(window).load(function(){

	});
	/* Dom Loaded */
	$(document).ready(function($){

        AOS.init({
            offset: 220,
            duration: 700,
            disable: window.innerWidth < 1024,
            easing: 'ease',
            once: true
        });
        
		$(".lazy, img[data-src], iframe[data-src]").Lazy({
            defaultImage: "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",
            placeholder: "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",
            threshold: 0,
            enableThrottle: true,
            throttle: 50,
			afterLoad: function(element){
				element.addClass('loaded');
			}
        });

        if( theme_config.masonry == 'on' ){
            $('div.articles').masonry({
                // options
                itemSelector: 'article',
                // columnWidth: 200
            });
        }     
        
        if( theme_config.sticky_sidebar == 'on' ){
            $('#sidebar').theiaStickySidebar({
                additionalMarginTop: 30,
                additionalMarginBottom: 30
            });
            // $('#sidebar').stickySidebar({
			// 	topSpacing: 80,
			// 	bottomSpacing: 0
			// });
        } 

        // Account page
                          
        if( $(".plan-price").length > 0 ){
            $(".plan-price").each(function(){
                var planAmount = $(this).data('value') / 100;
                $(this).html(planAmount);
            })
        }

        // Custom Select and filters
        
        $('select').niceSelect();

        // Single Post copy button
        
        $(".permalink .copy").on('click', function(){
            $("#copy-link").select();
            document.execCommand('copy');
        });
        
        /* Gallery Ghost v2.1 */

        var images = document.querySelectorAll('.kg-gallery-image img');
        images.forEach(function (image) {
            var container = image.closest('.kg-gallery-image');
            var width = image.attributes.width.value;
            var height = image.attributes.height.value;
            var ratio = width / height;
            container.style.flex = ratio + ' 1 0%';
        })

        $('.kg-gallery-card').each(function(){
			$(this).find('img').wrap(function() {
				return '<a href="'+$(this).attr('src')+'" class="hover-effect" rel="gallery"></a>';
			});
			$(this).magnificPopup({
				type: 'image',
				gallery:{
					enabled: true,
					arrowMarkup: '<i class="mfp-arrow mfp-arrow-%dir% fa fa-chevron-%dir%"></i>'
				},
				delegate: 'a',
				mainClass: 'my-mfp-zoom-in',
				removalDelay: 300,
				closeMarkup: '<i title="%title%" class="mfp-close fa fa-times"></i>'
			});
		});

		/* Global */

		if($(document).width() > 1200){
			// $('#header div.menu-wrapper').sticky();
			//$('div.share').sticky({ topSpacing: 300 });
		}
		if($(document).width() > 767){
			$('div.share-container').stickySidebar({
				topSpacing: 80,
				bottomSpacing: 0
			});
		}

		$('#header div.menu-mobile').click(function(){
			$('#header').toggleClass('menu-open');
		});

        var form_lang = $('#form-lang');
		$("form .search-field").ghostHunter({
            // subpath: '/breek',
            onPageLoad: false,
            results   : "#search-results",
            info_template   : "<h2 class='title medium no-margin white'>{{amount}} "+form_lang.data('results-title')+"</h2>",
            result_template : '<div id="gh-{{ref}}" class="gh-search-item box grid-50 tablet-grid-50"><article class="item"><h4 class="title small gradient-effect"><a href="{{link}}">{{title}}</a></h4><p><div class="meta"><time><svg><use xlink:href="#calendar"></use></svg> {{pubDate}}</time></div></p></article></div>',
            before : function(){

            },
			onComplete: function(){
				$('#search-results .box').each(function(index) {
					if(index%2){
					   $(this).after('<div class="clear"></div>');
					}
				});
				// $.magnificPopup.open({
				// 	items: {
				// 		src: '#search-results'
				// 	},
				// 	type: 'inline',
				// 	mainClass: 'my-mfp-zoom-in',
				// 	removalDelay: 300,
                //     closeMarkup: '<i title="%title%" class="mfp-close fa fa-times"></i>',
                //     callbacks: {
                //         afterClose: function(){
                //             // $('#search-results').html('');
                //         }
                //     }
				// });
			}
		});

		var email_placeholder = $('#email-placeholder').data('text');
		$('input[name=email]').attr('placeholder', email_placeholder);

		$('#back-to-top').click(function(event) {
			event.preventDefault();
			$('html, body').animate({scrollTop: 0}, 500);
			return false;
		});

		$('.tooltip').tooltipster({ theme: 'tooltipster-small', contentAsHTML: true, animation: 'grow' });


		/* Global Lightbox */

		$('.lightbox').magnificPopup({
			mainClass: 'my-mfp-zoom-in',
			removalDelay: 300,
			closeMarkup: '<i title="%title%" class="mfp-close fa fa-times"></i>',
			fixedContentPos: true
		});

	});

})(jQuery);
