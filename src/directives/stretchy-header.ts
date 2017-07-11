import { Component, ElementRef, Input, Renderer, ViewEncapsulation } from '@angular/core';
import { Platform } from 'ionic-angular';

import 'rxjs/add/operator/map';

@Component({
    selector: 'stretchy-header',
    encapsulation: ViewEncapsulation.Emulated,
    templateUrl: 'stretchy-header.html',
})

export class StretchyHeader {

    @Input() headerHeight: any;
    @Input() backgroundHeader: any;
    @Input() title: any;
    @Input() showBackButton: any;
    @Input() hasNavbar: any;

    @Input() bigTitle: any;
    @Input() subTitle: any;
    @Input() lineColor: any;

    headerElement: any;
    public header: any;
    public photo: string;
    // public nav: any;
    public htmlToAdd;
    public bigTitlehtmlToAdd;
    public showBackButtonValue;
    items: any;

    constructor(
        public element    : ElementRef,
        public renderer   : Renderer,
        public plt        : Platform) { }

    ngOnChanges(changes: any): void {
        this.header = this.element.nativeElement.getElementsByClassName('stretchy-header')[0];

        const backgroundHeader = changes.backgroundHeader.currentValue;
        if (backgroundHeader != '') {
            this.renderer.setElementStyle(this.header, 'backgroundImage', 'url(' + backgroundHeader + ')');
        }

        this.showBackButtonValue = changes.showBackButton.currentValue
    }

    ngOnInit() {
        console.log('Load stretchy header');
        this.header = this.element.nativeElement.getElementsByClassName('stretchy-header')[0];
        // console.log( this.header.getElementsByClassName('toolbar')[0] );
        let newH = this.headerHeight;
        if (this.hasNavbar == "true") {
            if (this.plt.is('iphone') || this.plt.is('ios')) {
                newH = parseInt(this.headerHeight) + 64;
            } else {
                newH = parseInt(this.headerHeight) + 56;
            }
        } else if (this.showBackButton == 'true' && this.hasNavbar == "false") {
            if (this.plt.is('iphone') || this.plt.is('ios')) {
                newH = parseInt(this.headerHeight) + 64;
            } else {
                newH = parseInt(this.headerHeight) + 56;
            }
        }

        this.renderer.setElementStyle(this.header, 'height', newH + 'px');
        this.renderer.setElementStyle(this.header, 'z-index', '2');

        this.htmlToAdd = `<h5 class="title animated onBottom" no-padding no-margin >${this.title}</h5>`;

        this.bigTitlehtmlToAdd = `<h4>${this.subTitle}</h4>
                                  <h2>${this.bigTitle}</h2>
                                  <div class="line" style="background:#${this.lineColor}"></div>`;

        if (this.showBackButton == "false") {
            this.renderer.setElementStyle(this.element.nativeElement.getElementsByClassName('back')[0], 'display', 'none');
        }
    }
}

