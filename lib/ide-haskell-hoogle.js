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
    atom.packages.onDidTriggerActivationHook('language-haskell:grammar-used', () => reallyActivate(state));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWRlLWhhc2tlbGwtaG9vZ2xlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2lkZS1oYXNrZWxsLWhvb2dsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsK0JBQWdFO0FBQ2hFLHVEQUFtRTtBQUNuRSx1REFBbUU7QUFDbkUscUNBQStCO0FBQy9CLDJDQUEwQztBQUMxQyxpQ0FBdUM7QUFDdkMsbUNBQStCO0FBQXZCLDBCQUFBLE1BQU0sQ0FBQTtBQUVkLE1BQU0sV0FBVyxHQUFHLElBQUksMEJBQW1CLEVBQUUsQ0FBQTtBQUM3QyxJQUFJLE1BQWMsQ0FBQTtBQUVsQixrQkFBMEIsS0FBWTtJQUNuQyxJQUFJLENBQUMsUUFBZ0IsQ0FBQywwQkFBMEIsQ0FBQywrQkFBK0IsRUFBRSxNQUFNLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBO0FBQ2pILENBQUM7QUFGRCw0QkFFQztBQUVELHVCQUErQixLQUFlO0lBQzVDLE1BQU0sQ0FBQyxJQUFJLCtCQUFhLENBQUMsS0FBSyxDQUFDLENBQUE7QUFDakMsQ0FBQztBQUZELHNDQUVDO0FBRUQsdUJBQStCLEtBQWU7SUFDNUMsTUFBTSxDQUFDLElBQUksK0JBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQTtBQUNqQyxDQUFDO0FBRkQsc0NBRUM7QUFFRCxpQkFBd0IsRUFBYyxFQUFFLElBQTRCOztRQUNsRSxNQUFNLEtBQUssR0FBRyxFQUFFLENBQUMsc0JBQXNCLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQTtRQUMvRSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ1YsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQTtZQUMxQixNQUFNLE9BQU8sR0FBRyxNQUFNLE1BQU0sQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUE7WUFDcEQsTUFBTSxJQUFJLEdBQUcsTUFBTSwwQkFBYyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1lBQzFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ1QsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQ1osQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDO0NBQUE7QUFFRCx3QkFBeUIsS0FBWTtJQUNuQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQUMsTUFBTSxDQUFBO0lBQUMsQ0FBQztJQUN0QixNQUFNLEdBQUcsSUFBSSxlQUFNLEVBQUUsQ0FBQTtJQUNyQixXQUFXLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBRXZCLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxTQUFpQixFQUFFLE9BQVk7UUFDdkUsTUFBTSxDQUFDLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQywyQ0FBMkMsQ0FBQyxDQUFBO1FBQ3RFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLE1BQU0sQ0FBQTtRQUNSLENBQUM7UUFDRCxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2IsS0FBSyxLQUFLO2dCQUNSLE1BQU0sQ0FBQyxJQUFJLCtCQUFhLEVBQUUsQ0FBQTtZQUM1QixLQUFLLEtBQUs7Z0JBQ1IsTUFBTSxDQUFDLElBQUksK0JBQWEsRUFBRSxDQUFBO1FBQzlCLENBQUM7SUFDSCxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBRUgsV0FBVyxDQUFDLEdBQUcsQ0FDYixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxnQ0FBZ0MsRUFBRTtRQUNsRCxnQ0FBZ0MsRUFDOUIsQ0FBQyxFQUFDLGFBQWEsRUFBYSxLQUFNLGFBQXFCLENBQUMsTUFBTSxFQUFFO1FBQ2xFLG1DQUFtQyxFQUNqQyxDQUFDLEVBQUMsYUFBYSxFQUFhLEtBQU0sYUFBcUIsQ0FBQyxTQUFTLEVBQUU7S0FDdEUsQ0FBQyxFQUNGLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFO1FBQ3BDLHdDQUF3QyxFQUFFLENBQUMsRUFBQyxhQUFhLEVBQWE7WUFDcEUsT0FBTyxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsRUFBRSxjQUFPLENBQUMsQ0FBQTtRQUM1QyxDQUFDO1FBQ0QsNENBQTRDLEVBQUUsQ0FBQyxFQUFDLGFBQWEsRUFBYTtZQUN4RSxPQUFPLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxFQUFFLGNBQU8sQ0FBQyxDQUFBO1FBQzVDLENBQUM7S0FDRixDQUFDLENBQ0gsQ0FBQTtBQUNILENBQUM7QUFFRDtJQUNFLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtBQUN2QixDQUFDO0FBRkQsZ0NBRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1RleHRFZGl0b3IsIElFdmVudERlc2MsIENvbXBvc2l0ZURpc3Bvc2FibGV9IGZyb20gJ2F0b20nXG5pbXBvcnQge0hvb2dsZURvY1ZpZXcsIElQcm9wcyBhcyBEb2NQcm9wc30gZnJvbSAnLi9ob29nbGUtZG9jLXZpZXcnXG5pbXBvcnQge0hvb2dsZVdlYlZpZXcsIElQcm9wcyBhcyBXZWJQcm9wc30gZnJvbSAnLi9ob29nbGUtd2ViLXZpZXcnXG5pbXBvcnQge0hvb2dsZX0gZnJvbSAnLi9ob29nbGUnXG5pbXBvcnQge3NlbGVjdExpc3RWaWV3fSBmcm9tICcuL2xpc3QtdmlldydcbmltcG9ydCB7b3BlbkRvYywgb3BlbldlYn0gZnJvbSAnLi91dGlsJ1xuZXhwb3J0IHtjb25maWd9IGZyb20gJy4vY29uZmlnJ1xuXG5jb25zdCBkaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKClcbmxldCBob29nbGU6IEhvb2dsZVxuXG5leHBvcnQgZnVuY3Rpb24gYWN0aXZhdGUgKHN0YXRlOiBuZXZlcikge1xuICAoYXRvbS5wYWNrYWdlcyBhcyBhbnkpLm9uRGlkVHJpZ2dlckFjdGl2YXRpb25Ib29rKCdsYW5ndWFnZS1oYXNrZWxsOmdyYW1tYXItdXNlZCcsICgpID0+IHJlYWxseUFjdGl2YXRlKHN0YXRlKSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZURvY1ZpZXcgKHByb3BzOiBEb2NQcm9wcykge1xuICByZXR1cm4gbmV3IEhvb2dsZURvY1ZpZXcocHJvcHMpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVXZWJWaWV3IChwcm9wczogV2ViUHJvcHMpIHtcbiAgcmV0dXJuIG5ldyBIb29nbGVXZWJWaWV3KHByb3BzKVxufVxuXG5hc3luYyBmdW5jdGlvbiBzaG93RG9jIChlZDogVGV4dEVkaXRvciwgZnVuYzogKHN5bTogSVN5bWJvbCkgPT4gdm9pZCkge1xuICBjb25zdCB0b2tlbiA9IGVkLnRva2VuRm9yQnVmZmVyUG9zaXRpb24oZWQuZ2V0TGFzdEN1cnNvcigpLmdldEJ1ZmZlclBvc2l0aW9uKCkpXG4gIGlmICh0b2tlbikge1xuICAgIGNvbnN0IHN5bWJvbCA9IHRva2VuLnZhbHVlXG4gICAgY29uc3Qgc3ltYm9scyA9IGF3YWl0IGhvb2dsZS5zZWFyY2hGb3JTeW1ib2woc3ltYm9sKVxuICAgIGNvbnN0IGl0ZW0gPSBhd2FpdCBzZWxlY3RMaXN0VmlldyhzeW1ib2xzKVxuICAgIGlmIChpdGVtKSB7XG4gICAgICBmdW5jKGl0ZW0pXG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHJlYWxseUFjdGl2YXRlIChzdGF0ZTogbmV2ZXIpIHtcbiAgaWYgKGhvb2dsZSkgeyByZXR1cm4gfVxuICBob29nbGUgPSBuZXcgSG9vZ2xlKClcbiAgZGlzcG9zYWJsZXMuYWRkKGhvb2dsZSlcblxuICBkaXNwb3NhYmxlcy5hZGQoYXRvbS53b3Jrc3BhY2UuYWRkT3BlbmVyKCh1cmlUb09wZW46IHN0cmluZywgb3B0aW9uczogYW55KSA9PiB7XG4gICAgY29uc3QgbSA9IHVyaVRvT3Blbi5tYXRjaCgvXmlkZS1oYXNrZWxsOlxcL1xcL2hvb2dsZVxcLyhkb2N8d2ViKVxcLyguKikkLylcbiAgICBpZiAoIShtICYmIG1bMV0pKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgc3dpdGNoIChtWzFdKSB7XG4gICAgICBjYXNlICdkb2MnOlxuICAgICAgICByZXR1cm4gbmV3IEhvb2dsZURvY1ZpZXcoKVxuICAgICAgY2FzZSAnd2ViJzpcbiAgICAgICAgcmV0dXJuIG5ldyBIb29nbGVXZWJWaWV3KClcbiAgICB9XG4gIH0pKVxuXG4gIGRpc3Bvc2FibGVzLmFkZChcbiAgICBhdG9tLmNvbW1hbmRzLmFkZCgnd2Vidmlldy5pZGUtaGFza2VsbC1ob29nbGUtd2ViJywge1xuICAgICAgJ2lkZS1oYXNrZWxsLWhvb2dsZTp3ZWItZ28tYmFjayc6XG4gICAgICAgICh7Y3VycmVudFRhcmdldH06IElFdmVudERlc2MpID0+IChjdXJyZW50VGFyZ2V0IGFzIGFueSkuZ29CYWNrKCksXG4gICAgICAnaWRlLWhhc2tlbGwtaG9vZ2xlOndlYi1nby1mb3J3YXJkJzpcbiAgICAgICAgKHtjdXJyZW50VGFyZ2V0fTogSUV2ZW50RGVzYykgPT4gKGN1cnJlbnRUYXJnZXQgYXMgYW55KS5nb0ZvcndhcmQoKVxuICAgIH0pLFxuICAgIGF0b20uY29tbWFuZHMuYWRkKCdhdG9tLXRleHQtZWRpdG9yJywge1xuICAgICAgJ2lkZS1oYXNrZWxsLWhvb2dsZTpzaG93LWRvYy1mb3Itc3ltYm9sJzogKHtjdXJyZW50VGFyZ2V0fTogSUV2ZW50RGVzYykgPT4ge1xuICAgICAgICBzaG93RG9jKGN1cnJlbnRUYXJnZXQuZ2V0TW9kZWwoKSwgb3BlbkRvYylcbiAgICAgIH0sXG4gICAgICAnaWRlLWhhc2tlbGwtaG9vZ2xlOnNob3ctd2ViLWRvYy1mb3Itc3ltYm9sJzogKHtjdXJyZW50VGFyZ2V0fTogSUV2ZW50RGVzYykgPT4ge1xuICAgICAgICBzaG93RG9jKGN1cnJlbnRUYXJnZXQuZ2V0TW9kZWwoKSwgb3BlbldlYilcbiAgICAgIH1cbiAgICB9KSxcbiAgKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVhY3RpdmF0ZSAoKSB7XG4gIGRpc3Bvc2FibGVzLmRpc3Bvc2UoKVxufVxuIl19