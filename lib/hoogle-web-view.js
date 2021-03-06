"use strict";
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
    async update(props) {
        if (this.props.url !== props.url) {
            this.props.url = props.url;
        }
        return etch.update(this);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9vZ2xlLXdlYi12aWV3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2hvb2dsZS13ZWItdmlldy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSwrQkFBMEM7QUFDMUMsNkJBQTRCO0FBUTVCO0lBT0UsWUFBbUIsUUFBZ0IsRUFBRTtRQUFsQixVQUFLLEdBQUwsS0FBSyxDQUFhO1FBTjdCLGdCQUFXLEdBQUcsSUFBSSwwQkFBbUIsRUFBRSxDQUFBO1FBQ3ZDLGVBQVUsR0FBRyxHQUFHLENBQUE7UUErRWhCLFlBQU8sR0FBRyxHQUFHLEVBQUU7WUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLENBQUE7UUFDeEQsQ0FBQyxDQUFBO1FBRU8sZ0JBQVcsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFtQixFQUFFLEVBQUU7WUFDakQsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFBO1FBQ3RCLENBQUMsQ0FBQTtRQS9FQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBR3JCLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUNsQixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxrQ0FBa0MsRUFBRSxDQUFDLFVBQWtCLEVBQUUsRUFBRTtZQUM3RSxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQTtZQUU1QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ25CLENBQUMsQ0FBQyxDQUNILENBQUE7SUFDSCxDQUFDO0lBRU0sTUFBTTtRQUVYLE1BQU0sQ0FBQyxDQUNMLGtCQUFLLEtBQUssRUFBQyxvQkFBb0I7WUFDN0Isa0JBQUssS0FBSyxFQUFDLHlDQUF5QztnQkFDbEQscUJBQ0UsS0FBSyxFQUFDLDBCQUEwQixFQUNoQyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsZ0NBQWdDLENBQUMsQ0FBQSxDQUFDLENBQUMsRUFBRSxHQUNwRztnQkFDRixxQkFDRSxLQUFLLEVBQUMsNkJBQTZCLEVBQ25DLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxtQ0FBbUMsQ0FBQyxDQUFBLENBQUMsQ0FBQyxFQUFFLEdBQ3ZHLENBQ0U7WUFDTixzQkFDRSxHQUFHLEVBQUMsU0FBUyxFQUNiLEtBQUssRUFBQyw0Q0FBNEMsRUFDbEQsR0FBRyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUNuQixRQUFRLEVBQUMsSUFBSSxFQUNiLEVBQUUsRUFBRTtvQkFDRixXQUFXLEVBQUUsSUFBSSxDQUFDLE9BQU87b0JBQ3pCLGNBQWMsRUFBRSxJQUFJLENBQUMsV0FBVztvQkFDaEMsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLFdBQVc7aUJBQ3pDLEdBQ0QsQ0FDRSxDQUNQLENBQUE7SUFFSCxDQUFDO0lBRU0sS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFhO1FBQy9CLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUE7UUFJNUIsQ0FBQztRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQzFCLENBQUM7SUFFTSxNQUFNO1FBQ1gsTUFBTSxDQUFDLDJCQUEyQixDQUFBO0lBQ3BDLENBQUM7SUFFTSxRQUFRO1FBQ2IsTUFBTSxDQUFDLFlBQVksQ0FBQTtJQUNyQixDQUFDO0lBRU0sT0FBTztRQUNaLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUE7UUFFMUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNwQixDQUFDO0lBRU0sU0FBUztRQUNkLE1BQU0sbUJBQ0QsSUFBSSxDQUFDLEtBQUssSUFDYixZQUFZLEVBQUUsZUFBZSxJQUM5QjtJQUNILENBQUM7Q0FTRjtBQXhGRCxzQ0F3RkMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0c2xpbnQ6ZGlzYWJsZToganN4LW5vLW11bHRpbGluZS1qc1xuaW1wb3J0IHsgQ29tcG9zaXRlRGlzcG9zYWJsZSB9IGZyb20gJ2F0b20nXG5pbXBvcnQgKiBhcyBldGNoIGZyb20gJ2V0Y2gnXG5cbmV4cG9ydCBpbnRlcmZhY2UgSVByb3BzIGV4dGVuZHMgSlNYLlByb3BzIHtcbiAgdXJsPzogc3RyaW5nXG59XG5cbnR5cGUgRWxlbWVudENsYXNzID0gSlNYLkVsZW1lbnRDbGFzc1xuXG5leHBvcnQgY2xhc3MgSG9vZ2xlV2ViVmlldyBpbXBsZW1lbnRzIEVsZW1lbnRDbGFzcyB7XG4gIHByaXZhdGUgZGlzcG9zYWJsZXMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpXG4gIHByaXZhdGUgem9vbUZhY3RvciA9IDEwMFxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLXVuaW5pdGlhbGl6ZWRcbiAgcHJpdmF0ZSByZWZzOiB7XG4gICAgd2ViVmlldzogRWxlY3Ryb24uV2ViVmlld0VsZW1lbnRcbiAgfVxuICBjb25zdHJ1Y3RvcihwdWJsaWMgcHJvcHM6IElQcm9wcyA9IHt9KSB7XG4gICAgZXRjaC5pbml0aWFsaXplKHRoaXMpXG4gICAgLy8gQ3JlYXRlIG1lc3NhZ2UgZWxlbWVudFxuXG4gICAgdGhpcy5kaXNwb3NhYmxlcy5hZGQoXG4gICAgICBhdG9tLmNvbmZpZy5vYnNlcnZlKCdpZGUtaGFza2VsbC1ob29nbGUud2ViWm9vbUZhY3RvcicsICh6b29tRmFjdG9yOiBudW1iZXIpID0+IHtcbiAgICAgICAgdGhpcy56b29tRmFjdG9yID0gem9vbUZhY3RvclxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZmxvYXRpbmctcHJvbWlzZXNcbiAgICAgICAgZXRjaC51cGRhdGUodGhpcylcbiAgICAgIH0pLFxuICAgIClcbiAgfVxuXG4gIHB1YmxpYyByZW5kZXIoKSB7XG4gICAgLy8gdHNsaW50OmRpc2FibGU6bm8tdW5zYWZlLWFueVxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzPVwiaWRlLWhhc2tlbGwtaG9vZ2xlXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJpZGUtaGFza2VsbC1ob29nbGUtd2ViLW5hdmJhciBidG4tZ3JvdXBcIj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBidG4tYmFja1wiXG4gICAgICAgICAgICBvbj17eyBjbGljazogKCkgPT4geyBhdG9tLmNvbW1hbmRzLmRpc3BhdGNoKHRoaXMucmVmcy53ZWJWaWV3LCAnaWRlLWhhc2tlbGwtaG9vZ2xlOndlYi1nby1iYWNrJykgfSB9fVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYnRuLWZvcndhcmRcIlxuICAgICAgICAgICAgb249e3sgY2xpY2s6ICgpID0+IHsgYXRvbS5jb21tYW5kcy5kaXNwYXRjaCh0aGlzLnJlZnMud2ViVmlldywgJ2lkZS1oYXNrZWxsLWhvb2dsZTp3ZWItZ28tZm9yd2FyZCcpIH0gfX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPHdlYnZpZXdcbiAgICAgICAgICByZWY9XCJ3ZWJWaWV3XCJcbiAgICAgICAgICBjbGFzcz1cImlkZS1oYXNrZWxsLWhvb2dsZS13ZWIgbmF0aXZlLWtleS1iaW5kaW5nc1wiXG4gICAgICAgICAgc3JjPXt0aGlzLnByb3BzLnVybH1cbiAgICAgICAgICB0YWJJbmRleD1cIi0xXCJcbiAgICAgICAgICBvbj17e1xuICAgICAgICAgICAgJ2RvbS1yZWFkeSc6IHRoaXMuc2V0Wm9vbSxcbiAgICAgICAgICAgICdkaWQtbmF2aWdhdGUnOiB0aGlzLmRpZE5hdmlnYXRlLFxuICAgICAgICAgICAgJ2RpZC1uYXZpZ2F0ZS1pbi1wYWdlJzogdGhpcy5kaWROYXZpZ2F0ZSxcbiAgICAgICAgICB9fVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKVxuICAgIC8vIHRzbGludDplbmFibGU6bm8tdW5zYWZlLWFueVxuICB9XG5cbiAgcHVibGljIGFzeW5jIHVwZGF0ZShwcm9wczogSVByb3BzKSB7XG4gICAgaWYgKHRoaXMucHJvcHMudXJsICE9PSBwcm9wcy51cmwpIHtcbiAgICAgIHRoaXMucHJvcHMudXJsID0gcHJvcHMudXJsXG4gICAgICAvLyB0aGlzLnJlZnMud2ViVmlld1xuICAgICAgLy8gJiYgcHJvcHMudXJsXG4gICAgICAvLyAmJiB0aGlzLnJlZnMud2ViVmlldy5sb2FkVVJMKHByb3BzLnVybClcbiAgICB9XG4gICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpXG4gIH1cblxuICBwdWJsaWMgZ2V0VVJJKCkge1xuICAgIHJldHVybiAnaWRlLWhhc2tlbGw6Ly9ob29nbGUvd2ViLydcbiAgfVxuXG4gIHB1YmxpYyBnZXRUaXRsZSgpIHtcbiAgICByZXR1cm4gJ0hvb2dsZSB3ZWInXG4gIH1cblxuICBwdWJsaWMgZGVzdHJveSgpIHtcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmRpc3Bvc2UoKVxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1mbG9hdGluZy1wcm9taXNlc1xuICAgIGV0Y2guZGVzdHJveSh0aGlzKVxuICB9XG5cbiAgcHVibGljIHNlcmlhbGl6ZSgpOiBJUHJvcHMgJiB7IGRlc2VyaWFsaXplcjogc3RyaW5nIH0ge1xuICAgIHJldHVybiB7XG4gICAgICAuLi50aGlzLnByb3BzLFxuICAgICAgZGVzZXJpYWxpemVyOiAnSG9vZ2xlV2ViVmlldycsXG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXRab29tID0gKCkgPT4ge1xuICAgIHRoaXMucmVmcy53ZWJWaWV3LnNldFpvb21GYWN0b3IodGhpcy56b29tRmFjdG9yIC8gMTAwKVxuICB9XG5cbiAgcHJpdmF0ZSBkaWROYXZpZ2F0ZSA9ICh7IHVybCB9OiB7IHVybDogc3RyaW5nIH0pID0+IHtcbiAgICB0aGlzLnByb3BzLnVybCA9IHVybFxuICB9XG59XG4iXX0=