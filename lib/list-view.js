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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC12aWV3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2xpc3Qtdmlldy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLG1EQUFtRDtBQUVuRCw2QkFBNEI7QUFDNUIsaUNBQTJCO0FBRTNCLHdCQUNFLEtBQWdCOztRQUVoQixJQUFJLEtBQWlELENBQUE7UUFDckQsSUFBSSxHQUF3QixDQUFBO1FBQzVCLElBQUksT0FBZ0MsQ0FBQTtRQUNwQyxJQUFJLENBQUM7WUFDSCxHQUFHLEdBQUcsTUFBTSxJQUFJLE9BQU8sQ0FBc0IsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7Z0JBQy9ELE1BQU0sTUFBTSxHQUFHLElBQUksY0FBYyxDQUFVO29CQUN6QyxLQUFLO29CQUNMLGNBQWMsRUFBRSxDQUFDLGFBQWEsQ0FBQztvQkFDL0IsY0FBYyxFQUFFLENBQUMsSUFBYSxFQUFFLEVBQUUsQ0FDaEMsSUFBSSxDQUFDLE1BQU0sQ0FFVCxpQkFBSSxLQUFLLEVBQUMsV0FBVzt3QkFDbkIsbUJBQU0sS0FBSyxFQUFDLGNBQWMsRUFBQyxTQUFTLEVBQUUsU0FBRSxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksRUFBRSxFQUFFLElBQUksQ0FBQyxHQUFJO3dCQUN4RSxtQkFBTSxLQUFLLEVBQUMsZ0JBQWdCLElBQUUsSUFBSSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQVEsQ0FDakQsQ0FFUztvQkFDbEIsZ0JBQWdCLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTO29CQUMxQyxrQkFBa0IsRUFBRSxHQUFHLEVBQUU7d0JBQ3ZCLE9BQU8sRUFBRSxDQUFBO29CQUNYLENBQUM7b0JBQ0QsbUJBQW1CLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTt3QkFDNUIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO29CQUNmLENBQUM7aUJBQ0YsQ0FBQyxDQUFBO2dCQUNGLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQTtnQkFDM0MsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDO29CQUNuQyxJQUFJLEVBQUUsTUFBTTtvQkFDWixPQUFPLEVBQUUsSUFBSTtpQkFDZCxDQUFDLENBQUE7Z0JBQ0YsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLGFBQWEsWUFBWSxXQUFXLENBQUMsQ0FBQyxDQUFDO29CQUNsRCxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQTtnQkFDbEMsQ0FBQztnQkFDRCxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUE7WUFDaEIsQ0FBQyxDQUFDLENBQUE7UUFDSixDQUFDO2dCQUFTLENBQUM7WUFDVCxLQUFLLElBQUksS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFBO1lBQ3hCLE9BQU8sSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUE7UUFDNUIsQ0FBQztRQUNELE1BQU0sQ0FBQyxHQUFHLENBQUE7SUFDWixDQUFDO0NBQUE7QUEzQ0Qsd0NBMkNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNlbGVjdExpc3RWaWV3ID0gcmVxdWlyZSgnYXRvbS1zZWxlY3QtbGlzdCcpXG5pbXBvcnQgeyBQYW5lbCB9IGZyb20gJ2F0b20nXG5pbXBvcnQgKiBhcyBldGNoIGZyb20gJ2V0Y2gnXG5pbXBvcnQgeyBobCB9IGZyb20gJy4vdXRpbCdcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNlbGVjdExpc3RWaWV3KFxuICBpdGVtczogSVN5bWJvbFtdLFxuKTogUHJvbWlzZTxJU3ltYm9sIHwgdW5kZWZpbmVkPiB7XG4gIGxldCBwYW5lbDogUGFuZWw8U2VsZWN0TGlzdFZpZXc8SVN5bWJvbD4+IHwgdW5kZWZpbmVkXG4gIGxldCByZXM6IElTeW1ib2wgfCB1bmRlZmluZWRcbiAgbGV0IHJlZm9jdXM6IEhUTUxFbGVtZW50IHwgdW5kZWZpbmVkXG4gIHRyeSB7XG4gICAgcmVzID0gYXdhaXQgbmV3IFByb21pc2U8SVN5bWJvbCB8IHVuZGVmaW5lZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3Qgc2VsZWN0ID0gbmV3IFNlbGVjdExpc3RWaWV3PElTeW1ib2w+KHtcbiAgICAgICAgaXRlbXMsXG4gICAgICAgIGl0ZW1zQ2xhc3NMaXN0OiBbJ2lkZS1oYXNrZWxsJ10sXG4gICAgICAgIGVsZW1lbnRGb3JJdGVtOiAoaXRlbTogSVN5bWJvbCkgPT5cbiAgICAgICAgICBldGNoLnJlbmRlcihcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlOm5vLXVuc2FmZS1hbnlcbiAgICAgICAgICAgIDxsaSBjbGFzcz1cInR3by1saW5lc1wiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByaW1hcnktbGluZVwiIGlubmVySFRNTD17aGwoaXRlbS5zaWduYXR1cmUgfHwgJycsIHRydWUpfSAvPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInNlY29uZGFyeS1saW5lXCI+e2l0ZW0ubW9kIHx8ICcnfTwvc3Bhbj5cbiAgICAgICAgICAgIDwvbGk+LFxuICAgICAgICAgICAgLy8gdHNsaW50OmVuYWJsZTpuby11bnNhZmUtYW55XG4gICAgICAgICAgKSBhcyBIVE1MRWxlbWVudCxcbiAgICAgICAgZmlsdGVyS2V5Rm9ySXRlbTogKGl0ZW0pID0+IGl0ZW0uc2lnbmF0dXJlLFxuICAgICAgICBkaWRDYW5jZWxTZWxlY3Rpb246ICgpID0+IHtcbiAgICAgICAgICByZXNvbHZlKClcbiAgICAgICAgfSxcbiAgICAgICAgZGlkQ29uZmlybVNlbGVjdGlvbjogKGl0ZW0pID0+IHtcbiAgICAgICAgICByZXNvbHZlKGl0ZW0pXG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgICAgc2VsZWN0LmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnaWRlLWhhc2tlbGwnKVxuICAgICAgcGFuZWwgPSBhdG9tLndvcmtzcGFjZS5hZGRNb2RhbFBhbmVsKHtcbiAgICAgICAgaXRlbTogc2VsZWN0LFxuICAgICAgICB2aXNpYmxlOiB0cnVlLFxuICAgICAgfSlcbiAgICAgIGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgcmVmb2N1cyA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnRcbiAgICAgIH1cbiAgICAgIHNlbGVjdC5mb2N1cygpXG4gICAgfSlcbiAgfSBmaW5hbGx5IHtcbiAgICBwYW5lbCAmJiBwYW5lbC5kZXN0cm95KClcbiAgICByZWZvY3VzICYmIHJlZm9jdXMuZm9jdXMoKVxuICB9XG4gIHJldHVybiByZXNcbn1cbiJdfQ==