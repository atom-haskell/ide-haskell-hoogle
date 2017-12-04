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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWRlLWhhc2tlbGwtaG9vZ2xlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2lkZS1oYXNrZWxsLWhvb2dsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsK0JBQWtFO0FBSWxFLG1DQUFpQztBQUF4QiwwQkFBQSxNQUFNLENBQUE7QUFFZixNQUFNLFdBQVcsR0FBRyxJQUFJLDBCQUFtQixFQUFFLENBQUE7QUFDN0MsSUFBSSxNQUFlLENBQUE7QUFFbkIsa0JBQXlCLEtBQVk7SUFDbkMsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQywwQkFBMEIsQ0FDbkQsK0JBQStCLEVBQy9CLEdBQUcsRUFBRTtRQUNILElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUNkLGNBQWMsQ0FBQyxLQUFLLENBQUM7YUFDcEIsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FDNUMsdUNBQXVDLEVBQUU7WUFDdkMsS0FBSyxFQUFHLENBQVcsQ0FBQyxLQUFLO1lBQ3pCLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLE1BQU0sRUFBRSxDQUFDO1NBQ1YsQ0FDRixDQUFDLENBQUE7SUFDSixDQUFDLENBQ0YsQ0FBQTtBQUNILENBQUM7QUFmRCw0QkFlQztBQUVELHVCQUE4QixRQUFrQixFQUFFO0lBRWhELE1BQU0sRUFBRSxhQUFhLEVBQUUsR0FBMkMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUE7SUFDOUYsTUFBTSxDQUFDLElBQUksYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFBO0FBQ2pDLENBQUM7QUFKRCxzQ0FJQztBQUVELHVCQUE4QixRQUFrQixFQUFFO0lBRWhELE1BQU0sRUFBRSxhQUFhLEVBQUUsR0FBMkMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUE7SUFDOUYsTUFBTSxDQUFDLElBQUksYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFBO0FBQ2pDLENB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Q3ZCLENBQUM7QUFGRCxnQ0FFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRleHRFZGl0b3IsIElFdmVudERlc2MsIENvbXBvc2l0ZURpc3Bvc2FibGUgfSBmcm9tICdhdG9tJ1xuaW1wb3J0IHsgSG9vZ2xlRG9jVmlldyBhcyBIb29nbGVEb2NWaWV3VCwgSVByb3BzIGFzIERvY1Byb3BzIH0gZnJvbSAnLi9ob29nbGUtZG9jLXZpZXcnXG5pbXBvcnQgeyBIb29nbGVXZWJWaWV3IGFzIEhvb2dsZVdlYlZpZXdULCBJUHJvcHMgYXMgV2ViUHJvcHMgfSBmcm9tICcuL2hvb2dsZS13ZWItdmlldydcbmltcG9ydCB7IEhvb2dsZSBhcyBIb29nbGVUIH0gZnJvbSAnLi9ob29nbGUnXG5leHBvcnQgeyBjb25maWcgfSBmcm9tICcuL2NvbmZpZydcblxuY29uc3QgZGlzcG9zYWJsZXMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpXG5sZXQgaG9vZ2xlOiBIb29nbGVUXG5cbmV4cG9ydCBmdW5jdGlvbiBhY3RpdmF0ZShzdGF0ZTogbmV2ZXIpIHtcbiAgY29uc3QgZGlzcCA9IGF0b20ucGFja2FnZXMub25EaWRUcmlnZ2VyQWN0aXZhdGlvbkhvb2soXG4gICAgJ2xhbmd1YWdlLWhhc2tlbGw6Z3JhbW1hci11c2VkJyxcbiAgICAoKSA9PiB7XG4gICAgICBkaXNwLmRpc3Bvc2UoKVxuICAgICAgcmVhbGx5QWN0aXZhdGUoc3RhdGUpXG4gICAgICAuY2F0Y2goKGUpID0+IGF0b20ubm90aWZpY2F0aW9ucy5hZGRGYXRhbEVycm9yKFxuICAgICAgICAnRmFpbGVkIHRvIGFjdGl2YXRlIGlkZS1oYXNrZWxsLWhvb2dsZScsIHtcbiAgICAgICAgICBzdGFjazogKGUgYXMgRXJyb3IpLnN0YWNrLFxuICAgICAgICAgIGRpc21pc3NhYmxlOiB0cnVlLFxuICAgICAgICAgIGRldGFpbDogZSxcbiAgICAgICAgfSxcbiAgICAgICkpXG4gICAgfSxcbiAgKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRG9jVmlldyhwcm9wczogRG9jUHJvcHMgPSB7fSk6IEhvb2dsZURvY1ZpZXdUIHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXVuc2FmZS1hbnlcbiAgY29uc3QgeyBIb29nbGVEb2NWaWV3IH06IHtIb29nbGVEb2NWaWV3OiB0eXBlb2YgSG9vZ2xlRG9jVmlld1R9ID0gcmVxdWlyZSgnLi9ob29nbGUtZG9jLXZpZXcnKVxuICByZXR1cm4gbmV3IEhvb2dsZURvY1ZpZXcocHJvcHMpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVXZWJWaWV3KHByb3BzOiBXZWJQcm9wcyA9IHt9KTogSG9vZ2xlV2ViVmlld1Qge1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tdW5zYWZlLWFueVxuICBjb25zdCB7IEhvb2dsZVdlYlZpZXcgfToge0hvb2dsZVdlYlZpZXc6IHR5cGVvZiBIb29nbGVXZWJWaWV3VH0gPSByZXF1aXJlKCcuL2hvb2dsZS13ZWItdmlldycpXG4gIHJldHVybiBuZXcgSG9vZ2xlV2ViVmlldyhwcm9wcylcbn1cblxuYXN5bmMgZnVuY3Rpb24gc2hvd0RvYyhlZDogVGV4dEVkaXRvciwgZnVuYzogKHN5bTogSVN5bWJvbCkgPT4gdm9pZCkge1xuICBjb25zdCB0b2tlbiA9IGVkLnRva2VuRm9yQnVmZmVyUG9zaXRpb24oZWQuZ2V0TGFzdEN1cnNvcigpLmdldEJ1ZmZlclBvc2l0aW9uKCkpXG4gIGNvbnN0IHsgc2VsZWN0TGlzdFZpZXcgfSA9IGF3YWl0IGltcG9ydCgnLi9saXN0LXZpZXcnKVxuICBpZiAodG9rZW4pIHtcbiAgICBjb25zdCBzeW1ib2wgPSB0b2tlbi52YWx1ZVxuICAgIGNvbnN0IHN5bWJvbHMgPSBhd2FpdCBob29nbGUuc2VhcmNoRm9yU3ltYm9sKHN5bWJvbClcbiAgICBjb25zdCBpdGVtID0gYXdhaXQgc2VsZWN0TGlzdFZpZXcoc3ltYm9scylcbiAgICBpZiAoaXRlbSkge1xuICAgICAgZnVuYyhpdGVtKVxuICAgIH1cbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiByZWFsbHlBY3RpdmF0ZShzdGF0ZTogbmV2ZXIpIHtcbiAgaWYgKGhvb2dsZSkgeyByZXR1cm4gfVxuICBjb25zdCB7IEhvb2dsZSB9ID0gYXdhaXQgaW1wb3J0KCcuL2hvb2dsZScpXG4gIGNvbnN0IHsgb3BlbkRvYywgb3BlbldlYiB9ID0gYXdhaXQgaW1wb3J0KCcuL3V0aWwnKVxuICBob29nbGUgPSBuZXcgSG9vZ2xlKClcbiAgZGlzcG9zYWJsZXMuYWRkKGhvb2dsZSlcblxuICBkaXNwb3NhYmxlcy5hZGQoYXRvbS53b3Jrc3BhY2UuYWRkT3BlbmVyKCh1cmlUb09wZW46IHN0cmluZywgb3B0aW9uczogYW55KSA9PiB7XG4gICAgY29uc3QgbSA9IHVyaVRvT3Blbi5tYXRjaCgvXmlkZS1oYXNrZWxsOlxcL1xcL2hvb2dsZVxcLyhkb2N8d2ViKVxcLyguKikkLylcbiAgICBpZiAoIShtICYmIG1bMV0pKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkXG4gICAgfVxuICAgIHN3aXRjaCAobVsxXSkge1xuICAgICAgY2FzZSAnZG9jJzpcbiAgICAgICAgcmV0dXJuIGNyZWF0ZURvY1ZpZXcoKVxuICAgICAgY2FzZSAnd2ViJzpcbiAgICAgICAgcmV0dXJuIGNyZWF0ZVdlYlZpZXcoKVxuICAgIH1cbiAgfSkpXG5cbiAgZGlzcG9zYWJsZXMuYWRkKFxuICAgIGF0b20uY29tbWFuZHMuYWRkKCd3ZWJ2aWV3LmlkZS1oYXNrZWxsLWhvb2dsZS13ZWInLCB7XG4gICAgICAnaWRlLWhhc2tlbGwtaG9vZ2xlOndlYi1nby1iYWNrJzpcbiAgICAgICh7IGN1cnJlbnRUYXJnZXQgfTogeyBjdXJyZW50VGFyZ2V0OiBFbGVjdHJvbi5XZWJWaWV3RWxlbWVudCB9KSA9PlxuICAgICAgICBjdXJyZW50VGFyZ2V0LmdvQmFjaygpLFxuICAgICAgJ2lkZS1oYXNrZWxsLWhvb2dsZTp3ZWItZ28tZm9yd2FyZCc6XG4gICAgICAoeyBjdXJyZW50VGFyZ2V0IH06IHsgY3VycmVudFRhcmdldDogRWxlY3Ryb24uV2ViVmlld0VsZW1lbnQgfSkgPT5cbiAgICAgICAgY3VycmVudFRhcmdldC5nb0ZvcndhcmQoKSxcbiAgICB9KSxcbiAgICBhdG9tLmNvbW1hbmRzLmFkZCgnYXRvbS10ZXh0LWVkaXRvcicsIHtcbiAgICAgICdpZGUtaGFza2VsbC1ob29nbGU6c2hvdy1kb2MtZm9yLXN5bWJvbCc6XG4gICAgICAgIGFzeW5jICh7IGN1cnJlbnRUYXJnZXQgfTogSUV2ZW50RGVzYykgPT4gc2hvd0RvYyhjdXJyZW50VGFyZ2V0LmdldE1vZGVsKCksIG9wZW5Eb2MpLFxuICAgICAgJ2lkZS1oYXNrZWxsLWhvb2dsZTpzaG93LXdlYi1kb2MtZm9yLXN5bWJvbCc6XG4gICAgICAgIGFzeW5jICh7IGN1cnJlbnRUYXJnZXQgfTogSUV2ZW50RGVzYykgPT4gc2hvd0RvYyhjdXJyZW50VGFyZ2V0LmdldE1vZGVsKCksIG9wZW5XZWIpLFxuICAgIH0pLFxuICApXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWFjdGl2YXRlKCkge1xuICBkaXNwb3NhYmxlcy5kaXNwb3NlKClcbn1cbiJdfQ==