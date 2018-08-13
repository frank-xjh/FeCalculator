/*
 * @Author: linxin 
 * @Date: 2017-08-23 11:04:01 
 * @Last Modified time: 2017-08-29 11:04:01 
 */
const { ipcRenderer } = require('electron');
const math = require('mathjs');

math.config({
    number: "BigNumber",
    precision: 32
});

let result = '0';
let max_length = 9;

let main = {
    isEqual: false,
    isExpress: false,
    flag: true,
    history: {},
    register: {},
    events: null,
    clickNumber(num) {
        const _this = this,
            res = document.querySelector('.result-text'),
            isPoint = num === '.';

        if (!_this.flag) {
            result = result.toString();

            if (result.indexOf('.') !== -1 && isPoint) {
                return;
            }

            if (result.length >= max_length) {
                return;
            }

            result = result + num;
        } else {
            _this.resize();
            result = isPoint ? '0' + num : num;
            if (_this.isEqual) {
                _this.history = {};
                _this.register = {};
                _this.isEqual = false;
            }
            _this.flag = false;
        }
        _this.removeActive();
        res.innerHTML = result;
    },
    // 点击运算符
    clickOperat(ope, event) {
        const _this = this,
            res = document.querySelector('.result-text');
        switch (ope) {
            case '+/-':
                res.innerHTML = result = math.eval(result + '*-1');
                _this.resize();
                _this.isEqual ? _this.flag = true : '';
                break;
            case '%':
                res.innerHTML = result = math.format(math.eval(res.innerHTML + '/100'),16);
                _this.flag = true;
                _this.resize();
                break;
            default:
                _this.flag = true;
                if (!event.classList.contains('active')) {
                    _this.removeActive();
                    event.classList.add('active');

                    if (_this.isEqual) {
                        _this.register = {};
                        _this.history.operator = ope;
                        _this.history.before = _this.checkIsMinus(result);
                        _this.isEqual = false;
                    } else {
                        if (_this.register.number) {
                            res.innerHTML = result = math.eval(_this.register.number + _this.register.ope + result);
                            _this.register = {};
                        }
                        if ((ope == '*' || ope == '/') && (_this.history.operator == '+' || _this.history.operator == '-')) {
                            _this.register.number = _this.checkIsMinus(result);
                            _this.register.ope = ope;
                        } else {
                            _this.register = {};
                            if (!!_this.history.before) {
                                res.innerHTML = result = math.eval(_this.history.before + _this.history.operator + result);
                            }
                            _this.history.before = _this.checkIsMinus(result);
                            _this.history.operator = ope;
                        }
                        _this.flag = true;
                    }
                }
                break;
        }
    },
    clickEqual() {
        const _this = this,
            res = document.querySelector('.result-text');

        _this.flag = true;
        _this.removeActive();

        if (_this.isEqual) {
            _this.history.before = _this.checkIsMinus(result);
        } else {
            if (_this.register.number) {

                if (_this.register.ope === '*' || _this.register.ope === '/') {
                    _this.register.after = result;
                    _this.history.after = _this.checkIsMinus(math.eval(_this.register.number + _this.register.ope + result));
                }
            } else {
                _this.history.after = _this.checkIsMinus(result);
            }

        }
        console.log(_this.register.ope);
        if (_this.register.ope && _this.register.ope !== '*' && _this.register.ope !== '/') {
            
            _this.clickSpecial(_this.register.ope, _this.events);
        } else {
            if (_this.history.before && _this.history.operator && _this.history.after) {
                try {

                    result = _this.resultHandle(math.eval(_this.history.before + _this.history.operator + _this.history.after).toString());

                    if (_this.register.number) {
                        _this.history.operator = _this.register.ope;
                        _this.history.after = _this.register.after;
                        _this.register = {};
                    }
                } catch (error) {
                    result = 'error';
                }

                res.innerHTML = result;
            }
        }
        _this.isEqual = true;
    },
    reset() {
        const _this = this,
            res = document.querySelector('.result-text');
        _this.flag = true;
        _this.history = {};
        _this.register = {};
        _this.isEqual = false;
        res.innerHTML = result = '0';
    },
    resize() {
        const _this = this,
            res = document.querySelector('.result-text');
        const num = (!!result.toString) ? result.toString() : result;
        if (num.length > max_length) {
            res.classList.add('small');
        } else {
            res.classList.remove('small');
        }
    },
    resultHandle(num) {
        if (typeof num == "number") {
            num = num.toString();
        }
        const idx = num.indexOf('.');

        if (num.length > max_length) {
            if (idx !== -1) {
                return new Number(num).toPrecision(max_length - idx - 1).replace('+', '').substring(0,max_length);
            } else {
                return new Number(num).toPrecision(max_length - 4).replace('+', '').substring(0,max_length);
            }
        } else {
            return num;
        }
    },
    clickSpecial(type, event) {
        const _this = this,
            res = document.querySelector('.result-text');
        _this.flag = true;
        _this.removeActive();
        switch (type) {
            case '1':
                res.innerHTML = result = math.format(math.pow(result, 2), {
                    precision: 16
                });
                _this.register.ope = type;
                _this.isEqual = true;

                break;
            case '2':
                res.innerHTML = result = math.format(math.pow(result, 3), {
                    precision: 16
                });
                _this.register.ope = type;
                _this.isEqual = true;
                break;
            case '3':
                _this.events = event;
                if (!event.classList.contains('active')) {
                    if (_this.register.ope === '3') {
                        if (_this.isEqual) {
                            _this.register.number = result;
                        } else {
                            _this.register.after = result;
                            _this.isEqual = true;
                        }

                        res.innerHTML = result = math.format(math.pow(_this.register.number, _this.register.after), {
                            precision: 16
                        });

                    } else {
                        _this.removeActive();
                        event.classList.add('active');
                        _this.register.number = result;
                        _this.register.ope = type;
                    }
                }
                break;
            case '4':
                res.innerHTML = result = math.format(math.pow(10, result), {
                    precision: 16
                });
                _this.register.ope = type;
                _this.isEqual = true;
                break;
            case '5':
                res.innerHTML = result = math.format(math.divide(1, result), {
                    precision: 16
                });
                _this.register.ope = type;
                _this.isEqual = true;
                break;
            case '6':
                res.innerHTML = result = math.format(math.sqrt(result), {
                    precision: 16
                });
                _this.register.ope = type;
                _this.isEqual = true;
                break;
            case '7':
                res.innerHTML = result = math.format(math.cbrt(result), {
                    precision: 16
                });
                _this.register.ope = type;
                _this.isEqual = true;
                break;
            case '8':
                _this.events = event;
                if (!event.classList.contains('active')) {
                    if (_this.register.ope === '8') {
                        if (_this.isEqual) {
                            _this.register.number = result;
                        } else {
                            _this.register.after = result;
                            _this.isEqual = true;
                        }

                        res.innerHTML = result = math.format(math.nthRoot(_this.register.number, _this.register.after), {
                            precision: 16
                        });

                    } else {
                        _this.removeActive();
                        event.classList.add('active');
                        _this.register.number = result;
                        _this.register.ope = type;
                    }
                }
                break;
            case '9':
                res.innerHTML = result = math.format(math.sin(result), {
                    precision: 16
                });
                _this.register.ope = type;
                _this.isEqual = true;
                break;
            case '10':
                res.innerHTML = result = math.format(math.cos(result), {
                    precision: 16
                });
                _this.register.ope = type;
                _this.isEqual = true;
                break;
            case '11':
                res.innerHTML = result = math.format(math.tan(result), {
                    precision: 16
                });
                _this.register.ope = type;
                _this.isEqual = true;
                break;
            case '12':
                res.innerHTML = result = Math.E;
                _this.register.ope = type;
                _this.isEqual = true;
                break;
            case '13':
                res.innerHTML = result = math.format(math.sinh(result), {
                    precision: 16
                });
                _this.register.ope = type;
                _this.isEqual = true;
                break;
            case '14':
                res.innerHTML = result = math.format(math.cosh(result), {
                    precision: 16
                });
                _this.register.ope = type;
                _this.isEqual = true;
                break;
            case '15':
                res.innerHTML = result = math.format(math.tanh(result), {
                    precision: 16
                });
                _this.register.ope = type;
                _this.isEqual = true;
                break;
            case '16':
                res.innerHTML = result = Math.PI;
                _this.register.ope = type;
                _this.isEqual = true;
                break;
            case '17':
                if (result.indexOf('.') > -1 || result.indexOf('-') > -1) {
                    _this.reset();
                    res.innerHTML = 'error';
                } else {
                    res.innerHTML = result = math.factorial(result);
                    _this.register.ope = type;
                    _this.isEqual = true;
                }
                break;
            case '18':
                res.innerHTML = result = math.format(math.log(result), {
                    precision: 16
                });
                _this.register.ope = type;
                _this.isEqual = true;
                break;
            case '19':
                res.innerHTML = result = math.format(math.log10(result), {
                    precision: 16
                });
                _this.register.ope = type;
                _this.isEqual = true;
                break;
            case '20':
                res.innerHTML = result = math.format(math.exp(result), {
                    precision: 16
                });
                _this.register.ope = type;
                _this.isEqual = true;
                break;
            default:
                break;
        }
    },

    /**
     * 检测数字为负数则加上括号后返回去计算
     * @param {*} num 
     */
    checkIsMinus(num) {
        return num.toString().indexOf('-') > -1 ? '(' + num + ')' : num;
    },
    /**
     * 移除 active 类
     */
    removeActive() {
        const _act = document.querySelector('.active');
        _act && _act.classList.remove('active');
    }
}

ipcRenderer.on('change_event', (event, arg) => {
    const box = document.querySelector('.wrapper');
    if (arg === 'horizontal') {
        box.classList.add('horizontal');
        max_length = 16;
    } else {
        box.classList.remove('horizontal');
        max_length = 9;
    }
    main.reset();
})