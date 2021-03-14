"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hoogle = void 0;
const tslib_1 = require("tslib");
const get = require("request-promise-native");
const CP = require("child_process");
const core_decorators_1 = require("core-decorators");
class Hoogle {
    constructor() {
        this.hoogleBaseUrl = 'https://hoogle.haskell.org/';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9vZ2xlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2hvb2dsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsOENBQTZDO0FBQzdDLG9DQUFtQztBQUNuQyxxREFBMEM7QUEyQjFDLE1BQWEsTUFBTTtJQUtqQjtRQUZRLGtCQUFhLEdBQUcsNkJBQTZCLENBQUE7UUFHbkQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsK0JBQStCLEVBQUUsQ0FBQyxHQUFXLEVBQUUsRUFBRTtZQUNuRSxJQUFJLEdBQUcsRUFBRTtnQkFDUCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUE7Z0JBQ2xCLElBQUksQ0FBQyxhQUFhLEdBQUcsR0FBRyxDQUFBO2FBQ3pCO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQTtnQkFDbkIsSUFBSSxDQUFDLGFBQWEsR0FBRyxvQkFBb0IsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFBO2FBQ3REO1FBQ0gsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBRU0sS0FBSyxDQUFDLGVBQWUsQ0FBQyxNQUFjO1FBRXpDLE1BQU0sR0FBRyxHQUFtQixNQUFNLEdBQUcsQ0FBQztZQUNwQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsYUFBYSxZQUFZLE1BQU0sWUFBWTtZQUN4RCxJQUFJLEVBQUUsSUFBSTtTQUNYLENBQUMsQ0FBQTtRQUVGLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUN0QixPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO1NBQzFDO2FBQU07WUFDTCxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQTtTQUNuRDtJQUNILENBQUM7SUFFTSxPQUFPO1FBQ1osSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFBO0lBQ3BCLENBQUM7SUFFTyxDQUFDLFlBQVksQ0FBQyxPQUF1QjtRQUMzQyxLQUFLLE1BQU0sQ0FBQyxJQUFJLE9BQU8sRUFBRTtZQUN2QixNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFBO1lBQ3pDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQTtZQUN0QixNQUFNLEdBQUcsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFBO1lBQ3pCLE1BQU07Z0JBQ0osR0FBRyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSTtnQkFDbEIsU0FBUyxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQztnQkFDakMsSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHO2dCQUNYLEdBQUcsRUFBRSxDQUFDLENBQUMsSUFBSTthQUNaLENBQUE7U0FDRjtJQUNILENBQUM7SUFFTyxDQUFDLGFBQWEsQ0FBQyxPQUF3QjtRQUM3QyxLQUFLLE1BQU0sQ0FBQyxJQUFJLE9BQU8sRUFBRTtZQUN2QixNQUFNO2dCQUNKLEdBQUcsRUFBRSxFQUFFO2dCQUNQLFNBQVMsRUFBRSxDQUFDLENBQUMsSUFBSTtnQkFDakIsSUFBSSxFQUFFLENBQUMsQ0FBQyxRQUFRO2dCQUNoQixHQUFHLEVBQUUsQ0FBQyxDQUFDLElBQUk7YUFDWixDQUFBO1NBQ0Y7SUFDSCxDQUFDO0lBR08sYUFBYTtRQUNuQixPQUFPLENBQUMsSUFBSSxDQUFDLHdEQUF3RCxDQUFDLENBQUE7UUFDdEUsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFBO0lBQ3JCLENBQUM7SUFFTyxZQUFZO1FBQ2xCLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLCtCQUErQixDQUFDLElBQUksUUFBUSxDQUFBO1FBQ3hFLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0NBQWdDLEdBQUcsRUFBRSxDQUFDLENBQUE7UUFDbEQsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQTtRQUMvRCxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQ3JCLEdBQUcsRUFDSCxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUMxQztZQUNFLEtBQUssRUFBRSxRQUFRO1NBQ2hCLENBQ0YsQ0FBQTtRQUNELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUE7SUFDL0MsQ0FBQztJQUVPLFdBQVc7UUFDakIsSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLFNBQVMsRUFBRTtZQUM5QixPQUFPLENBQUMsSUFBSSxDQUFDLG9DQUFvQyxDQUFDLENBQUE7WUFDbEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUN2QyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFBO1lBQ25CLElBQUksQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFBO1NBQ3pCO0lBQ0gsQ0FBQztDQUNGO0FBM0JDO0lBREMsMEJBQVE7Ozs7MkNBSVI7QUFoRUgsd0JBd0ZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZ2V0IGZyb20gJ3JlcXVlc3QtcHJvbWlzZS1uYXRpdmUnXG5pbXBvcnQgKiBhcyBDUCBmcm9tICdjaGlsZF9wcm9jZXNzJ1xuaW1wb3J0IHsgYXV0b2JpbmQgfSBmcm9tICdjb3JlLWRlY29yYXRvcnMnXG5cbmludGVyZmFjZSBSZXNwb25zZUl0ZW0ge1xuICBkb2NzOiBzdHJpbmdcbiAgaXRlbTogc3RyaW5nXG4gIG1vZHVsZToge1xuICAgIG5hbWU6IHN0cmluZ1xuICAgIHVybDogc3RyaW5nXG4gIH1cbiAgcGFja2FnZToge1xuICAgIG5hbWU6IHN0cmluZ1xuICAgIHVybDogc3RyaW5nXG4gIH1cbiAgdHlwZTogc3RyaW5nXG4gIHVybDogc3RyaW5nXG59XG5cbmludGVyZmFjZSBSZXNwb25zZUl0ZW00IHtcbiAgZG9jczogc3RyaW5nXG4gIGxvY2F0aW9uOiBzdHJpbmdcbiAgc2VsZjogc3RyaW5nXG59XG5cbnR5cGUgSG9vZ2xlUmVzcG9uc2UgPSBSZXNwb25zZUl0ZW1bXSB8IHtcbiAgcmVzdWx0czogUmVzcG9uc2VJdGVtNFtdXG59XG5cbmV4cG9ydCBjbGFzcyBIb29nbGUge1xuICBwcml2YXRlIHBvcnQ/OiBudW1iZXJcbiAgcHJpdmF0ZSBwcm9jZXNzPzogQ1AuQ2hpbGRQcm9jZXNzXG4gIHByaXZhdGUgaG9vZ2xlQmFzZVVybCA9ICdodHRwczovL2hvb2dsZS5oYXNrZWxsLm9yZy8nXG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgYXRvbS5jb25maWcub2JzZXJ2ZSgnaWRlLWhhc2tlbGwtaG9vZ2xlLmhvb2dsZVR5cGUnLCAodmFsOiBzdHJpbmcpID0+IHtcbiAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgdGhpcy5raWxsUHJvY2VzcygpXG4gICAgICAgIHRoaXMuaG9vZ2xlQmFzZVVybCA9IHZhbFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zcGF3blByb2Nlc3MoKVxuICAgICAgICB0aGlzLmhvb2dsZUJhc2VVcmwgPSBgaHR0cDovL2xvY2FsaG9zdDoke3RoaXMucG9ydH0vYFxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgc2VhcmNoRm9yU3ltYm9sKHN5bWJvbDogc3RyaW5nKTogUHJvbWlzZTxJU3ltYm9sW10+IHtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tdW5zYWZlLWFueVxuICAgIGNvbnN0IHJlczogSG9vZ2xlUmVzcG9uc2UgPSBhd2FpdCBnZXQoe1xuICAgICAgdXJpOiBgJHt0aGlzLmhvb2dsZUJhc2VVcmx9PyZob29nbGU9JHtzeW1ib2x9Jm1vZGU9anNvbmAsXG4gICAgICBqc29uOiB0cnVlLFxuICAgIH0pXG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheShyZXMpKSB7XG4gICAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLnBhcnNlUmVzdWx0cyhyZXMpKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLnBhcnNlUmVzdWx0czQocmVzLnJlc3VsdHMpKVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBkaXNwb3NlKCkge1xuICAgIHRoaXMua2lsbFByb2Nlc3MoKVxuICB9XG5cbiAgcHJpdmF0ZSAqcGFyc2VSZXN1bHRzKHJlc3VsdHM6IFJlc3BvbnNlSXRlbVtdKSB7XG4gICAgZm9yIChjb25zdCByIG9mIHJlc3VsdHMpIHtcbiAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICBkaXYuaW5uZXJIVE1MID0gci5pdGVtXG4gICAgICBjb25zdCBzaWcgPSBkaXYuaW5uZXJUZXh0XG4gICAgICB5aWVsZCB7XG4gICAgICAgIG1vZDogci5tb2R1bGUubmFtZSxcbiAgICAgICAgc2lnbmF0dXJlOiBzaWcucmVwbGFjZSgnPDA+JywgJycpLFxuICAgICAgICBocmVmOiByLnVybCxcbiAgICAgICAgZG9jOiByLmRvY3MsXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSAqcGFyc2VSZXN1bHRzNChyZXN1bHRzOiBSZXNwb25zZUl0ZW00W10pIHtcbiAgICBmb3IgKGNvbnN0IHIgb2YgcmVzdWx0cykge1xuICAgICAgeWllbGQge1xuICAgICAgICBtb2Q6ICcnLFxuICAgICAgICBzaWduYXR1cmU6IHIuc2VsZixcbiAgICAgICAgaHJlZjogci5sb2NhdGlvbixcbiAgICAgICAgZG9jOiByLmRvY3MsXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgQGF1dG9iaW5kXG4gIHByaXZhdGUgb25Qcm9jZXNzRXhpdCgpIHtcbiAgICBjb25zb2xlLndhcm4oJ2lkZS1oYXNrZWxsLWhvb2dsZTogaG9vZ2xlIGRpZWQgLS0gd2lsbCB0cnkgdG8gcmVzdGFydCcpIC8vIHRzbGludDpkaXNhYmxlLWxpbmU6IG5vLWNvbnNvbGVcbiAgICB0aGlzLnNwYXduUHJvY2VzcygpXG4gIH1cblxuICBwcml2YXRlIHNwYXduUHJvY2VzcygpIHtcbiAgICBjb25zdCBjbWQgPSBhdG9tLmNvbmZpZy5nZXQoJ2lkZS1oYXNrZWxsLWhvb2dsZS5ob29nbGVQYXRoJykgfHwgJ2hvb2dsZSdcbiAgICBjb25zb2xlLmxvZyhgaWRlLWhhc2tlbGwtaG9vZ2xlOiBzdGFydGluZyAke2NtZH1gKSAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOiBuby1jb25zb2xlXG4gICAgdGhpcy5wb3J0ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDYwMDAwIC0gMTAwMDApICsgMTAwMDApXG4gICAgdGhpcy5wcm9jZXNzID0gQ1Auc3Bhd24oXG4gICAgICBjbWQsXG4gICAgICBbJ3NlcnZlcicsICctLXBvcnQnLCB0aGlzLnBvcnQudG9TdHJpbmcoKV0sXG4gICAgICB7XG4gICAgICAgIHN0ZGlvOiAnaWdub3JlJyxcbiAgICAgIH0sXG4gICAgKVxuICAgIHRoaXMucHJvY2Vzcy5vbmNlKCdleGl0JywgdGhpcy5vblByb2Nlc3NFeGl0KSAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOiBuby11bmJvdW5kLW1ldGhvZFxuICB9XG5cbiAgcHJpdmF0ZSBraWxsUHJvY2VzcygpIHtcbiAgICBpZiAodGhpcy5wcm9jZXNzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnNvbGUud2FybignaWRlLWhhc2tlbGwtaG9vZ2xlOiBraWxsaW5nIGhvb2dsZScpIC8vIHRzbGludDpkaXNhYmxlLWxpbmU6IG5vLWNvbnNvbGVcbiAgICAgIHRoaXMucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMoJ2V4aXQnKVxuICAgICAgdGhpcy5wcm9jZXNzLmtpbGwoKVxuICAgICAgdGhpcy5wcm9jZXNzID0gdW5kZWZpbmVkXG4gICAgfVxuICB9XG59XG4iXX0=