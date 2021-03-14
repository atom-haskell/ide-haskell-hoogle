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
}
exports.HoogleWebView = HoogleWebView;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9vZ2xlLXdlYi12aWV3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2hvb2dsZS13ZWItdmlldy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsK0JBQTBDO0FBQzFDLDZCQUE0QjtBQVE1QixNQUFhLGFBQWE7SUFPeEIsWUFBbUIsUUFBZ0IsRUFBRTtRQUFsQixVQUFLLEdBQUwsS0FBSyxDQUFhO1FBTjdCLGdCQUFXLEdBQUcsSUFBSSwwQkFBbUIsRUFBRSxDQUFBO1FBQ3ZDLGVBQVUsR0FBRyxHQUFHLENBQUE7UUErRWhCLFlBQU8sR0FBRyxHQUFHLEVBQUU7WUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLENBQUE7UUFDeEQsQ0FBQyxDQUFBO1FBRU8sZ0JBQVcsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFtQixFQUFFLEVBQUU7WUFDakQsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFBO1FBQ3RCLENBQUMsQ0FBQTtRQS9FQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBR3JCLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUNsQixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxrQ0FBa0MsRUFBRSxDQUFDLFVBQWtCLEVBQUUsRUFBRTtZQUM3RSxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQTtZQUU1QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ25CLENBQUMsQ0FBQyxDQUNILENBQUE7SUFDSCxDQUFDO0lBRU0sTUFBTTtRQUVYLE9BQU8sQ0FDTCxrQkFBSyxLQUFLLEVBQUMsb0JBQW9CO1lBQzdCLGtCQUFLLEtBQUssRUFBQyx5Q0FBeUM7Z0JBQ2xELHFCQUNFLEtBQUssRUFBQywwQkFBMEIsRUFDaEMsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLGdDQUFnQyxDQUFDLENBQUEsQ0FBQyxDQUFDLEVBQUUsR0FDcEc7Z0JBQ0YscUJBQ0UsS0FBSyxFQUFDLDZCQUE2QixFQUNuQyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsbUNBQW1DLENBQUMsQ0FBQSxDQUFDLENBQUMsRUFBRSxHQUN2RyxDQUNFO1lBQ04sc0JBQ0UsR0FBRyxFQUFDLFNBQVMsRUFDYixLQUFLLEVBQUMsNENBQTRDLEVBQ2xELEdBQUcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFDbkIsUUFBUSxFQUFDLElBQUksRUFDYixFQUFFLEVBQUU7b0JBQ0YsV0FBVyxFQUFFLElBQUksQ0FBQyxPQUFPO29CQUN6QixjQUFjLEVBQUUsSUFBSSxDQUFDLFdBQVc7b0JBQ2hDLHNCQUFzQixFQUFFLElBQUksQ0FBQyxXQUFXO2lCQUN6QyxHQUNELENBQ0UsQ0FDUCxDQUFBO0lBRUgsQ0FBQztJQUVNLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBYTtRQUMvQixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLEtBQUssQ0FBQyxHQUFHLEVBQUU7WUFDaEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQTtTQUkzQjtRQUNELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUMxQixDQUFDO0lBRU0sTUFBTTs7UUFDWCxPQUFPLDRCQUE0QixNQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxtQ0FBSSxFQUFFLEVBQUUsQ0FBQTtJQUMzRCxDQUFDO0lBRU0sUUFBUTtRQUNiLE9BQU8sWUFBWSxDQUFBO0lBQ3JCLENBQUM7SUFFTSxPQUFPO1FBQ1osSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUUxQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3BCLENBQUM7SUFFTSxTQUFTO1FBQ2QsdUNBQ0ssSUFBSSxDQUFDLEtBQUssS0FDYixZQUFZLEVBQUUsZUFBZSxJQUM5QjtJQUNILENBQUM7Q0FTRjtBQXhGRCxzQ0F3RkMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0c2xpbnQ6ZGlzYWJsZToganN4LW5vLW11bHRpbGluZS1qc1xuaW1wb3J0IHsgQ29tcG9zaXRlRGlzcG9zYWJsZSB9IGZyb20gJ2F0b20nXG5pbXBvcnQgKiBhcyBldGNoIGZyb20gJ2V0Y2gnXG5cbmV4cG9ydCBpbnRlcmZhY2UgSVByb3BzIGV4dGVuZHMgSlNYLlByb3BzIHtcbiAgdXJsPzogc3RyaW5nXG59XG5cbnR5cGUgRWxlbWVudENsYXNzID0gSlNYLkVsZW1lbnRDbGFzc1xuXG5leHBvcnQgY2xhc3MgSG9vZ2xlV2ViVmlldyBpbXBsZW1lbnRzIEVsZW1lbnRDbGFzcyB7XG4gIHByaXZhdGUgZGlzcG9zYWJsZXMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpXG4gIHByaXZhdGUgem9vbUZhY3RvciA9IDEwMFxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLXVuaW5pdGlhbGl6ZWRcbiAgcHJpdmF0ZSByZWZzIToge1xuICAgIHdlYlZpZXc6IEVsZWN0cm9uLldlYlZpZXdFbGVtZW50XG4gIH1cbiAgY29uc3RydWN0b3IocHVibGljIHByb3BzOiBJUHJvcHMgPSB7fSkge1xuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKVxuICAgIC8vIENyZWF0ZSBtZXNzYWdlIGVsZW1lbnRcblxuICAgIHRoaXMuZGlzcG9zYWJsZXMuYWRkKFxuICAgICAgYXRvbS5jb25maWcub2JzZXJ2ZSgnaWRlLWhhc2tlbGwtaG9vZ2xlLndlYlpvb21GYWN0b3InLCAoem9vbUZhY3RvcjogbnVtYmVyKSA9PiB7XG4gICAgICAgIHRoaXMuem9vbUZhY3RvciA9IHpvb21GYWN0b3JcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWZsb2F0aW5nLXByb21pc2VzXG4gICAgICAgIGV0Y2gudXBkYXRlKHRoaXMpXG4gICAgICB9KSxcbiAgICApXG4gIH1cblxuICBwdWJsaWMgcmVuZGVyKCkge1xuICAgIC8vIHRzbGludDpkaXNhYmxlOm5vLXVuc2FmZS1hbnlcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzcz1cImlkZS1oYXNrZWxsLWhvb2dsZVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiaWRlLWhhc2tlbGwtaG9vZ2xlLXdlYi1uYXZiYXIgYnRuLWdyb3VwXCI+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYnRuLWJhY2tcIlxuICAgICAgICAgICAgb249e3sgY2xpY2s6ICgpID0+IHsgYXRvbS5jb21tYW5kcy5kaXNwYXRjaCh0aGlzLnJlZnMud2ViVmlldywgJ2lkZS1oYXNrZWxsLWhvb2dsZTp3ZWItZ28tYmFjaycpIH0gfX1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGJ0bi1mb3J3YXJkXCJcbiAgICAgICAgICAgIG9uPXt7IGNsaWNrOiAoKSA9PiB7IGF0b20uY29tbWFuZHMuZGlzcGF0Y2godGhpcy5yZWZzLndlYlZpZXcsICdpZGUtaGFza2VsbC1ob29nbGU6d2ViLWdvLWZvcndhcmQnKSB9IH19XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDx3ZWJ2aWV3XG4gICAgICAgICAgcmVmPVwid2ViVmlld1wiXG4gICAgICAgICAgY2xhc3M9XCJpZGUtaGFza2VsbC1ob29nbGUtd2ViIG5hdGl2ZS1rZXktYmluZGluZ3NcIlxuICAgICAgICAgIHNyYz17dGhpcy5wcm9wcy51cmx9XG4gICAgICAgICAgdGFiSW5kZXg9XCItMVwiXG4gICAgICAgICAgb249e3tcbiAgICAgICAgICAgICdkb20tcmVhZHknOiB0aGlzLnNldFpvb20sXG4gICAgICAgICAgICAnZGlkLW5hdmlnYXRlJzogdGhpcy5kaWROYXZpZ2F0ZSxcbiAgICAgICAgICAgICdkaWQtbmF2aWdhdGUtaW4tcGFnZSc6IHRoaXMuZGlkTmF2aWdhdGUsXG4gICAgICAgICAgfX1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgICAvLyB0c2xpbnQ6ZW5hYmxlOm5vLXVuc2FmZS1hbnlcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyB1cGRhdGUocHJvcHM6IElQcm9wcykge1xuICAgIGlmICh0aGlzLnByb3BzLnVybCAhPT0gcHJvcHMudXJsKSB7XG4gICAgICB0aGlzLnByb3BzLnVybCA9IHByb3BzLnVybFxuICAgICAgLy8gdGhpcy5yZWZzLndlYlZpZXdcbiAgICAgIC8vICYmIHByb3BzLnVybFxuICAgICAgLy8gJiYgdGhpcy5yZWZzLndlYlZpZXcubG9hZFVSTChwcm9wcy51cmwpXG4gICAgfVxuICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKVxuICB9XG5cbiAgcHVibGljIGdldFVSSSgpIHtcbiAgICByZXR1cm4gYGlkZS1oYXNrZWxsOi8vaG9vZ2xlL3dlYi8ke3RoaXMucHJvcHMudXJsID8/ICcnfWBcbiAgfVxuXG4gIHB1YmxpYyBnZXRUaXRsZSgpIHtcbiAgICByZXR1cm4gJ0hvb2dsZSB3ZWInXG4gIH1cblxuICBwdWJsaWMgZGVzdHJveSgpIHtcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmRpc3Bvc2UoKVxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1mbG9hdGluZy1wcm9taXNlc1xuICAgIGV0Y2guZGVzdHJveSh0aGlzKVxuICB9XG5cbiAgcHVibGljIHNlcmlhbGl6ZSgpOiBJUHJvcHMgJiB7IGRlc2VyaWFsaXplcjogc3RyaW5nIH0ge1xuICAgIHJldHVybiB7XG4gICAgICAuLi50aGlzLnByb3BzLFxuICAgICAgZGVzZXJpYWxpemVyOiAnSG9vZ2xlV2ViVmlldycsXG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXRab29tID0gKCkgPT4ge1xuICAgIHRoaXMucmVmcy53ZWJWaWV3LnNldFpvb21GYWN0b3IodGhpcy56b29tRmFjdG9yIC8gMTAwKVxuICB9XG5cbiAgcHJpdmF0ZSBkaWROYXZpZ2F0ZSA9ICh7IHVybCB9OiB7IHVybDogc3RyaW5nIH0pID0+IHtcbiAgICB0aGlzLnByb3BzLnVybCA9IHVybFxuICB9XG59XG4iXX0=