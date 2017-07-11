import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Content, IonicApp } from 'ionic-angular';

@Directive({
	selector: '[profile-scroll]',
	//   directives: '[MyCustomDirective]',
	host: {
		'(ionScroll)'     : 'onContentScroll($event)',
		'(window:resize)' : 'onWindowResize($event)'
	},

})

export class ProfileScroll implements OnInit {

	header: any;
	profilePicture: any;
	imageBackground: any;
	headerHeight: any;
	translateAmt: any;
	scaleAmt: any;
	content: any;
	fixContent: any;
	mainContent: any;

	stretchyToolbar: any;
	stretchyHeaderTitle: any;
	stretchyHeaderContent: any;

	blurFilter: any;
	userName: any;
	userNameOffset: any;
	statusBarHeight: number;
	backButton: any;
	toolbar: any;
	isIphone: boolean;

	constructor(
		public element  : ElementRef,
		public renderer : Renderer2,
		public platform : Platform,
		public ct       : Content,
		public app      : IonicApp
	) {
		this.isIphone = this.platform.is('iphone') || this.platform.is('ios');
		if (this.isIphone) {
			this.statusBarHeight = 20;
		} else {
			this.statusBarHeight = 10;
		}

	}

	ngOnInit() {
		console.log('Load profile-scroll');

		this.content = this.element.nativeElement.getElementsByClassName('scroll-content')[0];
		this.fixContent = this.element.nativeElement.getElementsByClassName('fixed-content')[0];

		this.mainContent = this.content.getElementsByClassName('main-content')[0];
		this.header = document.getElementsByClassName("stretchy-header")[0];
		this.headerHeight = this.header.clientHeight;

		this.blurFilter = document.getElementsByClassName("blur-filter")[0] || '';

		this.profilePicture = this.content.getElementsByClassName('picture')[0] || '';

		this.backButton = document.getElementsByClassName('back')[0];

		this.toolbar = this.header.parentElement.getElementsByClassName('toolbar')[0];

		this.stretchyToolbar = document.getElementsByClassName("toolbar")[0];
		this.stretchyHeaderTitle = document.getElementsByClassName("stretchy_header_title")[0];
		this.stretchyHeaderContent = document.getElementsByClassName("stretchy-header-content")[0];

		if (this.isIphone) {
			this.renderer.setStyle(this.backButton, 'top', 'calc( calc( 66px - 40px)) ');
			//this.content.classList.add("has_stretch_header_ios");
			//this.fix_content.classList.add("has_stretch_header_ios");
			if (!this.toolbar) {
				this.renderer.setStyle(this.mainContent, 'margin-top', '-64px ');
			}

			// this.toolbar.classList.add("statusbar-padding");
		} else {
			this.renderer.setStyle(this.backButton, 'top', 'calc( calc( 46px - 40px )) ');
			//this.content.classList.add("has_stretch_header_md");
			//this.fix_content.classList.add("has_stretch_header_md");
			if (!this.toolbar) {
				this.renderer.setStyle(this.mainContent, 'margin-top', '-56px ');
			}
		}

		this.renderer.setStyle(this.content, 'paddingTop', 'calc( ' + this.headerHeight + 'px) ');

		if (this.toolbar) {
			this.toolbar.classList.add("animated");

			if (this.isIphone) {
				//this.content.classList.add("has_stretch_header_ios");
				//this.fix_content.classList.add("has_stretch_header_ios");
			} else {
				//this.content.classList.add("has_stretch_header_md");
				//this.fix_content.classList.add("has_stretch_header_md");
			}
		}

		this.renderer.setStyle(this.content, 'marginTop', '44px');
		this.renderer.setStyle(this.fixContent, 'marginTop', '44px');

		//this.renderer.setStyle(this.content, 'z-index', '9999999');

		this.renderer.setStyle(this.mainContent, 'position', 'relative');
		//this.renderer.setStyle(this.mainContent, 'z-index', '9999999');
		// this.renderer.setStyle(this.mainContent, 'top', '-10px');
		//this.onTop();
		this.renderer.setStyle(this.blurFilter, 'visibility', 'hidden');
	}

