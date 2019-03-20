/*!
 * pagarme-bifrost-js v0.2.1
 * (c) Heitor Ramon Ribeiro <heitor.ramon@gmail.com>
 * Released under the MIT License.
 */
define(function(){"use strict";function e(t){return(e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(t)}function t(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function r(e,t,r){return t&&n(e.prototype,t),r&&n(e,r),e}function i(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var o="%c Pagar.Me Bifrost ",s="background:#f26722 ; padding: 2px; border-radius: 2px;  color: #fff ";function u(e,t){if(void 0===t)throw new Error("Parâmetro obrigatório ".concat(e," não declarado."));return t}function c(e){console.log(o,s,e)}function a(e){console.error(o,s,e)}function d(e,t){var n;return(n=e.split("")).concat.apply(n,i(Array(t).fill(" "))).slice(0,t).join("")}function f(e,t){var n=e();return n&&n.then?n.then(t):t(n)}function l(e,t,n){return n?t?t(e):e:(e&&e.then||(e=Promise.resolve(e)),t?e.then(t):e)}function h(e){return function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];try{return Promise.resolve(e.apply(this,t))}catch(e){return Promise.reject(e)}}}function m(e,t){try{var n=e()}catch(e){return t(!0,e)}return n&&n.then?n.then(t.bind(null,!1),t.bind(null,!0)):t(!1,value)}function p(e,t){if(e)throw t;return t}function y(e,t){try{var n=e()}catch(e){return t(e)}return n&&n.then?n.then(void 0,t):n}function v(e,t,n){if(n)return t?t(e()):e();try{var r=Promise.resolve(e());return t?r.then(t):r}catch(e){return Promise.reject(e)}}function g(){}var _={request:{listDevices:1,initialize:2,process:4,finish:5,displayMessage:6,status:7,closeContext:8},response:{unknownCommand:0,devicesListed:1,initialized:2,alreadyInitialized:3,processed:4,finished:5,messageDisplayed:6,status:7,contextClosed:8,error:9},paymentMethods:{credit:1,debit:2},errorStrings:{errorContextString:"Device already in use by context ",errorInitialize:"An error has occured with the [Initialize] request. See the log and contact the support.",errorOperationErrored:"Transaction Errored",errorOperationFailed:"Error: 43",errorOperationCanceled:"Transaction Canceled",catastroficError:"Error: 14"},ws:null,timeout:null,close:!0,timeoutConn:null};function P(e,t){return null===_.ws?_.ws=new WebSocket(e):2!==_.ws.readyState&&3!==_.ws.readyState||(b(),_.ws=new WebSocket(e)),new Promise(function(e,n){try{q();var r=function(){x(),_.ws.send(JSON.stringify(t)),q(6e4)};0===_.ws.readyState?_.ws.onopen=function(){r()}:1===_.ws.readyState&&r(),_.ws.onmessage=function(t){x(),e(JSON.parse(t.data))},_.ws.onerror=function(e){x(),e&&n(e)}}catch(e){n(e)}})}function b(){_.ws.close()}function x(){_.close=!1,clearTimeout(_.timeoutConn)}function q(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1e4;_.close=!0,_.timeoutConn=setTimeout(function(){_.close?_.ws.close():x()},e)}var w=function(){function n(e){var r=e.contextId,i=e.baudRate,o=e.debug,s=e.host;t(this,n),this.debug=o||!1,this.contextId=u("contextId",r),this.baudRate=i||115200,this._connected=!1,this.devices=[],this._host=s||"wss://localhost:2000/mpos",this._amount=0,this._method="",this.lastRequest=null}return r(n,[{key:"debugLog",value:function(e){this.debug&&c(e)}},{key:"classError",value:function(t){throw this.debugLog("object"===e(t)?t.text:t),new Error(t)}},{key:"defineRequest",value:function(e){void 0===e&&(this.lastRequest=null),null!==this.lastRequest&&this.classError("Não é possível fazer requisições asíncronas, termine uma ação antes de executar a outra."),"number"==typeof e&&(this.lastRequest=e)}},{key:"closePinPadContext",value:h(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:_this.contextId;return function(){var t=this;return m(function(){return y(function(){t.debugLog("Fechando contexto do Serviço Bifrost."),t.defineRequest(_.request.closeContext);var n=P(t._host,{request_type:_.request.closeContext,context_id:e});return t._connected=!1,t.defineRequest(),Promise.resolve(n)},function(e){return t.defineRequest(),Promise.reject(e)})},function(e,t){return v(b,g,n);var n})}()})},{key:"getPinPadDevices",value:h(function(){var e=this;return y(function(){return e.debugLog("Buscando lista de dispositivos do sistema."),e.defineRequest(_.request.listDevices),l(P(e._host,{request_type:_.request.listDevices,context_id:e.contextId}),function(t){return e.debugLog(t),e.devices=t.device_list,e.defineRequest(),Promise.resolve(e.devices)})},function(t){return e.defineRequest(),Promise.reject(t)})})},{key:"initialize",value:h(function(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return m(function(){return y(function(){return t.debugLog("Conectando ao PinPad ".concat(t.devices[n].id,".")),t.defineRequest(_.request.initialize),l(P(t._host,{request_type:_.request.initialize,context_id:t.contextId,initialize:{device_id:t.devices[n].id,encryption_key:e.encryptionKey,baud_rate:t.baudRate,simple_initialize:e.simpleInitialize,timeout_milliseconds:e.timeoutMilliseconds}}),function(r){var i=!1;return f(function(){if(t.lastRequest===_.request.initialize)return t.defineRequest(),r.response_type===_.response.initialized?(t._connected=!0,i=!0,t.debugLog("PinPad ".concat(t.devices[n].id," inicializado com sucesso."))):f(function(){if(r.response_type===_.response.alreadyInitialized)return t.debugLog("Serviço Bifrost já inicializado, reiniciando a conexão."),l(t.closePinPadContext(r.context_id),function(){return l(t.initialize({encryptionKey:e.encryptionKey,baud_rate:t.baudRate,simpleInitialize:e.simpleInitialize,timeoutMilliseconds:e.timeoutMilliseconds},0),function(){return i=!0,!1})})},function(o){return i?o:f(function(){if(r.response_type===_.response.error&&_.errorStrings.errorInitialize){var o=n+1;return o>t.devices.length?v(b,function(){t.classError("Não foi possível inicial a conexão com nenhum dispositivo.")}):(t.debugLog("Dispositivo selecionado não é válido, inicializando novamente com próximo dispositivo da lista."),l(t.initialize({encryptionKey:e.encryptionKey,baud_rate:t.baudRate,simpleInitialize:e.simpleInitialize,timeoutMilliseconds:e.timeoutMilliseconds},o),function(){return i=!0,!1}))}},function(n){return r.error===_.errorStrings.catastroficError?(t.classError("Erro catastrófico no sistema. Por favor, reinicialize o PinPad e o Serviço do Bifrost"),b(),i=!0,!1):function(){if(r.error&&r.error.includes(_.errorStrings.errorContextString)){t.debugLog("Serviço Bifrost com contexto diferente do definido na classe.");var n=r.error.split(_.errorStrings.errorContextString)[1];return l(t.closePinPadContext(n),function(n){return f(function(){if(n)return function(e,t){if(!t)return e&&e.then?e.then(g):Promise.resolve()}(t.initialize({encryptionKey:e.encryptionKey,baud_rate:t.baudRate,simpleInitialize:e.simpleInitialize,timeoutMilliseconds:e.timeoutMilliseconds},0))},function(){return i=!0,!1})})}}()})})},function(e){return i?e:r})})},function(e){return Promise.reject(e)})},function(e,n){return t.defineRequest(),p(e,n)})})},{key:"getPinPanStatus",value:h(function(){var e=this;return m(function(){return y(function(){return e.debugLog("Buscando status do serviço Bifrost."),e.defineRequest(_.request.status),l(P(e._host,{request_type:_.request.status,context_id:e.contextId}),function(e){return c(e),Promise.resolve({connected:!!e.status.code,contextId:e.context_id,connectedDeviceId:e.status.connected_device_id})})},function(e){return Promise.reject(e)})},function(t,n){return e.defineRequest(),p(t,n)})})},{key:"displayMessageOnPinPadScreen",value:h(function(e){var t=this;return m(function(){return y(function(){return t.debugLog('Mostrando "'.concat(e,'" no display do PinPad.')),t.defineRequest(_.request.displayMessage),l(P(t._host,{request_type:_.request.displayMessage,context_id:t.contextId,display_message:{message:e}}),function(e){return Promise.resolve(e)})},function(e){return Promise.reject(e)})},function(e,n){return t.defineRequest(),p(e,n)})})},{key:"startPayment",value:function(e){try{this.amount=e.amount,this.method=e.method||_.paymentMethods.credit}catch(e){throw new Error(e)}}},{key:"startPaymentProcess",value:h(function(){var e=this;return m(function(){return y(function(){return e.debugLog("Iniciando processo de pagamento. Venda via ".concat(e.method,", valor ").concat(e.amount/100)),e.defineRequest(_.request.process),l(P(e._host,{request_type:_.request.process,context_id:e.contextId,process:{amount:e.amount,magstripe_payment_method:e.method}}),function(t){if(e.lastRequest===_.request.process){if(t.error===_.errorStrings.errorOperationCanceled){var n={text:"Operação cancelada pelo usuário.",type:"cardCanceled"};return e.debugLog(n.text),Promise.reject(n)}if(t.error===_.errorStrings.errorOperationErrored||t.error===_.errorStrings.errorOperationFailed){var r={text:"Aconteceu algum erro na operação, tente novamente.",type:"operationError"};return e.debugLog(r.text),Promise.reject(r)}if(t.response_type===_.response.processed)return Promise.resolve(t.process)}})},function(e){return Promise.reject(e)})},function(t,n){return e.defineRequest(),p(t,n)})})},{key:"finishPaymentProcess",value:h(function(e,t){var n=this;return m(function(){return y(function(){return n.debugLog("Finalizando a venda via ".concat(n.method)),n.defineRequest(_.request.finish),l(P(n._host,{request_type:_.request.finish,context_id:n.contextId,finish:{success:!(!e||!t),response_code:e||"0000",emv_data:t||"000000000.0000"}}))},function(e){return Promise.reject(e)})},function(e,t){return n.defineRequest(),p(e,t)})})},{key:"amount",get:function(){return this._amount},set:function(e){if("number"==typeof e&&e<=0)throw new Error("Não é possível definir um valor menor ou igual a zero.");this._amount=100*parseFloat(e)}},{key:"connected",get:function(){return this._connected}},{key:"method",get:function(){return this._method},set:function(e){if("string"==typeof e)Object.keys(_.paymentMethods).includes(e)&&(this._method=e);else{if("number"!=typeof e)throw new Error("Método de pagamento não permitido.");_.paymentMethods.find(function(t){return t===e})&&(this._method=Object.keys(_.paymentMethods).find(function(t){return _.paymentMethods[t]===e}))}}}]),n}();function z(e,t){if(!t)return e&&e.then?e.then(S):Promise.resolve()}function S(){}function R(e){return function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];try{return Promise.resolve(e.apply(this,t))}catch(e){return Promise.reject(e)}}}function I(e,t){try{var n=e()}catch(e){return t(e)}return n&&n.then?n.then(void 0,t):n}function M(e,t,n){return n?t?t(e):e:(e&&e.then||(e=Promise.resolve(e)),t?e.then(t):e)}function k(){throw new Error("PinPad não foi inicializado. Por favor, inicie o PinPad antes de executar outro comando.")}return function(){function e(n){t(this,e);try{this.baudRate=n.baudRate||115200,this.contextId=u("contextId",n.contextId),this.encryptionKey=u("encryptionKey",n.encryptionKey),this.pinPadMaxCharLine=n.pinPadMaxCharLine||16,this.pinPadMaxChar=n.pinPadMaxChar||32,this.pinPanDisplayLines=n.pinPanDisplayLines||2;var r={debug:n.debug||!1,contextId:this.contextId,host:n.host||"wss://localhost:2000/mpos"};this.__bifrost__=new w(r)}catch(e){a(e)}}return r(e,[{key:"initialize",value:R(function(){var e=this;return I(function(){return M(e.__bifrost__.getPinPadDevices(),function(){return M(e.__bifrost__.initialize({encryptionKey:e.encryptionKey}),function(){return Promise.resolve(!0)})})},function(e){return Promise.reject(e)})})},{key:"terminate",value:R(function(){var e=this;return I(function(){return e.connected||k(),M(e.__bifrost__.closePinPadContext(),function(){return Promise.resolve(!0)})},function(e){return Promise.reject(e)})})},{key:"status",value:R(function(){try{return this.connected||k(),this.__bifrost__.getPinPanStatus()}catch(e){return Promise.reject(e)}})},{key:"showMessage",value:R(function(e){var t=this;return I(function(){t.connected||k();var n=t.pinPadMaxCharLine,r=t.pinPadMaxChar,i="";return Array.isArray(e)&&(i=e.slice(0,t.pinPanDisplayLines).map(function(e){return d(e,n)}).join("")),"string"==typeof e&&(i=d(e,r)),M(t.__bifrost__.displayMessageOnPinPadScreen(i),function(){return Promise.resolve(i)})},function(e){return Promise.reject(e)})})},{key:"payment",value:R(function(e,t){var n=this;return I(function(){return n.connected||k(),n.__bifrost__.startPayment({amount:e,method:t}),M(n.__bifrost__.startPaymentProcess(),function(e){return Promise.resolve(e)})},function(e){return a(e),M(n.showMessage(e.text),function(){return setTimeout(R(function(){return M(n.finish(),function(){return M(n.terminate(),function(){setTimeout(R(function(){return z(n.initialize())}),2e3)})})}),2e3),Promise.reject(e)})})})},{key:"finish",value:R(function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return I(function(){e.connected||k();var n=t.code||"",r=t.emvData||"",i=t.timeout||2e3,o=t.messages||null;return M(e.__bifrost__.finishPaymentProcess(n,r),function(t){return Array.isArray(o)&&o.forEach(function(t,n){setTimeout(R(function(){return z(e.showMessage(t))}),i*(n+1))}),"string"==typeof o&&setTimeout(R(function(){return z(e.showMessage(o))}),i),Promise.resolve(t)})},function(e){return Promise.reject(e)})})},{key:"connected",get:function(){return this.__bifrost__.connected}}]),e}()});
//# sourceMappingURL=index.amd.js.map
