import { NgModule } from '@angular/core';
import { IonicModule } from "ionic-angular";
import { ProfileScroll } from "./profile-scroll";
import { StretchyHeader } from "./stretchy-header";

@NgModule({
    declarations: [
        ProfileScroll,
        StretchyHeader
    ],
    imports : [ IonicModule ],
    exports: [
        ProfileScroll,
        StretchyHeader
    ]
})
export class DirectivesModule {}
