(function($) {
  'use strict'
  var transition = {
    init: function( config ) {
      this.config = config;
      this.pages = this.config.pages;
      this.noPages = this.pages.length;
      this.startPage = $( this.pages[0] );
      this.transitionIn = this.config.transitionIn;
      this.transitionOut = this.config.transitionOut;
      this.controls = this.config.controls;
      this.startPage.addClass(' current');
      this.current = 0;
      this.next = 1;
      this.running = false;
      this.bind();
    },

    transition: function( dir ) {
      var current = this.pages.eq( this.current )
        , next = this.pages.eq( this.next )
        , inclass = dir === 'next' ? this.transitionIn.forward : this.transitionIn.backward 
        , outclass = dir === 'next' ? this.transitionOut.forward : this.transitionOut.backward; 

      this.current = this.next;

      function endAnimation() {
        this.running = false;
        next.addClass(' current')
      }

      this.running = true;

      this.pages
        .removeClass( 'current trans-in-left trans-in-right trans-out-right trans-out-left' )

      current.addClass( outclass );
      next.addClass( inclass );
      current.one(
        'webkitAnimationEnd oanimationend msAnimationEnd animationend',
        endAnimation.bind( this )
      )
    }, 

    getDir: function( e ) {
      var dir = e.target.getAttribute('data-dir');
      this.next = this.current;
      this.next += ~~( dir === 'next' ) || -1;
      this.next = this.next < 0 ? 0 : this.next % this.noPages;
      this.transition( dir );
    },

    bind: function() {
      this.controls.on('click', this.getDir.bind(this))
    }
  }

  transition.init({
    pages: $('.pt')
    , controls: $('.control')
    , transitionIn: {
        forward: 'trans-in-left',
        backward: 'trans-in-right'
      }
    , transitionOut: {
        forward: 'trans-out-left',
        backward: 'trans-out-right'
      }
  })
})(jQuery);
