"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const get = require("request-promise-native");
const cheerio = require("cheerio");
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
    searchForSymbol(symbol) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield get({
                uri: `${this.hoogleBaseUrl}?&hoogle=${symbol}&mode=json`,
                json: true,
            });
            if (Array.isArray(res)) {
                return Array.from(this.parseResults(res));
            }
            else {
                return Array.from(this.parseResults4(res.results));
            }
        });
    }
    dispose() {
        this.killProcess();
    }
    *parseResults(results) {
        for (const r of results) {
            const sig = cheerio.load(r.item).text();
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
        const cmd = atom.config.get('ide-haskell-hoogle.hooglePath');
        console.log(`ide-haskell-hoogle: starting ${cmd}`);
        this.port = Math.floor(Math.random() * (60000 - 10000) + 10000);
        this.process = CP.spawn(cmd, ['server', '--port', this.port.toString()], {
            stdio: 'ignore'
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
__decorate([
    core_decorators_1.autobind,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Hoogle.prototype, "onProcessExit", null);
exports.Hoogle = Hoogle;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9vZ2xlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2hvb2dsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOENBQTZDO0FBQzdDLG1DQUFtQztBQUNuQyxvQ0FBbUM7QUFDbkMscURBQXdDO0FBMkJ4QztJQUtFO1FBRlEsa0JBQWEsR0FBRyw0QkFBNEIsQ0FBQTtRQUdsRCxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQywrQkFBK0IsRUFBRSxDQUFDLEdBQVc7WUFDL0QsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDUixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUE7Z0JBQ2xCLElBQUksQ0FBQyxhQUFhLEdBQUcsR0FBRyxDQUFBO1lBQzFCLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUE7Z0JBQ25CLElBQUksQ0FBQyxhQUFhLEdBQUcsb0JBQW9CLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQTtZQUN2RCxDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBRVksZUFBZSxDQUFFLE1BQWM7O1lBQzFDLE1BQU0sR0FBRyxHQUFtQixNQUFNLEdBQUcsQ0FBQztnQkFDcEMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLGFBQWEsWUFBWSxNQUFNLFlBQVk7Z0JBQ3hELElBQUksRUFBRSxJQUFJO2FBQ1gsQ0FBQyxDQUFBO1lBRUYsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZCLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtZQUMzQyxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQTtZQUNwRCxDQUFDO1FBQ0gsQ0FBQztLQUFBO0lBRU0sT0FBTztRQUNaLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQTtJQUNwQixDQUFDO0lBRUQsQ0FBUyxZQUFZLENBQUUsT0FBdUI7UUFDNUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQztZQUN4QixNQUFNLEdBQUcsR0FBSSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtZQUNoRCxNQUFNO2dCQUNKLEdBQUcsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUk7Z0JBQ2xCLFNBQVMsRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUM7Z0JBQ2pDLElBQUksRUFBRSxDQUFDLENBQUMsR0FBRztnQkFDWCxHQUFHLEVBQUUsQ0FBQyxDQUFDLElBQUk7YUFDWixDQUFBO1FBQ0gsQ0FBQztJQUNILENBQUM7SUFFRCxDQUFTLGFBQWEsQ0FBRSxPQUF3QjtRQUM5QyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLE1BQU07Z0JBQ0osR0FBRyxFQUFFLEVBQUU7Z0JBQ1AsU0FBUyxFQUFFLENBQUMsQ0FBQyxJQUFJO2dCQUNqQixJQUFJLEVBQUUsQ0FBQyxDQUFDLFFBQVE7Z0JBQ2hCLEdBQUcsRUFBRSxDQUFDLENBQUMsSUFBSTthQUNaLENBQUE7UUFDSCxDQUFDO0lBQ0gsQ0FBQztJQUdPLGFBQWE7UUFDbkIsT0FBTyxDQUFDLElBQUksQ0FBQyx3REFBd0QsQ0FBQyxDQUFBO1FBQ3RFLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQTtJQUNyQixDQUFDO0lBRU8sWUFBWTtRQUNsQixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsQ0FBQyxDQUFBO1FBQzVELE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0NBQWdDLEdBQUcsRUFBRSxDQUFDLENBQUE7UUFDbEQsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQTtRQUMvRCxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQ3JCLEdBQUcsRUFDSCxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUMxQztZQUNFLEtBQUssRUFBRSxRQUFRO1NBQ2hCLENBQ0YsQ0FBQTtRQUNELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUE7SUFDL0MsQ0FBQztJQUVPLFdBQVc7UUFDakIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQy9CLE9BQU8sQ0FBQyxJQUFJLENBQUMsb0NBQW9DLENBQUMsQ0FBQTtZQUNsRCxJQUFJLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQ3ZDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUE7WUFDbkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUE7UUFDMUIsQ0FBQztJQUNILENBQUM7Q0FDRjtBQTNCQztJQURDLDBCQUFROzs7OzJDQUlSO0FBN0RILHdCQXFGQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGdldCBmcm9tICdyZXF1ZXN0LXByb21pc2UtbmF0aXZlJ1xuaW1wb3J0IGNoZWVyaW8gPSByZXF1aXJlKCdjaGVlcmlvJylcbmltcG9ydCAqIGFzIENQIGZyb20gJ2NoaWxkX3Byb2Nlc3MnXG5pbXBvcnQge2F1dG9iaW5kfSBmcm9tICdjb3JlLWRlY29yYXRvcnMnXG5cbmludGVyZmFjZSBSZXNwb25zZUl0ZW0ge1xuICBkb2NzOiBzdHJpbmdcbiAgaXRlbTogc3RyaW5nXG4gIG1vZHVsZToge1xuICAgIG5hbWU6IHN0cmluZ1xuICAgIHVybDogc3RyaW5nXG4gIH1cbiAgcGFja2FnZToge1xuICAgIG5hbWU6IHN0cmluZ1xuICAgIHVybDogc3RyaW5nXG4gIH1cbiAgdHlwZTogc3RyaW5nXG4gIHVybDogc3RyaW5nXG59XG5cbmludGVyZmFjZSBSZXNwb25zZUl0ZW00IHtcbiAgZG9jczogc3RyaW5nXG4gIGxvY2F0aW9uOiBzdHJpbmdcbiAgc2VsZjogc3RyaW5nXG59XG5cbnR5cGUgSG9vZ2xlUmVzcG9uc2UgPSBSZXNwb25zZUl0ZW1bXSB8IHtcbiAgcmVzdWx0czogUmVzcG9uc2VJdGVtNFtdXG59XG5cbmV4cG9ydCBjbGFzcyBIb29nbGUge1xuICBwcml2YXRlIHBvcnQ/OiBudW1iZXJcbiAgcHJpdmF0ZSBwcm9jZXNzPzogQ1AuQ2hpbGRQcm9jZXNzXG4gIHByaXZhdGUgaG9vZ2xlQmFzZVVybCA9ICdodHRwOi8vaG9vZ2xlLmhhc2tlbGwub3JnLydcblxuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgYXRvbS5jb25maWcub2JzZXJ2ZSgnaWRlLWhhc2tlbGwtaG9vZ2xlLmhvb2dsZVR5cGUnLCAodmFsOiBzdHJpbmcpID0+IHtcbiAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgdGhpcy5raWxsUHJvY2VzcygpXG4gICAgICAgIHRoaXMuaG9vZ2xlQmFzZVVybCA9IHZhbFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zcGF3blByb2Nlc3MoKVxuICAgICAgICB0aGlzLmhvb2dsZUJhc2VVcmwgPSBgaHR0cDovL2xvY2FsaG9zdDoke3RoaXMucG9ydH0vYFxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgc2VhcmNoRm9yU3ltYm9sIChzeW1ib2w6IHN0cmluZyk6IFByb21pc2U8SVN5bWJvbFtdPiB7XG4gICAgY29uc3QgcmVzOiBIb29nbGVSZXNwb25zZSA9IGF3YWl0IGdldCh7XG4gICAgICB1cmk6IGAke3RoaXMuaG9vZ2xlQmFzZVVybH0/Jmhvb2dsZT0ke3N5bWJvbH0mbW9kZT1qc29uYCxcbiAgICAgIGpzb246IHRydWUsXG4gICAgfSlcblxuICAgIGlmIChBcnJheS5pc0FycmF5KHJlcykpIHtcbiAgICAgIHJldHVybiBBcnJheS5mcm9tKHRoaXMucGFyc2VSZXN1bHRzKHJlcykpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBBcnJheS5mcm9tKHRoaXMucGFyc2VSZXN1bHRzNChyZXMucmVzdWx0cykpXG4gICAgfVxuICB9XG5cbiAgcHVibGljIGRpc3Bvc2UgKCkge1xuICAgIHRoaXMua2lsbFByb2Nlc3MoKVxuICB9XG5cbiAgcHJpdmF0ZSAqcGFyc2VSZXN1bHRzIChyZXN1bHRzOiBSZXNwb25zZUl0ZW1bXSkge1xuICAgIGZvciAoY29uc3QgciBvZiByZXN1bHRzKSB7XG4gICAgICBjb25zdCBzaWcgPSAoY2hlZXJpby5sb2FkKHIuaXRlbSkgYXMgYW55KS50ZXh0KClcbiAgICAgIHlpZWxkIHtcbiAgICAgICAgbW9kOiByLm1vZHVsZS5uYW1lLFxuICAgICAgICBzaWduYXR1cmU6IHNpZy5yZXBsYWNlKCc8MD4nLCAnJyksXG4gICAgICAgIGhyZWY6IHIudXJsLFxuICAgICAgICBkb2M6IHIuZG9jcyxcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlICpwYXJzZVJlc3VsdHM0IChyZXN1bHRzOiBSZXNwb25zZUl0ZW00W10pIHtcbiAgICBmb3IgKGNvbnN0IHIgb2YgcmVzdWx0cykge1xuICAgICAgeWllbGQge1xuICAgICAgICBtb2Q6ICcnLFxuICAgICAgICBzaWduYXR1cmU6IHIuc2VsZixcbiAgICAgICAgaHJlZjogci5sb2NhdGlvbixcbiAgICAgICAgZG9jOiByLmRvY3MsXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgQGF1dG9iaW5kXG4gIHByaXZhdGUgb25Qcm9jZXNzRXhpdCAoKSB7XG4gICAgY29uc29sZS53YXJuKCdpZGUtaGFza2VsbC1ob29nbGU6IGhvb2dsZSBkaWVkIC0tIHdpbGwgdHJ5IHRvIHJlc3RhcnQnKSAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOiBuby1jb25zb2xlXG4gICAgdGhpcy5zcGF3blByb2Nlc3MoKVxuICB9XG5cbiAgcHJpdmF0ZSBzcGF3blByb2Nlc3MgKCkge1xuICAgIGNvbnN0IGNtZCA9IGF0b20uY29uZmlnLmdldCgnaWRlLWhhc2tlbGwtaG9vZ2xlLmhvb2dsZVBhdGgnKVxuICAgIGNvbnNvbGUubG9nKGBpZGUtaGFza2VsbC1ob29nbGU6IHN0YXJ0aW5nICR7Y21kfWApIC8vIHRzbGludDpkaXNhYmxlLWxpbmU6IG5vLWNvbnNvbGVcbiAgICB0aGlzLnBvcnQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoNjAwMDAgLSAxMDAwMCkgKyAxMDAwMClcbiAgICB0aGlzLnByb2Nlc3MgPSBDUC5zcGF3bihcbiAgICAgIGNtZCxcbiAgICAgIFsnc2VydmVyJywgJy0tcG9ydCcsIHRoaXMucG9ydC50b1N0cmluZygpXSxcbiAgICAgIHtcbiAgICAgICAgc3RkaW86ICdpZ25vcmUnXG4gICAgICB9XG4gICAgKVxuICAgIHRoaXMucHJvY2Vzcy5vbmNlKCdleGl0JywgdGhpcy5vblByb2Nlc3NFeGl0KVxuICB9XG5cbiAgcHJpdmF0ZSBraWxsUHJvY2VzcyAoKSB7XG4gICAgaWYgKHRoaXMucHJvY2VzcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ2lkZS1oYXNrZWxsLWhvb2dsZToga2lsbGluZyBob29nbGUnKSAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOiBuby1jb25zb2xlXG4gICAgICB0aGlzLnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzKCdleGl0JylcbiAgICAgIHRoaXMucHJvY2Vzcy5raWxsKClcbiAgICAgIHRoaXMucHJvY2VzcyA9IHVuZGVmaW5lZFxuICAgIH1cbiAgfVxufVxuIl19