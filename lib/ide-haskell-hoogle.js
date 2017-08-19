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
            return undefined;
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
        'ide-haskell-hoogle:web-go-forward': ({ currentTarget }) => currentTarget.goForward(),
    }), atom.commands.add('atom-text-editor', {
        'ide-haskell-hoogle:show-doc-for-symbol': ({ currentTarget }) => {
            showDoc(currentTarget.getModel(), util_1.openDoc);
        },
        'ide-haskell-hoogle:show-web-doc-for-symbol': ({ currentTarget }) => {
            showDoc(currentTarget.getModel(), util_1.openWeb);
        },
    }));
}
function deactivate() {
    disposables.dispose();
}
exports.deactivate = deactivate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWRlLWhhc2tlbGwtaG9vZ2xlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2lkZS1oYXNrZWxsLWhvb2dsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsK0JBQWtFO0FBQ2xFLHVEQUFxRTtBQUNyRSx1REFBcUU7QUFDckUscUNBQWlDO0FBQ2pDLDJDQUE0QztBQUM1QyxpQ0FBeUM7QUFDekMsbUNBQWlDO0FBQXhCLDBCQUFBLE1BQU0sQ0FBQTtBQUVmLE1BQU0sV0FBVyxHQUFHLElBQUksMEJBQW1CLEVBQUUsQ0FBQTtBQUM3QyxJQUFJLE1BQWMsQ0FBQTtBQUVsQixrQkFBeUIsS0FBWTtJQUNuQyxXQUFXLENBQUMsR0FBRyxDQUNiLElBQUksQ0FBQyxRQUFRLENBQUMsMEJBQTBCLENBQ3RDLCtCQUErQixFQUMvQixNQUFNLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FDNUIsQ0FDRixDQUFBO0FBQ0gsQ0FBQztBQVBELDRCQU9DO0FBRUQsdUJBQThCLEtBQWU7SUFDM0MsTUFBTSxDQUFDLElBQUksK0JBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQTtBQUNqQyxDQUFDO0FBRkQsc0NBRUM7QUFFRCx1QkFBOEIsS0FBZTtJQUMzQyxNQUFNLENBQUMsSUFBSSwrQkFBYSxDQUFDLEtBQUssQ0FBQyxDQUFBO0FBQ2pDLENBQUM7QUFGRCxzQ0FFQztBQUVELGlCQUF1QixFQUFjLEVBQUUsSUFBNEI7O1FBQ2pFLE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFBO1FBQy9FLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDVixNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFBO1lBQzFCLE1BQU0sT0FBTyxHQUFHLE1BQU0sTUFBTSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUNwRCxNQUFNLElBQUksR0FBRyxNQUFNLDBCQUFjLENBQUMsT0FBTyxDQUFDLENBQUE7WUFDMUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDVCxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDWixDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7Q0FBQTtBQUVELHdCQUF3QixLQUFZO0lBQ2xDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFBQyxNQUFNLENBQUE7SUFBQyxDQUFDO0lBQ3RCLE1BQU0sR0FBRyxJQUFJLGVBQU0sRUFBRSxDQUFBO0lBQ3JCLFdBQVcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUE7SUFFdkIsV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFNBQWlCLEVBQUUsT0FBWTtRQUN2RSxNQUFNLENBQUMsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLDJDQUEyQyxDQUFDLENBQUE7UUFDdEUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakIsTUFBTSxDQUFDLFNBQVMsQ0FBQTtRQUNsQixDQUFDO1FBQ0QsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNiLEtBQUssS0FBSztnQkFDUixNQUFNLENBQUMsSUFBSSwrQkFBYSxFQUFFLENBQUE7WUFDNUIsS0FBSyxLQUFLO2dCQUNSLE1BQU0sQ0FBQyxJQUFJLCtCQUFhLEVBQUUsQ0FBQTtRQUM5QixDQUFDO0lBQ0gsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUVILFdBQVcsQ0FBQyxHQUFHLENBQ2IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsZ0NBQWdDLEVBQUU7UUFDbEQsZ0NBQWdDLEVBQ2hDLENBQUMsRUFBRSxhQUFhLEVBQWMsS0FBTSxhQUFxQixDQUFDLE1BQU0sRUFBRTtRQUNsRSxtQ0FBbUMsRUFDbkMsQ0FBQyxFQUFFLGFBQWEsRUFBYyxLQUFNLGFBQXFCLENBQUMsU0FBUyxFQUFFO0tBQ3RFLENBQUMsRUFDRixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRTtRQUNwQyx3Q0FBd0MsRUFBRSxDQUFDLEVBQUUsYUFBYSxFQUFjO1lBQ3RFLE9BQU8sQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLEVBQUUsY0FBTyxDQUFDLENBQUE7UUFDNUMsQ0FBQztRQUNELDRDQUE0QyxFQUFFLENBQUMsRUFBRSxhQUFhLEVBQWM7WUFDMUUsT0FBTyxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsRUFBRSxjQUFPLENBQUMsQ0FBQTtRQUM1QyxDQUFDO0tBQ0YsQ0FBQyxDQUNILENBQUE7QUFDSCxDQUFDO0FBRUQ7SUFDRSxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUE7QUFDdkIsQ0FBQztBQUZELGdDQUVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVGV4dEVkaXRvciwgSUV2ZW50RGVzYywgQ29tcG9zaXRlRGlzcG9zYWJsZSB9IGZyb20gJ2F0b20nXG5pbXBvcnQgeyBIb29nbGVEb2NWaWV3LCBJUHJvcHMgYXMgRG9jUHJvcHMgfSBmcm9tICcuL2hvb2dsZS1kb2MtdmlldydcbmltcG9ydCB7IEhvb2dsZVdlYlZpZXcsIElQcm9wcyBhcyBXZWJQcm9wcyB9IGZyb20gJy4vaG9vZ2xlLXdlYi12aWV3J1xuaW1wb3J0IHsgSG9vZ2xlIH0gZnJvbSAnLi9ob29nbGUnXG5pbXBvcnQgeyBzZWxlY3RMaXN0VmlldyB9IGZyb20gJy4vbGlzdC12aWV3J1xuaW1wb3J0IHsgb3BlbkRvYywgb3BlbldlYiB9IGZyb20gJy4vdXRpbCdcbmV4cG9ydCB7IGNvbmZpZyB9IGZyb20gJy4vY29uZmlnJ1xuXG5jb25zdCBkaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKClcbmxldCBob29nbGU6IEhvb2dsZVxuXG5leHBvcnQgZnVuY3Rpb24gYWN0aXZhdGUoc3RhdGU6IG5ldmVyKSB7XG4gIGRpc3Bvc2FibGVzLmFkZChcbiAgICBhdG9tLnBhY2thZ2VzLm9uRGlkVHJpZ2dlckFjdGl2YXRpb25Ib29rKFxuICAgICAgJ2xhbmd1YWdlLWhhc2tlbGw6Z3JhbW1hci11c2VkJyxcbiAgICAgICgpID0+IHJlYWxseUFjdGl2YXRlKHN0YXRlKSxcbiAgICApLFxuICApXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVEb2NWaWV3KHByb3BzOiBEb2NQcm9wcykge1xuICByZXR1cm4gbmV3IEhvb2dsZURvY1ZpZXcocHJvcHMpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVXZWJWaWV3KHByb3BzOiBXZWJQcm9wcykge1xuICByZXR1cm4gbmV3IEhvb2dsZVdlYlZpZXcocHJvcHMpXG59XG5cbmFzeW5jIGZ1bmN0aW9uIHNob3dEb2MoZWQ6IFRleHRFZGl0b3IsIGZ1bmM6IChzeW06IElTeW1ib2wpID0+IHZvaWQpIHtcbiAgY29uc3QgdG9rZW4gPSBlZC50b2tlbkZvckJ1ZmZlclBvc2l0aW9uKGVkLmdldExhc3RDdXJzb3IoKS5nZXRCdWZmZXJQb3NpdGlvbigpKVxuICBpZiAodG9rZW4pIHtcbiAgICBjb25zdCBzeW1ib2wgPSB0b2tlbi52YWx1ZVxuICAgIGNvbnN0IHN5bWJvbHMgPSBhd2FpdCBob29nbGUuc2VhcmNoRm9yU3ltYm9sKHN5bWJvbClcbiAgICBjb25zdCBpdGVtID0gYXdhaXQgc2VsZWN0TGlzdFZpZXcoc3ltYm9scylcbiAgICBpZiAoaXRlbSkge1xuICAgICAgZnVuYyhpdGVtKVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiByZWFsbHlBY3RpdmF0ZShzdGF0ZTogbmV2ZXIpIHtcbiAgaWYgKGhvb2dsZSkgeyByZXR1cm4gfVxuICBob29nbGUgPSBuZXcgSG9vZ2xlKClcbiAgZGlzcG9zYWJsZXMuYWRkKGhvb2dsZSlcblxuICBkaXNwb3NhYmxlcy5hZGQoYXRvbS53b3Jrc3BhY2UuYWRkT3BlbmVyKCh1cmlUb09wZW46IHN0cmluZywgb3B0aW9uczogYW55KSA9PiB7XG4gICAgY29uc3QgbSA9IHVyaVRvT3Blbi5tYXRjaCgvXmlkZS1oYXNrZWxsOlxcL1xcL2hvb2dsZVxcLyhkb2N8d2ViKVxcLyguKikkLylcbiAgICBpZiAoIShtICYmIG1bMV0pKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkXG4gICAgfVxuICAgIHN3aXRjaCAobVsxXSkge1xuICAgICAgY2FzZSAnZG9jJzpcbiAgICAgICAgcmV0dXJuIG5ldyBIb29nbGVEb2NWaWV3KClcbiAgICAgIGNhc2UgJ3dlYic6XG4gICAgICAgIHJldHVybiBuZXcgSG9vZ2xlV2ViVmlldygpXG4gICAgfVxuICB9KSlcblxuICBkaXNwb3NhYmxlcy5hZGQoXG4gICAgYXRvbS5jb21tYW5kcy5hZGQoJ3dlYnZpZXcuaWRlLWhhc2tlbGwtaG9vZ2xlLXdlYicsIHtcbiAgICAgICdpZGUtaGFza2VsbC1ob29nbGU6d2ViLWdvLWJhY2snOlxuICAgICAgKHsgY3VycmVudFRhcmdldCB9OiBJRXZlbnREZXNjKSA9PiAoY3VycmVudFRhcmdldCBhcyBhbnkpLmdvQmFjaygpLFxuICAgICAgJ2lkZS1oYXNrZWxsLWhvb2dsZTp3ZWItZ28tZm9yd2FyZCc6XG4gICAgICAoeyBjdXJyZW50VGFyZ2V0IH06IElFdmVudERlc2MpID0+IChjdXJyZW50VGFyZ2V0IGFzIGFueSkuZ29Gb3J3YXJkKCksXG4gICAgfSksXG4gICAgYXRvbS5jb21tYW5kcy5hZGQoJ2F0b20tdGV4dC1lZGl0b3InLCB7XG4gICAgICAnaWRlLWhhc2tlbGwtaG9vZ2xlOnNob3ctZG9jLWZvci1zeW1ib2wnOiAoeyBjdXJyZW50VGFyZ2V0IH06IElFdmVudERlc2MpID0+IHtcbiAgICAgICAgc2hvd0RvYyhjdXJyZW50VGFyZ2V0LmdldE1vZGVsKCksIG9wZW5Eb2MpXG4gICAgICB9LFxuICAgICAgJ2lkZS1oYXNrZWxsLWhvb2dsZTpzaG93LXdlYi1kb2MtZm9yLXN5bWJvbCc6ICh7IGN1cnJlbnRUYXJnZXQgfTogSUV2ZW50RGVzYykgPT4ge1xuICAgICAgICBzaG93RG9jKGN1cnJlbnRUYXJnZXQuZ2V0TW9kZWwoKSwgb3BlbldlYilcbiAgICAgIH0sXG4gICAgfSksXG4gIClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlYWN0aXZhdGUoKSB7XG4gIGRpc3Bvc2FibGVzLmRpc3Bvc2UoKVxufVxuIl19