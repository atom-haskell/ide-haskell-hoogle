"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hoogle = void 0;
const tslib_1 = require("tslib");
const get = require("request-promise-native");
const CP = require("child_process");
const core_decorators_1 = require("core-decorators");
class Hoogle {
    constructor() {
        this.hoogleBaseUrl = 'http://hoogle.haskell.org/';
        atom.config.observe('ide-haskell-hoogle.hoogleType', (val) => {
            if (val) {
                this.killProcess();
                this.hoogleBaseUrl = val;
            }
            else {
                this.spawnProcess();
                this.hoogleBaseUrl = `http://localhost:${this.port}/`;
            }
        });
    }
    async searchForSymbol(symbol) {
        const res = await get({
            uri: `${this.hoogleBaseUrl}?&hoogle=${symbol}&mode=json`,
            json: true,
        });
        if (Array.isArray(res)) {
            return Array.from(this.parseResults(res));
        }
        else {
            return Array.from(this.parseResults4(res.results));
        }
    }
    dispose() {
        this.killProcess();
    }
    *parseResults(results) {
        for (const r of results) {
            const div = document.createElement('div');
            div.innerHTML = r.item;
            const sig = div.innerText;
            yield {
                mod: r.module.name,
                signature: sig.replace('<0>', ''),
                href: r.url,
                doc: r.docs,
            };
        }
    }
    *parseResults4(results) {
        for (const r of results) {
            yield {
                mod: '',
                signature: r.self,
                href: r.location,
                doc: r.docs,
            };
        }
    }
    onProcessExit() {
        console.warn('ide-haskell-hoogle: hoogle died -- will try to restart');
        this.spawnProcess();
    }
    spawnProcess() {
        const cmd = atom.config.get('ide-haskell-hoogle.hooglePath') || 'hoogle';
        console.log(`ide-haskell-hoogle: starting ${cmd}`);
        this.port = Math.floor(Math.random() * (60000 - 10000) + 10000);
        this.process = CP.spawn(cmd, ['server', '--port', this.port.toString()], {
            stdio: 'ignore',
        });
        this.process.once('exit', this.onProcessExit);
    }
    killProcess() {
        if (this.process !== undefined) {
            console.warn('ide-haskell-hoogle: killing hoogle');
            this.process.removeAllListeners('exit');
            this.process.kill();
            this.process = undefined;
        }
    }
}
tslib_1.__decorate([
    core_decorators_1.autobind,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], Hoogle.prototype, "onProcessExit", null);
