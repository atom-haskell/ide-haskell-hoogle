"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openWeb = exports.openDoc = exports.hl = void 0;
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
async function openDoc(sym) {
    const view = await atom.workspace.open('ide-haskell://hoogle/doc/', {
        split: 'right',
        searchAllPanes: true,
        activatePane: false,
    });
    return view.update({ symbol: sym });
}
exports.openDoc = openDoc;
async function openWeb(sym, split = true) {
    const view = await atom.workspace.open(`ide-haskell://hoogle/web/`, {
        split: split ? 'right' : undefined,
        searchAllPanes: true,
        activatePane: false,
    });
    return view.update({ url: sym.href });
}
exports.openWeb = openWeb;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDRDQUE0QztBQUs1QyxTQUFnQixFQUFFLENBQUMsS0FBYSxFQUFFLE1BQWU7SUFDL0MsT0FBTyxTQUFTLENBQUM7UUFDZixZQUFZLEVBQUUsS0FBSztRQUNuQixTQUFTLEVBQUUsZ0JBQWdCO1FBQzNCLElBQUksRUFBRSxJQUFJO1FBQ1YsUUFBUSxFQUFFLENBQUMsTUFBTTtRQUNqQixZQUFZLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUs7UUFDckMsU0FBUyxFQUFFLElBQUk7S0FDaEIsQ0FBQyxDQUFBO0FBQ0osQ0FBQztBQVRELGdCQVNDO0FBRU0sS0FBSyxVQUFVLE9BQU8sQ0FBQyxHQUFZO0lBQ3hDLE1BQU0sSUFBSSxHQUFrQixNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLDJCQUEyQixFQUFFO1FBQ2pGLEtBQUssRUFBRSxPQUFPO1FBQ2QsY0FBYyxFQUFFLElBQUk7UUFDcEIsWUFBWSxFQUFFLEtBQUs7S0FDcEIsQ0FBa0IsQ0FBQTtJQUNuQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQTtBQUNyQyxDQUFDO0FBUEQsMEJBT0M7QUFFTSxLQUFLLFVBQVUsT0FBTyxDQUFDLEdBQVksRUFBRSxLQUFLLEdBQUcsSUFBSTtJQUN0RCxNQUFNLElBQUksR0FBa0IsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQywyQkFBMkIsRUFBRTtRQUNqRixLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFNBQVM7UUFDbEMsY0FBYyxFQUFFLElBQUk7UUFDcEIsWUFBWSxFQUFFLEtBQUs7S0FDcEIsQ0FBa0IsQ0FBQTtJQUNuQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7QUFDdkMsQ0FBQztBQVBELDBCQU9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGhpZ2hsaWdodCA9IHJlcXVpcmUoJ2F0b20taGlnaGxpZ2h0JylcblxuaW1wb3J0IHsgSG9vZ2xlRG9jVmlldyB9IGZyb20gJy4vaG9vZ2xlLWRvYy12aWV3J1xuaW1wb3J0IHsgSG9vZ2xlV2ViVmlldyB9IGZyb20gJy4vaG9vZ2xlLXdlYi12aWV3J1xuXG5leHBvcnQgZnVuY3Rpb24gaGwobGluZXM6IHN0cmluZywgaW5saW5lOiBib29sZWFuKSB7XG4gIHJldHVybiBoaWdobGlnaHQoe1xuICAgIGZpbGVDb250ZW50czogbGluZXMsXG4gICAgc2NvcGVOYW1lOiAnc291cmNlLmhhc2tlbGwnLFxuICAgIG5ic3A6IHRydWUsXG4gICAgbGluZURpdnM6ICFpbmxpbmUsXG4gICAgZWRpdG9yRGl2VGFnOiBpbmxpbmUgPyAnc3BhbicgOiAncHJlJyxcbiAgICBlZGl0b3JEaXY6IHRydWUsXG4gIH0pXG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBvcGVuRG9jKHN5bTogSVN5bWJvbCkge1xuICBjb25zdCB2aWV3OiBIb29nbGVEb2NWaWV3ID0gYXdhaXQgYXRvbS53b3Jrc3BhY2Uub3BlbignaWRlLWhhc2tlbGw6Ly9ob29nbGUvZG9jLycsIHtcbiAgICBzcGxpdDogJ3JpZ2h0JyxcbiAgICBzZWFyY2hBbGxQYW5lczogdHJ1ZSxcbiAgICBhY3RpdmF0ZVBhbmU6IGZhbHNlLFxuICB9KSBhcyBIb29nbGVEb2NWaWV3XG4gIHJldHVybiB2aWV3LnVwZGF0ZSh7IHN5bWJvbDogc3ltIH0pXG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBvcGVuV2ViKHN5bTogSVN5bWJvbCwgc3BsaXQgPSB0cnVlKSB7XG4gIGNvbnN0IHZpZXc6IEhvb2dsZVdlYlZpZXcgPSBhd2FpdCBhdG9tLndvcmtzcGFjZS5vcGVuKGBpZGUtaGFza2VsbDovL2hvb2dsZS93ZWIvYCwge1xuICAgIHNwbGl0OiBzcGxpdCA/ICdyaWdodCcgOiB1bmRlZmluZWQsXG4gICAgc2VhcmNoQWxsUGFuZXM6IHRydWUsXG4gICAgYWN0aXZhdGVQYW5lOiBmYWxzZSxcbiAgfSkgYXMgSG9vZ2xlV2ViVmlld1xuICByZXR1cm4gdmlldy51cGRhdGUoeyB1cmw6IHN5bS5ocmVmIH0pXG59XG4iXX0=