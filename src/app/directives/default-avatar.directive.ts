import {ChangeDetectorRef, Directive, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {finalize} from "rxjs";

class UrlContext {
	url: string = '/assets/person.png';
	userId: number = 0;
}

@Directive({
  selector: '[defaultAvatar]',
  standalone: true
})
export class DefaultAvatarDirective implements OnInit {

	src: string = '/assets/person.png';
  private defaultLocalImage = '/assets/person.png';
	private isViewCreated = false;
	private readonly context = new UrlContext();
	@Input('defaultAvatar') set state(id: number) {
		this.context.userId = id;
		if (!this.isViewCreated) {
			this.http.head(`/api/users/${id}/avatar.jpg`)
				.pipe(
					finalize(() => this.isViewCreated = true)
				)
				.subscribe({
					next: () => {
						// this.src = `/api/users/${id}/avatar.jpg`;
						this.context.url = `/api/users/${id}/avatar.jpg`;
						this.viewContainerRef.createEmbeddedView(this.templateRef, this.context);
						this.changeRef.detectChanges();
					},
					error: () => {
						this.context.url = '/assets/person.png';
						this.viewContainerRef.createEmbeddedView(this.templateRef, this.context);
						this.changeRef.detectChanges();
					}
				})
		}
	}
  constructor(
		private readonly viewContainerRef: ViewContainerRef,
		private readonly templateRef: TemplateRef<UrlContext>,
		private changeRef: ChangeDetectorRef,
		private http: HttpClient
  ) { }

  ngOnInit(): void {

  }

}
