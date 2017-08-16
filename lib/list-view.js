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
                    }
                });
                select.element.classList.add('ide-haskell');
                panel = atom.workspace.addModalPanel({
                    item: select,
                    visible: true
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC12aWV3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2xpc3Qtdmlldy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLG1EQUFtRDtBQUVuRCw2QkFBNEI7QUFDNUIsaUNBQXlCO0FBRXpCLHdCQUNFLEtBQWdCOztRQUVoQixJQUFJLEtBQXdCLENBQUE7UUFDNUIsSUFBSSxHQUF3QixDQUFBO1FBQzVCLElBQUksT0FBZ0MsQ0FBQTtRQUNwQyxJQUFJLENBQUM7WUFDSCxHQUFHLEdBQUcsTUFBTSxJQUFJLE9BQU8sQ0FBb0IsQ0FBQyxPQUFPLEVBQUUsTUFBTTtnQkFDekQsTUFBTSxNQUFNLEdBQUcsSUFBSSxjQUFjLENBQVU7b0JBQ3pDLEtBQUs7b0JBQ0wsY0FBYyxFQUFFLENBQUMsYUFBYSxDQUFDO29CQUMvQixjQUFjLEVBQUUsQ0FBQyxJQUFhLEtBQzVCLElBQUksQ0FBQyxNQUFNLENBQ1QsaUJBQUksS0FBSyxFQUFDLFdBQVc7d0JBQ25CLG1CQUFNLEtBQUssRUFBQyxjQUFjLEVBQUMsU0FBUyxFQUFFLFNBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLEVBQUUsRUFBRSxJQUFJLENBQUMsR0FBRzt3QkFDdkUsbUJBQU0sS0FBSyxFQUFDLGdCQUFnQixJQUFFLElBQUksQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFRLENBQ2pELENBQ1M7b0JBQ2xCLGdCQUFnQixFQUFFLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxTQUFTO29CQUMxQyxrQkFBa0IsRUFBRTt3QkFDbEIsT0FBTyxFQUFFLENBQUE7b0JBQ1gsQ0FBQztvQkFDRCxtQkFBbUIsRUFBRSxDQUFDLElBQUk7d0JBQ3hCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtvQkFDZixDQUFDO2lCQUNGLENBQUMsQ0FBQTtnQkFDRixNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUE7Z0JBQzNDLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQztvQkFDbkMsSUFBSSxFQUFFLE1BQU07b0JBQ1osT0FBTyxFQUFFLElBQUk7aUJBQ2QsQ0FBQyxDQUFBO2dCQUNGLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxhQUFhLFlBQVksV0FBVyxDQUFDLENBQUMsQ0FBQztvQkFDbEQsT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUE7Z0JBQ2xDLENBQUM7Z0JBQ0QsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFBO1lBQ2hCLENBQUMsQ0FBQyxDQUFBO1FBQ0osQ0FBQztnQkFBUyxDQUFDO1lBQ1QsS0FBSyxJQUFJLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQTtZQUN4QixPQUFPLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFBO1FBQzVCLENBQUM7UUFDRCxNQUFNLENBQUMsR0FBRyxDQUFBO0lBQ1osQ0FBQztDQUFBO0FBekNELHdDQXlDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTZWxlY3RMaXN0VmlldyA9IHJlcXVpcmUoJ2F0b20tc2VsZWN0LWxpc3QnKVxuaW1wb3J0IHtQYW5lbH0gZnJvbSAnYXRvbSdcbmltcG9ydCAqIGFzIGV0Y2ggZnJvbSAnZXRjaCdcbmltcG9ydCB7aGx9IGZyb20gJy4vdXRpbCdcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNlbGVjdExpc3RWaWV3IChcbiAgaXRlbXM6IElTeW1ib2xbXVxuKTogUHJvbWlzZTxJU3ltYm9sfHVuZGVmaW5lZD4ge1xuICBsZXQgcGFuZWw6IFBhbmVsIHwgdW5kZWZpbmVkXG4gIGxldCByZXM6IElTeW1ib2wgfCB1bmRlZmluZWRcbiAgbGV0IHJlZm9jdXM6IEhUTUxFbGVtZW50IHwgdW5kZWZpbmVkXG4gIHRyeSB7XG4gICAgcmVzID0gYXdhaXQgbmV3IFByb21pc2U8SVN5bWJvbHx1bmRlZmluZWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IHNlbGVjdCA9IG5ldyBTZWxlY3RMaXN0VmlldzxJU3ltYm9sPih7XG4gICAgICAgIGl0ZW1zLFxuICAgICAgICBpdGVtc0NsYXNzTGlzdDogWydpZGUtaGFza2VsbCddLFxuICAgICAgICBlbGVtZW50Rm9ySXRlbTogKGl0ZW06IElTeW1ib2wpID0+XG4gICAgICAgICAgZXRjaC5yZW5kZXIoXG4gICAgICAgICAgICA8bGkgY2xhc3M9XCJ0d28tbGluZXNcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcmltYXJ5LWxpbmVcIiBpbm5lckhUTUw9e2hsKGl0ZW0uc2lnbmF0dXJlIHx8ICcnLCB0cnVlKX0vPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInNlY29uZGFyeS1saW5lXCI+e2l0ZW0ubW9kIHx8ICcnfTwvc3Bhbj5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgKSBhcyBIVE1MRWxlbWVudCxcbiAgICAgICAgZmlsdGVyS2V5Rm9ySXRlbTogKGl0ZW0pID0+IGl0ZW0uc2lnbmF0dXJlLFxuICAgICAgICBkaWRDYW5jZWxTZWxlY3Rpb246ICgpID0+IHtcbiAgICAgICAgICByZXNvbHZlKClcbiAgICAgICAgfSxcbiAgICAgICAgZGlkQ29uZmlybVNlbGVjdGlvbjogKGl0ZW0pID0+IHtcbiAgICAgICAgICByZXNvbHZlKGl0ZW0pXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICBzZWxlY3QuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdpZGUtaGFza2VsbCcpXG4gICAgICBwYW5lbCA9IGF0b20ud29ya3NwYWNlLmFkZE1vZGFsUGFuZWwoe1xuICAgICAgICBpdGVtOiBzZWxlY3QsXG4gICAgICAgIHZpc2libGU6IHRydWVcbiAgICAgIH0pXG4gICAgICBpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgIHJlZm9jdXMgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50XG4gICAgICB9XG4gICAgICBzZWxlY3QuZm9jdXMoKVxuICAgIH0pXG4gIH0gZmluYWxseSB7XG4gICAgcGFuZWwgJiYgcGFuZWwuZGVzdHJveSgpXG4gICAgcmVmb2N1cyAmJiByZWZvY3VzLmZvY3VzKClcbiAgfVxuICByZXR1cm4gcmVzXG59XG4iXX0=