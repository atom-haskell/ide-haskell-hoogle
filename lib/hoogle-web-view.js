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
                etch.dom("button", { class: "btn btn-default btn-back", on: { click: () => {
                            atom.commands.dispatch(this.refs.webView, 'ide-haskell-hoogle:web-go-back');
                        } } }),
                etch.dom("button", { class: "btn btn-default btn-forward", on: { click: () => {
                            atom.commands.dispatch(this.refs.webView, 'ide-haskell-hoogle:web-go-forward');
                        } } })),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9vZ2xlLXdlYi12aWV3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2hvb2dsZS13ZWItdmlldy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLCtCQUF3QztBQUN4Qyw2QkFBNEI7QUFNNUI7SUFNRSxZQUFvQixRQUFnQixFQUFFO1FBQWxCLFVBQUssR0FBTCxLQUFLLENBQWE7UUFMOUIsZ0JBQVcsR0FBRyxJQUFJLDBCQUFtQixFQUFFLENBQUE7UUFDdkMsZUFBVSxHQUFHLEdBQUcsQ0FBQTtRQUt0QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBR3JCLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUNsQixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxrQ0FBa0MsRUFBRSxDQUFDLFVBQWtCO1lBQ3pFLElBQUksQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQTtZQUMxQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ25CLENBQUMsQ0FBQyxDQUNILENBQUE7SUFDSCxDQUFDO0lBRU0sTUFBTTtRQUNYLE1BQU0sQ0FBQyxDQUNMLGtCQUFLLEtBQUssRUFBQyxvQkFBb0I7WUFDN0Isa0JBQUssS0FBSyxFQUFDLHlDQUF5QztnQkFDbEQscUJBQ0UsS0FBSyxFQUFDLDBCQUEwQixFQUNoQyxFQUFFLEVBQUUsRUFBQyxLQUFLLEVBQUU7NEJBQ1YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsZ0NBQWdDLENBQUMsQ0FBQTt3QkFDN0UsQ0FBQyxFQUFDLEdBQ0Y7Z0JBQ0YscUJBQ0UsS0FBSyxFQUFDLDZCQUE2QixFQUNuQyxFQUFFLEVBQUUsRUFBQyxLQUFLLEVBQUU7NEJBQ1YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsbUNBQW1DLENBQUMsQ0FBQTt3QkFDaEYsQ0FBQyxFQUFDLEdBQ0YsQ0FDRTtZQUNOLHNCQUNFLEdBQUcsRUFBQyxTQUFTLEVBQ2IsS0FBSyxFQUFDLDRDQUE0QyxFQUNsRCxHQUFHLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQ25CLFFBQVEsRUFBQyxJQUFJLEVBQ2IsRUFBRSxFQUFFO29CQUNGLFdBQVcsRUFBRSxJQUFJLENBQUMsT0FBTztvQkFDekIsY0FBYyxFQUFFLElBQUksQ0FBQyxXQUFXO29CQUNoQyxzQkFBc0IsRUFBRSxJQUFJLENBQUMsV0FBVztpQkFDekMsR0FDQyxDQUNBLENBQ1AsQ0FBQTtJQUNILENBQUM7SUFFWSxNQUFNLENBQUUsS0FBYTs7WUFDaEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUE7WUFJNUIsQ0FBQztZQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQzFCLENBQUM7S0FBQTtJQUVNLE1BQU07UUFDWCxNQUFNLENBQUMsMkJBQTJCLENBQUE7SUFDcEMsQ0FBQztJQUVNLFFBQVE7UUFDYixNQUFNLENBQUMsWUFBWSxDQUFBO0lBQ3JCLENBQUM7SUFFTSxPQUFPO1FBQ1osSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUMxQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3BCLENBQUM7SUFFTSxTQUFTO1FBQ2QsTUFBTSxtQkFDRCxJQUFJLENBQUMsS0FBSyxJQUNiLFlBQVksRUFBRSxlQUFlLElBQzlCO0lBQ0gsQ0FBQztJQUVPLE9BQU87UUFDYixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUMsQ0FBQTtJQUN4RCxDQUFDO0lBRU8sV0FBVyxDQUFFLEVBQUMsR0FBRyxFQUFnQjtRQUN2QyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUE7SUFDdEIsQ0FBQztDQUNGO0FBdkZELHNDQXVGQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9zaXRlRGlzcG9zYWJsZX0gZnJvbSAnYXRvbSdcbmltcG9ydCAqIGFzIGV0Y2ggZnJvbSAnZXRjaCdcblxuZXhwb3J0IGludGVyZmFjZSBJUHJvcHMgZXh0ZW5kcyBKU1guUHJvcHMge1xuICB1cmw/OiBzdHJpbmdcbn1cblxuZXhwb3J0IGNsYXNzIEhvb2dsZVdlYlZpZXcgaW1wbGVtZW50cyBKU1guRWxlbWVudENsYXNzIHtcbiAgcHJpdmF0ZSBkaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKClcbiAgcHJpdmF0ZSB6b29tRmFjdG9yID0gMTAwXG4gIHByaXZhdGUgcmVmczoge1xuICAgIHdlYlZpZXc6IEVsZWN0cm9uLldlYlZpZXdFbGVtZW50XG4gIH1cbiAgY29uc3RydWN0b3IgKHB1YmxpYyBwcm9wczogSVByb3BzID0ge30pIHtcbiAgICBldGNoLmluaXRpYWxpemUodGhpcylcbiAgICAvLyBDcmVhdGUgbWVzc2FnZSBlbGVtZW50XG5cbiAgICB0aGlzLmRpc3Bvc2FibGVzLmFkZChcbiAgICAgIGF0b20uY29uZmlnLm9ic2VydmUoJ2lkZS1oYXNrZWxsLWhvb2dsZS53ZWJab29tRmFjdG9yJywgKHpvb21GYWN0b3I6IHN0cmluZykgPT4ge1xuICAgICAgICB0aGlzLnpvb21GYWN0b3IgPSBwYXJzZUludCh6b29tRmFjdG9yLCAxMClcbiAgICAgICAgZXRjaC51cGRhdGUodGhpcylcbiAgICAgIH0pXG4gICAgKVxuICB9XG5cbiAgcHVibGljIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3M9XCJpZGUtaGFza2VsbC1ob29nbGVcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImlkZS1oYXNrZWxsLWhvb2dsZS13ZWItbmF2YmFyIGJ0bi1ncm91cFwiPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGJ0bi1iYWNrXCJcbiAgICAgICAgICAgIG9uPXt7Y2xpY2s6ICgpID0+IHtcbiAgICAgICAgICAgICAgYXRvbS5jb21tYW5kcy5kaXNwYXRjaCh0aGlzLnJlZnMud2ViVmlldywgJ2lkZS1oYXNrZWxsLWhvb2dsZTp3ZWItZ28tYmFjaycpXG4gICAgICAgICAgICB9fX1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGJ0bi1mb3J3YXJkXCJcbiAgICAgICAgICAgIG9uPXt7Y2xpY2s6ICgpID0+IHtcbiAgICAgICAgICAgICAgYXRvbS5jb21tYW5kcy5kaXNwYXRjaCh0aGlzLnJlZnMud2ViVmlldywgJ2lkZS1oYXNrZWxsLWhvb2dsZTp3ZWItZ28tZm9yd2FyZCcpXG4gICAgICAgICAgICB9fX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPHdlYnZpZXdcbiAgICAgICAgICByZWY9XCJ3ZWJWaWV3XCJcbiAgICAgICAgICBjbGFzcz1cImlkZS1oYXNrZWxsLWhvb2dsZS13ZWIgbmF0aXZlLWtleS1iaW5kaW5nc1wiXG4gICAgICAgICAgc3JjPXt0aGlzLnByb3BzLnVybH1cbiAgICAgICAgICB0YWJJbmRleD1cIi0xXCJcbiAgICAgICAgICBvbj17e1xuICAgICAgICAgICAgJ2RvbS1yZWFkeSc6IHRoaXMuc2V0Wm9vbSxcbiAgICAgICAgICAgICdkaWQtbmF2aWdhdGUnOiB0aGlzLmRpZE5hdmlnYXRlLFxuICAgICAgICAgICAgJ2RpZC1uYXZpZ2F0ZS1pbi1wYWdlJzogdGhpcy5kaWROYXZpZ2F0ZSxcbiAgICAgICAgICB9fVxuICAgICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgdXBkYXRlIChwcm9wczogSVByb3BzKSB7XG4gICAgaWYgKHRoaXMucHJvcHMudXJsICE9PSBwcm9wcy51cmwpIHtcbiAgICAgIHRoaXMucHJvcHMudXJsID0gcHJvcHMudXJsXG4gICAgICAvLyB0aGlzLnJlZnMud2ViVmlld1xuICAgICAgLy8gJiYgcHJvcHMudXJsXG4gICAgICAvLyAmJiB0aGlzLnJlZnMud2ViVmlldy5sb2FkVVJMKHByb3BzLnVybClcbiAgICB9XG4gICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpXG4gIH1cblxuICBwdWJsaWMgZ2V0VVJJICgpIHtcbiAgICByZXR1cm4gJ2lkZS1oYXNrZWxsOi8vaG9vZ2xlL3dlYi8nXG4gIH1cblxuICBwdWJsaWMgZ2V0VGl0bGUgKCkge1xuICAgIHJldHVybiAnSG9vZ2xlIHdlYidcbiAgfVxuXG4gIHB1YmxpYyBkZXN0cm95ICgpIHtcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmRpc3Bvc2UoKVxuICAgIGV0Y2guZGVzdHJveSh0aGlzKVxuICB9XG5cbiAgcHVibGljIHNlcmlhbGl6ZSAoKTogSVByb3BzICYge2Rlc2VyaWFsaXplcjogc3RyaW5nfSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnRoaXMucHJvcHMsXG4gICAgICBkZXNlcmlhbGl6ZXI6ICdIb29nbGVXZWJWaWV3JyxcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldFpvb20gKCkge1xuICAgIHRoaXMucmVmcy53ZWJWaWV3LnNldFpvb21GYWN0b3IodGhpcy56b29tRmFjdG9yIC8gMTAwKVxuICB9XG5cbiAgcHJpdmF0ZSBkaWROYXZpZ2F0ZSAoe3VybH06IHt1cmw6IHN0cmluZ30pIHtcbiAgICB0aGlzLnByb3BzLnVybCA9IHVybFxuICB9XG59XG4iXX0=