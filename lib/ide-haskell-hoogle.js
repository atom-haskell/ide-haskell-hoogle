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
            'ide-haskell-hoogle:show-doc-for-symbol': ({ currentTarget }) => __awaiter(this, void 0, void 0, function* () { return showDoc(currentTarget.getModel(), openDoc); }),
            'ide-haskell-hoogle:show-web-doc-for-symbol': ({ currentTarget }) => __awaiter(this, void 0, void 0, function* () { return showDoc(currentTarget.getModel(), openWeb); }),
        }));
    });
}
function deactivate() {
    disposables.dispose();
}
exports.deactivate = deactivate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWRlLWhhc2tlbGwtaG9vZ2xlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2lkZS1oYXNrZWxsLWhvb2dsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsK0JBQWtFO0FBSWxFLG1DQUFpQztBQUF4QiwwQkFBQSxNQUFNLENBQUE7QUFFZixNQUFNLFdBQVcsR0FBRyxJQUFJLDBCQUFtQixFQUFFLENBQUE7QUFDN0MsSUFBSSxNQUFlLENBQUE7QUFFbkIsa0JBQXlCLEtBQVk7SUFDbkMsV0FBVyxDQUFDLEdBQUcsQ0FDYixJQUFJLENBQUMsUUFBUSxDQUFDLDBCQUEwQixDQUN0QywrQkFBK0IsRUFFL0IsR0FBRyxFQUFFLEdBQUcsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUNoQyxDQUNGLENBQUE7QUFDSCxDQUFDO0FBUkQsNEJBUUM7QUFFRCx1QkFBOEIsUUFBa0IsRUFBRTtJQUVoRCxNQUFNLEVBQUMsYUFBYSxFQUFDLEdBQTJDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFBO0lBQzVGLE1BQU0sQ0FBQyxJQUFJLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQTtBQUNqQyxDQUFDO0FBSkQsc0NBSUM7QUFFRCx1QkFBOEIsUUFBa0IsRUFBRTtJQUVoRCxNQUFNLEVBQUMsYUFBYSxFQUFDLEdBQTJDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFBO0lBQzVGLE1BQU0sQ0FBQyxJQUFJLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQTtBQUNqQyxDQUFDO0FBSkQsc0NBSUM7QUFFRCxpQkFBdUIsRUFBYyxFQUFFLElBQTRCOztRQUNqRSxNQUFNLEtBQUssR0FBRyxFQUFFLENBQUMsc0JBQXNCLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQTtRQUMvRSxNQUFNLEVBQUMsY0FBYyxFQUFDLEdBQUcsMERBQWEsYUFBYSxLQUFDLENBQUE7UUFDcEQsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNWLE1BQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUE7WUFDMUIsTUFBTSxPQUFPLEdBQUcsTUFBTSxNQUFNLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQ3BELE1BQU0sSUFBSSxHQUFHLE1BQU0sY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1lBQzFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ1QsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQ1osQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDO0NBQUE7QUFFRCx3QkFBOEIsS0FBWTs7UUFDeEMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQTtRQUFDLENBQUM7UUFDdEIsTUFBTSxFQUFDLE1BQU0sRUFBQyxHQUFHLDBEQUFhLFVBQVUsS0FBQyxDQUFBO1FBQ3pDLE1BQU0sRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFDLEdBQUcsMERBQWEsUUFBUSxLQUFDLENBQUE7UUFDakQsTUFBTSxHQUFHLElBQUksTUFBTSxFQUFFLENBQUE7UUFDckIsV0FBVyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUV2QixXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsU0FBaUIsRUFBRSxPQUFZLEVBQUUsRUFBRTtZQUMzRSxNQUFNLENBQUMsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLDJDQUEyQyxDQUFDLENBQUE7WUFDdEUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pCLE1BQU0sQ0FBQyxTQUFTLENBQUE7WUFDbEIsQ0FBQztZQUNELE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2IsS0FBSyxLQUFLO29CQUNSLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQTtnQkFDeEIsS0FBSyxLQUFLO29CQUNSLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQTtZQUMxQixDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUVILFdBQVcsQ0FBQyxHQUFHLENBQ2IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsZ0NBQWdDLEVBQUU7WUFDbEQsZ0NBQWdDLEVBQ2hDLENBQUMsRUFBRSxhQUFhLEVBQThDLEVBQUUsRUFBRSxDQUNoRSxhQUFhLENBQUMsTUFBTSxFQUFFO1lBQ3hCLG1DQUFtQyxFQUNuQyxDQUFDLEVBQUUsYUFBYSxFQUE4QyxFQUFFLEVBQUUsQ0FDaEUsYUFBYSxDQUFDLFNBQVMsRUFBRTtTQUM1QixDQUFDLEVBQ0YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUU7WUFDcEMsd0NBQXdDLEVBQ3RDLENBQU8sRUFBRSxhQUFhLEVBQWMsRUFBRSxFQUFFLGdEQUFDLE1BQU0sQ0FBTixPQUFPLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFBLEdBQUE7WUFDckYsNENBQTRDLEVBQzFDLENBQU8sRUFBRSxhQUFhLEVBQWMsRUFBRSxFQUFFLGdEQUFDLE1BQU0sQ0FBTixPQUFPLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFBLEdBQUE7U0FDdEYsQ0FBQyxDQUNILENBQUE7SUFDSCxDQUFDO0NBQUE7QUFFRDtJQUNFLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtBQUN2QixDQUFDO0FBRkQsZ0NBRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUZXh0RWRpdG9yLCBJRXZlbnREZXNjLCBDb21wb3NpdGVEaXNwb3NhYmxlIH0gZnJvbSAnYXRvbSdcbmltcG9ydCB7IEhvb2dsZURvY1ZpZXcgYXMgSG9vZ2xlRG9jVmlld1QsIElQcm9wcyBhcyBEb2NQcm9wcyB9IGZyb20gJy4vaG9vZ2xlLWRvYy12aWV3J1xuaW1wb3J0IHsgSG9vZ2xlV2ViVmlldyBhcyBIb29nbGVXZWJWaWV3VCwgSVByb3BzIGFzIFdlYlByb3BzIH0gZnJvbSAnLi9ob29nbGUtd2ViLXZpZXcnXG5pbXBvcnQgeyBIb29nbGUgYXMgSG9vZ2xlVCB9IGZyb20gJy4vaG9vZ2xlJ1xuZXhwb3J0IHsgY29uZmlnIH0gZnJvbSAnLi9jb25maWcnXG5cbmNvbnN0IGRpc3Bvc2FibGVzID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKVxubGV0IGhvb2dsZTogSG9vZ2xlVFxuXG5leHBvcnQgZnVuY3Rpb24gYWN0aXZhdGUoc3RhdGU6IG5ldmVyKSB7XG4gIGRpc3Bvc2FibGVzLmFkZChcbiAgICBhdG9tLnBhY2thZ2VzLm9uRGlkVHJpZ2dlckFjdGl2YXRpb25Ib29rKFxuICAgICAgJ2xhbmd1YWdlLWhhc2tlbGw6Z3JhbW1hci11c2VkJyxcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1mbG9hdGluZy1wcm9taXNlc1xuICAgICAgKCkgPT4geyByZWFsbHlBY3RpdmF0ZShzdGF0ZSkgfSxcbiAgICApLFxuICApXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVEb2NWaWV3KHByb3BzOiBEb2NQcm9wcyA9IHt9KTogSG9vZ2xlRG9jVmlld1Qge1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tdW5zYWZlLWFueVxuICBjb25zdCB7SG9vZ2xlRG9jVmlld306IHtIb29nbGVEb2NWaWV3OiB0eXBlb2YgSG9vZ2xlRG9jVmlld1R9ID0gcmVxdWlyZSgnLi9ob29nbGUtZG9jLXZpZXcnKVxuICByZXR1cm4gbmV3IEhvb2dsZURvY1ZpZXcocHJvcHMpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVXZWJWaWV3KHByb3BzOiBXZWJQcm9wcyA9IHt9KTogSG9vZ2xlV2ViVmlld1Qge1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tdW5zYWZlLWFueVxuICBjb25zdCB7SG9vZ2xlV2ViVmlld306IHtIb29nbGVXZWJWaWV3OiB0eXBlb2YgSG9vZ2xlV2ViVmlld1R9ID0gcmVxdWlyZSgnLi9ob29nbGUtd2ViLXZpZXcnKVxuICByZXR1cm4gbmV3IEhvb2dsZVdlYlZpZXcocHJvcHMpXG59XG5cbmFzeW5jIGZ1bmN0aW9uIHNob3dEb2MoZWQ6IFRleHRFZGl0b3IsIGZ1bmM6IChzeW06IElTeW1ib2wpID0+IHZvaWQpIHtcbiAgY29uc3QgdG9rZW4gPSBlZC50b2tlbkZvckJ1ZmZlclBvc2l0aW9uKGVkLmdldExhc3RDdXJzb3IoKS5nZXRCdWZmZXJQb3NpdGlvbigpKVxuICBjb25zdCB7c2VsZWN0TGlzdFZpZXd9ID0gYXdhaXQgaW1wb3J0KCcuL2xpc3QtdmlldycpXG4gIGlmICh0b2tlbikge1xuICAgIGNvbnN0IHN5bWJvbCA9IHRva2VuLnZhbHVlXG4gICAgY29uc3Qgc3ltYm9scyA9IGF3YWl0IGhvb2dsZS5zZWFyY2hGb3JTeW1ib2woc3ltYm9sKVxuICAgIGNvbnN0IGl0ZW0gPSBhd2FpdCBzZWxlY3RMaXN0VmlldyhzeW1ib2xzKVxuICAgIGlmIChpdGVtKSB7XG4gICAgICBmdW5jKGl0ZW0pXG4gICAgfVxuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJlYWxseUFjdGl2YXRlKHN0YXRlOiBuZXZlcikge1xuICBpZiAoaG9vZ2xlKSB7IHJldHVybiB9XG4gIGNvbnN0IHtIb29nbGV9ID0gYXdhaXQgaW1wb3J0KCcuL2hvb2dsZScpXG4gIGNvbnN0IHtvcGVuRG9jLCBvcGVuV2VifSA9IGF3YWl0IGltcG9ydCgnLi91dGlsJylcbiAgaG9vZ2xlID0gbmV3IEhvb2dsZSgpXG4gIGRpc3Bvc2FibGVzLmFkZChob29nbGUpXG5cbiAgZGlzcG9zYWJsZXMuYWRkKGF0b20ud29ya3NwYWNlLmFkZE9wZW5lcigodXJpVG9PcGVuOiBzdHJpbmcsIG9wdGlvbnM6IGFueSkgPT4ge1xuICAgIGNvbnN0IG0gPSB1cmlUb09wZW4ubWF0Y2goL15pZGUtaGFza2VsbDpcXC9cXC9ob29nbGVcXC8oZG9jfHdlYilcXC8oLiopJC8pXG4gICAgaWYgKCEobSAmJiBtWzFdKSkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgIH1cbiAgICBzd2l0Y2ggKG1bMV0pIHtcbiAgICAgIGNhc2UgJ2RvYyc6XG4gICAgICAgIHJldHVybiBjcmVhdGVEb2NWaWV3KClcbiAgICAgIGNhc2UgJ3dlYic6XG4gICAgICAgIHJldHVybiBjcmVhdGVXZWJWaWV3KClcbiAgICB9XG4gIH0pKVxuXG4gIGRpc3Bvc2FibGVzLmFkZChcbiAgICBhdG9tLmNvbW1hbmRzLmFkZCgnd2Vidmlldy5pZGUtaGFza2VsbC1ob29nbGUtd2ViJywge1xuICAgICAgJ2lkZS1oYXNrZWxsLWhvb2dsZTp3ZWItZ28tYmFjayc6XG4gICAgICAoeyBjdXJyZW50VGFyZ2V0IH06IHsgY3VycmVudFRhcmdldDogRWxlY3Ryb24uV2ViVmlld0VsZW1lbnQgfSkgPT5cbiAgICAgICAgY3VycmVudFRhcmdldC5nb0JhY2soKSxcbiAgICAgICdpZGUtaGFza2VsbC1ob29nbGU6d2ViLWdvLWZvcndhcmQnOlxuICAgICAgKHsgY3VycmVudFRhcmdldCB9OiB7IGN1cnJlbnRUYXJnZXQ6IEVsZWN0cm9uLldlYlZpZXdFbGVtZW50IH0pID0+XG4gICAgICAgIGN1cnJlbnRUYXJnZXQuZ29Gb3J3YXJkKCksXG4gICAgfSksXG4gICAgYXRvbS5jb21tYW5kcy5hZGQoJ2F0b20tdGV4dC1lZGl0b3InLCB7XG4gICAgICAnaWRlLWhhc2tlbGwtaG9vZ2xlOnNob3ctZG9jLWZvci1zeW1ib2wnOlxuICAgICAgICBhc3luYyAoeyBjdXJyZW50VGFyZ2V0IH06IElFdmVudERlc2MpID0+IHNob3dEb2MoY3VycmVudFRhcmdldC5nZXRNb2RlbCgpLCBvcGVuRG9jKSxcbiAgICAgICdpZGUtaGFza2VsbC1ob29nbGU6c2hvdy13ZWItZG9jLWZvci1zeW1ib2wnOlxuICAgICAgICBhc3luYyAoeyBjdXJyZW50VGFyZ2V0IH06IElFdmVudERlc2MpID0+IHNob3dEb2MoY3VycmVudFRhcmdldC5nZXRNb2RlbCgpLCBvcGVuV2ViKSxcbiAgICB9KSxcbiAgKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVhY3RpdmF0ZSgpIHtcbiAgZGlzcG9zYWJsZXMuZGlzcG9zZSgpXG59XG4iXX0=