	getOffset(el) {
		var _x = 0;
		var _y = 0;
		while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
			_x += el.offsetLeft - el.scrollLeft;
			_y += el.offsetTop - el.scrollTop;
			el = el.offsetParent;
		}
		return { top: _y, left: _x };
	}

	onWindowResize(ev) {
		this.headerHeight = this.header.clientHeight;
	}

	onContentScroll(ev) {
		ev.domWrite(() => {
			this.updateStretchyHeader(ev);
		});
	}

	onScroll() {
		//Title Center
		this.renderer.setStyle(this.stretchyHeaderTitle, 'visibility', 'visible');
		this.stretchyHeaderTitle.getElementsByClassName('title')[0].classList.remove("onBottom");

		//Big Title
		this.renderer.setStyle(this.stretchyHeaderContent, 'visibility', 'hidden');
		this.stretchyHeaderContent.classList.add("onFadeout");

		//Toolbar
		this.renderer.setStyle(this.toolbar, 'visibility', 'hidden');
		this.toolbar.classList.add("onFadeout");
	}

	onTop() {

		//Title Center
		this.renderer.setStyle(this.stretchyHeaderTitle, 'visibility', 'hidden');
		this.stretchyHeaderTitle.getElementsByClassName('title')[0].classList.add("onBottom");

		//Big Title
		this.renderer.setStyle(this.stretchyHeaderContent, 'visibility', 'visible');
		this.stretchyHeaderContent.classList.remove("onFadeout");

		//Toolbar
		this.renderer.setStyle(this.toolbar, 'visibility', 'visible');
		this.toolbar.classList.remove("onFadeout");
	}

	updateStretchyHeader(ev) {
		if (ev.scrollTop >= 0) {
			this.onTop();
			this.translateAmt = Math.round(ev.scrollTop);
			this.scaleAmt = (1 - (ev.scrollTop / 100));
			this.renderer.setStyle(this.blurFilter, 'visibility', 'hidden');

			if (ev.scrollTop == 0) {
				this.renderer.setStyle(this.header, 'height', this.headerHeight + 'px');

				if (this.profilePicture) {
					this.renderer.setStyle(this.profilePicture, 'webkitTransform', 'translate3d(0,0,0) scale(1,1)');
					this.renderer.setStyle(this.profilePicture, 'transformOrigin', 'bottom');
				}

				this.renderer.setStyle(this.mainContent, 'z-index', '9999');
				this.renderer.setStyle(this.header, 'z-index', '10');

			} else {
				// Header gets to minimum size
				if ((this.headerHeight - this.translateAmt) <= 46 + this.statusBarHeight) {
					this.onScroll();
					this.renderer.setStyle(this.content, 'z-index', ' 1');
					this.renderer.setStyle(this.header, 'height', 46 + this.statusBarHeight + 'px');
					this.renderer.setStyle(this.header, 'z-index', '99999');
					this.renderer.setStyle(this.blurFilter, 'visibility', 'visible');
					this.renderer.setStyle(this.blurFilter, 'opacity', '1');
				} else {
					console.log(2);
					this.onTop();
					this.renderer.setStyle(this.header, 'height', 'calc( ' + this.headerHeight + 'px - ' + this.translateAmt + 'px )');
					//this.renderer.setStyle(this.content, 'z-index', ' 9999999');
					if ((this.headerHeight - this.translateAmt) <= 100) {
						this.scaleAmt = (1 - ((ev.scrollTop - (this.headerHeight - 100)) / 100)).toFixed(2);

						if (this.profilePicture) {
							this.renderer.setStyle(this.profilePicture, 'webkitTransform', 'translate3d(0,0,0) scale(' + this.scaleAmt + ',' + this.scaleAmt + ')');
							this.renderer.setStyle(this.profilePicture, 'transformOrigin', 'bottom');
						}

						this.renderer.setStyle(this.mainContent, 'z-index', '9999');
						this.renderer.setStyle(this.header, 'z-index', '10');
					}
					if ((this.headerHeight - this.translateAmt) <= 200) {
						this.renderer.setStyle(this.toolbar, 'visibility', 'hidden');
						this.toolbar.classList.add("onFadeout");
					}
				}
			}
		} else {
			// For iphone specifically, when bouncing
			this.onScroll();

			this.translateAmt = Math.round(ev.scrollTop);
			this.scaleAmt = -ev.scrollTop / this.headerHeight + 1;
			//this.renderer.setStyle(this.content, 'z-index', ' 9999999');
			this.renderer.setStyle(this.header, 'z-index', '1');
			this.renderer.setStyle(this.header, 'height', 'calc( ' + this.headerHeight + 'px - ' + this.translateAmt + 'px )');
			console.log('calc( ' + this.headerHeight + 'px - ' + this.translateAmt + 'px )');

			// Animate opacity of the blur backdrop filter
			this.scaleAmt = ((0 - (ev.scrollTop / 100)) * 1.4).toFixed(2);
			this.renderer.setStyle(this.blurFilter, 'visibility', 'hidden');
			if (this.scaleAmt <= 1) {
				this.renderer.setStyle(this.blurFilter, 'opacity', this.scaleAmt);
			} else {
				this.renderer.setStyle(this.blurFilter, 'opacity', '1');
			}
		}
	}
}

