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
class HoogleWebView {
    constructor(props = {}) {
        this.props = props;
        this.disposables = new atom_1.CompositeDisposable();
        this.zoomFactor = 100;
        this.setZoom = () => {
            this.refs.webView.setZoomFactor(this.zoomFactor / 100);
        };
        this.didNavigate = ({ url }) => {
            this.props.url = url;
        };
        etch.initialize(this);
        this.disposables.add(atom.config.observe('ide-haskell-hoogle.webZoomFactor', (zoomFactor) => {
            this.zoomFactor = zoomFactor;
            etch.update(this);
        }));
    }
    render() {
        return (etch.dom("div", { class: "ide-haskell-hoogle" },
            etch.dom("div", { class: "ide-haskell-hoogle-web-navbar btn-group" },
                etch.dom("button", { class: "btn btn-default btn-back", on: { click: () => { atom.commands.dispatch(this.refs.webView, 'ide-haskell-hoogle:web-go-back'); } } }),
                etch.dom("button", { class: "btn btn-default btn-forward", on: { click: () => { atom.commands.dispatch(this.refs.webView, 'ide-haskell-hoogle:web-go-forward'); } } })),
            etch.dom("webview", { ref: "webView", class: "ide-haskell-hoogle-web native-key-bindings", src: this.props.url, tabIndex: "-1", on: {
                    'dom-ready': this.setZoom,
                    'did-navigate': this.didNavigate,
                    'did-navigate-in-page': this.didNavigate,
                } })));
    }
    update(props) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.props.url !== props.url) {
                this.props.url = props.url;
            }
            return etch.update(this);
        });
    }
    getURI() {
        return 'ide-haskell://hoogle/web/';
    }
    getTitle() {
        return 'Hoogle web';
    }
    destroy() {
        this.disposables.dispose();
        etch.destroy(this);
    }
    serialize() {
        return Object.assign({}, this.props, { deserializer: 'HoogleWebView' });
    }
}
exports.HoogleWebView = HoogleWebView;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9vZ2xlLXdlYi12aWV3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2hvb2dsZS13ZWItdmlldy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBLCtCQUEwQztBQUMxQyw2QkFBNEI7QUFRNUI7SUFPRSxZQUFtQixRQUFnQixFQUFFO1FBQWxCLFVBQUssR0FBTCxLQUFLLENBQWE7UUFON0IsZ0JBQVcsR0FBRyxJQUFJLDBCQUFtQixFQUFFLENBQUE7UUFDdkMsZUFBVSxHQUFHLEdBQUcsQ0FBQTtRQStFaEIsWUFBTyxHQUFHLEdBQUcsRUFBRTtZQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUMsQ0FBQTtRQUN4RCxDQUFDLENBQUE7UUFFTyxnQkFBVyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQW1CLEVBQUUsRUFBRTtZQUNqRCxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUE7UUFDdEIsQ0FBQyxDQUFBO1FBL0VDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUE7UUFHckIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQ2xCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLGtDQUFrQyxFQUFFLENBQUMsVUFBa0IsRUFBRSxFQUFFO1lBQzdFLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFBO1lBRTVCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDbkIsQ0FBQyxDQUFDLENBQ0gsQ0FBQTtJQUNILENBQUM7SUFFTSxNQUFNO1FBRVgsTUFBTSxDQUFDLENBQ0wsa0JBQUssS0FBSyxFQUFDLG9CQUFvQjtZQUM3QixrQkFBSyxLQUFLLEVBQUMseUNBQXlDO2dCQUNsRCxxQkFDRSxLQUFLLEVBQUMsMEJBQTBCLEVBQ2hDLEVBQUUsRUFBRSxFQUFHLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxnQ0FBZ0MsQ0FBQyxDQUFBLENBQUcsQ0FBQyxFQUFDLEdBQ3RHO2dCQUNGLHFCQUNFLEtBQUssRUFBQyw2QkFBNkIsRUFDbkMsRUFBRSxFQUFFLEVBQUcsS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLG1DQUFtQyxDQUFDLENBQUEsQ0FBRyxDQUFDLEVBQUMsR0FDekcsQ0FDRTtZQUNOLHNCQUNFLEdBQUcsRUFBQyxTQUFTLEVBQ2IsS0FBSyxFQUFDLDRDQUE0QyxFQUNsRCxHQUFHLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQ25CLFFBQVEsRUFBQyxJQUFJLEVBQ2IsRUFBRSxFQUFFO29CQUNGLFdBQVcsRUFBRSxJQUFJLENBQUMsT0FBTztvQkFDekIsY0FBYyxFQUFFLElBQUksQ0FBQyxXQUFXO29CQUNoQyxzQkFBc0IsRUFBRSxJQUFJLENBQUMsV0FBVztpQkFDekMsR0FDRCxDQUNFLENBQ1AsQ0FBQTtJQUVILENBQUM7SUFFWSxNQUFNLENBQUMsS0FBYTs7WUFDL0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUE7WUFJNUIsQ0FBQztZQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQzFCLENBQUM7S0FBQTtJQUVNLE1BQU07UUFDWCxNQUFNLENBQUMsMkJBQTJCLENBQUE7SUFDcEMsQ0FBQztJQUVNLFFBQVE7UUFDYixNQUFNLENBQUMsWUFBWSxDQUFBO0lBQ3JCLENBQUM7SUFFTSxPQUFPO1FBQ1osSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUUxQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3BCLENBQUM7SUFFTSxTQUFTO1FBQ2QsTUFBTSxtQkFDRCxJQUFJLENBQUMsS0FBSyxJQUNiLFlBQVksRUFBRSxlQUFlLElBQzlCO0lBQ0gsQ0FBQztDQVNGO0FBeEZELHNDQXdGQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHRzbGludDpkaXNhYmxlOiBqc3gtbm8tbXVsdGlsaW5lLWpzXG5pbXBvcnQgeyBDb21wb3NpdGVEaXNwb3NhYmxlIH0gZnJvbSAnYXRvbSdcbmltcG9ydCAqIGFzIGV0Y2ggZnJvbSAnZXRjaCdcblxuZXhwb3J0IGludGVyZmFjZSBJUHJvcHMgZXh0ZW5kcyBKU1guUHJvcHMge1xuICB1cmw/OiBzdHJpbmdcbn1cblxudHlwZSBFbGVtZW50Q2xhc3MgPSBKU1guRWxlbWVudENsYXNzXG5cbmV4cG9ydCBjbGFzcyBIb29nbGVXZWJWaWV3IGltcGxlbWVudHMgRWxlbWVudENsYXNzIHtcbiAgcHJpdmF0ZSBkaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKClcbiAgcHJpdmF0ZSB6b29tRmFjdG9yID0gMTAwXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tdW5pbml0aWFsaXplZFxuICBwcml2YXRlIHJlZnM6IHtcbiAgICB3ZWJWaWV3OiBFbGVjdHJvbi5XZWJWaWV3RWxlbWVudFxuICB9XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBwcm9wczogSVByb3BzID0ge30pIHtcbiAgICBldGNoLmluaXRpYWxpemUodGhpcylcbiAgICAvLyBDcmVhdGUgbWVzc2FnZSBlbGVtZW50XG5cbiAgICB0aGlzLmRpc3Bvc2FibGVzLmFkZChcbiAgICAgIGF0b20uY29uZmlnLm9ic2VydmUoJ2lkZS1oYXNrZWxsLWhvb2dsZS53ZWJab29tRmFjdG9yJywgKHpvb21GYWN0b3I6IG51bWJlcikgPT4ge1xuICAgICAgICB0aGlzLnpvb21GYWN0b3IgPSB6b29tRmFjdG9yXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1mbG9hdGluZy1wcm9taXNlc1xuICAgICAgICBldGNoLnVwZGF0ZSh0aGlzKVxuICAgICAgfSksXG4gICAgKVxuICB9XG5cbiAgcHVibGljIHJlbmRlcigpIHtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZTpuby11bnNhZmUtYW55XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3M9XCJpZGUtaGFza2VsbC1ob29nbGVcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImlkZS1oYXNrZWxsLWhvb2dsZS13ZWItbmF2YmFyIGJ0bi1ncm91cFwiPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGJ0bi1iYWNrXCJcbiAgICAgICAgICAgIG9uPXt7ICBjbGljazogKCkgPT4geyBhdG9tLmNvbW1hbmRzLmRpc3BhdGNoKHRoaXMucmVmcy53ZWJWaWV3LCAnaWRlLWhhc2tlbGwtaG9vZ2xlOndlYi1nby1iYWNrJykgICB9fX1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGJ0bi1mb3J3YXJkXCJcbiAgICAgICAgICAgIG9uPXt7ICBjbGljazogKCkgPT4geyBhdG9tLmNvbW1hbmRzLmRpc3BhdGNoKHRoaXMucmVmcy53ZWJWaWV3LCAnaWRlLWhhc2tlbGwtaG9vZ2xlOndlYi1nby1mb3J3YXJkJykgICB9fX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPHdlYnZpZXdcbiAgICAgICAgICByZWY9XCJ3ZWJWaWV3XCJcbiAgICAgICAgICBjbGFzcz1cImlkZS1oYXNrZWxsLWhvb2dsZS13ZWIgbmF0aXZlLWtleS1iaW5kaW5nc1wiXG4gICAgICAgICAgc3JjPXt0aGlzLnByb3BzLnVybH1cbiAgICAgICAgICB0YWJJbmRleD1cIi0xXCJcbiAgICAgICAgICBvbj17e1xuICAgICAgICAgICAgJ2RvbS1yZWFkeSc6IHRoaXMuc2V0Wm9vbSxcbiAgICAgICAgICAgICdkaWQtbmF2aWdhdGUnOiB0aGlzLmRpZE5hdmlnYXRlLFxuICAgICAgICAgICAgJ2RpZC1uYXZpZ2F0ZS1pbi1wYWdlJzogdGhpcy5kaWROYXZpZ2F0ZSxcbiAgICAgICAgICB9fVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKVxuICAgIC8vIHRzbGludDplbmFibGU6bm8tdW5zYWZlLWFueVxuICB9XG5cbiAgcHVibGljIGFzeW5jIHVwZGF0ZShwcm9wczogSVByb3BzKSB7XG4gICAgaWYgKHRoaXMucHJvcHMudXJsICE9PSBwcm9wcy51cmwpIHtcbiAgICAgIHRoaXMucHJvcHMudXJsID0gcHJvcHMudXJsXG4gICAgICAvLyB0aGlzLnJlZnMud2ViVmlld1xuICAgICAgLy8gJiYgcHJvcHMudXJsXG4gICAgICAvLyAmJiB0aGlzLnJlZnMud2ViVmlldy5sb2FkVVJMKHByb3BzLnVybClcbiAgICB9XG4gICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpXG4gIH1cblxuICBwdWJsaWMgZ2V0VVJJKCkge1xuICAgIHJldHVybiAnaWRlLWhhc2tlbGw6Ly9ob29nbGUvd2ViLydcbiAgfVxuXG4gIHB1YmxpYyBnZXRUaXRsZSgpIHtcbiAgICByZXR1cm4gJ0hvb2dsZSB3ZWInXG4gIH1cblxuICBwdWJsaWMgZGVzdHJveSgpIHtcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmRpc3Bvc2UoKVxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1mbG9hdGluZy1wcm9taXNlc1xuICAgIGV0Y2guZGVzdHJveSh0aGlzKVxuICB9XG5cbiAgcHVibGljIHNlcmlhbGl6ZSgpOiBJUHJvcHMgJiB7IGRlc2VyaWFsaXplcjogc3RyaW5nIH0ge1xuICAgIHJldHVybiB7XG4gICAgICAuLi50aGlzLnByb3BzLFxuICAgICAgZGVzZXJpYWxpemVyOiAnSG9vZ2xlV2ViVmlldycsXG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXRab29tID0gKCkgPT4ge1xuICAgIHRoaXMucmVmcy53ZWJWaWV3LnNldFpvb21GYWN0b3IodGhpcy56b29tRmFjdG9yIC8gMTAwKVxuICB9XG5cbiAgcHJpdmF0ZSBkaWROYXZpZ2F0ZSA9ICh7IHVybCB9OiB7IHVybDogc3RyaW5nIH0pID0+IHtcbiAgICB0aGlzLnByb3BzLnVybCA9IHVybFxuICB9XG59XG4iXX0=