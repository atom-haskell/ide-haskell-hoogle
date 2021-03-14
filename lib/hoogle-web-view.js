"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HoogleWebView = void 0;
const atom_1 = require("atom");
const etch = require("etch");
class HoogleWebView {
    constructor(props = {}) {
        this.props = props;
        this.disposables = new atom_1.CompositeDisposable();
        this.zoomFactor = 100;
        this.canShowWebview = false;
        this.setZoom = () => {
            this.refs.webView && this.refs.webView.setZoomFactor(this.zoomFactor / 100);
        };
        this.didNavigate = ({ url }) => {
            this.props.url = url;
        };
        etch.initialize(this);
        this.disposables.add(atom.config.observe('ide-haskell-hoogle.webZoomFactor', (zoomFactor) => {
            this.zoomFactor = zoomFactor;
            etch.update(this);
        }));
        this.canShowWebview = atom.packages.hasActivatedInitialPackages();
        if (!this.canShowWebview) {
            const disp = atom.packages.onDidActivateInitialPackages(() => {
                disp.dispose();
                this.canShowWebview = true;
                etch.update(this);
            });
        }
    }
    render() {
        return (etch.dom("div", { class: "ide-haskell-hoogle" },
            etch.dom("div", { class: "ide-haskell-hoogle-web-navbar btn-group" },
                etch.dom("button", { class: "btn btn-default btn-back", on: { click: () => { this.refs.webView && atom.commands.dispatch(this.refs.webView, 'ide-haskell-hoogle:web-go-back'); } } }),
                etch.dom("button", { class: "btn btn-default btn-forward", on: { click: () => { this.refs.webView && atom.commands.dispatch(this.refs.webView, 'ide-haskell-hoogle:web-go-forward'); } } })),
            this.webview()));
    }
    async update(props) {
        if (this.props.url !== props.url) {
            this.props.url = props.url;
        }
        return etch.update(this);
    }
    getURI() {
        var _a;
        return `ide-haskell://hoogle/web/${(_a = this.props.url) !== null && _a !== void 0 ? _a : ''}`;
    }
    getTitle() {
        return 'Hoogle web';
    }
    destroy() {
        this.disposables.dispose();
        etch.destroy(this);
    }
    serialize() {
        return Object.assign(Object.assign({}, this.props), { deserializer: 'HoogleWebView' });
    }
    webview() {
        if (!this.canShowWebview)
            return null;
        return (etch.dom("webview", { ref: "webView", class: "ide-haskell-hoogle-web native-key-bindings", src: this.props.url, tabIndex: "-1", on: {
                'dom-ready': this.setZoom,
                'did-navigate': this.didNavigate,
                'did-navigate-in-page': this.didNavigate,
            } }));
    }
}
exports.HoogleWebView = HoogleWebView;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9vZ2xlLXdlYi12aWV3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2hvb2dsZS13ZWItdmlldy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsK0JBQTBDO0FBQzFDLDZCQUE0QjtBQVE1QixNQUFhLGFBQWE7SUFReEIsWUFBbUIsUUFBZ0IsRUFBRTtRQUFsQixVQUFLLEdBQUwsS0FBSyxDQUFhO1FBUDdCLGdCQUFXLEdBQUcsSUFBSSwwQkFBbUIsRUFBRSxDQUFBO1FBQ3ZDLGVBQVUsR0FBRyxHQUFHLENBQUE7UUFLaEIsbUJBQWMsR0FBRyxLQUFLLENBQUE7UUF5RXRCLFlBQU8sR0FBRyxHQUFHLEVBQUU7WUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLENBQUE7UUFDN0UsQ0FBQyxDQUFBO1FBRU8sZ0JBQVcsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFtQixFQUFFLEVBQUU7WUFDakQsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFBO1FBQ3RCLENBQUMsQ0FBQTtRQTdFQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBR3JCLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUNsQixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxrQ0FBa0MsRUFBRSxDQUFDLFVBQWtCLEVBQUUsRUFBRTtZQUM3RSxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQTtZQUU1QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ25CLENBQUMsQ0FBQyxDQUNILENBQUE7UUFDRCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsMkJBQTJCLEVBQUUsQ0FBQTtRQUNqRSxJQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUN2QixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLDRCQUE0QixDQUFDLEdBQUcsRUFBRTtnQkFDM0QsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFBO2dCQUNkLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFBO2dCQUMxQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQ25CLENBQUMsQ0FBQyxDQUFBO1NBQ0g7SUFDSCxDQUFDO0lBRU0sTUFBTTtRQUVYLE9BQU8sQ0FDTCxrQkFBSyxLQUFLLEVBQUMsb0JBQW9CO1lBQzdCLGtCQUFLLEtBQUssRUFBQyx5Q0FBeUM7Z0JBQ2xELHFCQUNFLEtBQUssRUFBQywwQkFBMEIsRUFDaEMsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLGdDQUFnQyxDQUFDLENBQUEsQ0FBQyxDQUFDLEVBQUUsR0FDekg7Z0JBQ0YscUJBQ0UsS0FBSyxFQUFDLDZCQUE2QixFQUNuQyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsbUNBQW1DLENBQUMsQ0FBQSxDQUFDLENBQUMsRUFBRSxHQUM1SCxDQUNFO1lBQ0wsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUNYLENBQ1AsQ0FBQTtJQUVILENBQUM7SUFFTSxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQWE7UUFDL0IsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxLQUFLLENBQUMsR0FBRyxFQUFFO1lBQ2hDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUE7U0FJM0I7UUFDRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDMUIsQ0FBQztJQUVNLE1BQU07O1FBQ1gsT0FBTyw0QkFBNEIsTUFBQSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsbUNBQUksRUFBRSxFQUFFLENBQUE7SUFDM0QsQ0FBQztJQUVNLFFBQVE7UUFDYixPQUFPLFlBQVksQ0FBQTtJQUNyQixDQUFDO0lBRU0sT0FBTztRQUNaLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUE7UUFFMUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNwQixDQUFDO0lBRU0sU0FBUztRQUNkLHVDQUNLLElBQUksQ0FBQyxLQUFLLEtBQ2IsWUFBWSxFQUFFLGVBQWUsSUFDOUI7SUFDSCxDQUFDO0lBVU8sT0FBTztRQUNiLElBQUcsQ0FBQyxJQUFJLENBQUMsY0FBYztZQUFFLE9BQU8sSUFBSSxDQUFBO1FBQ3BDLE9BQU8sQ0FBQyxzQkFDTixHQUFHLEVBQUMsU0FBUyxFQUNiLEtBQUssRUFBQyw0Q0FBNEMsRUFDbEQsR0FBRyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUNuQixRQUFRLEVBQUMsSUFBSSxFQUNiLEVBQUUsRUFBRTtnQkFDRixXQUFXLEVBQUUsSUFBSSxDQUFDLE9BQU87Z0JBQ3pCLGNBQWMsRUFBRSxJQUFJLENBQUMsV0FBVztnQkFDaEMsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLFdBQVc7YUFDekMsR0FDRCxDQUFDLENBQUE7SUFDTCxDQUFDO0NBQ0Y7QUF0R0Qsc0NBc0dDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdHNsaW50OmRpc2FibGU6IGpzeC1uby1tdWx0aWxpbmUtanNcbmltcG9ydCB7IENvbXBvc2l0ZURpc3Bvc2FibGUgfSBmcm9tICdhdG9tJ1xuaW1wb3J0ICogYXMgZXRjaCBmcm9tICdldGNoJ1xuXG5leHBvcnQgaW50ZXJmYWNlIElQcm9wcyBleHRlbmRzIEpTWC5Qcm9wcyB7XG4gIHVybD86IHN0cmluZ1xufVxuXG50eXBlIEVsZW1lbnRDbGFzcyA9IEpTWC5FbGVtZW50Q2xhc3NcblxuZXhwb3J0IGNsYXNzIEhvb2dsZVdlYlZpZXcgaW1wbGVtZW50cyBFbGVtZW50Q2xhc3Mge1xuICBwcml2YXRlIGRpc3Bvc2FibGVzID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKVxuICBwcml2YXRlIHpvb21GYWN0b3IgPSAxMDBcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby11bmluaXRpYWxpemVkXG4gIHByaXZhdGUgcmVmcyE6IHtcbiAgICB3ZWJWaWV3PzogRWxlY3Ryb24uV2ViVmlld0VsZW1lbnRcbiAgfVxuICBwcml2YXRlIGNhblNob3dXZWJ2aWV3ID0gZmFsc2VcbiAgY29uc3RydWN0b3IocHVibGljIHByb3BzOiBJUHJvcHMgPSB7fSkge1xuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKVxuICAgIC8vIENyZWF0ZSBtZXNzYWdlIGVsZW1lbnRcblxuICAgIHRoaXMuZGlzcG9zYWJsZXMuYWRkKFxuICAgICAgYXRvbS5jb25maWcub2JzZXJ2ZSgnaWRlLWhhc2tlbGwtaG9vZ2xlLndlYlpvb21GYWN0b3InLCAoem9vbUZhY3RvcjogbnVtYmVyKSA9PiB7XG4gICAgICAgIHRoaXMuem9vbUZhY3RvciA9IHpvb21GYWN0b3JcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWZsb2F0aW5nLXByb21pc2VzXG4gICAgICAgIGV0Y2gudXBkYXRlKHRoaXMpXG4gICAgICB9KSxcbiAgICApXG4gICAgdGhpcy5jYW5TaG93V2VidmlldyA9IGF0b20ucGFja2FnZXMuaGFzQWN0aXZhdGVkSW5pdGlhbFBhY2thZ2VzKClcbiAgICBpZighdGhpcy5jYW5TaG93V2Vidmlldykge1xuICAgICAgY29uc3QgZGlzcCA9IGF0b20ucGFja2FnZXMub25EaWRBY3RpdmF0ZUluaXRpYWxQYWNrYWdlcygoKSA9PiB7XG4gICAgICAgIGRpc3AuZGlzcG9zZSgpXG4gICAgICAgIHRoaXMuY2FuU2hvd1dlYnZpZXcgPSB0cnVlXG4gICAgICAgIGV0Y2gudXBkYXRlKHRoaXMpXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyByZW5kZXIoKSB7XG4gICAgLy8gdHNsaW50OmRpc2FibGU6bm8tdW5zYWZlLWFueVxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzPVwiaWRlLWhhc2tlbGwtaG9vZ2xlXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJpZGUtaGFza2VsbC1ob29nbGUtd2ViLW5hdmJhciBidG4tZ3JvdXBcIj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBidG4tYmFja1wiXG4gICAgICAgICAgICBvbj17eyBjbGljazogKCkgPT4geyB0aGlzLnJlZnMud2ViVmlldyAmJiBhdG9tLmNvbW1hbmRzLmRpc3BhdGNoKHRoaXMucmVmcy53ZWJWaWV3LCAnaWRlLWhhc2tlbGwtaG9vZ2xlOndlYi1nby1iYWNrJykgfSB9fVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYnRuLWZvcndhcmRcIlxuICAgICAgICAgICAgb249e3sgY2xpY2s6ICgpID0+IHsgdGhpcy5yZWZzLndlYlZpZXcgJiYgYXRvbS5jb21tYW5kcy5kaXNwYXRjaCh0aGlzLnJlZnMud2ViVmlldywgJ2lkZS1oYXNrZWxsLWhvb2dsZTp3ZWItZ28tZm9yd2FyZCcpIH0gfX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAge3RoaXMud2VidmlldygpfVxuICAgICAgPC9kaXY+XG4gICAgKVxuICAgIC8vIHRzbGludDplbmFibGU6bm8tdW5zYWZlLWFueVxuICB9XG5cbiAgcHVibGljIGFzeW5jIHVwZGF0ZShwcm9wczogSVByb3BzKSB7XG4gICAgaWYgKHRoaXMucHJvcHMudXJsICE9PSBwcm9wcy51cmwpIHtcbiAgICAgIHRoaXMucHJvcHMudXJsID0gcHJvcHMudXJsXG4gICAgICAvLyB0aGlzLnJlZnMud2ViVmlld1xuICAgICAgLy8gJiYgcHJvcHMudXJsXG4gICAgICAvLyAmJiB0aGlzLnJlZnMud2ViVmlldy5sb2FkVVJMKHByb3BzLnVybClcbiAgICB9XG4gICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpXG4gIH1cblxuICBwdWJsaWMgZ2V0VVJJKCkge1xuICAgIHJldHVybiBgaWRlLWhhc2tlbGw6Ly9ob29nbGUvd2ViLyR7dGhpcy5wcm9wcy51cmwgPz8gJyd9YFxuICB9XG5cbiAgcHVibGljIGdldFRpdGxlKCkge1xuICAgIHJldHVybiAnSG9vZ2xlIHdlYidcbiAgfVxuXG4gIHB1YmxpYyBkZXN0cm95KCkge1xuICAgIHRoaXMuZGlzcG9zYWJsZXMuZGlzcG9zZSgpXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWZsb2F0aW5nLXByb21pc2VzXG4gICAgZXRjaC5kZXN0cm95KHRoaXMpXG4gIH1cblxuICBwdWJsaWMgc2VyaWFsaXplKCk6IElQcm9wcyAmIHsgZGVzZXJpYWxpemVyOiBzdHJpbmcgfSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnRoaXMucHJvcHMsXG4gICAgICBkZXNlcmlhbGl6ZXI6ICdIb29nbGVXZWJWaWV3JyxcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldFpvb20gPSAoKSA9PiB7XG4gICAgdGhpcy5yZWZzLndlYlZpZXcgJiYgdGhpcy5yZWZzLndlYlZpZXcuc2V0Wm9vbUZhY3Rvcih0aGlzLnpvb21GYWN0b3IgLyAxMDApXG4gIH1cblxuICBwcml2YXRlIGRpZE5hdmlnYXRlID0gKHsgdXJsIH06IHsgdXJsOiBzdHJpbmcgfSkgPT4ge1xuICAgIHRoaXMucHJvcHMudXJsID0gdXJsXG4gIH1cblxuICBwcml2YXRlIHdlYnZpZXcoKSB7XG4gICAgaWYoIXRoaXMuY2FuU2hvd1dlYnZpZXcpIHJldHVybiBudWxsXG4gICAgcmV0dXJuICg8d2Vidmlld1xuICAgICAgcmVmPVwid2ViVmlld1wiXG4gICAgICBjbGFzcz1cImlkZS1oYXNrZWxsLWhvb2dsZS13ZWIgbmF0aXZlLWtleS1iaW5kaW5nc1wiXG4gICAgICBzcmM9e3RoaXMucHJvcHMudXJsfVxuICAgICAgdGFiSW5kZXg9XCItMVwiXG4gICAgICBvbj17e1xuICAgICAgICAnZG9tLXJlYWR5JzogdGhpcy5zZXRab29tLFxuICAgICAgICAnZGlkLW5hdmlnYXRlJzogdGhpcy5kaWROYXZpZ2F0ZSxcbiAgICAgICAgJ2RpZC1uYXZpZ2F0ZS1pbi1wYWdlJzogdGhpcy5kaWROYXZpZ2F0ZSxcbiAgICAgIH19XG4gICAgLz4pXG4gIH1cbn1cbiJdfQ==