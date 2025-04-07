import {NgxUiLoaderModule,NgxUiLoaderConfig,SPINNER,PB_DIRECTION} from "ngx-ui-loader";

export const ngxUiLoaderConfig: NgxUiLoaderConfig={
text:"Loading...",
textColor:"#FFFFFF",
textPosition:"center-center",
pbColor:"red",
bgsColor:"red",
fgsColor:"red",
fgsType: SPINNER.ballSpinClockwise,
fgsSize:100,
pbDirection:PB_DIRECTION.leftToRight,
pbThickness:5
};