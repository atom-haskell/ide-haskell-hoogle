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
const highlight = require("atom-highlight");
function hl(lines, inline) {
    return highlight({
        fileContents: lines,
        scopeName: 'source.haskell',
        nbsp: true,
        lineDivs: !inline,
        editorDivTag: inline ? 'span' : 'pre',
        editorDiv: true,
    });
}
exports.hl = hl;
function openDoc(sym) {
    return __awaiter(this, void 0, void 0, function* () {
        const view = yield atom.workspace.open('ide-haskell://hoogle/doc/', {
            split: 'right',
            searchAllPanes: true,
            activatePane: false,
        });
        return view.update({ symbol: sym });
    });
}
exports.openDoc = openDoc;
function openWeb(sym, split = true) {
    return __awaiter(this, void 0, void 0, function* () {
        const view = yield atom.workspace.open(`ide-haskell://hoogle/web/`, {
            split: split ? 'right' : undefined,
            searchAllPanes: true,
            activatePane: false,
        });
        return view.update({ url: sym.href });
    });
}
exports.openWeb = openWeb;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSw0Q0FBNEM7QUFLNUMsWUFBbUIsS0FBYSxFQUFFLE1BQWU7SUFDL0MsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUNmLFlBQVksRUFBRSxLQUFLO1FBQ25CLFNBQVMsRUFBRSxnQkFBZ0I7UUFDM0IsSUFBSSxFQUFFLElBQUk7UUFDVixRQUFRLEVBQUUsQ0FBQyxNQUFNO1FBQ2pCLFlBQVksRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSztRQUNyQyxTQUFTLEVBQUUsSUFBSTtLQUNoQixDQUFDLENBQUE7QUFDSixDQUFDO0FBVEQsZ0JBU0M7QUFFRCxpQkFBOEIsR0FBWTs7UUFDeEMsTUFBTSxJQUFJLEdBQWtCLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQWdCLDJCQUEyQixFQUFFO1lBQ2hHLEtBQUssRUFBRSxPQUFPO1lBQ2QsY0FBYyxFQUFFLElBQUk7WUFDcEIsWUFBWSxFQUFFLEtBQUs7U0FDcEIsQ0FBQyxDQUFBO1FBQ0YsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQTtJQUNyQyxDQUFDO0NBQUE7QUFQRCwwQkFPQztBQUVELGlCQUE4QixHQUFZLEVBQUUsS0FBSyxHQUFHLElBQUk7O1FBQ3RELE1BQU0sSUFBSSxHQUFrQixNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFnQiwyQkFBMkIsRUFBRTtZQUNoRyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFNBQVM7WUFDbEMsY0FBYyxFQUFFLElBQUk7WUFDcEIsWUFBWSxFQUFFLEtBQUs7U0FDcEIsQ0FBQyxDQUFBO1FBQ0YsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7SUFDdkMsQ0FBQztDQUFBO0FBUEQsMEJBT0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgaGlnaGxpZ2h0ID0gcmVxdWlyZSgnYXRvbS1oaWdobGlnaHQnKVxuXG5pbXBvcnQgeyBIb29nbGVEb2NWaWV3IH0gZnJvbSAnLi9ob29nbGUtZG9jLXZpZXcnXG5pbXBvcnQgeyBIb29nbGVXZWJWaWV3IH0gZnJvbSAnLi9ob29nbGUtd2ViLXZpZXcnXG5cbmV4cG9ydCBmdW5jdGlvbiBobChsaW5lczogc3RyaW5nLCBpbmxpbmU6IGJvb2xlYW4pIHtcbiAgcmV0dXJuIGhpZ2hsaWdodCh7XG4gICAgZmlsZUNvbnRlbnRzOiBsaW5lcyxcbiAgICBzY29wZU5hbWU6ICdzb3VyY2UuaGFza2VsbCcsXG4gICAgbmJzcDogdHJ1ZSxcbiAgICBsaW5lRGl2czogIWlubGluZSxcbiAgICBlZGl0b3JEaXZUYWc6IGlubGluZSA/ICdzcGFuJyA6ICdwcmUnLFxuICAgIGVkaXRvckRpdjogdHJ1ZSxcbiAgfSlcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIG9wZW5Eb2Moc3ltOiBJU3ltYm9sKSB7XG4gIGNvbnN0IHZpZXc6IEhvb2dsZURvY1ZpZXcgPSBhd2FpdCBhdG9tLndvcmtzcGFjZS5vcGVuPEhvb2dsZURvY1ZpZXc+KCdpZGUtaGFza2VsbDovL2hvb2dsZS9kb2MvJywge1xuICAgIHNwbGl0OiAncmlnaHQnLFxuICAgIHNlYXJjaEFsbFBhbmVzOiB0cnVlLFxuICAgIGFjdGl2YXRlUGFuZTogZmFsc2UsXG4gIH0pXG4gIHJldHVybiB2aWV3LnVwZGF0ZSh7IHN5bWJvbDogc3ltIH0pXG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBvcGVuV2ViKHN5bTogSVN5bWJvbCwgc3BsaXQgPSB0cnVlKSB7XG4gIGNvbnN0IHZpZXc6IEhvb2dsZVdlYlZpZXcgPSBhd2FpdCBhdG9tLndvcmtzcGFjZS5vcGVuPEhvb2dsZVdlYlZpZXc+KGBpZGUtaGFza2VsbDovL2hvb2dsZS93ZWIvYCwge1xuICAgIHNwbGl0OiBzcGxpdCA/ICdyaWdodCcgOiB1bmRlZmluZWQsXG4gICAgc2VhcmNoQWxsUGFuZXM6IHRydWUsXG4gICAgYWN0aXZhdGVQYW5lOiBmYWxzZSxcbiAgfSlcbiAgcmV0dXJuIHZpZXcudXBkYXRlKHsgdXJsOiBzeW0uaHJlZiB9KVxufVxuIl19