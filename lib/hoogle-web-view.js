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
    setZoom() {
        this.refs.webView.setZoomFactor(this.zoomFactor / 100);
    }
    didNavigate({ url }) {
        this.props.url = url;
    }
}
exports.HoogleWebView = HoogleWebView;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9vZ2xlLXdlYi12aWV3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2hvb2dsZS13ZWItdmlldy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBLCtCQUEwQztBQUMxQyw2QkFBNEI7QUFNNUI7SUFPRSxZQUFtQixRQUFnQixFQUFFO1FBQWxCLFVBQUssR0FBTCxLQUFLLENBQWE7UUFON0IsZ0JBQVcsR0FBRyxJQUFJLDBCQUFtQixFQUFFLENBQUE7UUFDdkMsZUFBVSxHQUFHLEdBQUcsQ0FBQTtRQU10QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBR3JCLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUNsQixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxrQ0FBa0MsRUFBRSxDQUFDLFVBQWtCO1lBQ3pFLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFBO1lBQzVCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDbkIsQ0FBQyxDQUFDLENBQ0gsQ0FBQTtJQUNILENBQUM7SUFFTSxNQUFNO1FBQ1gsTUFBTSxDQUFDLENBQ0wsa0JBQUssS0FBSyxFQUFDLG9CQUFvQjtZQUM3QixrQkFBSyxLQUFLLEVBQUMseUNBQXlDO2dCQUNsRCxxQkFDRSxLQUFLLEVBQUMsMEJBQTBCLEVBQ2hDLEVBQUUsRUFBRSxFQUFDLEtBQUssRUFBRSxRQUFRLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLGdDQUFnQyxDQUFDLENBQUEsQ0FBQyxDQUFDLEVBQUMsR0FDbEc7Z0JBQ0YscUJBQ0UsS0FBSyxFQUFDLDZCQUE2QixFQUNuQyxFQUFFLEVBQUUsRUFBQyxLQUFLLEVBQUUsUUFBUSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxtQ0FBbUMsQ0FBQyxDQUFBLENBQUMsQ0FBQyxFQUFDLEdBQ3JHLENBQ0U7WUFDTixzQkFDRSxHQUFHLEVBQUMsU0FBUyxFQUNiLEtBQUssRUFBQyw0Q0FBNEMsRUFDbEQsR0FBRyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUNuQixRQUFRLEVBQUMsSUFBSSxFQUViLEVBQUUsRUFBRTtvQkFDRixXQUFXLEVBQUUsSUFBSSxDQUFDLE9BQU87b0JBQ3pCLGNBQWMsRUFBRSxJQUFJLENBQUMsV0FBVztvQkFDaEMsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLFdBQVc7aUJBQ3pDLEdBRUQsQ0FDRSxDQUNQLENBQUE7SUFDSCxDQUFDO0lBRVksTUFBTSxDQUFDLEtBQWE7O1lBQy9CLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNqQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFBO1lBSTVCLENBQUM7WUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUMxQixDQUFDO0tBQUE7SUFFTSxNQUFNO1FBQ1gsTUFBTSxDQUFDLDJCQUEyQixDQUFBO0lBQ3BDLENBQUM7SUFFTSxRQUFRO1FBQ2IsTUFBTSxDQUFDLFlBQVksQ0FBQTtJQUNyQixDQUFDO0lBRU0sT0FBTztRQUNaLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUE7UUFDMUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNwQixDQUFDO0lBRU0sU0FBUztRQUNkLE1BQU0sbUJBQ0QsSUFBSSxDQUFDLEtBQUssSUFDYixZQUFZLEVBQUUsZUFBZSxJQUM5QjtJQUNILENBQUM7SUFFTyxPQUFPO1FBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLENBQUE7SUFDeEQsQ0FBQztJQUVPLFdBQVcsQ0FBQyxFQUFFLEdBQUcsRUFBbUI7UUFDMUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFBO0lBQ3RCLENBQUM7Q0FDRjtBQXRGRCxzQ0FzRkMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0c2xpbnQ6ZGlzYWJsZToganN4LW5vLW11bHRpbGluZS1qc1xuaW1wb3J0IHsgQ29tcG9zaXRlRGlzcG9zYWJsZSB9IGZyb20gJ2F0b20nXG5pbXBvcnQgKiBhcyBldGNoIGZyb20gJ2V0Y2gnXG5cbmV4cG9ydCBpbnRlcmZhY2UgSVByb3BzIGV4dGVuZHMgSlNYLlByb3BzIHtcbiAgdXJsPzogc3RyaW5nXG59XG5cbmV4cG9ydCBjbGFzcyBIb29nbGVXZWJWaWV3IGltcGxlbWVudHMgSlNYLkVsZW1lbnRDbGFzcyB7XG4gIHByaXZhdGUgZGlzcG9zYWJsZXMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpXG4gIHByaXZhdGUgem9vbUZhY3RvciA9IDEwMFxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLXVuaW5pdGlhbGl6ZWRcbiAgcHJpdmF0ZSByZWZzOiB7XG4gICAgd2ViVmlldzogRWxlY3Ryb24uV2ViVmlld0VsZW1lbnRcbiAgfVxuICBjb25zdHJ1Y3RvcihwdWJsaWMgcHJvcHM6IElQcm9wcyA9IHt9KSB7XG4gICAgZXRjaC5pbml0aWFsaXplKHRoaXMpXG4gICAgLy8gQ3JlYXRlIG1lc3NhZ2UgZWxlbWVudFxuXG4gICAgdGhpcy5kaXNwb3NhYmxlcy5hZGQoXG4gICAgICBhdG9tLmNvbmZpZy5vYnNlcnZlKCdpZGUtaGFza2VsbC1ob29nbGUud2ViWm9vbUZhY3RvcicsICh6b29tRmFjdG9yOiBudW1iZXIpID0+IHtcbiAgICAgICAgdGhpcy56b29tRmFjdG9yID0gem9vbUZhY3RvclxuICAgICAgICBldGNoLnVwZGF0ZSh0aGlzKVxuICAgICAgfSksXG4gICAgKVxuICB9XG5cbiAgcHVibGljIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzcz1cImlkZS1oYXNrZWxsLWhvb2dsZVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiaWRlLWhhc2tlbGwtaG9vZ2xlLXdlYi1uYXZiYXIgYnRuLWdyb3VwXCI+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYnRuLWJhY2tcIlxuICAgICAgICAgICAgb249e3tjbGljazogKCkgPT4geyBhdG9tLmNvbW1hbmRzLmRpc3BhdGNoKHRoaXMucmVmcy53ZWJWaWV3LCAnaWRlLWhhc2tlbGwtaG9vZ2xlOndlYi1nby1iYWNrJykgfX19XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBidG4tZm9yd2FyZFwiXG4gICAgICAgICAgICBvbj17e2NsaWNrOiAoKSA9PiB7IGF0b20uY29tbWFuZHMuZGlzcGF0Y2godGhpcy5yZWZzLndlYlZpZXcsICdpZGUtaGFza2VsbC1ob29nbGU6d2ViLWdvLWZvcndhcmQnKSB9fX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPHdlYnZpZXdcbiAgICAgICAgICByZWY9XCJ3ZWJWaWV3XCJcbiAgICAgICAgICBjbGFzcz1cImlkZS1oYXNrZWxsLWhvb2dsZS13ZWIgbmF0aXZlLWtleS1iaW5kaW5nc1wiXG4gICAgICAgICAgc3JjPXt0aGlzLnByb3BzLnVybH1cbiAgICAgICAgICB0YWJJbmRleD1cIi0xXCJcbiAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZTogbm8tdW5ib3VuZC1tZXRob2RcbiAgICAgICAgICBvbj17e1xuICAgICAgICAgICAgJ2RvbS1yZWFkeSc6IHRoaXMuc2V0Wm9vbSxcbiAgICAgICAgICAgICdkaWQtbmF2aWdhdGUnOiB0aGlzLmRpZE5hdmlnYXRlLFxuICAgICAgICAgICAgJ2RpZC1uYXZpZ2F0ZS1pbi1wYWdlJzogdGhpcy5kaWROYXZpZ2F0ZSxcbiAgICAgICAgICB9fVxuICAgICAgICAgIC8vIHRzbGludDplbmFibGU6IG5vLXVuYm91bmQtbWV0aG9kXG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgdXBkYXRlKHByb3BzOiBJUHJvcHMpIHtcbiAgICBpZiAodGhpcy5wcm9wcy51cmwgIT09IHByb3BzLnVybCkge1xuICAgICAgdGhpcy5wcm9wcy51cmwgPSBwcm9wcy51cmxcbiAgICAgIC8vIHRoaXMucmVmcy53ZWJWaWV3XG4gICAgICAvLyAmJiBwcm9wcy51cmxcbiAgICAgIC8vICYmIHRoaXMucmVmcy53ZWJWaWV3LmxvYWRVUkwocHJvcHMudXJsKVxuICAgIH1cbiAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcylcbiAgfVxuXG4gIHB1YmxpYyBnZXRVUkkoKSB7XG4gICAgcmV0dXJuICdpZGUtaGFza2VsbDovL2hvb2dsZS93ZWIvJ1xuICB9XG5cbiAgcHVibGljIGdldFRpdGxlKCkge1xuICAgIHJldHVybiAnSG9vZ2xlIHdlYidcbiAgfVxuXG4gIHB1YmxpYyBkZXN0cm95KCkge1xuICAgIHRoaXMuZGlzcG9zYWJsZXMuZGlzcG9zZSgpXG4gICAgZXRjaC5kZXN0cm95KHRoaXMpXG4gIH1cblxuICBwdWJsaWMgc2VyaWFsaXplKCk6IElQcm9wcyAmIHsgZGVzZXJpYWxpemVyOiBzdHJpbmcgfSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnRoaXMucHJvcHMsXG4gICAgICBkZXNlcmlhbGl6ZXI6ICdIb29nbGVXZWJWaWV3JyxcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldFpvb20oKSB7XG4gICAgdGhpcy5yZWZzLndlYlZpZXcuc2V0Wm9vbUZhY3Rvcih0aGlzLnpvb21GYWN0b3IgLyAxMDApXG4gIH1cblxuICBwcml2YXRlIGRpZE5hdmlnYXRlKHsgdXJsIH06IHsgdXJsOiBzdHJpbmcgfSkge1xuICAgIHRoaXMucHJvcHMudXJsID0gdXJsXG4gIH1cbn1cbiJdfQ==