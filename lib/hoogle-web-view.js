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
                etch.dom("button", { class: "btn btn-default btn-back", on: {
                        click: () => {
                            this.refs.webView &&
                                atom.commands.dispatch(this.refs.webView, 'ide-haskell-hoogle:web-go-back');
                        },
                    } }),
                etch.dom("button", { class: "btn btn-default btn-forward", on: {
                        click: () => {
                            this.refs.webView &&
                                atom.commands.dispatch(this.refs.webView, 'ide-haskell-hoogle:web-go-forward');
                        },
                    } })),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9vZ2xlLXdlYi12aWV3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2hvb2dsZS13ZWItdmlldy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsK0JBQTBDO0FBRTFDLDZCQUE0QjtBQVE1QixNQUFhLGFBQWE7SUFPeEIsWUFBbUIsUUFBZ0IsRUFBRTtRQUFsQixVQUFLLEdBQUwsS0FBSyxDQUFhO1FBTjdCLGdCQUFXLEdBQUcsSUFBSSwwQkFBbUIsRUFBRSxDQUFBO1FBQ3ZDLGVBQVUsR0FBRyxHQUFHLENBQUE7UUFJaEIsbUJBQWMsR0FBRyxLQUFLLENBQUE7UUEyRnRCLFlBQU8sR0FBRyxHQUFHLEVBQUU7WUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLENBQUE7UUFDN0UsQ0FBQyxDQUFBO1FBRU8sZ0JBQVcsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFtQixFQUFFLEVBQUU7WUFDakQsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFBO1FBQ3RCLENBQUMsQ0FBQTtRQS9GQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBR3JCLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUNsQixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FDakIsa0NBQWtDLEVBQ2xDLENBQUMsVUFBa0IsRUFBRSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFBO1lBRTVCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDbkIsQ0FBQyxDQUNGLENBQ0YsQ0FBQTtRQUNELElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQywyQkFBMkIsRUFBRSxDQUFBO1FBQ2pFLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ3hCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsNEJBQTRCLENBQUMsR0FBRyxFQUFFO2dCQUMzRCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUE7Z0JBQ2QsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUE7Z0JBRTFCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDbkIsQ0FBQyxDQUFDLENBQUE7U0FDSDtJQUNILENBQUM7SUFFTSxNQUFNO1FBQ1gsT0FBTyxDQUNMLGtCQUFLLEtBQUssRUFBQyxvQkFBb0I7WUFDN0Isa0JBQUssS0FBSyxFQUFDLHlDQUF5QztnQkFDbEQscUJBQ0UsS0FBSyxFQUFDLDBCQUEwQixFQUNoQyxFQUFFLEVBQUU7d0JBQ0YsS0FBSyxFQUFFLEdBQUcsRUFBRTs0QkFDVixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU87Z0NBQ2YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUNqQixnQ0FBZ0MsQ0FDakMsQ0FBQTt3QkFDTCxDQUFDO3FCQUNGLEdBQ0Q7Z0JBQ0YscUJBQ0UsS0FBSyxFQUFDLDZCQUE2QixFQUNuQyxFQUFFLEVBQUU7d0JBQ0YsS0FBSyxFQUFFLEdBQUcsRUFBRTs0QkFDVixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU87Z0NBQ2YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUNqQixtQ0FBbUMsQ0FDcEMsQ0FBQTt3QkFDTCxDQUFDO3FCQUNGLEdBQ0QsQ0FDRTtZQUNMLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FDWCxDQUNQLENBQUE7SUFDSCxDQUFDO0lBRU0sS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFhO1FBQy9CLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssS0FBSyxDQUFDLEdBQUcsRUFBRTtZQUNoQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFBO1NBSTNCO1FBQ0QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQzFCLENBQUM7SUFFTSxNQUFNOztRQUNYLE9BQU8sNEJBQTRCLE1BQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLG1DQUFJLEVBQUUsRUFBRSxDQUFBO0lBQzNELENBQUM7SUFFTSxRQUFRO1FBQ2IsT0FBTyxZQUFZLENBQUE7SUFDckIsQ0FBQztJQUVNLE9BQU87UUFDWixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFBO1FBRTFCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDcEIsQ0FBQztJQUVNLFNBQVM7UUFDZCx1Q0FDSyxJQUFJLENBQUMsS0FBSyxLQUNiLFlBQVksRUFBRSxlQUFlLElBQzlCO0lBQ0gsQ0FBQztJQVVPLE9BQU87UUFFYixJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWM7WUFBRSxPQUFPLElBQUksQ0FBQTtRQUNyQyxPQUFPLENBQ0wsc0JBQ0UsR0FBRyxFQUFDLFNBQVMsRUFDYixLQUFLLEVBQUMsNENBQTRDLEVBQ2xELEdBQUcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFDbkIsUUFBUSxFQUFDLElBQUksRUFDYixFQUFFLEVBQUU7Z0JBQ0YsV0FBVyxFQUFFLElBQUksQ0FBQyxPQUFPO2dCQUN6QixjQUFjLEVBQUUsSUFBSSxDQUFDLFdBQVc7Z0JBQ2hDLHNCQUFzQixFQUFFLElBQUksQ0FBQyxXQUFXO2FBQ3pDLEdBQ0QsQ0FDSCxDQUFBO0lBQ0gsQ0FBQztDQUNGO0FBMUhELHNDQTBIQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHRzbGludDpkaXNhYmxlOiBqc3gtbm8tbXVsdGlsaW5lLWpzXG5pbXBvcnQgeyBDb21wb3NpdGVEaXNwb3NhYmxlIH0gZnJvbSAnYXRvbSdcbmltcG9ydCB0eXBlIHsgV2Vidmlld1RhZyB9IGZyb20gJ2VsZWN0cm9uJ1xuaW1wb3J0ICogYXMgZXRjaCBmcm9tICdldGNoJ1xuXG5leHBvcnQgaW50ZXJmYWNlIElQcm9wcyBleHRlbmRzIEpTWC5Qcm9wcyB7XG4gIHVybD86IHN0cmluZ1xufVxuXG50eXBlIEVsZW1lbnRDbGFzcyA9IEpTWC5FbGVtZW50Q2xhc3NcblxuZXhwb3J0IGNsYXNzIEhvb2dsZVdlYlZpZXcgaW1wbGVtZW50cyBFbGVtZW50Q2xhc3Mge1xuICBwcml2YXRlIGRpc3Bvc2FibGVzID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKVxuICBwcml2YXRlIHpvb21GYWN0b3IgPSAxMDBcbiAgcHJpdmF0ZSByZWZzIToge1xuICAgIHdlYlZpZXc/OiBXZWJ2aWV3VGFnXG4gIH1cbiAgcHJpdmF0ZSBjYW5TaG93V2VidmlldyA9IGZhbHNlXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBwcm9wczogSVByb3BzID0ge30pIHtcbiAgICBldGNoLmluaXRpYWxpemUodGhpcylcbiAgICAvLyBDcmVhdGUgbWVzc2FnZSBlbGVtZW50XG5cbiAgICB0aGlzLmRpc3Bvc2FibGVzLmFkZChcbiAgICAgIGF0b20uY29uZmlnLm9ic2VydmUoXG4gICAgICAgICdpZGUtaGFza2VsbC1ob29nbGUud2ViWm9vbUZhY3RvcicsXG4gICAgICAgICh6b29tRmFjdG9yOiBudW1iZXIpID0+IHtcbiAgICAgICAgICB0aGlzLnpvb21GYWN0b3IgPSB6b29tRmFjdG9yXG4gICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1mbG9hdGluZy1wcm9taXNlc1xuICAgICAgICAgIGV0Y2gudXBkYXRlKHRoaXMpXG4gICAgICAgIH0sXG4gICAgICApLFxuICAgIClcbiAgICB0aGlzLmNhblNob3dXZWJ2aWV3ID0gYXRvbS5wYWNrYWdlcy5oYXNBY3RpdmF0ZWRJbml0aWFsUGFja2FnZXMoKVxuICAgIGlmICghdGhpcy5jYW5TaG93V2Vidmlldykge1xuICAgICAgY29uc3QgZGlzcCA9IGF0b20ucGFja2FnZXMub25EaWRBY3RpdmF0ZUluaXRpYWxQYWNrYWdlcygoKSA9PiB7XG4gICAgICAgIGRpc3AuZGlzcG9zZSgpXG4gICAgICAgIHRoaXMuY2FuU2hvd1dlYnZpZXcgPSB0cnVlXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tZmxvYXRpbmctcHJvbWlzZXNcbiAgICAgICAgZXRjaC51cGRhdGUodGhpcylcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgcHVibGljIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzcz1cImlkZS1oYXNrZWxsLWhvb2dsZVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiaWRlLWhhc2tlbGwtaG9vZ2xlLXdlYi1uYXZiYXIgYnRuLWdyb3VwXCI+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYnRuLWJhY2tcIlxuICAgICAgICAgICAgb249e3tcbiAgICAgICAgICAgICAgY2xpY2s6ICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnMud2ViVmlldyAmJlxuICAgICAgICAgICAgICAgICAgYXRvbS5jb21tYW5kcy5kaXNwYXRjaChcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZzLndlYlZpZXcsXG4gICAgICAgICAgICAgICAgICAgICdpZGUtaGFza2VsbC1ob29nbGU6d2ViLWdvLWJhY2snLFxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGJ0bi1mb3J3YXJkXCJcbiAgICAgICAgICAgIG9uPXt7XG4gICAgICAgICAgICAgIGNsaWNrOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWZzLndlYlZpZXcgJiZcbiAgICAgICAgICAgICAgICAgIGF0b20uY29tbWFuZHMuZGlzcGF0Y2goXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcy53ZWJWaWV3LFxuICAgICAgICAgICAgICAgICAgICAnaWRlLWhhc2tlbGwtaG9vZ2xlOndlYi1nby1mb3J3YXJkJyxcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHt0aGlzLndlYnZpZXcoKX1cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyB1cGRhdGUocHJvcHM6IElQcm9wcykge1xuICAgIGlmICh0aGlzLnByb3BzLnVybCAhPT0gcHJvcHMudXJsKSB7XG4gICAgICB0aGlzLnByb3BzLnVybCA9IHByb3BzLnVybFxuICAgICAgLy8gdGhpcy5yZWZzLndlYlZpZXdcbiAgICAgIC8vICYmIHByb3BzLnVybFxuICAgICAgLy8gJiYgdGhpcy5yZWZzLndlYlZpZXcubG9hZFVSTChwcm9wcy51cmwpXG4gICAgfVxuICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKVxuICB9XG5cbiAgcHVibGljIGdldFVSSSgpIHtcbiAgICByZXR1cm4gYGlkZS1oYXNrZWxsOi8vaG9vZ2xlL3dlYi8ke3RoaXMucHJvcHMudXJsID8/ICcnfWBcbiAgfVxuXG4gIHB1YmxpYyBnZXRUaXRsZSgpIHtcbiAgICByZXR1cm4gJ0hvb2dsZSB3ZWInXG4gIH1cblxuICBwdWJsaWMgZGVzdHJveSgpIHtcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmRpc3Bvc2UoKVxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1mbG9hdGluZy1wcm9taXNlc1xuICAgIGV0Y2guZGVzdHJveSh0aGlzKVxuICB9XG5cbiAgcHVibGljIHNlcmlhbGl6ZSgpOiBJUHJvcHMgJiB7IGRlc2VyaWFsaXplcjogc3RyaW5nIH0ge1xuICAgIHJldHVybiB7XG4gICAgICAuLi50aGlzLnByb3BzLFxuICAgICAgZGVzZXJpYWxpemVyOiAnSG9vZ2xlV2ViVmlldycsXG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXRab29tID0gKCkgPT4ge1xuICAgIHRoaXMucmVmcy53ZWJWaWV3ICYmIHRoaXMucmVmcy53ZWJWaWV3LnNldFpvb21GYWN0b3IodGhpcy56b29tRmFjdG9yIC8gMTAwKVxuICB9XG5cbiAgcHJpdmF0ZSBkaWROYXZpZ2F0ZSA9ICh7IHVybCB9OiB7IHVybDogc3RyaW5nIH0pID0+IHtcbiAgICB0aGlzLnByb3BzLnVybCA9IHVybFxuICB9XG5cbiAgcHJpdmF0ZSB3ZWJ2aWV3KCkge1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tbnVsbC1rZXl3b3JkXG4gICAgaWYgKCF0aGlzLmNhblNob3dXZWJ2aWV3KSByZXR1cm4gbnVsbFxuICAgIHJldHVybiAoXG4gICAgICA8d2Vidmlld1xuICAgICAgICByZWY9XCJ3ZWJWaWV3XCJcbiAgICAgICAgY2xhc3M9XCJpZGUtaGFza2VsbC1ob29nbGUtd2ViIG5hdGl2ZS1rZXktYmluZGluZ3NcIlxuICAgICAgICBzcmM9e3RoaXMucHJvcHMudXJsfVxuICAgICAgICB0YWJJbmRleD1cIi0xXCJcbiAgICAgICAgb249e3tcbiAgICAgICAgICAnZG9tLXJlYWR5JzogdGhpcy5zZXRab29tLFxuICAgICAgICAgICdkaWQtbmF2aWdhdGUnOiB0aGlzLmRpZE5hdmlnYXRlLFxuICAgICAgICAgICdkaWQtbmF2aWdhdGUtaW4tcGFnZSc6IHRoaXMuZGlkTmF2aWdhdGUsXG4gICAgICAgIH19XG4gICAgICAvPlxuICAgIClcbiAgfVxufVxuIl19