import { Component, ElementRef, Renderer, Input, ViewEncapsulation  } from '@angular/core';
import { Platform } from 'ionic-angular';

import 'rxjs/add/operator/map';

@Component({
  selector: 'strechy-header',
  encapsulation: ViewEncapsulation.Emulated,
  template:`
    <ion-header class="strechy">
        <ng-content></ng-content>
        <ion-icon name="arrow-back" class="back" navPop ></ion-icon>

        <div class="strechy-header" id="strechy-header" text-center >
            <div class="strechy-header-content animated" [innerHtml]="bigTitlehtmlToAdd">
                
            </div>
            <div class="blur-filter"></div>
            <ion-row class="stretchy_header_title vertical-align-content ">
                <ion-col [innerHtml]="htmlToAdd"> 
                </ion-col>
            </ion-row>
        </div>
    </ion-header>`,
  styles: [`
    .back {
        position: absolute;
        z-index: 999;
        color: #fff;
        font-size: 30px;
        left: 10px;
        z-index: 999999
    }
    .stretchy_header_title {
        width: 100%;
    }
    .stretchy_header_title .tweet_number {
        color: #fff;
        z-index: 999;
        position: relative;
        font-size: 0.7em;
    }
    .blur-filter {
        position: absolute;
        width: 100%;
        height: 100%;
        -webkit-backdrop-filter: blur(20px);
        opacity: 0;
    }
    .vertical-align-content {
        display: flex!important;
        align-self: flex-end
    }
    .picture {}
  `]

})

export class StretchyHeader{

   @Input() headerHeight : any;
   @Input() backgroundHeader : any;
   @Input() title : any;
   @Input() showBackButton : any;
   @Input() hasNavbar : any;

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




	constructor( public element: ElementRef, public renderer: Renderer, public plt: Platform ){
	}

    ngOnChanges(changes:any):void {

        this.header = this.element.nativeElement.getElementsByClassName('strechy-header')[0];

        if( changes.backgroundHeader.currentValue != '' ){

            this.renderer.setElementStyle( this.header, 'backgroundImage', 'url(' + changes.backgroundHeader.currentValue + ')' );
        }

        this.showBackButtonValue = changes.showBackButton.currentValue


    }

	ngOnInit(){
    console.log('Load profile-scroll');
        this.header = this.element.nativeElement.getElementsByClassName('strechy-header')[0];
        // console.log( this.header.getElementsByClassName('toolbar')[0] );
        let newH = this.headerHeight;
        if( this.hasNavbar  == "true" ){
            if ( this.plt.is('iphone') || this.plt.is('ios')   ) {
                newH = parseInt( this.headerHeight ) + 64 ;
            }else{
                newH = parseInt( this.headerHeight ) + 56 ;
            }
        }else if( this.showBackButton == 'true' && this.hasNavbar  == "false"){
            if (  this.plt.is('iphone') || this.plt.is('ios')  ) {
                newH = parseInt( this.headerHeight ) + 64 ;
            }else{
                newH = parseInt( this.headerHeight ) + 56 ;
            }
        }

        this.renderer.setElementStyle( this.header, 'height',  newH +'px' );
        this.renderer.setElementStyle( this.header, 'z-index', '2' );

        this.htmlToAdd =  '<h5 class="title animated onBottom" no-padding no-margin >'+this.title+'</h5>';

        this.bigTitlehtmlToAdd = '<h4>' + this.subTitle + '</h4>' +
        '<h2>' + this.bigTitle + '</h2>' +
        '<div class="line" style="background:#' + this.lineColor + '"></div>';



        if( this.showBackButton  == "false" ){
             this.renderer.setElementStyle( this.element.nativeElement.getElementsByClassName('back')[0], 'display', 'none' );
        }
	}


}

