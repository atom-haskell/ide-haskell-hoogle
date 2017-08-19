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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSw0Q0FBNEM7QUFLNUMsWUFBbUIsS0FBYSxFQUFFLE1BQWU7SUFDL0MsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUNmLFlBQVksRUFBRSxLQUFLO1FBQ25CLFNBQVMsRUFBRSxnQkFBZ0I7UUFDM0IsSUFBSSxFQUFFLElBQUk7UUFDVixRQUFRLEVBQUUsQ0FBQyxNQUFNO1FBQ2pCLFlBQVksRUFBRSxNQUFNLEdBQUcsTUFBTSxHQUFHLEtBQUs7UUFDckMsU0FBUyxFQUFFLElBQUk7S0FDaEIsQ0FBQyxDQUFBO0FBQ0osQ0FBQztBQVRELGdCQVNDO0FBRUQsaUJBQThCLEdBQVk7O1FBQ3hDLE1BQU0sSUFBSSxHQUFrQixNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLDJCQUEyQixFQUFFO1lBQ2pGLEtBQUssRUFBRSxPQUFPO1lBQ2QsY0FBYyxFQUFFLElBQUk7WUFDcEIsWUFBWSxFQUFFLEtBQUs7U0FDcEIsQ0FBQyxDQUFBO1FBQ0YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFBO0lBQzlCLENBQUM7Q0FBQTtBQVBELDBCQU9DO0FBRUQsaUJBQThCLEdBQVksRUFBRSxLQUFLLEdBQUcsSUFBSTs7UUFDdEQsTUFBTSxJQUFJLEdBQWtCLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsMkJBQTJCLEVBQUU7WUFDakYsS0FBSyxFQUFFLEtBQUssR0FBRyxPQUFPLEdBQUcsU0FBUztZQUNsQyxjQUFjLEVBQUUsSUFBSTtZQUNwQixZQUFZLEVBQUUsS0FBSztTQUNwQixDQUFDLENBQUE7UUFDRixJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO0lBQ2hDLENBQUM7Q0FBQTtBQVBELDBCQU9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGhpZ2hsaWdodCA9IHJlcXVpcmUoJ2F0b20taGlnaGxpZ2h0JylcblxuaW1wb3J0IHsgSG9vZ2xlRG9jVmlldyB9IGZyb20gJy4vaG9vZ2xlLWRvYy12aWV3J1xuaW1wb3J0IHsgSG9vZ2xlV2ViVmlldyB9IGZyb20gJy4vaG9vZ2xlLXdlYi12aWV3J1xuXG5leHBvcnQgZnVuY3Rpb24gaGwobGluZXM6IHN0cmluZywgaW5saW5lOiBib29sZWFuKSB7XG4gIHJldHVybiBoaWdobGlnaHQoe1xuICAgIGZpbGVDb250ZW50czogbGluZXMsXG4gICAgc2NvcGVOYW1lOiAnc291cmNlLmhhc2tlbGwnLFxuICAgIG5ic3A6IHRydWUsXG4gICAgbGluZURpdnM6ICFpbmxpbmUsXG4gICAgZWRpdG9yRGl2VGFnOiBpbmxpbmUgPyAnc3BhbicgOiAncHJlJyxcbiAgICBlZGl0b3JEaXY6IHRydWUsXG4gIH0pXG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBvcGVuRG9jKHN5bTogSVN5bWJvbCkge1xuICBjb25zdCB2aWV3OiBIb29nbGVEb2NWaWV3ID0gYXdhaXQgYXRvbS53b3Jrc3BhY2Uub3BlbignaWRlLWhhc2tlbGw6Ly9ob29nbGUvZG9jLycsIHtcbiAgICBzcGxpdDogJ3JpZ2h0JyxcbiAgICBzZWFyY2hBbGxQYW5lczogdHJ1ZSxcbiAgICBhY3RpdmF0ZVBhbmU6IGZhbHNlLFxuICB9KVxuICB2aWV3LnVwZGF0ZSh7IHN5bWJvbDogc3ltIH0pXG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBvcGVuV2ViKHN5bTogSVN5bWJvbCwgc3BsaXQgPSB0cnVlKSB7XG4gIGNvbnN0IHZpZXc6IEhvb2dsZVdlYlZpZXcgPSBhd2FpdCBhdG9tLndvcmtzcGFjZS5vcGVuKGBpZGUtaGFza2VsbDovL2hvb2dsZS93ZWIvYCwge1xuICAgIHNwbGl0OiBzcGxpdCA/ICdyaWdodCcgOiB1bmRlZmluZWQsXG4gICAgc2VhcmNoQWxsUGFuZXM6IHRydWUsXG4gICAgYWN0aXZhdGVQYW5lOiBmYWxzZSxcbiAgfSlcbiAgdmlldy51cGRhdGUoeyB1cmw6IHN5bS5ocmVmIH0pXG59XG4iXX0=