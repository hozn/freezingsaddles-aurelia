import {bindable, inject} from "aurelia-framework";
import {TaskQueue} from "aurelia-task-queue";
// import Highcharts from 'highcharts';
// import Exporting from "highcharts/modules/exporting";
// import "./chart.css!";

@inject(Element, TaskQueue)
export class GalleryCustomElement {

  defaultOptions = {
      // optionName: 'option value'
      // for example:
      index: 0 // start at first slide
  };

	@bindable photos;
  processedPhotos = [];

  constructor(element, taskQueue) {
    	this.element = element;
    	this.taskQueue = taskQueue;
      this.gallery = null;
  }

  attached() {
    // Initializes and opens PhotoSwipe
    // console.log("gallery attaached");

    this.processedPhotos = [];
    for (let rawphoto of this.photos) {
      this.processedPhotos.push({
        src: rawphoto.img_l,
        w: rawphoto.img_l_dimensions[0],
        h: rawphoto.img_l_dimensions[1],
        msrc: rawphoto.img_t,
        title: rawphoto.caption});
    }

  }

  openGallery() {
    let pswpElement = this.element.querySelector('.pswp');
    this.gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, this.processedPhotos, this.defaultOptions);
    this.gallery.init();
  }

  // photosChanged() {
  //   // console.log("photos changed");
  //
  //   This won't work without some effort since you cannot re-assign the items array, only modify the contents.
  //
  //   console.log(this.processedPhotos);
  //   if (this.gallery != null) { // chicken/egg; this change handler fires before component is attached.
  //     this.gallery.items = this.processedPhotos;
  //     this.gallery.updateSize();
  //   }
  // }

}
