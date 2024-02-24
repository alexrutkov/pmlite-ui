import {Directive, ElementRef, OnInit, Renderer2} from '@angular/core';
import {ImageSrc} from "@core/types/ImageSrc";
import {HttpClient} from "@angular/common/http";

@Directive({
  selector: '[bgAvatar]',
  standalone: true
})
export class BgAvatarDirective implements OnInit {
  private src = '/api/account/avatar.jpg';
  private defaultLocalImage = '/assets/person.png';
  constructor(
    private imageRef: ElementRef,
    private http: HttpClient,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.initImage();
  }

  private initImage() {
    this.http.head(this.src).subscribe({
      next: () => this.setImage(this.resolveImage(this.src)),
      error: () => this.setImage(this.defaultLocalImage)
    });
  }

  private setImage(src: ImageSrc) {
    this.renderer.setStyle(this.imageRef.nativeElement, 'background-image', `url(${src})`);
  }

  private resolveImage(src: ImageSrc): string {
    if (!src) {
      return this.defaultLocalImage;
    }

    return src;
  }

}
