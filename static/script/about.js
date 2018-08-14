const { shell, remote } = require('electron');

const main = {
    init(){
        main.getAppVersion();
        main.eventHandle();
    },
    eventHandle(){
        document.querySelector('.author').onclick = (e) => {
            shell.openExternal('https://blog.4leaf.top');
        };
        document.querySelector('.code').onclick = (e) => {
            shell.openExternal('https://github.com/frank-xjh/FeCalculator');
        }
    },
    getAppVersion(){
        document.querySelector('.version').innerHTML = remote.getGlobal('version');
    }
}
main.init();