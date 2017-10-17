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
var config_1 = require("./config");
exports.config = config_1.config;
const disposables = new atom_1.CompositeDisposable();
let hoogle;
function activate(state) {
    disposables.add(atom.packages.onDidTriggerActivationHook('language-haskell:grammar-used', () => { reallyActivate(state); }));
}
exports.activate = activate;
function createDocView(props = {}) {
    const { HoogleDocView } = require('./hoogle-doc-view');
    return new HoogleDocView(props);
}
exports.createDocView = createDocView;
function createWebView(props = {}) {
    const { HoogleWebView } = require('./hoogle-web-view');
    return new HoogleWebView(props);
}
exports.createWebView = createWebView;
function showDoc(ed, func) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = ed.tokenForBufferPosition(ed.getLastCursor().getBufferPosition());
        const { selectListView } = yield Promise.resolve().then(function () { return require('./list-view'); });
        if (token) {
            const symbol = token.value;
            const symbols = yield hoogle.searchForSymbol(symbol);
            const item = yield selectListView(symbols);
            if (item) {
                func(item);
            }
        }
    });
}
function reallyActivate(state) {
    return __awaiter(this, void 0, void 0, function* () {
        if (hoogle) {
            return;
        }
        const { Hoogle } = yield Promise.resolve().then(function () { return require('./hoogle'); });
        const { openDoc, openWeb } = yield Promise.resolve().then(function () { return require('./util'); });
        hoogle = new Hoogle();
        disposables.add(hoogle);
        disposables.add(atom.workspace.addOpener((uriToOpen, options) => {
            const m = uriToOpen.match(/^ide-haskell:\/\/hoogle\/(doc|web)\/(.*)$/);
            if (!(m && m[1])) {
                return undefined;
            }
            switch (m[1]) {
                case 'doc':
                    return createDocView();
                case 'web':
                    return createWebView();
            }
        }));
        disposables.add(atom.commands.add('webview.ide-haskell-hoogle-web', {
            'ide-haskell-hoogle:web-go-back': ({ currentTarget }) => currentTarget.goBack(),
            'ide-haskell-hoogle:web-go-forward': ({ currentTarget }) => currentTarget.goForward(),
        }), atom.commands.add('atom-text-editor', {
            'ide-haskell-hoogle:show-doc-for-symbol': ({ currentTarget }) => {
                showDoc(currentTarget.getModel(), openDoc);
            },
            'ide-haskell-hoogle:show-web-doc-for-symbol': ({ currentTarget }) => {
                showDoc(currentTarget.getModel(), openWeb);
            },
        }));
    });
}
function deactivate() {
    disposables.dispose();
}
exports.deactivate = deactivate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWRlLWhhc2tlbGwtaG9vZ2xlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2lkZS1oYXNrZWxsLWhvb2dsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsK0JBQWtFO0FBSWxFLG1DQUFpQztBQUF4QiwwQkFBQSxNQUFNLENBQUE7QUFFZixNQUFNLFdBQVcsR0FBRyxJQUFJLDBCQUFtQixFQUFFLENBQUE7QUFDN0MsSUFBSSxNQUFlLENBQUE7QUFFbkIsa0JBQXlCLEtBQVk7SUFDbkMsV0FBVyxDQUFDLEdBQUcsQ0FDYixJQUFJLENBQUMsUUFBUSxDQUFDLDBCQUEwQixDQUN0QywrQkFBK0IsRUFDL0IsR0FBRyxFQUFFLEdBQUcsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUNoQyxDQUNGLENBQUE7QUFDSCxDQUFDO0FBUEQsNEJBT0M7QUFFRCx1QkFBOEIsUUFBa0IsRUFBRTtJQUNoRCxNQUFNLEVBQUMsYUFBYSxFQUFDLEdBQTJDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFBO0lBQzVGLE1BQU0sQ0FBQyxJQUFJLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQTtBQUNqQyxDQUFDO0FBSEQsc0NBR0M7QUFFRCx1QkFBOEIsUUFBa0IsRUFBRTtJQUNoRCxNQUFNLEVBQUMsYUFBYSxFQUFDLEdBQTJDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFBO0lBQzVGLE1BQU0sQ0FBQyxJQUFJLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQTtBQUNqQyxDQUFDO0FBSEQsc0NBR0M7QUFFRCxpQkFBdUIsRUFBYyxFQUFFLElBQTRCOztRQUNqRSxNQUFNLEtBQUssR0FBRyxFQUFFLENBQUMsc0JBQXNCLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQTtRQUMvRSxNQUFNLEVBQUMsY0FBYyxFQUFDLEdBQUcsMERBQWEsYUFBYSxLQUFDLENBQUE7UUFDcEQsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNWLE1BQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUE7WUFDMUIsTUFBTSxPQUFPLEdBQUcsTUFBTSxNQUFNLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQ3BELE1BQU0sSUFBSSxHQUFHLE1BQU0sY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1lBQzFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ1QsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQ1osQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDO0NBQUE7QUFFRCx3QkFBOEIsS0FBWTs7UUFDeEMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQTtRQUFDLENBQUM7UUFDdEIsTUFBTSxFQUFDLE1BQU0sRUFBQyxHQUFHLDBEQUFhLFVBQVUsS0FBQyxDQUFBO1FBQ3pDLE1BQU0sRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFDLEdBQUcsMERBQWEsUUFBUSxLQUFDLENBQUE7UUFDakQsTUFBTSxHQUFHLElBQUksTUFBTSxFQUFFLENBQUE7UUFDckIsV0FBVyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUV2QixXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsU0FBaUIsRUFBRSxPQUFZLEVBQUUsRUFBRTtZQUMzRSxNQUFNLENBQUMsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLDJDQUEyQyxDQUFDLENBQUE7WUFDdEUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pCLE1BQU0sQ0FBQyxTQUFTLENBQUE7WUFDbEIsQ0FBQztZQUNELE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2IsS0FBSyxLQUFLO29CQUNSLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQTtnQkFDeEIsS0FBSyxLQUFLO29CQUNSLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQTtZQUMxQixDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUVILFdBQVcsQ0FBQyxHQUFHLENBQ2IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsZ0NBQWdDLEVBQUU7WUFDbEQsZ0NBQWdDLEVBQ2hDLENBQUMsRUFBRSxhQUFhLEVBQWMsRUFBRSxFQUFFLENBQUUsYUFBcUIsQ0FBQyxNQUFNLEVBQUU7WUFDbEUsbUNBQW1DLEVBQ25DLENBQUMsRUFBRSxhQUFhLEVBQWMsRUFBRSxFQUFFLENBQUUsYUFBcUIsQ0FBQyxTQUFTLEVBQUU7U0FDdEUsQ0FBQyxFQUNGLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFO1lBQ3BDLHdDQUF3QyxFQUFFLENBQUMsRUFBRSxhQUFhLEVBQWMsRUFBRSxFQUFFO2dCQUMxRSxPQUFPLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFBO1lBQzVDLENBQUM7WUFDRCw0Q0FBNEMsRUFBRSxDQUFDLEVBQUUsYUFBYSxFQUFjLEVBQUUsRUFBRTtnQkFDOUUsT0FBTyxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQTtZQUM1QyxDQUFDO1NBQ0YsQ0FBQyxDQUNILENBQUE7SUFDSCxDQUFDO0NBQUE7QUFFRDtJQUNFLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtBQUN2QixDQUFDO0FBRkQsZ0NBRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUZXh0RWRpdG9yLCBJRXZlbnREZXNjLCBDb21wb3NpdGVEaXNwb3NhYmxlIH0gZnJvbSAnYXRvbSdcbmltcG9ydCB7IEhvb2dsZURvY1ZpZXcgYXMgSG9vZ2xlRG9jVmlld1QsIElQcm9wcyBhcyBEb2NQcm9wcyB9IGZyb20gJy4vaG9vZ2xlLWRvYy12aWV3J1xuaW1wb3J0IHsgSG9vZ2xlV2ViVmlldyBhcyBIb29nbGVXZWJWaWV3VCwgSVByb3BzIGFzIFdlYlByb3BzIH0gZnJvbSAnLi9ob29nbGUtd2ViLXZpZXcnXG5pbXBvcnQgeyBIb29nbGUgYXMgSG9vZ2xlVCB9IGZyb20gJy4vaG9vZ2xlJ1xuZXhwb3J0IHsgY29uZmlnIH0gZnJvbSAnLi9jb25maWcnXG5cbmNvbnN0IGRpc3Bvc2FibGVzID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKVxubGV0IGhvb2dsZTogSG9vZ2xlVFxuXG5leHBvcnQgZnVuY3Rpb24gYWN0aXZhdGUoc3RhdGU6IG5ldmVyKSB7XG4gIGRpc3Bvc2FibGVzLmFkZChcbiAgICBhdG9tLnBhY2thZ2VzLm9uRGlkVHJpZ2dlckFjdGl2YXRpb25Ib29rKFxuICAgICAgJ2xhbmd1YWdlLWhhc2tlbGw6Z3JhbW1hci11c2VkJyxcbiAgICAgICgpID0+IHsgcmVhbGx5QWN0aXZhdGUoc3RhdGUpIH0sXG4gICAgKSxcbiAgKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRG9jVmlldyhwcm9wczogRG9jUHJvcHMgPSB7fSk6IEhvb2dsZURvY1ZpZXdUIHtcbiAgY29uc3Qge0hvb2dsZURvY1ZpZXd9OiB7SG9vZ2xlRG9jVmlldzogdHlwZW9mIEhvb2dsZURvY1ZpZXdUfSA9IHJlcXVpcmUoJy4vaG9vZ2xlLWRvYy12aWV3JylcbiAgcmV0dXJuIG5ldyBIb29nbGVEb2NWaWV3KHByb3BzKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlV2ViVmlldyhwcm9wczogV2ViUHJvcHMgPSB7fSk6IEhvb2dsZVdlYlZpZXdUIHtcbiAgY29uc3Qge0hvb2dsZVdlYlZpZXd9OiB7SG9vZ2xlV2ViVmlldzogdHlwZW9mIEhvb2dsZVdlYlZpZXdUfSA9IHJlcXVpcmUoJy4vaG9vZ2xlLXdlYi12aWV3JylcbiAgcmV0dXJuIG5ldyBIb29nbGVXZWJWaWV3KHByb3BzKVxufVxuXG5hc3luYyBmdW5jdGlvbiBzaG93RG9jKGVkOiBUZXh0RWRpdG9yLCBmdW5jOiAoc3ltOiBJU3ltYm9sKSA9PiB2b2lkKSB7XG4gIGNvbnN0IHRva2VuID0gZWQudG9rZW5Gb3JCdWZmZXJQb3NpdGlvbihlZC5nZXRMYXN0Q3Vyc29yKCkuZ2V0QnVmZmVyUG9zaXRpb24oKSlcbiAgY29uc3Qge3NlbGVjdExpc3RWaWV3fSA9IGF3YWl0IGltcG9ydCgnLi9saXN0LXZpZXcnKVxuICBpZiAodG9rZW4pIHtcbiAgICBjb25zdCBzeW1ib2wgPSB0b2tlbi52YWx1ZVxuICAgIGNvbnN0IHN5bWJvbHMgPSBhd2FpdCBob29nbGUuc2VhcmNoRm9yU3ltYm9sKHN5bWJvbClcbiAgICBjb25zdCBpdGVtID0gYXdhaXQgc2VsZWN0TGlzdFZpZXcoc3ltYm9scylcbiAgICBpZiAoaXRlbSkge1xuICAgICAgZnVuYyhpdGVtKVxuICAgIH1cbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiByZWFsbHlBY3RpdmF0ZShzdGF0ZTogbmV2ZXIpIHtcbiAgaWYgKGhvb2dsZSkgeyByZXR1cm4gfVxuICBjb25zdCB7SG9vZ2xlfSA9IGF3YWl0IGltcG9ydCgnLi9ob29nbGUnKVxuICBjb25zdCB7b3BlbkRvYywgb3BlbldlYn0gPSBhd2FpdCBpbXBvcnQoJy4vdXRpbCcpXG4gIGhvb2dsZSA9IG5ldyBIb29nbGUoKVxuICBkaXNwb3NhYmxlcy5hZGQoaG9vZ2xlKVxuXG4gIGRpc3Bvc2FibGVzLmFkZChhdG9tLndvcmtzcGFjZS5hZGRPcGVuZXIoKHVyaVRvT3Blbjogc3RyaW5nLCBvcHRpb25zOiBhbnkpID0+IHtcbiAgICBjb25zdCBtID0gdXJpVG9PcGVuLm1hdGNoKC9eaWRlLWhhc2tlbGw6XFwvXFwvaG9vZ2xlXFwvKGRvY3x3ZWIpXFwvKC4qKSQvKVxuICAgIGlmICghKG0gJiYgbVsxXSkpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWRcbiAgICB9XG4gICAgc3dpdGNoIChtWzFdKSB7XG4gICAgICBjYXNlICdkb2MnOlxuICAgICAgICByZXR1cm4gY3JlYXRlRG9jVmlldygpXG4gICAgICBjYXNlICd3ZWInOlxuICAgICAgICByZXR1cm4gY3JlYXRlV2ViVmlldygpXG4gICAgfVxuICB9KSlcblxuICBkaXNwb3NhYmxlcy5hZGQoXG4gICAgYXRvbS5jb21tYW5kcy5hZGQoJ3dlYnZpZXcuaWRlLWhhc2tlbGwtaG9vZ2xlLXdlYicsIHtcbiAgICAgICdpZGUtaGFza2VsbC1ob29nbGU6d2ViLWdvLWJhY2snOlxuICAgICAgKHsgY3VycmVudFRhcmdldCB9OiBJRXZlbnREZXNjKSA9PiAoY3VycmVudFRhcmdldCBhcyBhbnkpLmdvQmFjaygpLFxuICAgICAgJ2lkZS1oYXNrZWxsLWhvb2dsZTp3ZWItZ28tZm9yd2FyZCc6XG4gICAgICAoeyBjdXJyZW50VGFyZ2V0IH06IElFdmVudERlc2MpID0+IChjdXJyZW50VGFyZ2V0IGFzIGFueSkuZ29Gb3J3YXJkKCksXG4gICAgfSksXG4gICAgYXRvbS5jb21tYW5kcy5hZGQoJ2F0b20tdGV4dC1lZGl0b3InLCB7XG4gICAgICAnaWRlLWhhc2tlbGwtaG9vZ2xlOnNob3ctZG9jLWZvci1zeW1ib2wnOiAoeyBjdXJyZW50VGFyZ2V0IH06IElFdmVudERlc2MpID0+IHtcbiAgICAgICAgc2hvd0RvYyhjdXJyZW50VGFyZ2V0LmdldE1vZGVsKCksIG9wZW5Eb2MpXG4gICAgICB9LFxuICAgICAgJ2lkZS1oYXNrZWxsLWhvb2dsZTpzaG93LXdlYi1kb2MtZm9yLXN5bWJvbCc6ICh7IGN1cnJlbnRUYXJnZXQgfTogSUV2ZW50RGVzYykgPT4ge1xuICAgICAgICBzaG93RG9jKGN1cnJlbnRUYXJnZXQuZ2V0TW9kZWwoKSwgb3BlbldlYilcbiAgICAgIH0sXG4gICAgfSksXG4gIClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlYWN0aXZhdGUoKSB7XG4gIGRpc3Bvc2FibGVzLmRpc3Bvc2UoKVxufVxuIl19