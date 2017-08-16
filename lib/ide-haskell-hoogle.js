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
const hoogle_doc_view_1 = require("./hoogle-doc-view");
const hoogle_web_view_1 = require("./hoogle-web-view");
const hoogle_1 = require("./hoogle");
const list_view_1 = require("./list-view");
const util_1 = require("./util");
var config_1 = require("./config");
exports.config = config_1.config;
const disposables = new atom_1.CompositeDisposable();
let hoogle;
function activate(state) {
    disposables.add(atom.packages.onDidTriggerActivationHook('language-haskell:grammar-used', () => reallyActivate(state)));
}
exports.activate = activate;
function createDocView(props) {
    return new hoogle_doc_view_1.HoogleDocView(props);
}
exports.createDocView = createDocView;
function createWebView(props) {
    return new hoogle_web_view_1.HoogleWebView(props);
}
exports.createWebView = createWebView;
function showDoc(ed, func) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = ed.tokenForBufferPosition(ed.getLastCursor().getBufferPosition());
        if (token) {
            const symbol = token.value;
            const symbols = yield hoogle.searchForSymbol(symbol);
            const item = yield list_view_1.selectListView(symbols);
            if (item) {
                func(item);
            }
        }
    });
}
function reallyActivate(state) {
    if (hoogle) {
        return;
    }
    hoogle = new hoogle_1.Hoogle();
    disposables.add(hoogle);
    disposables.add(atom.workspace.addOpener((uriToOpen, options) => {
        const m = uriToOpen.match(/^ide-haskell:\/\/hoogle\/(doc|web)\/(.*)$/);
        if (!(m && m[1])) {
            return;
        }
        switch (m[1]) {
            case 'doc':
                return new hoogle_doc_view_1.HoogleDocView();
            case 'web':
                return new hoogle_web_view_1.HoogleWebView();
        }
    }));
    disposables.add(atom.commands.add('webview.ide-haskell-hoogle-web', {
        'ide-haskell-hoogle:web-go-back': ({ currentTarget }) => currentTarget.goBack(),
        'ide-haskell-hoogle:web-go-forward': ({ currentTarget }) => currentTarget.goForward()
    }), atom.commands.add('atom-text-editor', {
        'ide-haskell-hoogle:show-doc-for-symbol': ({ currentTarget }) => {
            showDoc(currentTarget.getModel(), util_1.openDoc);
        },
        'ide-haskell-hoogle:show-web-doc-for-symbol': ({ currentTarget }) => {
            showDoc(currentTarget.getModel(), util_1.openWeb);
        }
    }));
}
function deactivate() {
    disposables.dispose();
}
exports.deactivate = deactivate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWRlLWhhc2tlbGwtaG9vZ2xlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2lkZS1oYXNrZWxsLWhvb2dsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsK0JBQWdFO0FBQ2hFLHVEQUFtRTtBQUNuRSx1REFBbUU7QUFDbkUscUNBQStCO0FBQy9CLDJDQUEwQztBQUMxQyxpQ0FBdUM7QUFDdkMsbUNBQStCO0FBQXZCLDBCQUFBLE1BQU0sQ0FBQTtBQUVkLE1BQU0sV0FBVyxHQUFHLElBQUksMEJBQW1CLEVBQUUsQ0FBQTtBQUM3QyxJQUFJLE1BQWMsQ0FBQTtBQUVsQixrQkFBMEIsS0FBWTtJQUNwQyxXQUFXLENBQUMsR0FBRyxDQUNiLElBQUksQ0FBQyxRQUFRLENBQUMsMEJBQTBCLENBQ3RDLCtCQUErQixFQUMvQixNQUFNLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FDNUIsQ0FDRixDQUFBO0FBQ0gsQ0FBQztBQVBELDRCQU9DO0FBRUQsdUJBQStCLEtBQWU7SUFDNUMsTUFBTSxDQUFDLElBQUksK0JBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQTtBQUNqQyxDQUFDO0FBRkQsc0NBRUM7QUFFRCx1QkFBK0IsS0FBZTtJQUM1QyxNQUFNLENBQUMsSUFBSSwrQkFBYSxDQUFDLEtBQUssQ0FBQyxDQUFBO0FBQ2pDLENBQUM7QUFGRCxzQ0FFQztBQUVELGlCQUF3QixFQUFjLEVBQUUsSUFBNEI7O1FBQ2xFLE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFBO1FBQy9FLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDVixNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFBO1lBQzFCLE1BQU0sT0FBTyxHQUFHLE1BQU0sTUFBTSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUNwRCxNQUFNLElBQUksR0FBRyxNQUFNLDBCQUFjLENBQUMsT0FBTyxDQUFDLENBQUE7WUFDMUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDVCxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDWixDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7Q0FBQTtBQUVELHdCQUF5QixLQUFZO0lBQ25DLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFBQyxNQUFNLENBQUE7SUFBQyxDQUFDO0lBQ3RCLE1BQU0sR0FBRyxJQUFJLGVBQU0sRUFBRSxDQUFBO0lBQ3JCLFdBQVcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUE7SUFFdkIsV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFNBQWlCLEVBQUUsT0FBWTtRQUN2RSxNQUFNLENBQUMsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLDJDQUEyQyxDQUFDLENBQUE7UUFDdEUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakIsTUFBTSxDQUFBO1FBQ1IsQ0FBQztRQUNELE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDYixLQUFLLEtBQUs7Z0JBQ1IsTUFBTSxDQUFDLElBQUksK0JBQWEsRUFBRSxDQUFBO1lBQzVCLEtBQUssS0FBSztnQkFDUixNQUFNLENBQUMsSUFBSSwrQkFBYSxFQUFFLENBQUE7UUFDOUIsQ0FBQztJQUNILENBQUMsQ0FBQyxDQUFDLENBQUE7SUFFSCxXQUFXLENBQUMsR0FBRyxDQUNiLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLGdDQUFnQyxFQUFFO1FBQ2xELGdDQUFnQyxFQUM5QixDQUFDLEVBQUMsYUFBYSxFQUFhLEtBQU0sYUFBcUIsQ0FBQyxNQUFNLEVBQUU7UUFDbEUsbUNBQW1DLEVBQ2pDLENBQUMsRUFBQyxhQUFhLEVBQWEsS0FBTSxhQUFxQixDQUFDLFNBQVMsRUFBRTtLQUN0RSxDQUFDLEVBQ0YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUU7UUFDcEMsd0NBQXdDLEVBQUUsQ0FBQyxFQUFDLGFBQWEsRUFBYTtZQUNwRSxPQUFPLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxFQUFFLGNBQU8sQ0FBQyxDQUFBO1FBQzVDLENBQUM7UUFDRCw0Q0FBNEMsRUFBRSxDQUFDLEVBQUMsYUFBYSxFQUFhO1lBQ3hFLE9BQU8sQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLEVBQUUsY0FBTyxDQUFDLENBQUE7UUFDNUMsQ0FBQztLQUNGLENBQUMsQ0FDSCxDQUFBO0FBQ0gsQ0FBQztBQUVEO0lBQ0UsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFBO0FBQ3ZCLENBQUM7QUFGRCxnQ0FFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7VGV4dEVkaXRvciwgSUV2ZW50RGVzYywgQ29tcG9zaXRlRGlzcG9zYWJsZX0gZnJvbSAnYXRvbSdcbmltcG9ydCB7SG9vZ2xlRG9jVmlldywgSVByb3BzIGFzIERvY1Byb3BzfSBmcm9tICcuL2hvb2dsZS1kb2MtdmlldydcbmltcG9ydCB7SG9vZ2xlV2ViVmlldywgSVByb3BzIGFzIFdlYlByb3BzfSBmcm9tICcuL2hvb2dsZS13ZWItdmlldydcbmltcG9ydCB7SG9vZ2xlfSBmcm9tICcuL2hvb2dsZSdcbmltcG9ydCB7c2VsZWN0TGlzdFZpZXd9IGZyb20gJy4vbGlzdC12aWV3J1xuaW1wb3J0IHtvcGVuRG9jLCBvcGVuV2VifSBmcm9tICcuL3V0aWwnXG5leHBvcnQge2NvbmZpZ30gZnJvbSAnLi9jb25maWcnXG5cbmNvbnN0IGRpc3Bvc2FibGVzID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKVxubGV0IGhvb2dsZTogSG9vZ2xlXG5cbmV4cG9ydCBmdW5jdGlvbiBhY3RpdmF0ZSAoc3RhdGU6IG5ldmVyKSB7XG4gIGRpc3Bvc2FibGVzLmFkZChcbiAgICBhdG9tLnBhY2thZ2VzLm9uRGlkVHJpZ2dlckFjdGl2YXRpb25Ib29rKFxuICAgICAgJ2xhbmd1YWdlLWhhc2tlbGw6Z3JhbW1hci11c2VkJyxcbiAgICAgICgpID0+IHJlYWxseUFjdGl2YXRlKHN0YXRlKVxuICAgIClcbiAgKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRG9jVmlldyAocHJvcHM6IERvY1Byb3BzKSB7XG4gIHJldHVybiBuZXcgSG9vZ2xlRG9jVmlldyhwcm9wcylcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVdlYlZpZXcgKHByb3BzOiBXZWJQcm9wcykge1xuICByZXR1cm4gbmV3IEhvb2dsZVdlYlZpZXcocHJvcHMpXG59XG5cbmFzeW5jIGZ1bmN0aW9uIHNob3dEb2MgKGVkOiBUZXh0RWRpdG9yLCBmdW5jOiAoc3ltOiBJU3ltYm9sKSA9PiB2b2lkKSB7XG4gIGNvbnN0IHRva2VuID0gZWQudG9rZW5Gb3JCdWZmZXJQb3NpdGlvbihlZC5nZXRMYXN0Q3Vyc29yKCkuZ2V0QnVmZmVyUG9zaXRpb24oKSlcbiAgaWYgKHRva2VuKSB7XG4gICAgY29uc3Qgc3ltYm9sID0gdG9rZW4udmFsdWVcbiAgICBjb25zdCBzeW1ib2xzID0gYXdhaXQgaG9vZ2xlLnNlYXJjaEZvclN5bWJvbChzeW1ib2wpXG4gICAgY29uc3QgaXRlbSA9IGF3YWl0IHNlbGVjdExpc3RWaWV3KHN5bWJvbHMpXG4gICAgaWYgKGl0ZW0pIHtcbiAgICAgIGZ1bmMoaXRlbSlcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVhbGx5QWN0aXZhdGUgKHN0YXRlOiBuZXZlcikge1xuICBpZiAoaG9vZ2xlKSB7IHJldHVybiB9XG4gIGhvb2dsZSA9IG5ldyBIb29nbGUoKVxuICBkaXNwb3NhYmxlcy5hZGQoaG9vZ2xlKVxuXG4gIGRpc3Bvc2FibGVzLmFkZChhdG9tLndvcmtzcGFjZS5hZGRPcGVuZXIoKHVyaVRvT3Blbjogc3RyaW5nLCBvcHRpb25zOiBhbnkpID0+IHtcbiAgICBjb25zdCBtID0gdXJpVG9PcGVuLm1hdGNoKC9eaWRlLWhhc2tlbGw6XFwvXFwvaG9vZ2xlXFwvKGRvY3x3ZWIpXFwvKC4qKSQvKVxuICAgIGlmICghKG0gJiYgbVsxXSkpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBzd2l0Y2ggKG1bMV0pIHtcbiAgICAgIGNhc2UgJ2RvYyc6XG4gICAgICAgIHJldHVybiBuZXcgSG9vZ2xlRG9jVmlldygpXG4gICAgICBjYXNlICd3ZWInOlxuICAgICAgICByZXR1cm4gbmV3IEhvb2dsZVdlYlZpZXcoKVxuICAgIH1cbiAgfSkpXG5cbiAgZGlzcG9zYWJsZXMuYWRkKFxuICAgIGF0b20uY29tbWFuZHMuYWRkKCd3ZWJ2aWV3LmlkZS1oYXNrZWxsLWhvb2dsZS13ZWInLCB7XG4gICAgICAnaWRlLWhhc2tlbGwtaG9vZ2xlOndlYi1nby1iYWNrJzpcbiAgICAgICAgKHtjdXJyZW50VGFyZ2V0fTogSUV2ZW50RGVzYykgPT4gKGN1cnJlbnRUYXJnZXQgYXMgYW55KS5nb0JhY2soKSxcbiAgICAgICdpZGUtaGFza2VsbC1ob29nbGU6d2ViLWdvLWZvcndhcmQnOlxuICAgICAgICAoe2N1cnJlbnRUYXJnZXR9OiBJRXZlbnREZXNjKSA9PiAoY3VycmVudFRhcmdldCBhcyBhbnkpLmdvRm9yd2FyZCgpXG4gICAgfSksXG4gICAgYXRvbS5jb21tYW5kcy5hZGQoJ2F0b20tdGV4dC1lZGl0b3InLCB7XG4gICAgICAnaWRlLWhhc2tlbGwtaG9vZ2xlOnNob3ctZG9jLWZvci1zeW1ib2wnOiAoe2N1cnJlbnRUYXJnZXR9OiBJRXZlbnREZXNjKSA9PiB7XG4gICAgICAgIHNob3dEb2MoY3VycmVudFRhcmdldC5nZXRNb2RlbCgpLCBvcGVuRG9jKVxuICAgICAgfSxcbiAgICAgICdpZGUtaGFza2VsbC1ob29nbGU6c2hvdy13ZWItZG9jLWZvci1zeW1ib2wnOiAoe2N1cnJlbnRUYXJnZXR9OiBJRXZlbnREZXNjKSA9PiB7XG4gICAgICAgIHNob3dEb2MoY3VycmVudFRhcmdldC5nZXRNb2RlbCgpLCBvcGVuV2ViKVxuICAgICAgfVxuICAgIH0pLFxuICApXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWFjdGl2YXRlICgpIHtcbiAgZGlzcG9zYWJsZXMuZGlzcG9zZSgpXG59XG4iXX0=