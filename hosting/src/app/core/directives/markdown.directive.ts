import { Directive, ElementRef, Input, OnChanges } from '@angular/core';
import DOMPurify from 'dompurify';

@Directive({
    selector: '[gameMarkdown]',
    exportAs: 'markdown',
})
export class MarkdownDirective implements OnChanges {

    private $original: string;

    private marked = (<any> window).marked;

    @Input() gameMarkdown: string;

    @Input() highlight: (text, lang) => string;

    @Input() headers: 'none' | 'simple' | 'full' = 'full';

    constructor(
        private element: ElementRef,
    ) { }

    public ngOnChanges(): void {
        const sanitize = (html: string): string => DOMPurify.sanitize(html);

        this.marked.setOptions({
            gfm: true,
            breaks: true,
            highlight: this.highlight
        });

        if (!this.$original) {
            this.$original = this.element.nativeElement.innerHTML;
        }

        if (this.gameMarkdown) {
            this.element.nativeElement.innerHTML = sanitize(this.marked(this.gameMarkdown, { renderer: this.customRender() }));
        } else {
            this.element.nativeElement.innerHTML = this.$original;
        }
    }

    private customRender() {
        const renderer = new this.marked.Renderer();

        switch (this.headers) {
            case 'none':
                renderer.heading = (text) => `<p>${text}</p>`;
                break;
            case 'simple':
                renderer.heading = (text) => `<h3>${text}</h3>`;
        }

        renderer.link = (href, title, text) => {
            return `<a href="${href}" target="_blank" ${title ? `title="${title}"` : ''}>${text}</a>`;
        };

        return renderer;
    }

}
