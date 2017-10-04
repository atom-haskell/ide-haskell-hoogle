"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const atom_1 = require("atom");
const etch = require("etch");
const cheerio = require("cheerio");
const util_1 = require("./util");
class HoogleDocView {
    constructor(props = {}) {
        this.props = props;
        this.disposables = new atom_1.CompositeDisposable();
        this.style = {};
        this.parsedDoc = '';
        this.updateDoc(props.symbol && props.symbol.doc);
        this.disposables.add(atom.config.observe('editor.fontSize', (fontSize) => {
            if (fontSize) {
                this.style.fontSize = `${fontSize}px`;
            }
        }), atom.config.observe('editor.fontFamily', (fontFamily) => {
            if (fontFamily) {
                this.style.fontFamily = fontFamily;
            }
        }));
        etch.initialize(this);
    }
    render() {
        let hrefBtns = [];
        if (this.props.symbol && this.props.symbol.href) {
            hrefBtns = [
                (etch.dom("a", { class: "btn btn-default", on: { click: this.openWebDoc } }, "Open web documentation")),
                (etch.dom("a", { class: "btn btn-default", href: this.props.symbol.href }, "Open web documentation in browser")),
            ];
        }
        return (etch.dom("div", { class: "ide-haskell-hoogle" },
            etch.dom("div", { style: this.style, innerHTML: util_1.hl(this.props.symbol && this.props.symbol.signature || '', true) }),
            etch.dom("div", null, hrefBtns),
            etch.dom("div", { class: "ide-haskell-hoogle-output editor editor-colors native-key-bindings", style: this.style, tabIndex: "-1", innerHTML: this.parsedDoc })));
    }
    update(props) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((this.props.symbol && this.props.symbol.doc)
                !== (props.symbol && props.symbol.doc)) {
                this.updateDoc(props.symbol && props.symbol.doc);
            }
            this.props = props;
            return etch.update(this);
        });
    }
    getURI() {
        return 'ide-haskell://hoogle/doc/';
    }
    getTitle() {
        return 'Hoogle doc';
    }
    destroy() {
        etch.destroy(this);
        this.disposables.dispose();
    }
    serialize() {
        return Object.assign({}, this.props, { deserializer: 'HoogleDocView' });
    }
    updateDoc(doc) {
        if (!doc) {
            this.parsedDoc = 'No documentation';
            return;
        }
        const $ = cheerio.load(doc);
        $('pre').each((idx, el) => {
            $(el).replaceWith(util_1.hl($(el).text(), false));
        });
        $('a').each((idx, el) => {
            $(el).replaceWith(util_1.hl($(el).text().trim(), true));
        });
        this.parsedDoc = $.html();
    }
    openWebDoc() {
        this.props.symbol && util_1.openWeb(this.props.symbol, false);
    }
}
exports.HoogleDocView = HoogleDocView;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9vZ2xlLWRvYy12aWV3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2hvb2dsZS1kb2Mtdmlldy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLCtCQUEwQztBQUMxQyw2QkFBNEI7QUFDNUIsbUNBQW1DO0FBQ25DLGlDQUFvQztBQU1wQztJQU9FLFlBQW1CLFFBQWdCLEVBQUU7UUFBbEIsVUFBSyxHQUFMLEtBQUssQ0FBYTtRQU45QixnQkFBVyxHQUFHLElBQUksMEJBQW1CLEVBQUUsQ0FBQTtRQUN0QyxVQUFLLEdBR1QsRUFBRSxDQUFBO1FBQ0UsY0FBUyxHQUFXLEVBQUUsQ0FBQTtRQUU1QixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNoRCxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FDbEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxRQUFnQjtZQUN0RCxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNiLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLEdBQUcsUUFBUSxJQUFJLENBQUE7WUFDdkMsQ0FBQztRQUNILENBQUMsQ0FBQyxFQUNGLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLG1CQUFtQixFQUFFLENBQUMsVUFBa0I7WUFDMUQsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDZixJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUE7WUFDcEMsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUNILENBQUE7UUFDRCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3ZCLENBQUM7SUFFTSxNQUFNO1FBQ1gsSUFBSSxRQUFRLEdBQWtCLEVBQUUsQ0FBQTtRQUNoQyxF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QUMsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLFNBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQTtRQUNsRCxDQUFDLENBQUMsQ0FBQTtRQUNGLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFBO0lBQzNCLENBQUM7SUFFTyxVQUFVO1FBQ2hCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLGNBQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQTtJQUN4RCxDQUFDO0NBQ0Y7QUExR0Qsc0NBMEdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9zaXRlRGlzcG9zYWJsZSB9IGZyb20gJ2F0b20nXG5pbXBvcnQgKiBhcyBldGNoIGZyb20gJ2V0Y2gnXG5pbXBvcnQgY2hlZXJpbyA9IHJlcXVpcmUoJ2NoZWVyaW8nKVxuaW1wb3J0IHsgaGwsIG9wZW5XZWIgfSBmcm9tICcuL3V0aWwnXG5cbmV4cG9ydCBpbnRlcmZhY2UgSVByb3BzIGV4dGVuZHMgSlNYLlByb3BzIHtcbiAgc3ltYm9sPzogSVN5bWJvbFxufVxuXG5leHBvcnQgY2xhc3MgSG9vZ2xlRG9jVmlldyBpbXBsZW1lbnRzIEpTWC5FbGVtZW50Q2xhc3Mge1xuICBwdWJsaWMgZGlzcG9zYWJsZXMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpXG4gIHByaXZhdGUgc3R5bGU6IHtcbiAgICBmb250U2l6ZT86IHN0cmluZ1xuICAgIGZvbnRGYW1pbHk/OiBzdHJpbmdcbiAgfSA9IHt9XG4gIHByaXZhdGUgcGFyc2VkRG9jOiBzdHJpbmcgPSAnJ1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcHJvcHM6IElQcm9wcyA9IHt9KSB7XG4gICAgdGhpcy51cGRhdGVEb2MocHJvcHMuc3ltYm9sICYmIHByb3BzLnN5bWJvbC5kb2MpXG4gICAgdGhpcy5kaXNwb3NhYmxlcy5hZGQoXG4gICAgICBhdG9tLmNvbmZpZy5vYnNlcnZlKCdlZGl0b3IuZm9udFNpemUnLCAoZm9udFNpemU6IG51bWJlcikgPT4ge1xuICAgICAgICBpZiAoZm9udFNpemUpIHtcbiAgICAgICAgICB0aGlzLnN0eWxlLmZvbnRTaXplID0gYCR7Zm9udFNpemV9cHhgXG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICAgYXRvbS5jb25maWcub2JzZXJ2ZSgnZWRpdG9yLmZvbnRGYW1pbHknLCAoZm9udEZhbWlseTogc3RyaW5nKSA9PiB7XG4gICAgICAgIGlmIChmb250RmFtaWx5KSB7XG4gICAgICAgICAgdGhpcy5zdHlsZS5mb250RmFtaWx5ID0gZm9udEZhbWlseVxuICAgICAgICB9XG4gICAgICB9KSxcbiAgICApXG4gICAgZXRjaC5pbml0aWFsaXplKHRoaXMpXG4gIH1cblxuICBwdWJsaWMgcmVuZGVyKCkge1xuICAgIGxldCBocmVmQnRuczogSlNYLkVsZW1lbnRbXSA9IFtdXG4gICAgaWYgKHRoaXMucHJvcHMuc3ltYm9sICYmIHRoaXMucHJvcHMuc3ltYm9sLmhyZWYpIHtcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlOiBuby11bmJvdW5kLW1ldGhvZFxuICAgICAgaHJlZkJ0bnMgPSBbXG4gICAgICAgIChcbiAgICAgICAgICA8YSBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiIG9uPXt7IGNsaWNrOiB0aGlzLm9wZW5XZWJEb2MgfX0+XG4gICAgICAgICAgICBPcGVuIHdlYiBkb2N1bWVudGF0aW9uXG4gICAgICAgICAgPC9hPlxuICAgICAgICApLFxuICAgICAgICAoXG4gICAgICAgICAgPGEgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIiBocmVmPXt0aGlzLnByb3BzLnN5bWJvbC5ocmVmfT5cbiAgICAgICAgICAgIE9wZW4gd2ViIGRvY3VtZW50YXRpb24gaW4gYnJvd3NlclxuICAgICAgICAgIDwvYT5cbiAgICAgICAgKSxcbiAgICAgIF1cbiAgICAgIC8vIHRzbGludDplbmFibGU6IG5vLXVuYm91bmQtbWV0aG9kXG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzPVwiaWRlLWhhc2tlbGwtaG9vZ2xlXCI+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBzdHlsZT17dGhpcy5zdHlsZX1cbiAgICAgICAgICBpbm5lckhUTUw9e2hsKHRoaXMucHJvcHMuc3ltYm9sICYmIHRoaXMucHJvcHMuc3ltYm9sLnNpZ25hdHVyZSB8fCAnJywgdHJ1ZSl9XG4gICAgICAgIC8+XG4gICAgICAgIDxkaXY+e2hyZWZCdG5zfTwvZGl2PlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3M9XCJpZGUtaGFza2VsbC1ob29nbGUtb3V0cHV0IGVkaXRvciBlZGl0b3ItY29sb3JzIG5hdGl2ZS1rZXktYmluZGluZ3NcIlxuICAgICAgICAgIHN0eWxlPXt0aGlzLnN0eWxlfVxuICAgICAgICAgIHRhYkluZGV4PVwiLTFcIlxuICAgICAgICAgIGlubmVySFRNTD17dGhpcy5wYXJzZWREb2N9XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgdXBkYXRlKHByb3BzOiBJUHJvcHMpIHtcbiAgICBpZiAoKHRoaXMucHJvcHMuc3ltYm9sICYmIHRoaXMucHJvcHMuc3ltYm9sLmRvYylcbiAgICAgICE9PSAocHJvcHMuc3ltYm9sICYmIHByb3BzLnN5bWJvbC5kb2MpKSB7XG4gICAgICB0aGlzLnVwZGF0ZURvYyhwcm9wcy5zeW1ib2wgJiYgcHJvcHMuc3ltYm9sLmRvYylcbiAgICB9XG4gICAgdGhpcy5wcm9wcyA9IHByb3BzXG4gICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpXG4gIH1cblxuICBwdWJsaWMgZ2V0VVJJKCkge1xuICAgIHJldHVybiAnaWRlLWhhc2tlbGw6Ly9ob29nbGUvZG9jLydcbiAgfVxuXG4gIHB1YmxpYyBnZXRUaXRsZSgpIHtcbiAgICByZXR1cm4gJ0hvb2dsZSBkb2MnXG4gIH1cblxuICBwdWJsaWMgZGVzdHJveSgpIHtcbiAgICBldGNoLmRlc3Ryb3kodGhpcylcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmRpc3Bvc2UoKVxuICB9XG5cbiAgcHVibGljIHNlcmlhbGl6ZSgpOiBJUHJvcHMgJiB7IGRlc2VyaWFsaXplcjogc3RyaW5nIH0ge1xuICAgIHJldHVybiB7XG4gICAgICAuLi50aGlzLnByb3BzLFxuICAgICAgZGVzZXJpYWxpemVyOiAnSG9vZ2xlRG9jVmlldycsXG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVEb2MoZG9jOiBzdHJpbmcgfCB1bmRlZmluZWQpIHtcbiAgICBpZiAoIWRvYykge1xuICAgICAgdGhpcy5wYXJzZWREb2MgPSAnTm8gZG9jdW1lbnRhdGlvbidcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBjb25zdCAkID0gY2hlZXJpby5sb2FkKGRvYylcbiAgICAkKCdwcmUnKS5lYWNoKChpZHgsIGVsKSA9PiB7XG4gICAgICAkKGVsKS5yZXBsYWNlV2l0aChobCgkKGVsKS50ZXh0KCksIGZhbHNlKSlcbiAgICB9KVxuICAgICQoJ2EnKS5lYWNoKChpZHgsIGVsKSA9PiB7XG4gICAgICAkKGVsKS5yZXBsYWNlV2l0aChobCgkKGVsKS50ZXh0KCkudHJpbSgpLCB0cnVlKSlcbiAgICB9KVxuICAgIHRoaXMucGFyc2VkRG9jID0gJC5odG1sKClcbiAgfVxuXG4gIHByaXZhdGUgb3BlbldlYkRvYygpIHtcbiAgICB0aGlzLnByb3BzLnN5bWJvbCAmJiBvcGVuV2ViKHRoaXMucHJvcHMuc3ltYm9sLCBmYWxzZSlcbiAgfVxufVxuIl19