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
        etch.initialize(this);
        this.disposables.add(atom.config.observe('ide-haskell-hoogle.webZoomFactor', (zoomFactor) => {
            this.zoomFactor = parseInt(zoomFactor, 10);
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
    setZoom() {
        this.refs.webView.setZoomFactor(this.zoomFactor / 100);
    }
    didNavigate({ url }) {
        this.props.url = url;
    }
}
exports.HoogleWebView = HoogleWebView;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9vZ2xlLXdlYi12aWV3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2hvb2dsZS13ZWItdmlldy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBLCtCQUEwQztBQUMxQyw2QkFBNEI7QUFNNUI7SUFPRSxZQUFtQixRQUFnQixFQUFFO1FBQWxCLFVBQUssR0FBTCxLQUFLLENBQWE7UUFON0IsZ0JBQVcsR0FBRyxJQUFJLDBCQUFtQixFQUFFLENBQUE7UUFDdkMsZUFBVSxHQUFHLEdBQUcsQ0FBQTtRQU10QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBR3JCLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUNsQixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxrQ0FBa0MsRUFBRSxDQUFDLFVBQWtCO1lBQ3pFLElBQUksQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQTtZQUMxQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ25CLENBQUMsQ0FBQyxDQUNILENBQUE7SUFDSCxDQUFDO0lBRU0sTUFBTTtRQUNYLE1BQU0sQ0FBQyxDQUNMLGtCQUFLLEtBQUssRUFBQyxvQkFBb0I7WUFDN0Isa0JBQUssS0FBSyxFQUFDLHlDQUF5QztnQkFDbEQscUJBQ0UsS0FBSyxFQUFDLDBCQUEwQixFQUNoQyxFQUFFLEVBQUUsRUFBQyxLQUFLLEVBQUUsUUFBUSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxnQ0FBZ0MsQ0FBQyxDQUFBLENBQUMsQ0FBQyxFQUFDLEdBQ2xHO2dCQUNGLHFCQUNFLEtBQUssRUFBQyw2QkFBNkIsRUFDbkMsRUFBRSxFQUFFLEVBQUMsS0FBSyxFQUFFLFFBQVEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsbUNBQW1DLENBQUMsQ0FBQSxDQUFDLENBQUMsRUFBQyxHQUNyRyxDQUNFO1lBQ04sc0JBQ0UsR0FBRyxFQUFDLFNBQVMsRUFDYixLQUFLLEVBQUMsNENBQTRDLEVBQ2xELEdBQUcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFDbkIsUUFBUSxFQUFDLElBQUksRUFFYixFQUFFLEVBQUU7b0JBQ0YsV0FBVyxFQUFFLElBQUksQ0FBQyxPQUFPO29CQUN6QixjQUFjLEVBQUUsSUFBSSxDQUFDLFdBQVc7b0JBQ2hDLHNCQUFzQixFQUFFLElBQUksQ0FBQyxXQUFXO2lCQUN6QyxHQUVELENBQ0UsQ0FDUCxDQUFBO0lBQ0gsQ0FBQztJQUVZLE1BQU0sQ0FBQyxLQUFhOztZQUMvQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDakMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQTtZQUk1QixDQUFDO1lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDMUIsQ0FBQztLQUFBO0lBRU0sTUFBTTtRQUNYLE1BQU0sQ0FBQywyQkFBMkIsQ0FBQTtJQUNwQyxDQUFDO0lBRU0sUUFBUTtRQUNiLE1BQU0sQ0FBQyxZQUFZLENBQUE7SUFDckIsQ0FBQztJQUVNLE9BQU87UUFDWixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFBO1FBQzFCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDcEIsQ0FBQztJQUVNLFNBQVM7UUFDZCxNQUFNLG1CQUNELElBQUksQ0FBQyxLQUFLLElBQ2IsWUFBWSxFQUFFLGVBQWUsSUFDOUI7SUFDSCxDQUFDO0lBRU8sT0FBTztRQUNiLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQyxDQUFBO0lBQ3hELENBQUM7SUFFTyxXQUFXLENBQUMsRUFBRSxHQUFHLEVBQW1CO1FBQzFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQTtJQUN0QixDQUFDO0NBQ0Y7QUF0RkQsc0NBc0ZDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdHNsaW50OmRpc2FibGU6IGpzeC1uby1tdWx0aWxpbmUtanNcbmltcG9ydCB7IENvbXBvc2l0ZURpc3Bvc2FibGUgfSBmcm9tICdhdG9tJ1xuaW1wb3J0ICogYXMgZXRjaCBmcm9tICdldGNoJ1xuXG5leHBvcnQgaW50ZXJmYWNlIElQcm9wcyBleHRlbmRzIEpTWC5Qcm9wcyB7XG4gIHVybD86IHN0cmluZ1xufVxuXG5leHBvcnQgY2xhc3MgSG9vZ2xlV2ViVmlldyBpbXBsZW1lbnRzIEpTWC5FbGVtZW50Q2xhc3Mge1xuICBwcml2YXRlIGRpc3Bvc2FibGVzID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKVxuICBwcml2YXRlIHpvb21GYWN0b3IgPSAxMDBcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby11bmluaXRpYWxpemVkXG4gIHByaXZhdGUgcmVmczoge1xuICAgIHdlYlZpZXc6IEVsZWN0cm9uLldlYlZpZXdFbGVtZW50XG4gIH1cbiAgY29uc3RydWN0b3IocHVibGljIHByb3BzOiBJUHJvcHMgPSB7fSkge1xuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKVxuICAgIC8vIENyZWF0ZSBtZXNzYWdlIGVsZW1lbnRcblxuICAgIHRoaXMuZGlzcG9zYWJsZXMuYWRkKFxuICAgICAgYXRvbS5jb25maWcub2JzZXJ2ZSgnaWRlLWhhc2tlbGwtaG9vZ2xlLndlYlpvb21GYWN0b3InLCAoem9vbUZhY3Rvcjogc3RyaW5nKSA9PiB7XG4gICAgICAgIHRoaXMuem9vbUZhY3RvciA9IHBhcnNlSW50KHpvb21GYWN0b3IsIDEwKVxuICAgICAgICBldGNoLnVwZGF0ZSh0aGlzKVxuICAgICAgfSksXG4gICAgKVxuICB9XG5cbiAgcHVibGljIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzcz1cImlkZS1oYXNrZWxsLWhvb2dsZVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiaWRlLWhhc2tlbGwtaG9vZ2xlLXdlYi1uYXZiYXIgYnRuLWdyb3VwXCI+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYnRuLWJhY2tcIlxuICAgICAgICAgICAgb249e3tjbGljazogKCkgPT4geyBhdG9tLmNvbW1hbmRzLmRpc3BhdGNoKHRoaXMucmVmcy53ZWJWaWV3LCAnaWRlLWhhc2tlbGwtaG9vZ2xlOndlYi1nby1iYWNrJykgfX19XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBidG4tZm9yd2FyZFwiXG4gICAgICAgICAgICBvbj17e2NsaWNrOiAoKSA9PiB7IGF0b20uY29tbWFuZHMuZGlzcGF0Y2godGhpcy5yZWZzLndlYlZpZXcsICdpZGUtaGFza2VsbC1ob29nbGU6d2ViLWdvLWZvcndhcmQnKSB9fX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPHdlYnZpZXdcbiAgICAgICAgICByZWY9XCJ3ZWJWaWV3XCJcbiAgICAgICAgICBjbGFzcz1cImlkZS1oYXNrZWxsLWhvb2dsZS13ZWIgbmF0aXZlLWtleS1iaW5kaW5nc1wiXG4gICAgICAgICAgc3JjPXt0aGlzLnByb3BzLnVybH1cbiAgICAgICAgICB0YWJJbmRleD1cIi0xXCJcbiAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZTogbm8tdW5ib3VuZC1tZXRob2RcbiAgICAgICAgICBvbj17e1xuICAgICAgICAgICAgJ2RvbS1yZWFkeSc6IHRoaXMuc2V0Wm9vbSxcbiAgICAgICAgICAgICdkaWQtbmF2aWdhdGUnOiB0aGlzLmRpZE5hdmlnYXRlLFxuICAgICAgICAgICAgJ2RpZC1uYXZpZ2F0ZS1pbi1wYWdlJzogdGhpcy5kaWROYXZpZ2F0ZSxcbiAgICAgICAgICB9fVxuICAgICAgICAgIC8vIHRzbGludDplbmFibGU6IG5vLXVuYm91bmQtbWV0aG9kXG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgdXBkYXRlKHByb3BzOiBJUHJvcHMpIHtcbiAgICBpZiAodGhpcy5wcm9wcy51cmwgIT09IHByb3BzLnVybCkge1xuICAgICAgdGhpcy5wcm9wcy51cmwgPSBwcm9wcy51cmxcbiAgICAgIC8vIHRoaXMucmVmcy53ZWJWaWV3XG4gICAgICAvLyAmJiBwcm9wcy51cmxcbiAgICAgIC8vICYmIHRoaXMucmVmcy53ZWJWaWV3LmxvYWRVUkwocHJvcHMudXJsKVxuICAgIH1cbiAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcylcbiAgfVxuXG4gIHB1YmxpYyBnZXRVUkkoKSB7XG4gICAgcmV0dXJuICdpZGUtaGFza2VsbDovL2hvb2dsZS93ZWIvJ1xuICB9XG5cbiAgcHVibGljIGdldFRpdGxlKCkge1xuICAgIHJldHVybiAnSG9vZ2xlIHdlYidcbiAgfVxuXG4gIHB1YmxpYyBkZXN0cm95KCkge1xuICAgIHRoaXMuZGlzcG9zYWJsZXMuZGlzcG9zZSgpXG4gICAgZXRjaC5kZXN0cm95KHRoaXMpXG4gIH1cblxuICBwdWJsaWMgc2VyaWFsaXplKCk6IElQcm9wcyAmIHsgZGVzZXJpYWxpemVyOiBzdHJpbmcgfSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnRoaXMucHJvcHMsXG4gICAgICBkZXNlcmlhbGl6ZXI6ICdIb29nbGVXZWJWaWV3JyxcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldFpvb20oKSB7XG4gICAgdGhpcy5yZWZzLndlYlZpZXcuc2V0Wm9vbUZhY3Rvcih0aGlzLnpvb21GYWN0b3IgLyAxMDApXG4gIH1cblxuICBwcml2YXRlIGRpZE5hdmlnYXRlKHsgdXJsIH06IHsgdXJsOiBzdHJpbmcgfSkge1xuICAgIHRoaXMucHJvcHMudXJsID0gdXJsXG4gIH1cbn1cbiJdfQ==