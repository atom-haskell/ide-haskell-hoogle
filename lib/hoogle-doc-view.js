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
                etch.dom("a", { class: "btn btn-default", on: { click: this.openWebDoc } }, "Open web documentation"),
                etch.dom("a", { class: "btn btn-default", href: this.props.symbol.href }, "Open web documentation in browser")
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9vZ2xlLWRvYy12aWV3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2hvb2dsZS1kb2Mtdmlldy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLCtCQUF3QztBQUN4Qyw2QkFBNEI7QUFDNUIsbUNBQW1DO0FBQ25DLGlDQUFrQztBQU1sQztJQU9FLFlBQW9CLFFBQWdCLEVBQUU7UUFBbEIsVUFBSyxHQUFMLEtBQUssQ0FBYTtRQU4vQixnQkFBVyxHQUFHLElBQUksMEJBQW1CLEVBQUUsQ0FBQTtRQUN0QyxVQUFLLEdBR1QsRUFBRSxDQUFBO1FBQ0UsY0FBUyxHQUFXLEVBQUUsQ0FBQTtRQUU1QixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNoRCxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FDbEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxRQUFnQjtZQUN0RCxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNiLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLEdBQUcsUUFBUSxJQUFJLENBQUE7WUFDdkMsQ0FBQztRQUNILENBQUMsQ0FBQyxFQUNGLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLG1CQUFtQixFQUFFLENBQUMsVUFBa0I7WUFDMUQsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDZixJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUE7WUFDcEMsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUNILENBQUE7UUFDRCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3ZCLENBQUM7SUFFTSxNQUFNO1FBQ1gsSUFBSSxRQUFRLEdBQWtCLEVBQUUsQ0FBQTtRQUNoQyxF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QUFXLENBQUMsU0FBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFBO1FBQ2xELENBQUMsQ0FBQyxDQUFBO1FBQ0YsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUE7SUFDM0IsQ0FBQztJQUVPLFVBQVU7UUFDaEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksY0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFBO0lBQ3hELENBQUM7Q0FDRjtBQW5HRCxzQ0FtR0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvc2l0ZURpc3Bvc2FibGV9IGZyb20gJ2F0b20nXG5pbXBvcnQgKiBhcyBldGNoIGZyb20gJ2V0Y2gnXG5pbXBvcnQgY2hlZXJpbyA9IHJlcXVpcmUoJ2NoZWVyaW8nKVxuaW1wb3J0IHtobCwgb3BlbldlYn0gZnJvbSAnLi91dGlsJ1xuXG5leHBvcnQgaW50ZXJmYWNlIElQcm9wcyBleHRlbmRzIEpTWC5Qcm9wcyB7XG4gIHN5bWJvbD86IElTeW1ib2xcbn1cblxuZXhwb3J0IGNsYXNzIEhvb2dsZURvY1ZpZXcgaW1wbGVtZW50cyBKU1guRWxlbWVudENsYXNzIHtcbiAgcHVibGljIGRpc3Bvc2FibGVzID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKVxuICBwcml2YXRlIHN0eWxlOiB7XG4gICAgZm9udFNpemU/OiBzdHJpbmdcbiAgICBmb250RmFtaWx5Pzogc3RyaW5nXG4gIH0gPSB7fVxuICBwcml2YXRlIHBhcnNlZERvYzogc3RyaW5nID0gJydcbiAgY29uc3RydWN0b3IgKHB1YmxpYyBwcm9wczogSVByb3BzID0ge30pIHtcbiAgICB0aGlzLnVwZGF0ZURvYyhwcm9wcy5zeW1ib2wgJiYgcHJvcHMuc3ltYm9sLmRvYylcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmFkZChcbiAgICAgIGF0b20uY29uZmlnLm9ic2VydmUoJ2VkaXRvci5mb250U2l6ZScsIChmb250U2l6ZTogc3RyaW5nKSA9PiB7XG4gICAgICAgIGlmIChmb250U2l6ZSkge1xuICAgICAgICAgIHRoaXMuc3R5bGUuZm9udFNpemUgPSBgJHtmb250U2l6ZX1weGBcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgICBhdG9tLmNvbmZpZy5vYnNlcnZlKCdlZGl0b3IuZm9udEZhbWlseScsIChmb250RmFtaWx5OiBzdHJpbmcpID0+IHtcbiAgICAgICAgaWYgKGZvbnRGYW1pbHkpIHtcbiAgICAgICAgICB0aGlzLnN0eWxlLmZvbnRGYW1pbHkgPSBmb250RmFtaWx5XG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgIClcbiAgICBldGNoLmluaXRpYWxpemUodGhpcylcbiAgfVxuXG4gIHB1YmxpYyByZW5kZXIgKCkge1xuICAgIGxldCBocmVmQnRuczogSlNYLkVsZW1lbnRbXSA9IFtdIC8vIHRzbGludDpkaXNhYmxlLWxpbmU6bm8tbnVsbC1rZXl3b3JkXG4gICAgaWYgKHRoaXMucHJvcHMuc3ltYm9sICYmIHRoaXMucHJvcHMuc3ltYm9sLmhyZWYpIHtcbiAgICAgIGhyZWZCdG5zID0gW1xuICAgICAgICAgIDxhIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCJcbiAgICAgICAgICAgICBvbj17e2NsaWNrOiB0aGlzLm9wZW5XZWJEb2N9fVxuICAgICAgICAgICAgID5cbiAgICAgICAgICAgIE9wZW4gd2ViIGRvY3VtZW50YXRpb25cbiAgICAgICAgICA8L2E+LFxuICAgICAgICAgIDxhIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgaHJlZj17dGhpcy5wcm9wcy5zeW1ib2wuaHJlZn0+XG4gICAgICAgICAgICBPcGVuIHdlYiBkb2N1bWVudGF0aW9uIGluIGJyb3dzZXJcbiAgICAgICAgICA8L2E+XG4gICAgICAgIF1cbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3M9XCJpZGUtaGFza2VsbC1ob29nbGVcIj5cbiAgICAgICAgPGRpdiBzdHlsZT17dGhpcy5zdHlsZX1cbiAgICAgICAgICAgICBpbm5lckhUTUw9e2hsKHRoaXMucHJvcHMuc3ltYm9sICYmIHRoaXMucHJvcHMuc3ltYm9sLnNpZ25hdHVyZSB8fCAnJywgdHJ1ZSl9XG4gICAgICAgIC8+XG4gICAgICAgIDxkaXY+e2hyZWZCdG5zfTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiaWRlLWhhc2tlbGwtaG9vZ2xlLW91dHB1dCBlZGl0b3IgZWRpdG9yLWNvbG9ycyBuYXRpdmUta2V5LWJpbmRpbmdzXCJcbiAgICAgICAgICAgIHN0eWxlPXt0aGlzLnN0eWxlfVxuICAgICAgICAgICAgdGFiSW5kZXg9XCItMVwiXG4gICAgICAgICAgICBpbm5lckhUTUw9e3RoaXMucGFyc2VkRG9jfS8+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgdXBkYXRlIChwcm9wczogSVByb3BzKSB7XG4gICAgaWYgKCh0aGlzLnByb3BzLnN5bWJvbCAmJiB0aGlzLnByb3BzLnN5bWJvbC5kb2MpXG4gICAgICAgIT09IChwcm9wcy5zeW1ib2wgJiYgcHJvcHMuc3ltYm9sLmRvYykpIHtcbiAgICAgIHRoaXMudXBkYXRlRG9jKHByb3BzLnN5bWJvbCAmJiBwcm9wcy5zeW1ib2wuZG9jKVxuICAgIH1cbiAgICB0aGlzLnByb3BzID0gcHJvcHNcbiAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcylcbiAgfVxuXG4gIHB1YmxpYyBnZXRVUkkgKCkge1xuICAgIHJldHVybiAnaWRlLWhhc2tlbGw6Ly9ob29nbGUvZG9jLydcbiAgfVxuXG4gIHB1YmxpYyBnZXRUaXRsZSAoKSB7XG4gICAgcmV0dXJuICdIb29nbGUgZG9jJ1xuICB9XG5cbiAgcHVibGljIGRlc3Ryb3kgKCkge1xuICAgIGV0Y2guZGVzdHJveSh0aGlzKVxuICAgIHRoaXMuZGlzcG9zYWJsZXMuZGlzcG9zZSgpXG4gIH1cblxuICBwdWJsaWMgc2VyaWFsaXplICgpOiBJUHJvcHMgJiB7ZGVzZXJpYWxpemVyOiBzdHJpbmd9IHtcbiAgICByZXR1cm4ge1xuICAgICAgLi4udGhpcy5wcm9wcyxcbiAgICAgIGRlc2VyaWFsaXplcjogJ0hvb2dsZURvY1ZpZXcnLFxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlRG9jIChkb2M6IHN0cmluZyB8IHVuZGVmaW5lZCkge1xuICAgIGlmICghZG9jKSB7XG4gICAgICB0aGlzLnBhcnNlZERvYyA9ICdObyBkb2N1bWVudGF0aW9uJ1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGNvbnN0ICQgPSBjaGVlcmlvLmxvYWQoZG9jKVxuICAgICQoJ3ByZScpLmVhY2goKGlkeCwgZWwpID0+IHtcbiAgICAgICQoZWwpLnJlcGxhY2VXaXRoKGhsKCQoZWwpLnRleHQoKSwgZmFsc2UpKVxuICAgIH0pXG4gICAgJCgnYScpLmVhY2goKGlkeCwgZWwpID0+IHtcbiAgICAgICQoZWwpLnJlcGxhY2VXaXRoKGhsKCQoZWwpLnRleHQoKS50cmltKCksIHRydWUpKVxuICAgIH0pXG4gICAgdGhpcy5wYXJzZWREb2MgPSAkLmh0bWwoKVxuICB9XG5cbiAgcHJpdmF0ZSBvcGVuV2ViRG9jICgpIHtcbiAgICB0aGlzLnByb3BzLnN5bWJvbCAmJiBvcGVuV2ViKHRoaXMucHJvcHMuc3ltYm9sLCBmYWxzZSlcbiAgfVxufVxuIl19