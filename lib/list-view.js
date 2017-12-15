"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
}
exports.selectListView = selectListView;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC12aWV3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2xpc3Qtdmlldy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtREFBbUQ7QUFFbkQsNkJBQTRCO0FBQzVCLGlDQUEyQjtBQUVwQixLQUFLLHlCQUNWLEtBQWdCO0lBRWhCLElBQUksS0FBaUQsQ0FBQTtJQUNyRCxJQUFJLEdBQXdCLENBQUE7SUFDNUIsSUFBSSxPQUFnQyxDQUFBO0lBQ3BDLElBQUksQ0FBQztRQUNILEdBQUcsR0FBRyxNQUFNLElBQUksT0FBTyxDQUFzQixDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ3ZELE1BQU0sTUFBTSxHQUFHLElBQUksY0FBYyxDQUFVO2dCQUN6QyxLQUFLO2dCQUNMLGNBQWMsRUFBRSxDQUFDLGFBQWEsQ0FBQztnQkFDL0IsY0FBYyxFQUFFLENBQUMsSUFBYSxFQUFFLEVBQUUsQ0FDaEMsSUFBSSxDQUFDLE1BQU0sQ0FFVCxpQkFBSSxLQUFLLEVBQUMsV0FBVztvQkFDbkIsbUJBQU0sS0FBSyxFQUFDLGNBQWMsRUFBQyxTQUFTLEVBQUUsU0FBRSxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksRUFBRSxFQUFFLElBQUksQ0FBQyxHQUFJO29CQUN4RSxtQkFBTSxLQUFLLEVBQUMsZ0JBQWdCLElBQUUsSUFBSSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQVEsQ0FDakQsQ0FFUztnQkFDbEIsZ0JBQWdCLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTO2dCQUMxQyxrQkFBa0IsRUFBRSxHQUFHLEVBQUU7b0JBQ3ZCLE9BQU8sRUFBRSxDQUFBO2dCQUNYLENBQUM7Z0JBQ0QsbUJBQW1CLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtvQkFDNUIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO2dCQUNmLENBQUM7YUFDRixDQUFDLENBQUE7WUFDRixNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUE7WUFDM0MsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDO2dCQUNuQyxJQUFJLEVBQUUsTUFBTTtnQkFDWixPQUFPLEVBQUUsSUFBSTthQUNkLENBQUMsQ0FBQTtZQUNGLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxhQUFhLFlBQVksV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDbEQsT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUE7WUFDbEMsQ0FBQztZQUNELE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQTtRQUNoQixDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7WUFBUyxDQUFDO1FBQ1QsS0FBSyxJQUFJLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUN4QixPQUFPLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFBO0lBQzVCLENBQUM7SUFDRCxNQUFNLENBQUMsR0FBRyxDQUFBO0FBQ1osQ0FBQztBQTNDRCx3Q0EyQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU2VsZWN0TGlzdFZpZXcgPSByZXF1aXJlKCdhdG9tLXNlbGVjdC1saXN0JylcbmltcG9ydCB7IFBhbmVsIH0gZnJvbSAnYXRvbSdcbmltcG9ydCAqIGFzIGV0Y2ggZnJvbSAnZXRjaCdcbmltcG9ydCB7IGhsIH0gZnJvbSAnLi91dGlsJ1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2VsZWN0TGlzdFZpZXcoXG4gIGl0ZW1zOiBJU3ltYm9sW10sXG4pOiBQcm9taXNlPElTeW1ib2wgfCB1bmRlZmluZWQ+IHtcbiAgbGV0IHBhbmVsOiBQYW5lbDxTZWxlY3RMaXN0VmlldzxJU3ltYm9sPj4gfCB1bmRlZmluZWRcbiAgbGV0IHJlczogSVN5bWJvbCB8IHVuZGVmaW5lZFxuICBsZXQgcmVmb2N1czogSFRNTEVsZW1lbnQgfCB1bmRlZmluZWRcbiAgdHJ5IHtcbiAgICByZXMgPSBhd2FpdCBuZXcgUHJvbWlzZTxJU3ltYm9sIHwgdW5kZWZpbmVkPigocmVzb2x2ZSkgPT4ge1xuICAgICAgY29uc3Qgc2VsZWN0ID0gbmV3IFNlbGVjdExpc3RWaWV3PElTeW1ib2w+KHtcbiAgICAgICAgaXRlbXMsXG4gICAgICAgIGl0ZW1zQ2xhc3NMaXN0OiBbJ2lkZS1oYXNrZWxsJ10sXG4gICAgICAgIGVsZW1lbnRGb3JJdGVtOiAoaXRlbTogSVN5bWJvbCkgPT5cbiAgICAgICAgICBldGNoLnJlbmRlcihcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlOm5vLXVuc2FmZS1hbnlcbiAgICAgICAgICAgIDxsaSBjbGFzcz1cInR3by1saW5lc1wiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByaW1hcnktbGluZVwiIGlubmVySFRNTD17aGwoaXRlbS5zaWduYXR1cmUgfHwgJycsIHRydWUpfSAvPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInNlY29uZGFyeS1saW5lXCI+e2l0ZW0ubW9kIHx8ICcnfTwvc3Bhbj5cbiAgICAgICAgICAgIDwvbGk+LFxuICAgICAgICAgICAgLy8gdHNsaW50OmVuYWJsZTpuby11bnNhZmUtYW55XG4gICAgICAgICAgKSBhcyBIVE1MRWxlbWVudCxcbiAgICAgICAgZmlsdGVyS2V5Rm9ySXRlbTogKGl0ZW0pID0+IGl0ZW0uc2lnbmF0dXJlLFxuICAgICAgICBkaWRDYW5jZWxTZWxlY3Rpb246ICgpID0+IHtcbiAgICAgICAgICByZXNvbHZlKClcbiAgICAgICAgfSxcbiAgICAgICAgZGlkQ29uZmlybVNlbGVjdGlvbjogKGl0ZW0pID0+IHtcbiAgICAgICAgICByZXNvbHZlKGl0ZW0pXG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgICAgc2VsZWN0LmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnaWRlLWhhc2tlbGwnKVxuICAgICAgcGFuZWwgPSBhdG9tLndvcmtzcGFjZS5hZGRNb2RhbFBhbmVsKHtcbiAgICAgICAgaXRlbTogc2VsZWN0LFxuICAgICAgICB2aXNpYmxlOiB0cnVlLFxuICAgICAgfSlcbiAgICAgIGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgcmVmb2N1cyA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnRcbiAgICAgIH1cbiAgICAgIHNlbGVjdC5mb2N1cygpXG4gICAgfSlcbiAgfSBmaW5hbGx5IHtcbiAgICBwYW5lbCAmJiBwYW5lbC5kZXN0cm95KClcbiAgICByZWZvY3VzICYmIHJlZm9jdXMuZm9jdXMoKVxuICB9XG4gIHJldHVybiByZXNcbn1cbiJdfQ==