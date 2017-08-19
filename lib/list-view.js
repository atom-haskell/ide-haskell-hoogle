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
const SelectListView = require("atom-select-list");
const etch = require("etch");
const util_1 = require("./util");
function selectListView(items) {
    return __awaiter(this, void 0, void 0, function* () {
        let panel;
        let res;
        let refocus;
        try {
            res = yield new Promise((resolve, reject) => {
                const select = new SelectListView({
                    items,
                    itemsClassList: ['ide-haskell'],
                    elementForItem: (item) => etch.render(etch.dom("li", { class: "two-lines" },
                        etch.dom("span", { class: "primary-line", innerHTML: util_1.hl(item.signature || '', true) }),
                        etch.dom("span", { class: "secondary-line" }, item.mod || ''))),
                    filterKeyForItem: (item) => item.signature,
                    didCancelSelection: () => {
                        resolve();
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
    });
}
exports.selectListView = selectListView;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC12aWV3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2xpc3Qtdmlldy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLG1EQUFtRDtBQUVuRCw2QkFBNEI7QUFDNUIsaUNBQTJCO0FBRTNCLHdCQUNFLEtBQWdCOztRQUVoQixJQUFJLEtBQXdCLENBQUE7UUFDNUIsSUFBSSxHQUF3QixDQUFBO1FBQzVCLElBQUksT0FBZ0MsQ0FBQTtRQUNwQyxJQUFJLENBQUM7WUFDSCxHQUFHLEdBQUcsTUFBTSxJQUFJLE9BQU8sQ0FBc0IsQ0FBQyxPQUFPLEVBQUUsTUFBTTtnQkFDM0QsTUFBTSxNQUFNLEdBQUcsSUFBSSxjQUFjLENBQVU7b0JBQ3pDLEtBQUs7b0JBQ0wsY0FBYyxFQUFFLENBQUMsYUFBYSxDQUFDO29CQUMvQixjQUFjLEVBQUUsQ0FBQyxJQUFhLEtBQzVCLElBQUksQ0FBQyxNQUFNLENBQ1QsaUJBQUksS0FBSyxFQUFDLFdBQVc7d0JBQ25CLG1CQUFNLEtBQUssRUFBQyxjQUFjLEVBQUMsU0FBUyxFQUFFLFNBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLEVBQUUsRUFBRSxJQUFJLENBQUMsR0FBSTt3QkFDeEUsbUJBQU0sS0FBSyxFQUFDLGdCQUFnQixJQUFFLElBQUksQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFRLENBQ2pELENBQ1M7b0JBQ2xCLGdCQUFnQixFQUFFLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxTQUFTO29CQUMxQyxrQkFBa0IsRUFBRTt3QkFDbEIsT0FBTyxFQUFFLENBQUE7b0JBQ1gsQ0FBQztvQkFDRCxtQkFBbUIsRUFBRSxDQUFDLElBQUk7d0JBQ3hCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtvQkFDZixDQUFDO2lCQUNGLENBQUMsQ0FBQTtnQkFDRixNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUE7Z0JBQzNDLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQztvQkFDbkMsSUFBSSxFQUFFLE1BQU07b0JBQ1osT0FBTyxFQUFFLElBQUk7aUJBQ2QsQ0FBQyxDQUFBO2dCQUNGLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxhQUFhLFlBQVksV0FBVyxDQUFDLENBQUMsQ0FBQztvQkFDbEQsT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUE7Z0JBQ2xDLENBQUM7Z0JBQ0QsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFBO1lBQ2hCLENBQUMsQ0FBQyxDQUFBO1FBQ0osQ0FBQztnQkFBUyxDQUFDO1lBQ1QsS0FBSyxJQUFJLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQTtZQUN4QixPQUFPLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFBO1FBQzVCLENBQUM7UUFDRCxNQUFNLENBQUMsR0FBRyxDQUFBO0lBQ1osQ0FBQztDQUFBO0FBekNELHdDQXlDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTZWxlY3RMaXN0VmlldyA9IHJlcXVpcmUoJ2F0b20tc2VsZWN0LWxpc3QnKVxuaW1wb3J0IHsgUGFuZWwgfSBmcm9tICdhdG9tJ1xuaW1wb3J0ICogYXMgZXRjaCBmcm9tICdldGNoJ1xuaW1wb3J0IHsgaGwgfSBmcm9tICcuL3V0aWwnXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZWxlY3RMaXN0VmlldyhcbiAgaXRlbXM6IElTeW1ib2xbXSxcbik6IFByb21pc2U8SVN5bWJvbCB8IHVuZGVmaW5lZD4ge1xuICBsZXQgcGFuZWw6IFBhbmVsIHwgdW5kZWZpbmVkXG4gIGxldCByZXM6IElTeW1ib2wgfCB1bmRlZmluZWRcbiAgbGV0IHJlZm9jdXM6IEhUTUxFbGVtZW50IHwgdW5kZWZpbmVkXG4gIHRyeSB7XG4gICAgcmVzID0gYXdhaXQgbmV3IFByb21pc2U8SVN5bWJvbCB8IHVuZGVmaW5lZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3Qgc2VsZWN0ID0gbmV3IFNlbGVjdExpc3RWaWV3PElTeW1ib2w+KHtcbiAgICAgICAgaXRlbXMsXG4gICAgICAgIGl0ZW1zQ2xhc3NMaXN0OiBbJ2lkZS1oYXNrZWxsJ10sXG4gICAgICAgIGVsZW1lbnRGb3JJdGVtOiAoaXRlbTogSVN5bWJvbCkgPT5cbiAgICAgICAgICBldGNoLnJlbmRlcihcbiAgICAgICAgICAgIDxsaSBjbGFzcz1cInR3by1saW5lc1wiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByaW1hcnktbGluZVwiIGlubmVySFRNTD17aGwoaXRlbS5zaWduYXR1cmUgfHwgJycsIHRydWUpfSAvPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInNlY29uZGFyeS1saW5lXCI+e2l0ZW0ubW9kIHx8ICcnfTwvc3Bhbj5cbiAgICAgICAgICAgIDwvbGk+LFxuICAgICAgICAgICkgYXMgSFRNTEVsZW1lbnQsXG4gICAgICAgIGZpbHRlcktleUZvckl0ZW06IChpdGVtKSA9PiBpdGVtLnNpZ25hdHVyZSxcbiAgICAgICAgZGlkQ2FuY2VsU2VsZWN0aW9uOiAoKSA9PiB7XG4gICAgICAgICAgcmVzb2x2ZSgpXG4gICAgICAgIH0sXG4gICAgICAgIGRpZENvbmZpcm1TZWxlY3Rpb246IChpdGVtKSA9PiB7XG4gICAgICAgICAgcmVzb2x2ZShpdGVtKVxuICAgICAgICB9LFxuICAgICAgfSlcbiAgICAgIHNlbGVjdC5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2lkZS1oYXNrZWxsJylcbiAgICAgIHBhbmVsID0gYXRvbS53b3Jrc3BhY2UuYWRkTW9kYWxQYW5lbCh7XG4gICAgICAgIGl0ZW06IHNlbGVjdCxcbiAgICAgICAgdmlzaWJsZTogdHJ1ZSxcbiAgICAgIH0pXG4gICAgICBpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgIHJlZm9jdXMgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50XG4gICAgICB9XG4gICAgICBzZWxlY3QuZm9jdXMoKVxuICAgIH0pXG4gIH0gZmluYWxseSB7XG4gICAgcGFuZWwgJiYgcGFuZWwuZGVzdHJveSgpXG4gICAgcmVmb2N1cyAmJiByZWZvY3VzLmZvY3VzKClcbiAgfVxuICByZXR1cm4gcmVzXG59XG4iXX0=