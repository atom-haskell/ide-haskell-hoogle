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
        view.update({ symbol: sym });
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
        view.update({ url: sym.href });
    });
}
exports.openWeb = openWeb;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSw0Q0FBNEM7QUFLNUMsWUFBb0IsS0FBYSxFQUFFLE1BQWU7SUFDaEQsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUNmLFlBQVksRUFBRSxLQUFLO1FBQ25CLFNBQVMsRUFBRSxnQkFBZ0I7UUFDM0IsSUFBSSxFQUFFLElBQUk7UUFDVixRQUFRLEVBQUUsQ0FBQyxNQUFNO1FBQ2pCLFlBQVksRUFBRSxNQUFNLEdBQUcsTUFBTSxHQUFHLEtBQUs7UUFDckMsU0FBUyxFQUFFLElBQUk7S0FDaEIsQ0FBQyxDQUFBO0FBQ0osQ0FBQztBQVRELGdCQVNDO0FBRUQsaUJBQStCLEdBQVk7O1FBQ3pDLE1BQU0sSUFBSSxHQUFrQixNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLDJCQUEyQixFQUFFO1lBQ2pGLEtBQUssRUFBRSxPQUFPO1lBQ2QsY0FBYyxFQUFFLElBQUk7WUFDcEIsWUFBWSxFQUFFLEtBQUs7U0FDcEIsQ0FBQyxDQUFBO1FBQ0YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUMsQ0FBQyxDQUFBO0lBQzVCLENBQUM7Q0FBQTtBQVBELDBCQU9DO0FBRUQsaUJBQStCLEdBQVksRUFBRSxLQUFLLEdBQUcsSUFBSTs7UUFDdkQsTUFBTSxJQUFJLEdBQWtCLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsMkJBQTJCLEVBQUU7WUFDakYsS0FBSyxFQUFFLEtBQUssR0FBRyxPQUFPLEdBQUcsU0FBUztZQUNsQyxjQUFjLEVBQUUsSUFBSTtZQUNwQixZQUFZLEVBQUUsS0FBSztTQUNwQixDQUFDLENBQUE7UUFDRixJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxDQUFBO0lBQzlCLENBQUM7Q0FBQTtBQVBELDBCQU9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGhpZ2hsaWdodCA9IHJlcXVpcmUoJ2F0b20taGlnaGxpZ2h0JylcblxuaW1wb3J0IHtIb29nbGVEb2NWaWV3fSBmcm9tICcuL2hvb2dsZS1kb2MtdmlldydcbmltcG9ydCB7SG9vZ2xlV2ViVmlld30gZnJvbSAnLi9ob29nbGUtd2ViLXZpZXcnXG5cbmV4cG9ydCBmdW5jdGlvbiBobCAobGluZXM6IHN0cmluZywgaW5saW5lOiBib29sZWFuKSB7XG4gIHJldHVybiBoaWdobGlnaHQoe1xuICAgIGZpbGVDb250ZW50czogbGluZXMsXG4gICAgc2NvcGVOYW1lOiAnc291cmNlLmhhc2tlbGwnLFxuICAgIG5ic3A6IHRydWUsXG4gICAgbGluZURpdnM6ICFpbmxpbmUsXG4gICAgZWRpdG9yRGl2VGFnOiBpbmxpbmUgPyAnc3BhbicgOiAncHJlJyxcbiAgICBlZGl0b3JEaXY6IHRydWUsXG4gIH0pXG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBvcGVuRG9jIChzeW06IElTeW1ib2wpIHtcbiAgY29uc3QgdmlldzogSG9vZ2xlRG9jVmlldyA9IGF3YWl0IGF0b20ud29ya3NwYWNlLm9wZW4oJ2lkZS1oYXNrZWxsOi8vaG9vZ2xlL2RvYy8nLCB7XG4gICAgc3BsaXQ6ICdyaWdodCcsXG4gICAgc2VhcmNoQWxsUGFuZXM6IHRydWUsXG4gICAgYWN0aXZhdGVQYW5lOiBmYWxzZSxcbiAgfSlcbiAgdmlldy51cGRhdGUoe3N5bWJvbDogc3ltfSlcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIG9wZW5XZWIgKHN5bTogSVN5bWJvbCwgc3BsaXQgPSB0cnVlKSB7XG4gIGNvbnN0IHZpZXc6IEhvb2dsZVdlYlZpZXcgPSBhd2FpdCBhdG9tLndvcmtzcGFjZS5vcGVuKGBpZGUtaGFza2VsbDovL2hvb2dsZS93ZWIvYCwge1xuICAgIHNwbGl0OiBzcGxpdCA/ICdyaWdodCcgOiB1bmRlZmluZWQsXG4gICAgc2VhcmNoQWxsUGFuZXM6IHRydWUsXG4gICAgYWN0aXZhdGVQYW5lOiBmYWxzZSxcbiAgfSlcbiAgdmlldy51cGRhdGUoe3VybDogc3ltLmhyZWZ9KVxufVxuIl19