exports.Hoogle = Hoogle;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9vZ2xlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2hvb2dsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsOENBQTZDO0FBQzdDLG9DQUFtQztBQUNuQyxxREFBMEM7QUEyQjFDLE1BQWEsTUFBTTtJQUtqQjtRQUZRLGtCQUFhLEdBQUcsNEJBQTRCLENBQUE7UUFHbEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsK0JBQStCLEVBQUUsQ0FBQyxHQUFXLEVBQUUsRUFBRTtZQUNuRSxJQUFJLEdBQUcsRUFBRTtnQkFDUCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUE7Z0JBQ2xCLElBQUksQ0FBQyxhQUFhLEdBQUcsR0FBRyxDQUFBO2FBQ3pCO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQTtnQkFDbkIsSUFBSSxDQUFDLGFBQWEsR0FBRyxvQkFBb0IsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFBO2FBQ3REO1FBQ0gsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBRU0sS0FBSyxDQUFDLGVBQWUsQ0FBQyxNQUFjO1FBRXpDLE1BQU0sR0FBRyxHQUFtQixNQUFNLEdBQUcsQ0FBQztZQUNwQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsYUFBYSxZQUFZLE1BQU0sWUFBWTtZQUN4RCxJQUFJLEVBQUUsSUFBSTtTQUNYLENBQUMsQ0FBQTtRQUVGLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUN0QixPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO1NBQzFDO2FBQU07WUFDTCxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQTtTQUNuRDtJQUNILENBQUM7SUFFTSxPQUFPO1FBQ1osSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFBO0lBQ3BCLENBQUM7SUFFTyxDQUFDLFlBQVksQ0FBQyxPQUF1QjtRQUMzQyxLQUFLLE1BQU0sQ0FBQyxJQUFJLE9BQU8sRUFBRTtZQUN2QixNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFBO1lBQ3pDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQTtZQUN0QixNQUFNLEdBQUcsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFBO1lBQ3pCLE1BQU07Z0JBQ0osR0FBRyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSTtnQkFDbEIsU0FBUyxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQztnQkFDakMsSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHO2dCQUNYLEdBQUcsRUFBRSxDQUFDLENBQUMsSUFBSTthQUNaLENBQUE7U0FDRjtJQUNILENBQUM7SUFFTyxDQUFDLGFBQWEsQ0FBQyxPQUF3QjtRQUM3QyxLQUFLLE1BQU0sQ0FBQyxJQUFJLE9BQU8sRUFBRTtZQUN2QixNQUFNO2dCQUNKLEdBQUcsRUFBRSxFQUFFO2dCQUNQLFNBQVMsRUFBRSxDQUFDLENBQUMsSUFBSTtnQkFDakIsSUFBSSxFQUFFLENBQUMsQ0FBQyxRQUFRO2dCQUNoQixHQUFHLEVBQUUsQ0FBQyxDQUFDLElBQUk7YUFDWixDQUFBO1NBQ0Y7SUFDSCxDQUFDO0lBR08sYUFBYTtRQUNuQixPQUFPLENBQUMsSUFBSSxDQUFDLHdEQUF3RCxDQUFDLENBQUE7UUFDdEUsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFBO0lBQ3JCLENBQUM7SUFFTyxZQUFZO1FBQ2xCLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLCtCQUErQixDQUFDLElBQUksUUFBUSxDQUFBO1FBQ3hFLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0NBQWdDLEdBQUcsRUFBRSxDQUFDLENBQUE7UUFDbEQsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQTtRQUMvRCxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQ3JCLEdBQUcsRUFDSCxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUMxQztZQUNFLEtBQUssRUFBRSxRQUFRO1NBQ2hCLENBQ0YsQ0FBQTtRQUNELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUE7SUFDL0MsQ0FBQztJQUVPLFdBQVc7UUFDakIsSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLFNBQVMsRUFBRTtZQUM5QixPQUFPLENBQUMsSUFBSSxDQUFDLG9DQUFvQyxDQUFDLENBQUE7WUFDbEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUN2QyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFBO1lBQ25CLElBQUksQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFBO1NBQ3pCO0lBQ0gsQ0FBQztDQUNGO0FBM0JDO0lBREMsMEJBQVE7Ozs7MkNBSVI7QUFoRUgsd0JBd0ZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZ2V0IGZyb20gJ3JlcXVlc3QtcHJvbWlzZS1uYXRpdmUnXG5pbXBvcnQgKiBhcyBDUCBmcm9tICdjaGlsZF9wcm9jZXNzJ1xuaW1wb3J0IHsgYXV0b2JpbmQgfSBmcm9tICdjb3JlLWRlY29yYXRvcnMnXG5cbmludGVyZmFjZSBSZXNwb25zZUl0ZW0ge1xuICBkb2NzOiBzdHJpbmdcbiAgaXRlbTogc3RyaW5nXG4gIG1vZHVsZToge1xuICAgIG5hbWU6IHN0cmluZ1xuICAgIHVybDogc3RyaW5nXG4gIH1cbiAgcGFja2FnZToge1xuICAgIG5hbWU6IHN0cmluZ1xuICAgIHVybDogc3RyaW5nXG4gIH1cbiAgdHlwZTogc3RyaW5nXG4gIHVybDogc3RyaW5nXG59XG5cbmludGVyZmFjZSBSZXNwb25zZUl0ZW00IHtcbiAgZG9jczogc3RyaW5nXG4gIGxvY2F0aW9uOiBzdHJpbmdcbiAgc2VsZjogc3RyaW5nXG59XG5cbnR5cGUgSG9vZ2xlUmVzcG9uc2UgPSBSZXNwb25zZUl0ZW1bXSB8IHtcbiAgcmVzdWx0czogUmVzcG9uc2VJdGVtNFtdXG59XG5cbmV4cG9ydCBjbGFzcyBIb29nbGUge1xuICBwcml2YXRlIHBvcnQ/OiBudW1iZXJcbiAgcHJpdmF0ZSBwcm9jZXNzPzogQ1AuQ2hpbGRQcm9jZXNzXG4gIHByaXZhdGUgaG9vZ2xlQmFzZVVybCA9ICdodHRwOi8vaG9vZ2xlLmhhc2tlbGwub3JnLydcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBhdG9tLmNvbmZpZy5vYnNlcnZlKCdpZGUtaGFza2VsbC1ob29nbGUuaG9vZ2xlVHlwZScsICh2YWw6IHN0cmluZykgPT4ge1xuICAgICAgaWYgKHZhbCkge1xuICAgICAgICB0aGlzLmtpbGxQcm9jZXNzKClcbiAgICAgICAgdGhpcy5ob29nbGVCYXNlVXJsID0gdmFsXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNwYXduUHJvY2VzcygpXG4gICAgICAgIHRoaXMuaG9vZ2xlQmFzZVVybCA9IGBodHRwOi8vbG9jYWxob3N0OiR7dGhpcy5wb3J0fS9gXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBzZWFyY2hGb3JTeW1ib2woc3ltYm9sOiBzdHJpbmcpOiBQcm9taXNlPElTeW1ib2xbXT4ge1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby11bnNhZmUtYW55XG4gICAgY29uc3QgcmVzOiBIb29nbGVSZXNwb25zZSA9IGF3YWl0IGdldCh7XG4gICAgICB1cmk6IGAke3RoaXMuaG9vZ2xlQmFzZVVybH0/Jmhvb2dsZT0ke3N5bWJvbH0mbW9kZT1qc29uYCxcbiAgICAgIGpzb246IHRydWUsXG4gICAgfSlcblxuICAgIGlmIChBcnJheS5pc0FycmF5KHJlcykpIHtcbiAgICAgIHJldHVybiBBcnJheS5mcm9tKHRoaXMucGFyc2VSZXN1bHRzKHJlcykpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBBcnJheS5mcm9tKHRoaXMucGFyc2VSZXN1bHRzNChyZXMucmVzdWx0cykpXG4gICAgfVxuICB9XG5cbiAgcHVibGljIGRpc3Bvc2UoKSB7XG4gICAgdGhpcy5raWxsUHJvY2VzcygpXG4gIH1cblxuICBwcml2YXRlICpwYXJzZVJlc3VsdHMocmVzdWx0czogUmVzcG9uc2VJdGVtW10pIHtcbiAgICBmb3IgKGNvbnN0IHIgb2YgcmVzdWx0cykge1xuICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgIGRpdi5pbm5lckhUTUwgPSByLml0ZW1cbiAgICAgIGNvbnN0IHNpZyA9IGRpdi5pbm5lclRleHRcbiAgICAgIHlpZWxkIHtcbiAgICAgICAgbW9kOiByLm1vZHVsZS5uYW1lLFxuICAgICAgICBzaWduYXR1cmU6IHNpZy5yZXBsYWNlKCc8MD4nLCAnJyksXG4gICAgICAgIGhyZWY6IHIudXJsLFxuICAgICAgICBkb2M6IHIuZG9jcyxcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlICpwYXJzZVJlc3VsdHM0KHJlc3VsdHM6IFJlc3BvbnNlSXRlbTRbXSkge1xuICAgIGZvciAoY29uc3QgciBvZiByZXN1bHRzKSB7XG4gICAgICB5aWVsZCB7XG4gICAgICAgIG1vZDogJycsXG4gICAgICAgIHNpZ25hdHVyZTogci5zZWxmLFxuICAgICAgICBocmVmOiByLmxvY2F0aW9uLFxuICAgICAgICBkb2M6IHIuZG9jcyxcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBAYXV0b2JpbmRcbiAgcHJpdmF0ZSBvblByb2Nlc3NFeGl0KCkge1xuICAgIGNvbnNvbGUud2FybignaWRlLWhhc2tlbGwtaG9vZ2xlOiBob29nbGUgZGllZCAtLSB3aWxsIHRyeSB0byByZXN0YXJ0JykgLy8gdHNsaW50OmRpc2FibGUtbGluZTogbm8tY29uc29sZVxuICAgIHRoaXMuc3Bhd25Qcm9jZXNzKClcbiAgfVxuXG4gIHByaXZhdGUgc3Bhd25Qcm9jZXNzKCkge1xuICAgIGNvbnN0IGNtZCA9IGF0b20uY29uZmlnLmdldCgnaWRlLWhhc2tlbGwtaG9vZ2xlLmhvb2dsZVBhdGgnKSB8fCAnaG9vZ2xlJ1xuICAgIGNvbnNvbGUubG9nKGBpZGUtaGFza2VsbC1ob29nbGU6IHN0YXJ0aW5nICR7Y21kfWApIC8vIHRzbGludDpkaXNhYmxlLWxpbmU6IG5vLWNvbnNvbGVcbiAgICB0aGlzLnBvcnQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoNjAwMDAgLSAxMDAwMCkgKyAxMDAwMClcbiAgICB0aGlzLnByb2Nlc3MgPSBDUC5zcGF3bihcbiAgICAgIGNtZCxcbiAgICAgIFsnc2VydmVyJywgJy0tcG9ydCcsIHRoaXMucG9ydC50b1N0cmluZygpXSxcbiAgICAgIHtcbiAgICAgICAgc3RkaW86ICdpZ25vcmUnLFxuICAgICAgfSxcbiAgICApXG4gICAgdGhpcy5wcm9jZXNzLm9uY2UoJ2V4aXQnLCB0aGlzLm9uUHJvY2Vzc0V4aXQpIC8vIHRzbGludDpkaXNhYmxlLWxpbmU6IG5vLXVuYm91bmQtbWV0aG9kXG4gIH1cblxuICBwcml2YXRlIGtpbGxQcm9jZXNzKCkge1xuICAgIGlmICh0aGlzLnByb2Nlc3MgIT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc29sZS53YXJuKCdpZGUtaGFza2VsbC1ob29nbGU6IGtpbGxpbmcgaG9vZ2xlJykgLy8gdHNsaW50OmRpc2FibGUtbGluZTogbm8tY29uc29sZVxuICAgICAgdGhpcy5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycygnZXhpdCcpXG4gICAgICB0aGlzLnByb2Nlc3Mua2lsbCgpXG4gICAgICB0aGlzLnByb2Nlc3MgPSB1bmRlZmluZWRcbiAgICB9XG4gIH1cbn1cbiJdfQ==