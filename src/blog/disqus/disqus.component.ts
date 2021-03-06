import {Component, ViewEncapsulation} from 'angular2/core';


@Component({
  selector: 'disqus',
  moduleId: module.id,
  templateUrl: './disqus.component.html',
  styleUrls: ['./disqus.component.css'],
  encapsulation: ViewEncapsulation.None,
  properties: ['post']
})
export class DisqusComponent {
  private _reset: boolean = false;
  private _post: any;
  set post(val) {
    this._post = val;
  }
  ngAfterViewChecked() {
    this._resetDiscus();
  }
  private _resetDiscus(): void {
    if (this._reset) { return; }
    let _self = this;
    (<any>window).DISQUS.reset({
        reload: true,
        config: function () {
            this.page.identifier = _self._post.id;
            // Until both wp and ng2 app are under the same folder.
            this.page.url = _self._post.link.replace('wp-blog', 'blog');
            this.page.title = _self._post.title.rendered;
            this.language = 'en';
        }
    });
    this._reset = true;
  }
}
