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
const util_1 = require("./util");
class HoogleDocView {
    constructor(props = {}) {
        this.props = props;
        this.disposables = new atom_1.CompositeDisposable();
        this.style = {};
        this.parsedDoc = '';
        this.openWebDoc = () => {
            this.props.symbol && util_1.openWeb(this.props.symbol, false);
        };
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
        const div = document.createElement('div');
        div.innerHTML = doc;
        div.querySelectorAll('pre').forEach((el) => {
            el.outerHTML = util_1.hl(el.innerText, false);
        });
        div.querySelectorAll('a').forEach((el) => {
            el.outerHTML = util_1.hl(el.innerText.trim(), true);
        });
        this.parsedDoc = div.innerHTML;
    }
}
exports.HoogleDocView = HoogleDocView;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9vZ2xlLWRvYy12aWV3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2hvb2dsZS1kb2Mtdmlldy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLCtCQUEwQztBQUMxQyw2QkFBNEI7QUFDNUIsaUNBQW9DO0FBUXBDO0lBT0UsWUFBbUIsUUFBZ0IsRUFBRTtRQUFsQixVQUFLLEdBQUwsS0FBSyxDQUFhO1FBTjlCLGdCQUFXLEdBQUcsSUFBSSwwQkFBbUIsRUFBRSxDQUFBO1FBQ3RDLFVBQUssR0FHVCxFQUFFLENBQUE7UUFDRSxjQUFTLEdBQVcsRUFBRSxDQUFBO1FBdUd0QixlQUFVLEdBQUcsR0FBRyxFQUFFO1lBQ3hCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLGNBQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQTtRQUN4RCxDQUFDLENBQUE7UUF2R0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDaEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQ2xCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLGlCQUFpQixFQUFFLENBQUMsUUFBZ0IsRUFBRSxFQUFFO1lBQzFELEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ2IsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsR0FBRyxRQUFRLElBQUksQ0FBQTtZQUN2QyxDQUFDO1FBQ0gsQ0FBQyxDQUFDLEVBQ0YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxVQUFrQixFQUFFLEVBQUU7WUFDOUQsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDZixJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxVQUFV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U0FBUyxHQUFHLFNBQUUsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFBO1FBQ3hDLENBQUMsQ0FBQyxDQUFBO1FBQ0YsR0FBRyxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFO1lBQ3ZDLEVBQUUsQ0FBQyxTQUFTLEdBQUcsU0FBRSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFDOUMsQ0FBQyxDQUFDLENBQUE7UUFDRixJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUE7SUFDaEMsQ0FBQztDQUtGO0FBaEhELHNDQWdIQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvc2l0ZURpc3Bvc2FibGUgfSBmcm9tICdhdG9tJ1xuaW1wb3J0ICogYXMgZXRjaCBmcm9tICdldGNoJ1xuaW1wb3J0IHsgaGwsIG9wZW5XZWIgfSBmcm9tICcuL3V0aWwnXG5cbmV4cG9ydCBpbnRlcmZhY2UgSVByb3BzIGV4dGVuZHMgSlNYLlByb3BzIHtcbiAgc3ltYm9sPzogSVN5bWJvbFxufVxuXG50eXBlIEVsZW1lbnRDbGFzcyA9IEpTWC5FbGVtZW50Q2xhc3NcblxuZXhwb3J0IGNsYXNzIEhvb2dsZURvY1ZpZXcgaW1wbGVtZW50cyBFbGVtZW50Q2xhc3Mge1xuICBwdWJsaWMgZGlzcG9zYWJsZXMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpXG4gIHByaXZhdGUgc3R5bGU6IHtcbiAgICBmb250U2l6ZT86IHN0cmluZ1xuICAgIGZvbnRGYW1pbHk/OiBzdHJpbmdcbiAgfSA9IHt9XG4gIHByaXZhdGUgcGFyc2VkRG9jOiBzdHJpbmcgPSAnJ1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcHJvcHM6IElQcm9wcyA9IHt9KSB7XG4gICAgdGhpcy51cGRhdGVEb2MocHJvcHMuc3ltYm9sICYmIHByb3BzLnN5bWJvbC5kb2MpXG4gICAgdGhpcy5kaXNwb3NhYmxlcy5hZGQoXG4gICAgICBhdG9tLmNvbmZpZy5vYnNlcnZlKCdlZGl0b3IuZm9udFNpemUnLCAoZm9udFNpemU6IG51bWJlcikgPT4ge1xuICAgICAgICBpZiAoZm9udFNpemUpIHtcbiAgICAgICAgICB0aGlzLnN0eWxlLmZvbnRTaXplID0gYCR7Zm9udFNpemV9cHhgXG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICAgYXRvbS5jb25maWcub2JzZXJ2ZSgnZWRpdG9yLmZvbnRGYW1pbHknLCAoZm9udEZhbWlseTogc3RyaW5nKSA9PiB7XG4gICAgICAgIGlmIChmb250RmFtaWx5KSB7XG4gICAgICAgICAgdGhpcy5zdHlsZS5mb250RmFtaWx5ID0gZm9udEZhbWlseVxuICAgICAgICB9XG4gICAgICB9KSxcbiAgICApXG4gICAgZXRjaC5pbml0aWFsaXplKHRoaXMpXG4gIH1cblxuICBwdWJsaWMgcmVuZGVyKCkge1xuICAgIGxldCBocmVmQnRuczogSlNYLkVsZW1lbnRbXSA9IFtdXG4gICAgaWYgKHRoaXMucHJvcHMuc3ltYm9sICYmIHRoaXMucHJvcHMuc3ltYm9sLmhyZWYpIHtcbiAgICAgIGhyZWZCdG5zID0gW1xuICAgICAgICAoXG4gICAgICAgICAgLy8gdHNsaW50OmRpc2FibGU6bm8tdW5zYWZlLWFueVxuICAgICAgICAgIDxhIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgb249e3sgY2xpY2s6IHRoaXMub3BlbldlYkRvYyB9fT5cbiAgICAgICAgICAgIE9wZW4gd2ViIGRvY3VtZW50YXRpb25cbiAgICAgICAgICA8L2E+XG4gICAgICAgICAgLy8gdHNsaW50OmVuYWJsZTpuby11bnNhZmUtYW55XG4gICAgICAgICksXG4gICAgICAgIChcbiAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZTpuby11bnNhZmUtYW55XG4gICAgICAgICAgPGEgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIiBocmVmPXt0aGlzLnByb3BzLnN5bWJvbC5ocmVmfT5cbiAgICAgICAgICAgIE9wZW4gd2ViIGRvY3VtZW50YXRpb24gaW4gYnJvd3NlclxuICAgICAgICAgIDwvYT5cbiAgICAgICAgICAvLyB0c2xpbnQ6ZW5hYmxlOm5vLXVuc2FmZS1hbnlcbiAgICAgICAgKSxcbiAgICAgIF1cbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlOm5vLXVuc2FmZS1hbnlcbiAgICAgIDxkaXYgY2xhc3M9XCJpZGUtaGFza2VsbC1ob29nbGVcIj5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIHN0eWxlPXt0aGlzLnN0eWxlfVxuICAgICAgICAgIGlubmVySFRNTD17aGwodGhpcy5wcm9wcy5zeW1ib2wgJiYgdGhpcy5wcm9wcy5zeW1ib2wuc2lnbmF0dXJlIHx8ICcnLCB0cnVlKX1cbiAgICAgICAgLz5cbiAgICAgICAgPGRpdj57aHJlZkJ0bnN9PC9kaXY+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzcz1cImlkZS1oYXNrZWxsLWhvb2dsZS1vdXRwdXQgZWRpdG9yIGVkaXRvci1jb2xvcnMgbmF0aXZlLWtleS1iaW5kaW5nc1wiXG4gICAgICAgICAgc3R5bGU9e3RoaXMuc3R5bGV9XG4gICAgICAgICAgdGFiSW5kZXg9XCItMVwiXG4gICAgICAgICAgaW5uZXJIVE1MPXt0aGlzLnBhcnNlZERvY31cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgICAgLy8gdHNsaW50OmVuYWJsZTpuby11bnNhZmUtYW55XG4gICAgKVxuICB9XG5cbiAgcHVibGljIGFzeW5jIHVwZGF0ZShwcm9wczogSVByb3BzKSB7XG4gICAgaWYgKCh0aGlzLnByb3BzLnN5bWJvbCAmJiB0aGlzLnByb3BzLnN5bWJvbC5kb2MpXG4gICAgICAhPT0gKHByb3BzLnN5bWJvbCAmJiBwcm9wcy5zeW1ib2wuZG9jKSkge1xuICAgICAgdGhpcy51cGRhdGVEb2MocHJvcHMuc3ltYm9sICYmIHByb3BzLnN5bWJvbC5kb2MpXG4gICAgfVxuICAgIHRoaXMucHJvcHMgPSBwcm9wc1xuICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKVxuICB9XG5cbiAgcHVibGljIGdldFVSSSgpIHtcbiAgICByZXR1cm4gJ2lkZS1oYXNrZWxsOi8vaG9vZ2xlL2RvYy8nXG4gIH1cblxuICBwdWJsaWMgZ2V0VGl0bGUoKSB7XG4gICAgcmV0dXJuICdIb29nbGUgZG9jJ1xuICB9XG5cbiAgcHVibGljIGRlc3Ryb3koKSB7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWZsb2F0aW5nLXByb21pc2VzXG4gICAgZXRjaC5kZXN0cm95KHRoaXMpXG4gICAgdGhpcy5kaXNwb3NhYmxlcy5kaXNwb3NlKClcbiAgfVxuXG4gIHB1YmxpYyBzZXJpYWxpemUoKTogSVByb3BzICYgeyBkZXNlcmlhbGl6ZXI6IHN0cmluZyB9IHtcbiAgICByZXR1cm4ge1xuICAgICAgLi4udGhpcy5wcm9wcyxcbiAgICAgIGRlc2VyaWFsaXplcjogJ0hvb2dsZURvY1ZpZXcnLFxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlRG9jKGRvYzogc3RyaW5nIHwgdW5kZWZpbmVkKSB7XG4gICAgaWYgKCFkb2MpIHtcbiAgICAgIHRoaXMucGFyc2VkRG9jID0gJ05vIGRvY3VtZW50YXRpb24nXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBkaXYuaW5uZXJIVE1MID0gZG9jXG4gICAgZGl2LnF1ZXJ5U2VsZWN0b3JBbGwoJ3ByZScpLmZvckVhY2goKGVsKSA9PiB7XG4gICAgICBlbC5vdXRlckhUTUwgPSBobChlbC5pbm5lclRleHQsIGZhbHNlKVxuICAgIH0pXG4gICAgZGl2LnF1ZXJ5U2VsZWN0b3JBbGwoJ2EnKS5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgZWwub3V0ZXJIVE1MID0gaGwoZWwuaW5uZXJUZXh0LnRyaW0oKSwgdHJ1ZSlcbiAgICB9KVxuICAgIHRoaXMucGFyc2VkRG9jID0gZGl2LmlubmVySFRNTFxuICB9XG5cbiAgcHJpdmF0ZSBvcGVuV2ViRG9jID0gKCkgPT4ge1xuICAgIHRoaXMucHJvcHMuc3ltYm9sICYmIG9wZW5XZWIodGhpcy5wcm9wcy5zeW1ib2wsIGZhbHNlKVxuICB9XG59XG4iXX0=