"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.createWebView = exports.createDocView = exports.activate = exports.config = void 0;
const atom_1 = require("atom");
var config_1 = require("./config");
Object.defineProperty(exports, "config", { enumerable: true, get: function () { return config_1.config; } });
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
async function showDoc(ed, func) {
    const token = ed.tokenForBufferPosition(ed.getLastCursor().getBufferPosition());
    const { selectListView } = await Promise.resolve().then(() => require('./list-view'));
    if (token) {
        const symbol = token.value;
        const symbols = await hoogle.searchForSymbol(symbol);
        const item = await selectListView(symbols);
        if (item) {
            func(item);
        }
    }
}
async function reallyActivate(_state) {
    if (hoogle) {
        return;
    }
    const { Hoogle } = await Promise.resolve().then(() => require('./hoogle'));
    const { openDoc, openWeb } = await Promise.resolve().then(() => require('./util'));
    hoogle = new Hoogle();
    disposables.add(hoogle);
    disposables.add(atom.workspace.addOpener((uriToOpen) => {
        const m = uriToOpen.match(/^ide-haskell:\/\/hoogle\/(doc|web)\/(.*)$/);
        if (!(m && m[1])) {
            return undefined;
        }
        switch (m[1]) {
            case 'doc':
                return createDocView();
            case 'web':
                return createWebView({ url: m[2] || undefined });
        }
        return undefined;
    }));
    disposables.add(atom.commands.add('webview.ide-haskell-hoogle-web', {
        'ide-haskell-hoogle:web-go-back': (ev) => ev.currentTarget.goBack(),
        'ide-haskell-hoogle:web-go-forward': (ev) => ev.currentTarget.goForward(),
    }), atom.commands.add('atom-text-editor', {
        'ide-haskell-hoogle:show-doc-for-symbol': async ({ currentTarget }) => showDoc(currentTarget.getModel(), openDoc),
        'ide-haskell-hoogle:show-web-doc-for-symbol': async ({ currentTarget }) => showDoc(currentTarget.getModel(), openWeb),
    }));
}
function deactivate() {
    disposables.dispose();
}
exports.deactivate = deactivate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWRlLWhhc2tlbGwtaG9vZ2xlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2lkZS1oYXNrZWxsLWhvb2dsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQkFBeUU7QUFJekUsbUNBQWlDO0FBQXhCLGdHQUFBLE1BQU0sT0FBQTtBQUVmLE1BQU0sV0FBVyxHQUFHLElBQUksMEJBQW1CLEVBQUUsQ0FBQTtBQUM3QyxJQUFJLE1BQWUsQ0FBQTtBQUVuQixTQUFnQixRQUFRLENBQUMsS0FBWTtJQUNuQyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLDBCQUEwQixDQUNuRCwrQkFBK0IsRUFDL0IsR0FBRyxFQUFFO1FBQ0gsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFBO1FBQ2QsY0FBYyxDQUFDLEtBQUssQ0FBQzthQUNwQixLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUM1Qyx1Q0FBdUMsRUFBRTtZQUN2QyxLQUFLLEVBQUcsQ0FBVyxDQUFDLEtBQUs7WUFDekIsV0FBVyxFQUFFLElBQUk7WUFDakIsTUFBTSxFQUFFLENBQUM7U0FDVixDQUNGLENBQUMsQ0FBQTtJQUNKLENBQUMsQ0FDRixDQUFBO0FBQ0gsQ0FBQztBQWZELDRCQWVDO0FBRUQsU0FBZ0IsYUFBYSxDQUFDLFFBQWtCLEVBQUU7SUFFaEQsTUFBTSxFQUFFLGFBQWEsRUFBRSxHQUEyQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQTtJQUM5RixPQUFPLElBQUksYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFBO0FBQ2pDLENBQUM7QUFKRCxzQ0FJQztBQUVELFNBQWdCLGFBQWEsQ0FBQyxRQUFrQixFQUFFO0lBRWhELE1BQU0sRUFBRSxhQUFhLEVBQUUsR0FBMkMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUE7SUFDOUYsT0FBTyxJQUFJLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FB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IENvbXBvc2l0ZURpc3Bvc2FibGUgfSBmcm9tICdhdG9tJ1xuaW1wb3J0IHsgSG9vZ2xlRG9jVmlldyBhcyBIb29nbGVEb2NWaWV3VCwgSVByb3BzIGFzIERvY1Byb3BzIH0gZnJvbSAnLi9ob29nbGUtZG9jLXZpZXcnXG5pbXBvcnQgeyBIb29nbGVXZWJWaWV3IGFzIEhvb2dsZVdlYlZpZXdULCBJUHJvcHMgYXMgV2ViUHJvcHMgfSBmcm9tICcuL2hvb2dsZS13ZWItdmlldydcbmltcG9ydCB7IEhvb2dsZSBhcyBIb29nbGVUIH0gZnJvbSAnLi9ob29nbGUnXG5leHBvcnQgeyBjb25maWcgfSBmcm9tICcuL2NvbmZpZydcblxuY29uc3QgZGlzcG9zYWJsZXMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpXG5sZXQgaG9vZ2xlOiBIb29nbGVUXG5cbmV4cG9ydCBmdW5jdGlvbiBhY3RpdmF0ZShzdGF0ZTogbmV2ZXIpIHtcbiAgY29uc3QgZGlzcCA9IGF0b20ucGFja2FnZXMub25EaWRUcmlnZ2VyQWN0aXZhdGlvbkhvb2soXG4gICAgJ2xhbmd1YWdlLWhhc2tlbGw6Z3JhbW1hci11c2VkJyxcbiAgICAoKSA9PiB7XG4gICAgICBkaXNwLmRpc3Bvc2UoKVxuICAgICAgcmVhbGx5QWN0aXZhdGUoc3RhdGUpXG4gICAgICAuY2F0Y2goKGUpID0+IGF0b20ubm90aWZpY2F0aW9ucy5hZGRGYXRhbEVycm9yKFxuICAgICAgICAnRmFpbGVkIHRvIGFjdGl2YXRlIGlkZS1oYXNrZWxsLWhvb2dsZScsIHtcbiAgICAgICAgICBzdGFjazogKGUgYXMgRXJyb3IpLnN0YWNrLFxuICAgICAgICAgIGRpc21pc3NhYmxlOiB0cnVlLFxuICAgICAgICAgIGRldGFpbDogZSxcbiAgICAgICAgfSxcbiAgICAgICkpXG4gICAgfSxcbiAgKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRG9jVmlldyhwcm9wczogRG9jUHJvcHMgPSB7fSk6IEhvb2dsZURvY1ZpZXdUIHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXVuc2FmZS1hbnlcbiAgY29uc3QgeyBIb29nbGVEb2NWaWV3IH06IHtIb29nbGVEb2NWaWV3OiB0eXBlb2YgSG9vZ2xlRG9jVmlld1R9ID0gcmVxdWlyZSgnLi9ob29nbGUtZG9jLXZpZXcnKVxuICByZXR1cm4gbmV3IEhvb2dsZURvY1ZpZXcocHJvcHMpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVXZWJWaWV3KHByb3BzOiBXZWJQcm9wcyA9IHt9KTogSG9vZ2xlV2ViVmlld1Qge1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tdW5zYWZlLWFueVxuICBjb25zdCB7IEhvb2dsZVdlYlZpZXcgfToge0hvb2dsZVdlYlZpZXc6IHR5cGVvZiBIb29nbGVXZWJWaWV3VH0gPSByZXF1aXJlKCcuL2hvb2dsZS13ZWItdmlldycpXG4gIHJldHVybiBuZXcgSG9vZ2xlV2ViVmlldyhwcm9wcylcbn1cblxuYXN5bmMgZnVuY3Rpb24gc2hvd0RvYyhlZDogVGV4dEVkaXRvciwgZnVuYzogKHN5bTogSVN5bWJvbCkgPT4gdm9pZCkge1xuICBjb25zdCB0b2tlbiA9IGVkLnRva2VuRm9yQnVmZmVyUG9zaXRpb24oZWQuZ2V0TGFzdEN1cnNvcigpLmdldEJ1ZmZlclBvc2l0aW9uKCkpXG4gIGNvbnN0IHsgc2VsZWN0TGlzdFZpZXcgfSA9IGF3YWl0IGltcG9ydCgnLi9saXN0LXZpZXcnKVxuICBpZiAodG9rZW4pIHtcbiAgICBjb25zdCBzeW1ib2wgPSB0b2tlbi52YWx1ZVxuICAgIGNvbnN0IHN5bWJvbHMgPSBhd2FpdCBob29nbGUuc2VhcmNoRm9yU3ltYm9sKHN5bWJvbClcbiAgICBjb25zdCBpdGVtID0gYXdhaXQgc2VsZWN0TGlzdFZpZXcoc3ltYm9scylcbiAgICBpZiAoaXRlbSkge1xuICAgICAgZnVuYyhpdGVtKVxuICAgIH1cbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiByZWFsbHlBY3RpdmF0ZShfc3RhdGU6IG5ldmVyKSB7XG4gIGlmIChob29nbGUpIHsgcmV0dXJuIH1cbiAgY29uc3QgeyBIb29nbGUgfSA9IGF3YWl0IGltcG9ydCgnLi9ob29nbGUnKVxuICBjb25zdCB7IG9wZW5Eb2MsIG9wZW5XZWIgfSA9IGF3YWl0IGltcG9ydCgnLi91dGlsJylcbiAgaG9vZ2xlID0gbmV3IEhvb2dsZSgpXG4gIGRpc3Bvc2FibGVzLmFkZChob29nbGUpXG5cbiAgZGlzcG9zYWJsZXMuYWRkKGF0b20ud29ya3NwYWNlLmFkZE9wZW5lcigodXJpVG9PcGVuOiBzdHJpbmcpID0+IHtcbiAgICBjb25zdCBtID0gdXJpVG9PcGVuLm1hdGNoKC9eaWRlLWhhc2tlbGw6XFwvXFwvaG9vZ2xlXFwvKGRvY3x3ZWIpXFwvKC4qKSQvKVxuICAgIGlmICghKG0gJiYgbVsxXSkpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWRcbiAgICB9XG4gICAgc3dpdGNoIChtWzFdKSB7XG4gICAgICBjYXNlICdkb2MnOlxuICAgICAgICByZXR1cm4gY3JlYXRlRG9jVmlldygpXG4gICAgICBjYXNlICd3ZWInOlxuICAgICAgICByZXR1cm4gY3JlYXRlV2ViVmlldyh7dXJsOiBtWzJdIHx8IHVuZGVmaW5lZH0pXG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWRcbiAgfSkpXG5cbiAgZGlzcG9zYWJsZXMuYWRkKFxuICAgIGF0b20uY29tbWFuZHMuYWRkKCd3ZWJ2aWV3LmlkZS1oYXNrZWxsLWhvb2dsZS13ZWInLCB7XG4gICAgICAnaWRlLWhhc2tlbGwtaG9vZ2xlOndlYi1nby1iYWNrJzpcbiAgICAgIChldikgPT5cbiAgICAgICAgKGV2LmN1cnJlbnRUYXJnZXQgYXMgRWxlY3Ryb24uV2ViVmlld0VsZW1lbnQpLmdvQmFjaygpLFxuICAgICAgJ2lkZS1oYXNrZWxsLWhvb2dsZTp3ZWItZ28tZm9yd2FyZCc6XG4gICAgICAoZXYpID0+XG4gICAgICAgIChldi5jdXJyZW50VGFyZ2V0IGFzIEVsZWN0cm9uLldlYlZpZXdFbGVtZW50KS5nb0ZvcndhcmQoKSxcbiAgICB9KSxcbiAgICBhdG9tLmNvbW1hbmRzLmFkZCgnYXRvbS10ZXh0LWVkaXRvcicsIHtcbiAgICAgICdpZGUtaGFza2VsbC1ob29nbGU6c2hvdy1kb2MtZm9yLXN5bWJvbCc6XG4gICAgICAgIGFzeW5jICh7IGN1cnJlbnRUYXJnZXQgfSkgPT4gc2hvd0RvYygoY3VycmVudFRhcmdldCBhcyBUZXh0RWRpdG9yRWxlbWVudCkuZ2V0TW9kZWwoKSwgb3BlbkRvYyksXG4gICAgICAnaWRlLWhhc2tlbGwtaG9vZ2xlOnNob3ctd2ViLWRvYy1mb3Itc3ltYm9sJzpcbiAgICAgICAgYXN5bmMgKHsgY3VycmVudFRhcmdldCB9KSA9PiBzaG93RG9jKChjdXJyZW50VGFyZ2V0IGFzIFRleHRFZGl0b3JFbGVtZW50KS5nZXRNb2RlbCgpLCBvcGVuV2ViKSxcbiAgICB9KSxcbiAgKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVhY3RpdmF0ZSgpIHtcbiAgZGlzcG9zYWJsZXMuZGlzcG9zZSgpXG59XG4iXX0=