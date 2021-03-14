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
        reallyActivate(state).catch((e) => atom.notifications.addFatalError('Failed to activate ide-haskell-hoogle', {
            stack: e.stack,
            dismissable: true,
            detail: e,
        }));
    });
}
exports.activate = activate;
function createDocView(props = {}) {
    const { HoogleDocView, } = require('./hoogle-doc-view');
    return new HoogleDocView(props);
}
exports.createDocView = createDocView;
function createWebView(props = {}) {
    const { HoogleWebView, } = require('./hoogle-web-view');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWRlLWhhc2tlbGwtaG9vZ2xlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2lkZS1oYXNrZWxsLWhvb2dsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQkFBeUU7QUFXekUsbUNBQWlDO0FBQXhCLGdHQUFBLE1BQU0sT0FBQTtBQUVmLE1BQU0sV0FBVyxHQUFHLElBQUksMEJBQW1CLEVBQUUsQ0FBQTtBQUM3QyxJQUFJLE1BQWUsQ0FBQTtBQUVuQixTQUFnQixRQUFRLENBQUMsS0FBWTtJQUNuQyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLDBCQUEwQixDQUNuRCwrQkFBK0IsRUFDL0IsR0FBRyxFQUFFO1FBQ0gsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFBO1FBQ2QsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQ2hDLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUM5Qix1Q0FBdUMsRUFDdkM7WUFDRSxLQUFLLEVBQUcsQ0FBVyxDQUFDLEtBQUs7WUFDekIsV0FBVyxFQUFFLElBQUk7WUFDakIsTUFBTSxFQUFFLENBQUM7U0FDVixDQUNGLENBQ0YsQ0FBQTtJQUNILENBQUMsQ0FDRixDQUFBO0FBQ0gsQ0FBQztBQWpCRCw0QkFpQkM7QUFFRCxTQUFnQixhQUFhLENBQUMsUUFBa0IsRUFBRTtJQUVoRCxNQUFNLEVBQ0osYUFBYSxHQUNkLEdBQTZDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFBO0lBQzFFLE9BQU8sSUFBSSxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUE7QUFDakMsQ0FBQztBQU5ELHNDQU1DO0FBRUQsU0FBZ0IsYUFBYSxDQUFDLFFBQWtCLEVBQUU7SUFFaEQsTUFBTSxFQUNKLGFBQWEsR0FDZCxHQUE2QyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQTtJQUMxRSxPQUFPLElBQUksYUFBYSxDQUFDLEtBQUssQ0FBQyxD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dCwgQ29tcG9zaXRlRGlzcG9zYWJsZSB9IGZyb20gJ2F0b20nXG5pbXBvcnQge1xuICBIb29nbGVEb2NWaWV3IGFzIEhvb2dsZURvY1ZpZXdULFxuICBJUHJvcHMgYXMgRG9jUHJvcHMsXG59IGZyb20gJy4vaG9vZ2xlLWRvYy12aWV3J1xuaW1wb3J0IHtcbiAgSG9vZ2xlV2ViVmlldyBhcyBIb29nbGVXZWJWaWV3VCxcbiAgSVByb3BzIGFzIFdlYlByb3BzLFxufSBmcm9tICcuL2hvb2dsZS13ZWItdmlldydcbmltcG9ydCB7IEhvb2dsZSBhcyBIb29nbGVUIH0gZnJvbSAnLi9ob29nbGUnXG5pbXBvcnQgdHlwZSB7IFdlYnZpZXdUYWcgfSBmcm9tICdlbGVjdHJvbidcbmV4cG9ydCB7IGNvbmZpZyB9IGZyb20gJy4vY29uZmlnJ1xuXG5jb25zdCBkaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKClcbmxldCBob29nbGU6IEhvb2dsZVRcblxuZXhwb3J0IGZ1bmN0aW9uIGFjdGl2YXRlKHN0YXRlOiBuZXZlcikge1xuICBjb25zdCBkaXNwID0gYXRvbS5wYWNrYWdlcy5vbkRpZFRyaWdnZXJBY3RpdmF0aW9uSG9vayhcbiAgICAnbGFuZ3VhZ2UtaGFza2VsbDpncmFtbWFyLXVzZWQnLFxuICAgICgpID0+IHtcbiAgICAgIGRpc3AuZGlzcG9zZSgpXG4gICAgICByZWFsbHlBY3RpdmF0ZShzdGF0ZSkuY2F0Y2goKGUpID0+XG4gICAgICAgIGF0b20ubm90aWZpY2F0aW9ucy5hZGRGYXRhbEVycm9yKFxuICAgICAgICAgICdGYWlsZWQgdG8gYWN0aXZhdGUgaWRlLWhhc2tlbGwtaG9vZ2xlJyxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzdGFjazogKGUgYXMgRXJyb3IpLnN0YWNrLFxuICAgICAgICAgICAgZGlzbWlzc2FibGU6IHRydWUsXG4gICAgICAgICAgICBkZXRhaWw6IGUsXG4gICAgICAgICAgfSxcbiAgICAgICAgKSxcbiAgICAgIClcbiAgICB9LFxuICApXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVEb2NWaWV3KHByb3BzOiBEb2NQcm9wcyA9IHt9KTogSG9vZ2xlRG9jVmlld1Qge1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tdW5zYWZlLWFueVxuICBjb25zdCB7XG4gICAgSG9vZ2xlRG9jVmlldyxcbiAgfTogeyBIb29nbGVEb2NWaWV3OiB0eXBlb2YgSG9vZ2xlRG9jVmlld1QgfSA9IHJlcXVpcmUoJy4vaG9vZ2xlLWRvYy12aWV3JylcbiAgcmV0dXJuIG5ldyBIb29nbGVEb2NWaWV3KHByb3BzKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlV2ViVmlldyhwcm9wczogV2ViUHJvcHMgPSB7fSk6IEhvb2dsZVdlYlZpZXdUIHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXVuc2FmZS1hbnlcbiAgY29uc3Qge1xuICAgIEhvb2dsZVdlYlZpZXcsXG4gIH06IHsgSG9vZ2xlV2ViVmlldzogdHlwZW9mIEhvb2dsZVdlYlZpZXdUIH0gPSByZXF1aXJlKCcuL2hvb2dsZS13ZWItdmlldycpXG4gIHJldHVybiBuZXcgSG9vZ2xlV2ViVmlldyhwcm9wcylcbn1cblxuYXN5bmMgZnVuY3Rpb24gc2hvd0RvYyhlZDogVGV4dEVkaXRvciwgZnVuYzogKHN5bTogSVN5bWJvbCkgPT4gdm9pZCkge1xuICBjb25zdCB0b2tlbiA9IGVkLnRva2VuRm9yQnVmZmVyUG9zaXRpb24oXG4gICAgZWQuZ2V0TGFzdEN1cnNvcigpLmdldEJ1ZmZlclBvc2l0aW9uKCksXG4gIClcbiAgY29uc3QgeyBzZWxlY3RMaXN0VmlldyB9ID0gYXdhaXQgaW1wb3J0KCcuL2xpc3QtdmlldycpXG4gIGlmICh0b2tlbikge1xuICAgIGNvbnN0IHN5bWJvbCA9IHRva2VuLnZhbHVlXG4gICAgY29uc3Qgc3ltYm9scyA9IGF3YWl0IGhvb2dsZS5zZWFyY2hGb3JTeW1ib2woc3ltYm9sKVxuICAgIGNvbnN0IGl0ZW0gPSBhd2FpdCBzZWxlY3RMaXN0VmlldyhzeW1ib2xzKVxuICAgIGlmIChpdGVtKSB7XG4gICAgICBmdW5jKGl0ZW0pXG4gICAgfVxuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJlYWxseUFjdGl2YXRlKF9zdGF0ZTogbmV2ZXIpIHtcbiAgaWYgKGhvb2dsZSkge1xuICAgIHJldHVyblxuICB9XG4gIGNvbnN0IHsgSG9vZ2xlIH0gPSBhd2FpdCBpbXBvcnQoJy4vaG9vZ2xlJylcbiAgY29uc3QgeyBvcGVuRG9jLCBvcGVuV2ViIH0gPSBhd2FpdCBpbXBvcnQoJy4vdXRpbCcpXG4gIGhvb2dsZSA9IG5ldyBIb29nbGUoKVxuICBkaXNwb3NhYmxlcy5hZGQoaG9vZ2xlKVxuXG4gIGRpc3Bvc2FibGVzLmFkZChcbiAgICBhdG9tLndvcmtzcGFjZS5hZGRPcGVuZXIoKHVyaVRvT3Blbjogc3RyaW5nKSA9PiB7XG4gICAgICBjb25zdCBtID0gdXJpVG9PcGVuLm1hdGNoKC9eaWRlLWhhc2tlbGw6XFwvXFwvaG9vZ2xlXFwvKGRvY3x3ZWIpXFwvKC4qKSQvKVxuICAgICAgaWYgKCEobSAmJiBtWzFdKSkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkXG4gICAgICB9XG4gICAgICBzd2l0Y2ggKG1bMV0pIHtcbiAgICAgICAgY2FzZSAnZG9jJzpcbiAgICAgICAgICByZXR1cm4gY3JlYXRlRG9jVmlldygpXG4gICAgICAgIGNhc2UgJ3dlYic6XG4gICAgICAgICAgcmV0dXJuIGNyZWF0ZVdlYlZpZXcoeyB1cmw6IG1bMl0gfHwgdW5kZWZpbmVkIH0pXG4gICAgICB9XG4gICAgICByZXR1cm4gdW5kZWZpbmVkXG4gICAgfSksXG4gIClcblxuICBkaXNwb3NhYmxlcy5hZGQoXG4gICAgYXRvbS5jb21tYW5kcy5hZGQoJ3dlYnZpZXcuaWRlLWhhc2tlbGwtaG9vZ2xlLXdlYicsIHtcbiAgICAgICdpZGUtaGFza2VsbC1ob29nbGU6d2ViLWdvLWJhY2snOiAoZXYpID0+XG4gICAgICAgIChldi5jdXJyZW50VGFyZ2V0IGFzIFdlYnZpZXdUYWcpLmdvQmFjaygpLFxuICAgICAgJ2lkZS1oYXNrZWxsLWhvb2dsZTp3ZWItZ28tZm9yd2FyZCc6IChldikgPT5cbiAgICAgICAgKGV2LmN1cnJlbnRUYXJnZXQgYXMgV2Vidmlld1RhZykuZ29Gb3J3YXJkKCksXG4gICAgfSksXG4gICAgYXRvbS5jb21tYW5kcy5hZGQoJ2F0b20tdGV4dC1lZGl0b3InLCB7XG4gICAgICAnaWRlLWhhc2tlbGwtaG9vZ2xlOnNob3ctZG9jLWZvci1zeW1ib2wnOiBhc3luYyAoeyBjdXJyZW50VGFyZ2V0IH0pID0+XG4gICAgICAgIHNob3dEb2MoKGN1cnJlbnRUYXJnZXQgYXMgVGV4dEVkaXRvckVsZW1lbnQpLmdldE1vZGVsKCksIG9wZW5Eb2MpLFxuICAgICAgJ2lkZS1oYXNrZWxsLWhvb2dsZTpzaG93LXdlYi1kb2MtZm9yLXN5bWJvbCc6IGFzeW5jICh7IGN1cnJlbnRUYXJnZXQgfSkgPT5cbiAgICAgICAgc2hvd0RvYygoY3VycmVudFRhcmdldCBhcyBUZXh0RWRpdG9yRWxlbWVudCkuZ2V0TW9kZWwoKSwgb3BlbldlYiksXG4gICAgfSksXG4gIClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlYWN0aXZhdGUoKSB7XG4gIGRpc3Bvc2FibGVzLmRpc3Bvc2UoKVxufVxuIl19