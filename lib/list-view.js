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
                    etch.dom("span", { class: "primary-line", innerHTML: util_1.hl(item.signature || '') }),
                    etch.dom("span", { class: "secondary-line" }, item.mod || ''))),
                filterKeyForItem: (item) => item.signature + ' ' + item.mod,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC12aWV3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2xpc3Qtdmlldy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbURBQW1EO0FBRW5ELDZCQUE0QjtBQUM1QixpQ0FBMkI7QUFFcEIsS0FBSyxVQUFVLGNBQWMsQ0FDbEMsS0FBZ0I7SUFFaEIsSUFBSSxLQUFpRCxDQUFBO0lBQ3JELElBQUksR0FBd0IsQ0FBQTtJQUM1QixJQUFJLE9BQWdDLENBQUE7SUFDcEMsSUFBSTtRQUNGLEdBQUcsR0FBRyxNQUFNLElBQUksT0FBTyxDQUFzQixDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ3ZELE1BQU0sTUFBTSxHQUFHLElBQUksY0FBYyxDQUFVO2dCQUN6QyxLQUFLO2dCQUNMLGNBQWMsRUFBRSxDQUFDLGFBQWEsQ0FBQztnQkFDL0IsY0FBYyxFQUFFLENBQUMsSUFBYSxFQUFFLEVBQUUsQ0FDaEMsSUFBSSxDQUFDLE1BQU0sQ0FFVCxpQkFBSSxLQUFLLEVBQUMsV0FBVztvQkFDbkIsbUJBQU0sS0FBSyxFQUFDLGNBQWMsRUFBQyxTQUFTLEVBQUUsU0FBRSxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksRUFBRSxDQUFDLEdBQUk7b0JBQ2xFLG1CQUFNLEtBQUssRUFBQyxnQkFBZ0IsSUFBRSxJQUFJLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBUSxDQUNqRCxDQUVTO2dCQUNsQixnQkFBZ0IsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUc7Z0JBQzNELGtCQUFrQixFQUFFLEdBQUcsRUFBRTtvQkFDdkIsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFBO2dCQUNwQixDQUFDO2dCQUNELG1CQUFtQixFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7b0JBQzVCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtnQkFDZixDQUFDO2FBQ0YsQ0FBQyxDQUFBO1lBQ0YsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFBO1lBQzNDLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQztnQkFDbkMsSUFBSSxFQUFFLE1BQU07Z0JBQ1osT0FBTyxFQUFFLElBQUk7YUFDZCxDQUFDLENBQUE7WUFDRixJQUFJLFFBQVEsQ0FBQyxhQUFhLFlBQVksV0FBVyxFQUFFO2dCQUNqRCxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQTthQUNqQztZQUNELE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQTtRQUNoQixDQUFDLENBQUMsQ0FBQTtLQUNIO1lBQVM7UUFDUixLQUFLLElBQUksS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFBO1FBQ3hCLE9BQU8sSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUE7S0FDM0I7SUFDRCxPQUFPLEdBQUcsQ0FBQTtBQUNaLENBQUM7QUEzQ0Qsd0NBMkNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNlbGVjdExpc3RWaWV3ID0gcmVxdWlyZSgnYXRvbS1zZWxlY3QtbGlzdCcpXG5pbXBvcnQgeyBQYW5lbCB9IGZyb20gJ2F0b20nXG5pbXBvcnQgKiBhcyBldGNoIGZyb20gJ2V0Y2gnXG5pbXBvcnQgeyBobCB9IGZyb20gJy4vdXRpbCdcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNlbGVjdExpc3RWaWV3KFxuICBpdGVtczogSVN5bWJvbFtdLFxuKTogUHJvbWlzZTxJU3ltYm9sIHwgdW5kZWZpbmVkPiB7XG4gIGxldCBwYW5lbDogUGFuZWw8U2VsZWN0TGlzdFZpZXc8SVN5bWJvbD4+IHwgdW5kZWZpbmVkXG4gIGxldCByZXM6IElTeW1ib2wgfCB1bmRlZmluZWRcbiAgbGV0IHJlZm9jdXM6IEhUTUxFbGVtZW50IHwgdW5kZWZpbmVkXG4gIHRyeSB7XG4gICAgcmVzID0gYXdhaXQgbmV3IFByb21pc2U8SVN5bWJvbCB8IHVuZGVmaW5lZD4oKHJlc29sdmUpID0+IHtcbiAgICAgIGNvbnN0IHNlbGVjdCA9IG5ldyBTZWxlY3RMaXN0VmlldzxJU3ltYm9sPih7XG4gICAgICAgIGl0ZW1zLFxuICAgICAgICBpdGVtc0NsYXNzTGlzdDogWydpZGUtaGFza2VsbCddLFxuICAgICAgICBlbGVtZW50Rm9ySXRlbTogKGl0ZW06IElTeW1ib2wpID0+XG4gICAgICAgICAgZXRjaC5yZW5kZXIoXG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZTpuby11bnNhZmUtYW55XG4gICAgICAgICAgICA8bGkgY2xhc3M9XCJ0d28tbGluZXNcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcmltYXJ5LWxpbmVcIiBpbm5lckhUTUw9e2hsKGl0ZW0uc2lnbmF0dXJlIHx8ICcnKX0gLz5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzZWNvbmRhcnktbGluZVwiPntpdGVtLm1vZCB8fCAnJ308L3NwYW4+XG4gICAgICAgICAgICA8L2xpPixcbiAgICAgICAgICAgIC8vIHRzbGludDplbmFibGU6bm8tdW5zYWZlLWFueVxuICAgICAgICAgICkgYXMgSFRNTEVsZW1lbnQsXG4gICAgICAgIGZpbHRlcktleUZvckl0ZW06IChpdGVtKSA9PiBpdGVtLnNpZ25hdHVyZSArICcgJyArIGl0ZW0ubW9kLFxuICAgICAgICBkaWRDYW5jZWxTZWxlY3Rpb246ICgpID0+IHtcbiAgICAgICAgICByZXNvbHZlKHVuZGVmaW5lZClcbiAgICAgICAgfSxcbiAgICAgICAgZGlkQ29uZmlybVNlbGVjdGlvbjogKGl0ZW0pID0+IHtcbiAgICAgICAgICByZXNvbHZlKGl0ZW0pXG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgICAgc2VsZWN0LmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnaWRlLWhhc2tlbGwnKVxuICAgICAgcGFuZWwgPSBhdG9tLndvcmtzcGFjZS5hZGRNb2RhbFBhbmVsKHtcbiAgICAgICAgaXRlbTogc2VsZWN0LFxuICAgICAgICB2aXNpYmxlOiB0cnVlLFxuICAgICAgfSlcbiAgICAgIGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgcmVmb2N1cyA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnRcbiAgICAgIH1cbiAgICAgIHNlbGVjdC5mb2N1cygpXG4gICAgfSlcbiAgfSBmaW5hbGx5IHtcbiAgICBwYW5lbCAmJiBwYW5lbC5kZXN0cm95KClcbiAgICByZWZvY3VzICYmIHJlZm9jdXMuZm9jdXMoKVxuICB9XG4gIHJldHVybiByZXNcbn1cbiJdfQ==