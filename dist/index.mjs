/*!
 * pagarme-bifrost-js v0.1.5
 * (c) Heitor Ramon Ribeiro <heitor.ramon@gmail.com>
 * Released under the MIT License.
 */
import e from"websocket-as-promised";function t(e){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function i(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e}function o(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var s="%c Pagar.Me Bifrost ",u="background:#f26722 ; padding: 2px; border-radius: 2px;  color: #fff ";function c(e,t){if(void 0===t)throw new Error("Parâmetro obrigatório ".concat(e," não declarado."));return t}function a(e){console.log(s,u,e)}function d(e){console.error(s,u,e)}function f(e,t){var n;return(n=e.split("")).concat.apply(n,o(Array(t).fill(" "))).slice(0,t).join("")}function l(e,t){var n=e();return n&&n.then?n.then(t):t(n)}function _(e,t){if(!t)return e&&e.then?e.then(h):Promise.resolve()}function h(){}function p(e){return function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];try{return Promise.resolve(e.apply(this,t))}catch(e){return Promise.reject(e)}}}function m(e,t){try{var n=e()}catch(e){return t(e)}return n&&n.then?n.then(void 0,t):n}function y(e,t,n){return n?t?t(e):e:(e&&e.then||(e=Promise.resolve(e)),t?e.then(t):e)}var v=function(){function r(t){var i=t.contextId,o=t.baudRate,s=t.debug,u=t.host;n(this,r),this.debug=s||!1,this.contextId=c("contextId",i),this.baudRate=o||115200,this._connected=!1,this.devices=[],this._host=u||"wss://localhost:2000/mpos",this.ws=new e(this._host,{packMessage:function(e){return JSON.stringify(e)},unpackMessage:function(e){return JSON.parse(e)},attachRequestId:function(e,t){return Object.assign({request_type:t},e)},extractRequestId:function(e){return e&&e.response_type}}),this._amount=0,this._method="",this._wsConnected=!1,this.lastRequest=null,this.__response={unknownCommand:0,devicesListed:1,initialized:2,alreadyInitialized:3,processed:4,finished:5,messageDisplayed:6,status:7,contextClosed:8,error:9},this.__request={listDevices:1,initialize:2,process:4,finish:5,displayMessage:6,status:7,closeContext:8},this.__errorContextString="Device already in use by context ",this.__errorInitialize="An error has occured with the [Initialize] request. See the log and contact the support.",this.__errorOperationErrored="Transaction Errored",this.__errorOperationFailed="Error: 43",this.__errorOperationCanceled="Transaction Canceled",this.__catastroficError="Error: 14",this.__paymentMethods={credit:1,debit:2}}return i(r,[{key:"debugLog",value:function(e){this.debug&&a(e)}},{key:"classError",value:function(e){throw this.debugLog("object"===t(e)?e.text:e),new Error(e)}},{key:"defineRequest",value:function(e){void 0===e&&(this.lastRequest=null),null!==this.lastRequest&&this.classError("Não é possível fazer requisições asíncronas, termine uma ação antes de executar a outra."),"number"==typeof e&&(this.lastRequest=e)}},{key:"startWsConnection",value:p(function(){var e=this;return m(function(){return e.debugLog("Abrindo conexão com o WebSocket."),y(e.ws.open(),function(){return e._wsConnected=!0,!0})},function(e){return d(e),!1})})},{key:"closeWsConnection",value:p(function(){var e=this;return function(e){if(e&&e.then)return e.then(h)}(m(function(){return e.debugLog("Fechando conexão com o WebSocket."),y(e.ws.close(),function(){e._wsConnected=!1})},function(e){d(e)}))})},{key:"closePinPadContext",value:p(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:_this3.contextId;return function(){var t=this;return m(function(){return t.debugLog("Fechando contexto do Serviço Bifrost."),t.defineRequest(t.__request.closeContext),y(t.ws.sendRequest({request_type:t.__request.closeContext,context_id:e},{requestId:t.__request.closeContext}),function(e){return t._connected=!1,t.defineRequest(),Promise.resolve(e)})},function(e){return t.defineRequest(),y(t.closeWsConnection(),function(){return Promise.reject(e)})})}()})},{key:"getPinPadDevices",value:p(function(){var e=this;return m(function(){return e.debugLog("Buscando lista de dispositivos do sistema."),e.defineRequest(e.__request.listDevices),y(e.ws.sendRequest({request_type:e.__request.listDevices,context_id:e.contextId},{requestId:e.__request.listDevices}),function(t){return e.debugLog(t),e.devices=t.device_list,e.defineRequest(),Promise.resolve(e.devices)})},function(t){return e.defineRequest(),Promise.reject(t)})})},{key:"initialize",value:p(function(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return m(function(){return l(function(){if(!t._wsConnected)return _(t.startWsConnection())},function(){return t.debugLog("Conectando ao PinPad ".concat(t.devices[n].id,".")),t.defineRequest(t.__request.initialize),t.ws.sendPacked({request_type:t.__request.initialize,context_id:t.contextId,initialize:{device_id:t.devices[n].id,encryption_key:e.encryptionKey,baud_rate:t.baudRate,simple_initialize:e.simpleInitialize,timeout_milliseconds:e.timeoutMilliseconds}}),t.ws.onMessage.addListener(p(function(r){var i=!1;return l(function(){if(t.lastRequest===t.__request.initialize){t.defineRequest();var o=JSON.parse(r);return o.response_type===t.__response.initialized?(t._connected=!0,t.ws.removeAllListeners(),i=!0,t.debugLog("PinPad ".concat(t.devices[n].id," inicializado com sucesso."))):l(function(){if(o.response_type===t.__response.alreadyInitialized)return t.debugLog("Serviço Bifrost já inicializado, reiniciando a conexão."),t.ws.removeAllListeners(),y(t.closePinPadContext(o.context_id),function(){return y(t.initialize({encryptionKey:e.encryptionKey,baud_rate:t.baudRate,simpleInitialize:e.simpleInitialize,timeoutMilliseconds:e.timeoutMilliseconds},0),function(){return i=!0,!1})})},function(r){return i?r:l(function(){if(o.response_type===t.__response.error&&t.__errorInitialize){var r=n+1;return r>t.devices.length?y(t.closeWsConnection(),function(){t.classError("Não foi possível inicial a conexão com nenhum dispositivo.")}):(t.debugLog("Dispositivo selecionado não é válido, inicializando novamente com próximo dispositivo da lista."),t.ws.removeAllListeners(),y(t.initialize({encryptionKey:e.encryptionKey,baud_rate:t.baudRate,simpleInitialize:e.simpleInitialize,timeoutMilliseconds:e.timeoutMilliseconds},r),function(){return i=!0,!1}))}},function(n){return o.error===t.__catastroficError?(t.classError("Erro catastrófico no sistema. Por favor, reinicialize o PinPad e o Serviço do Bifrost"),t.ws.removeAllListeners(),i=!0,!1):function(){if(o.error&&o.error.includes(t.__errorContextString)){t.debugLog("Serviço Bifrost com contexto diferente do definido na classe."),t.ws.removeAllListeners();var n=o.error.split(t.__errorContextString)[1];return y(t.closePinPadContext(n),function(n){return l(function(){if(n)return _(t.initialize({encryptionKey:e.encryptionKey,baud_rate:t.baudRate,simpleInitialize:e.simpleInitialize,timeoutMilliseconds:e.timeoutMilliseconds},0))},function(){return i=!0,!1})})}}()})})}},function(e){return i?e:r})})),!0})},function(e){return t.defineRequest(),Promise.reject(e)})})},{key:"getPinPanStatus",value:p(function(){var e=this;return m(function(){return e.debugLog("Buscando status do serviço Bifrost."),e.defineRequest(e.__request.status),y(e.ws.sendRequest({request_type:e.__request.status,context_id:e.contextId},{requestId:e.__response.status}),function(e){return a(e),Promise.resolve({connected:!!e.status.code,contextId:e.context_id,connectedDeviceId:e.status.connected_device_id})})},function(t){return e.defineRequest(),Promise.reject(t)})})},{key:"displayMessageOnPinPadScreen",value:p(function(e){var t=this;return m(function(){return t.debugLog('Mostrando "'.concat(e,'" no display do PinPad.')),t.defineRequest(t.__request.displayMessage),y(t.ws.sendRequest({request_type:t.__request.displayMessage,context_id:t.contextId,display_message:{message:e}},{requestId:t.__response.messageDisplayed}),function(e){return t.defineRequest(),Promise.resolve(e)})},function(e){return t.defineRequest(),Promise.reject(e)})})},{key:"startPayment",value:function(e){try{this.amount=e.amount,this.method=e.method||this.__paymentMethods.credit}catch(e){throw new Error(e)}}},{key:"startPaymentProcess",value:p(function(){var e=this;try{return new Promise(function(t,n){e.debugLog("Iniciando processo de pagamento. Venda via ".concat(e.method,", valor ").concat(e.amount/100)),e.defineRequest(e.__request.process),e.ws.sendPacked({request_type:e.__request.process,context_id:e.contextId,process:{amount:e.amount,magstripe_payment_method:e.method}}),e.ws.onMessage.addListener(p(function(r){if(e.lastRequest===e.__request.process){var i=JSON.parse(r);if(e.defineRequest(),i.error===e.__errorOperationCanceled){var o={text:"Operação cancelada pelo usuário.",type:"cardCanceled"};return e.debugLog(o.text),e.ws.removeAllListeners(),n(o)}if(i.error===e.__errorOperationErrored||i.error===e.__errorOperationFailed){var s={text:"Aconteceu algum erro na operação, tente novamente.",type:"operationError"};return e.debugLog(s.text),e.ws.removeAllListeners(),n(s)}if(i.response_type===e.__response.processed)return e.ws.removeAllListeners(),t(i.process)}return r}))})}catch(t){return e.defineRequest(),Promise.reject(t)}})},{key:"finishPaymentProcess",value:p(function(e,t){var n=this;return m(function(){return n.debugLog("Finalizando a venda via ".concat(n.method)),n.defineRequest(n.__request.finish),y(n.ws.sendRequest({request_type:n.__request.finish,context_id:n.contextId,finish:{success:!(!e||!t),response_code:e||"0000",emv_data:t||"000000000.0000"}},{requestId:n.__response.finished}),function(e){return n.defineRequest(),e})},function(e){return n.defineRequest(),Promise.reject(e)})})},{key:"amount",get:function(){return this._amount},set:function(e){if("number"==typeof e&&e<=0)throw new Error("Não é possível definir um valor menor ou igual a zero.");this._amount=100*parseFloat(e)}},{key:"connected",get:function(){return this._connected&&this._wsConnected}},{key:"method",get:function(){return this._method},set:function(e){var t=this;if("string"==typeof e)Object.keys(this.__paymentMethods).includes(e)&&(this._method=e);else{if("number"!=typeof e)throw new Error("Método de pagamento não permitido.");this.__paymentMethods.find(function(t){return t===e})&&(this._method=Object.keys(this.__paymentMethods).find(function(n){return t.__paymentMethods[n]===e}))}}}]),r}();function g(e,t){if(!t)return e&&e.then?e.then(P):Promise.resolve()}function P(){}function b(e){return function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];try{return Promise.resolve(e.apply(this,t))}catch(e){return Promise.reject(e)}}}function q(e,t){try{var n=e()}catch(e){return t(e)}return n&&n.then?n.then(void 0,t):n}function x(e,t,n){return n?t?t(e):e:(e&&e.then||(e=Promise.resolve(e)),t?e.then(t):e)}function w(){throw new Error("PinPad não foi inicializado. Por favor, inicie o PinPad antes de executar outro comando.")}export default(function(){function e(t){n(this,e);try{this.baudRate=t.baudRate||115200,this.contextId=c("contextId",t.contextId),this.encryptionKey=c("encryptionKey",t.encryptionKey),this.pinPadMaxCharLine=t.pinPadMaxCharLine||16,this.pinPadMaxChar=t.pinPadMaxChar||32,this.pinPanDisplayLines=t.pinPanDisplayLines||2;var r={debug:t.debug||!1,contextId:this.contextId,host:t.host||"wss://localhost:2000/mpos"};this.__bifrost__=new v(r)}catch(e){d(e)}}return i(e,[{key:"initialize",value:b(function(){var e=this;return q(function(){return x(e.__bifrost__.startWsConnection(),function(){return x(e.__bifrost__.getPinPadDevices(),function(){return x(e.__bifrost__.initialize({encryptionKey:e.encryptionKey}),function(){return Promise.resolve(!0)})})})},function(e){return Promise.reject(e)})})},{key:"terminate",value:b(function(){var e=this;return q(function(){return e.connected||w(),x(e.__bifrost__.closePinPadContext(),function(){return x(e.__bifrost__.closeWsConnection(),function(){return Promise.resolve(!0)})})},function(e){return Promise.reject(e)})})},{key:"status",value:b(function(){try{return this.connected||w(),this.__bifrost__.getPinPanStatus()}catch(e){return Promise.reject(e)}})},{key:"showMessage",value:b(function(e){var t=this;return q(function(){t.connected||w();var n=t.pinPadMaxCharLine,r=t.pinPadMaxChar,i="";return Array.isArray(e)&&(i=e.slice(0,t.pinPanDisplayLines).map(function(e){return f(e,n)}).join("")),"string"==typeof e&&(i=f(e,r)),x(t.__bifrost__.displayMessageOnPinPadScreen(i),function(){return Promise.resolve(i)})},function(e){return Promise.reject(e)})})},{key:"payment",value:b(function(e,t){var n=this;return q(function(){return n.connected||w(),n.__bifrost__.startPayment({amount:e,method:t}),x(n.__bifrost__.startPaymentProcess(),function(e){return Promise.resolve(e)})},function(e){return d(e),x(n.showMessage(e.text),function(){return setTimeout(b(function(){return x(n.finish(),function(){return x(n.terminate(),function(){setTimeout(b(function(){return g(n.initialize())}),2e3)})})}),2e3),Promise.reject(e)})})})},{key:"finish",value:b(function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return q(function(){e.connected||w();var n=t.code||"",r=t.emvData||"",i=t.timeout||2e3,o=t.messages||null;return x(e.__bifrost__.finishPaymentProcess(n,r),function(t){return Array.isArray(o)&&o.forEach(function(t,n){setTimeout(b(function(){return g(e.showMessage(t))}),i*(n+1))}),"string"==typeof o&&setTimeout(b(function(){return g(e.showMessage(o))}),i),Promise.resolve(t)})},function(e){return Promise.reject(e)})})},{key:"connected",get:function(){return this.__bifrost__.connected}}]),e}());
//# sourceMappingURL=index.mjs.map
