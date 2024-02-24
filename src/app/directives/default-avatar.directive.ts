import {Directive, ElementRef, Input, OnInit} from '@angular/core';
import {ImageSrc} from "@core/types/ImageSrc";


@Directive({
  selector: '[defaultAvatar]',
  standalone: true
})
export class DefaultAvatarDirective implements OnInit {
  @Input({ required: true }) src: ImageSrc = null;
  private defaultLocalImage = '/assets/person.png';
  constructor(
    private imageRef: ElementRef
  ) { }

  ngOnInit(): void {
    this.initImage();
  }

  private initImage() {
    const img = new Image();
    img.onload = () => this.setImage(this.resolveImage(this.src));
    img.onerror = () => this.setImage(this.defaultLocalImage);
    img.src = this.resolveImage(this.src);
  }

  private setImage(src: ImageSrc) {
    this.imageRef.nativeElement.setAttribute('src', src);
  }

  private resolveImage(src: ImageSrc): string {
    if (!src) {
      return this.defaultLocalImage;
    }

    return src;
  }

}
