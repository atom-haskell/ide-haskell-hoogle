"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectListView = void 0;
const SelectListView = require("atom-select-list");
const etch = require("etch");
const util_1 = require("./util");
async function selectListView(items) {
    let panel;
    let res;
    let refocus;
    try {
        res = await new Promise((resolve) => {
            const select = new SelectListView({
                items,
                itemsClassList: ['ide-haskell'],
                elementForItem: (item) => etch.render(etch.dom("li", { class: "two-lines" },
                    etch.dom("span", { class: "primary-line", innerHTML: util_1.hl(item.signature || '', true) }),
                    etch.dom("span", { class: "secondary-line" }, item.mod || ''))),
                filterKeyForItem: (item) => item.signature,
                didCancelSelection: () => {
                    resolve(undefined);
                },
                didConfirmSelection: (item) => {
                    resolve(item);
                },
            });
            select.element.classList.add('ide-haskell');
            panel = atom.workspace.addModalPanel({
                item: select,
                visible: true,
            });
            if (document.activeElement instanceof HTMLElement) {
                refocus = document.activeElement;
            }
            select.focus();
        });
    }
    finally {
        panel && panel.destroy();
        refocus && refocus.focus();
    }
    return res;
}
exports.selectListView = selectListView;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC12aWV3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2xpc3Qtdmlldy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbURBQW1EO0FBRW5ELDZCQUE0QjtBQUM1QixpQ0FBMkI7QUFFcEIsS0FBSyxVQUFVLGNBQWMsQ0FDbEMsS0FBZ0I7SUFFaEIsSUFBSSxLQUFpRCxDQUFBO0lBQ3JELElBQUksR0FBd0IsQ0FBQTtJQUM1QixJQUFJLE9BQWdDLENBQUE7SUFDcEMsSUFBSTtRQUNGLEdBQUcsR0FBRyxNQUFNLElBQUksT0FBTyxDQUFzQixDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ3ZELE1BQU0sTUFBTSxHQUFHLElBQUksY0FBYyxDQUFVO2dCQUN6QyxLQUFLO2dCQUNMLGNBQWMsRUFBRSxDQUFDLGFBQWEsQ0FBQztnQkFDL0IsY0FBYyxFQUFFLENBQUMsSUFBYSxFQUFFLEVBQUUsQ0FDaEMsSUFBSSxDQUFDLE1BQU0sQ0FFVCxpQkFBSSxLQUFLLEVBQUMsV0FBVztvQkFDbkIsbUJBQU0sS0FBSyxFQUFDLGNBQWMsRUFBQyxTQUFTLEVBQUUsU0FBRSxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksRUFBRSxFQUFFLElBQUksQ0FBQyxHQUFJO29CQUN4RSxtQkFBTSxLQUFLLEVBQUMsZ0JBQWdCLElBQUUsSUFBSSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQVEsQ0FDakQsQ0FFUztnQkFDbEIsZ0JBQWdCLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTO2dCQUMxQyxrQkFBa0IsRUFBRSxHQUFHLEVBQUU7b0JBQ3ZCLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQTtnQkFDcEIsQ0FBQztnQkFDRCxtQkFBbUIsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO29CQUM1QixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7Z0JBQ2YsQ0FBQzthQUNGLENBQUMsQ0FBQTtZQUNGLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQTtZQUMzQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUM7Z0JBQ25DLElBQUksRUFBRSxNQUFNO2dCQUNaLE9BQU8sRUFBRSxJQUFJO2FBQ2QsQ0FBQyxDQUFBO1lBQ0YsSUFBSSxRQUFRLENBQUMsYUFBYSxZQUFZLFdBQVcsRUFBRTtnQkFDakQsT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUE7YUFDakM7WUFDRCxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUE7UUFDaEIsQ0FBQyxDQUFDLENBQUE7S0FDSDtZQUFTO1FBQ1IsS0FBSyxJQUFJLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUN4QixPQUFPLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFBO0tBQzNCO0lBQ0QsT0FBTyxHQUFHLENBQUE7QUFDWixDQUFDO0FBM0NELHdDQTJDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTZWxlY3RMaXN0VmlldyA9IHJlcXVpcmUoJ2F0b20tc2VsZWN0LWxpc3QnKVxuaW1wb3J0IHsgUGFuZWwgfSBmcm9tICdhdG9tJ1xuaW1wb3J0ICogYXMgZXRjaCBmcm9tICdldGNoJ1xuaW1wb3J0IHsgaGwgfSBmcm9tICcuL3V0aWwnXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZWxlY3RMaXN0VmlldyhcbiAgaXRlbXM6IElTeW1ib2xbXSxcbik6IFByb21pc2U8SVN5bWJvbCB8IHVuZGVmaW5lZD4ge1xuICBsZXQgcGFuZWw6IFBhbmVsPFNlbGVjdExpc3RWaWV3PElTeW1ib2w+PiB8IHVuZGVmaW5lZFxuICBsZXQgcmVzOiBJU3ltYm9sIHwgdW5kZWZpbmVkXG4gIGxldCByZWZvY3VzOiBIVE1MRWxlbWVudCB8IHVuZGVmaW5lZFxuICB0cnkge1xuICAgIHJlcyA9IGF3YWl0IG5ldyBQcm9taXNlPElTeW1ib2wgfCB1bmRlZmluZWQ+KChyZXNvbHZlKSA9PiB7XG4gICAgICBjb25zdCBzZWxlY3QgPSBuZXcgU2VsZWN0TGlzdFZpZXc8SVN5bWJvbD4oe1xuICAgICAgICBpdGVtcyxcbiAgICAgICAgaXRlbXNDbGFzc0xpc3Q6IFsnaWRlLWhhc2tlbGwnXSxcbiAgICAgICAgZWxlbWVudEZvckl0ZW06IChpdGVtOiBJU3ltYm9sKSA9PlxuICAgICAgICAgIGV0Y2gucmVuZGVyKFxuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGU6bm8tdW5zYWZlLWFueVxuICAgICAgICAgICAgPGxpIGNsYXNzPVwidHdvLWxpbmVzXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJpbWFyeS1saW5lXCIgaW5uZXJIVE1MPXtobChpdGVtLnNpZ25hdHVyZSB8fCAnJywgdHJ1ZSl9IC8+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic2Vjb25kYXJ5LWxpbmVcIj57aXRlbS5tb2QgfHwgJyd9PC9zcGFuPlxuICAgICAgICAgICAgPC9saT4sXG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZW5hYmxlOm5vLXVuc2FmZS1hbnlcbiAgICAgICAgICApIGFzIEhUTUxFbGVtZW50LFxuICAgICAgICBmaWx0ZXJLZXlGb3JJdGVtOiAoaXRlbSkgPT4gaXRlbS5zaWduYXR1cmUsXG4gICAgICAgIGRpZENhbmNlbFNlbGVjdGlvbjogKCkgPT4ge1xuICAgICAgICAgIHJlc29sdmUodW5kZWZpbmVkKVxuICAgICAgICB9LFxuICAgICAgICBkaWRDb25maXJtU2VsZWN0aW9uOiAoaXRlbSkgPT4ge1xuICAgICAgICAgIHJlc29sdmUoaXRlbSlcbiAgICAgICAgfSxcbiAgICAgIH0pXG4gICAgICBzZWxlY3QuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdpZGUtaGFza2VsbCcpXG4gICAgICBwYW5lbCA9IGF0b20ud29ya3NwYWNlLmFkZE1vZGFsUGFuZWwoe1xuICAgICAgICBpdGVtOiBzZWxlY3QsXG4gICAgICAgIHZpc2libGU6IHRydWUsXG4gICAgICB9KVxuICAgICAgaWYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICByZWZvY3VzID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudFxuICAgICAgfVxuICAgICAgc2VsZWN0LmZvY3VzKClcbiAgICB9KVxuICB9IGZpbmFsbHkge1xuICAgIHBhbmVsICYmIHBhbmVsLmRlc3Ryb3koKVxuICAgIHJlZm9jdXMgJiYgcmVmb2N1cy5mb2N1cygpXG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuIl19