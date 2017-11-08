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
    const disp = atom.packages.onDidTriggerActivationHook('language-haskell:grammar-used', () => {
        disp.dispose();
        reallyActivate(state)
            .catch((e) => atom.notifications.addFatalError('Failed to activate ide-haskell-hoogle', {
            stack: e.stack,
            dismissable: true,
            detail: e,
        }));
    });
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
        const { selectListView } = yield Promise.resolve().then(() => require('./list-view'));
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
        const { Hoogle } = yield Promise.resolve().then(() => require('./hoogle'));
        const { openDoc, openWeb } = yield Promise.resolve().then(() => require('./util'));
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
            'ide-haskell-hoogle:show-doc-for-symbol': ({ currentTarget }) => __awaiter(this, void 0, void 0, function* () { return showDoc(currentTarget.getModel(), openDoc); }),
            'ide-haskell-hoogle:show-web-doc-for-symbol': ({ currentTarget }) => __awaiter(this, void 0, void 0, function* () { return showDoc(currentTarget.getModel(), openWeb); }),
        }));
    });
}
function deactivate() {
    disposables.dispose();
}
exports.deactivate = deactivate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWRlLWhhc2tlbGwtaG9vZ2xlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2lkZS1oYXNrZWxsLWhvb2dsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsK0JBQWtFO0FBSWxFLG1DQUFpQztBQUF4QiwwQkFBQSxNQUFNLENBQUE7QUFFZixNQUFNLFdBQVcsR0FBRyxJQUFJLDBCQUFtQixFQUFFLENBQUE7QUFDN0MsSUFBSSxNQUFlLENBQUE7QUFFbkIsa0JBQXlCLEtBQVk7SUFDbkMsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQywwQkFBMEIsQ0FDbkQsK0JBQStCLEVBQy9CLEdBQUcsRUFBRTtRQUNILElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUNkLGNBQWMsQ0FBQyxLQUFLLENBQUM7YUFDcEIsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FDNUMsdUNBQXVDLEVBQUU7WUFDdkMsS0FBSyxFQUFHLENBQVcsQ0FBQyxLQUFLO1lBQ3pCLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLE1BQU0sRUFBRSxDQUFDO1NBQ1YsQ0FDRixDQUFDLENBQUE7SUFDSixDQUFDLENBQ0YsQ0FBQTtBQUNILENBQUM7QUFmRCw0QkFlQztBQUVELHVCQUE4QixRQUFrQixFQUFFO0lBRWhELE1BQU0sRUFBQyxhQUFhLEVBQUMsR0FBMkMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUE7SUFDNUYsTUFBTSxDQUFDLElBQUksYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFBO0FBQ2pDLENBQUM7QUFKRCxzQ0FJQztBQUVELHVCQUE4QixRQUFrQixFQUFFO0lBRWhELE1BQU0sRUFBQyxhQUFhLEVBQUMsR0FBMkMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUE7SUFDNUYsTUFBTSxDQUFDLElBQUksYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFBO0FBQ2pDLENB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Q3ZCLENBQUM7QUFGRCxnQ0FFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRleHRFZGl0b3IsIElFdmVudERlc2MsIENvbXBvc2l0ZURpc3Bvc2FibGUgfSBmcm9tICdhdG9tJ1xuaW1wb3J0IHsgSG9vZ2xlRG9jVmlldyBhcyBIb29nbGVEb2NWaWV3VCwgSVByb3BzIGFzIERvY1Byb3BzIH0gZnJvbSAnLi9ob29nbGUtZG9jLXZpZXcnXG5pbXBvcnQgeyBIb29nbGVXZWJWaWV3IGFzIEhvb2dsZVdlYlZpZXdULCBJUHJvcHMgYXMgV2ViUHJvcHMgfSBmcm9tICcuL2hvb2dsZS13ZWItdmlldydcbmltcG9ydCB7IEhvb2dsZSBhcyBIb29nbGVUIH0gZnJvbSAnLi9ob29nbGUnXG5leHBvcnQgeyBjb25maWcgfSBmcm9tICcuL2NvbmZpZydcblxuY29uc3QgZGlzcG9zYWJsZXMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpXG5sZXQgaG9vZ2xlOiBIb29nbGVUXG5cbmV4cG9ydCBmdW5jdGlvbiBhY3RpdmF0ZShzdGF0ZTogbmV2ZXIpIHtcbiAgY29uc3QgZGlzcCA9IGF0b20ucGFja2FnZXMub25EaWRUcmlnZ2VyQWN0aXZhdGlvbkhvb2soXG4gICAgJ2xhbmd1YWdlLWhhc2tlbGw6Z3JhbW1hci11c2VkJyxcbiAgICAoKSA9PiB7XG4gICAgICBkaXNwLmRpc3Bvc2UoKVxuICAgICAgcmVhbGx5QWN0aXZhdGUoc3RhdGUpXG4gICAgICAuY2F0Y2goKGUpID0+IGF0b20ubm90aWZpY2F0aW9ucy5hZGRGYXRhbEVycm9yKFxuICAgICAgICAnRmFpbGVkIHRvIGFjdGl2YXRlIGlkZS1oYXNrZWxsLWhvb2dsZScsIHtcbiAgICAgICAgICBzdGFjazogKGUgYXMgRXJyb3IpLnN0YWNrLFxuICAgICAgICAgIGRpc21pc3NhYmxlOiB0cnVlLFxuICAgICAgICAgIGRldGFpbDogZSxcbiAgICAgICAgfSxcbiAgICAgICkpXG4gICAgfSxcbiAgKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRG9jVmlldyhwcm9wczogRG9jUHJvcHMgPSB7fSk6IEhvb2dsZURvY1ZpZXdUIHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXVuc2FmZS1hbnlcbiAgY29uc3Qge0hvb2dsZURvY1ZpZXd9OiB7SG9vZ2xlRG9jVmlldzogdHlwZW9mIEhvb2dsZURvY1ZpZXdUfSA9IHJlcXVpcmUoJy4vaG9vZ2xlLWRvYy12aWV3JylcbiAgcmV0dXJuIG5ldyBIb29nbGVEb2NWaWV3KHByb3BzKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlV2ViVmlldyhwcm9wczogV2ViUHJvcHMgPSB7fSk6IEhvb2dsZVdlYlZpZXdUIHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXVuc2FmZS1hbnlcbiAgY29uc3Qge0hvb2dsZVdlYlZpZXd9OiB7SG9vZ2xlV2ViVmlldzogdHlwZW9mIEhvb2dsZVdlYlZpZXdUfSA9IHJlcXVpcmUoJy4vaG9vZ2xlLXdlYi12aWV3JylcbiAgcmV0dXJuIG5ldyBIb29nbGVXZWJWaWV3KHByb3BzKVxufVxuXG5hc3luYyBmdW5jdGlvbiBzaG93RG9jKGVkOiBUZXh0RWRpdG9yLCBmdW5jOiAoc3ltOiBJU3ltYm9sKSA9PiB2b2lkKSB7XG4gIGNvbnN0IHRva2VuID0gZWQudG9rZW5Gb3JCdWZmZXJQb3NpdGlvbihlZC5nZXRMYXN0Q3Vyc29yKCkuZ2V0QnVmZmVyUG9zaXRpb24oKSlcbiAgY29uc3Qge3NlbGVjdExpc3RWaWV3fSA9IGF3YWl0IGltcG9ydCgnLi9saXN0LXZpZXcnKVxuICBpZiAodG9rZW4pIHtcbiAgICBjb25zdCBzeW1ib2wgPSB0b2tlbi52YWx1ZVxuICAgIGNvbnN0IHN5bWJvbHMgPSBhd2FpdCBob29nbGUuc2VhcmNoRm9yU3ltYm9sKHN5bWJvbClcbiAgICBjb25zdCBpdGVtID0gYXdhaXQgc2VsZWN0TGlzdFZpZXcoc3ltYm9scylcbiAgICBpZiAoaXRlbSkge1xuICAgICAgZnVuYyhpdGVtKVxuICAgIH1cbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiByZWFsbHlBY3RpdmF0ZShzdGF0ZTogbmV2ZXIpIHtcbiAgaWYgKGhvb2dsZSkgeyByZXR1cm4gfVxuICBjb25zdCB7SG9vZ2xlfSA9IGF3YWl0IGltcG9ydCgnLi9ob29nbGUnKVxuICBjb25zdCB7b3BlbkRvYywgb3BlbldlYn0gPSBhd2FpdCBpbXBvcnQoJy4vdXRpbCcpXG4gIGhvb2dsZSA9IG5ldyBIb29nbGUoKVxuICBkaXNwb3NhYmxlcy5hZGQoaG9vZ2xlKVxuXG4gIGRpc3Bvc2FibGVzLmFkZChhdG9tLndvcmtzcGFjZS5hZGRPcGVuZXIoKHVyaVRvT3Blbjogc3RyaW5nLCBvcHRpb25zOiBhbnkpID0+IHtcbiAgICBjb25zdCBtID0gdXJpVG9PcGVuLm1hdGNoKC9eaWRlLWhhc2tlbGw6XFwvXFwvaG9vZ2xlXFwvKGRvY3x3ZWIpXFwvKC4qKSQvKVxuICAgIGlmICghKG0gJiYgbVsxXSkpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWRcbiAgICB9XG4gICAgc3dpdGNoIChtWzFdKSB7XG4gICAgICBjYXNlICdkb2MnOlxuICAgICAgICByZXR1cm4gY3JlYXRlRG9jVmlldygpXG4gICAgICBjYXNlICd3ZWInOlxuICAgICAgICByZXR1cm4gY3JlYXRlV2ViVmlldygpXG4gICAgfVxuICB9KSlcblxuICBkaXNwb3NhYmxlcy5hZGQoXG4gICAgYXRvbS5jb21tYW5kcy5hZGQoJ3dlYnZpZXcuaWRlLWhhc2tlbGwtaG9vZ2xlLXdlYicsIHtcbiAgICAgICdpZGUtaGFza2VsbC1ob29nbGU6d2ViLWdvLWJhY2snOlxuICAgICAgKHsgY3VycmVudFRhcmdldCB9OiB7IGN1cnJlbnRUYXJnZXQ6IEVsZWN0cm9uLldlYlZpZXdFbGVtZW50IH0pID0+XG4gICAgICAgIGN1cnJlbnRUYXJnZXQuZ29CYWNrKCksXG4gICAgICAnaWRlLWhhc2tlbGwtaG9vZ2xlOndlYi1nby1mb3J3YXJkJzpcbiAgICAgICh7IGN1cnJlbnRUYXJnZXQgfTogeyBjdXJyZW50VGFyZ2V0OiBFbGVjdHJvbi5XZWJWaWV3RWxlbWVudCB9KSA9PlxuICAgICAgICBjdXJyZW50VGFyZ2V0LmdvRm9yd2FyZCgpLFxuICAgIH0pLFxuICAgIGF0b20uY29tbWFuZHMuYWRkKCdhdG9tLXRleHQtZWRpdG9yJywge1xuICAgICAgJ2lkZS1oYXNrZWxsLWhvb2dsZTpzaG93LWRvYy1mb3Itc3ltYm9sJzpcbiAgICAgICAgYXN5bmMgKHsgY3VycmVudFRhcmdldCB9OiBJRXZlbnREZXNjKSA9PiBzaG93RG9jKGN1cnJlbnRUYXJnZXQuZ2V0TW9kZWwoKSwgb3BlbkRvYyksXG4gICAgICAnaWRlLWhhc2tlbGwtaG9vZ2xlOnNob3ctd2ViLWRvYy1mb3Itc3ltYm9sJzpcbiAgICAgICAgYXN5bmMgKHsgY3VycmVudFRhcmdldCB9OiBJRXZlbnREZXNjKSA9PiBzaG93RG9jKGN1cnJlbnRUYXJnZXQuZ2V0TW9kZWwoKSwgb3BlbldlYiksXG4gICAgfSksXG4gIClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlYWN0aXZhdGUoKSB7XG4gIGRpc3Bvc2FibGVzLmRpc3Bvc2UoKVxufVxuIl19