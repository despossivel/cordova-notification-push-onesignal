/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};


//Adicione a index.js ou a primeira página que carrega com o seu aplicativo.
//Para o Intel XDK e, por favor, adicione isso ao seu app.js.

document.addEventListener('deviceready', function () {
  // Permitir depurar problemas.
 window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});

  
  var notificationOpenedCallback = function(jsonData) {
    console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
  };

  window.plugins.OneSignal
    .startInit("f4769638-0a19-4118-9df1-79c3b7e3e8b9")
    .handleNotificationOpened(notificationOpenedCallback)
    .endInit();
  
  // Ligue o SyncHashedEmail em qualquer lugar do seu aplicativo se você tiver o e-mail do usuário.
  // Isso melhora a eficácia do recurso de agendamento de notificações "Best-Time" da OneSignal.
  // window.plugins.OneSignal.syncHashedEmail(userEmail);
    
    
window.plugins.OneSignal.getIds(function(ids) {
  var notificationObj = { contents: {en: "message body"},
                          include_player_ids: [ids.userId]};
  window.plugins.OneSignal.postNotification(notificationObj,
    function(successResponse) {
      console.log("Notification Post Success:", successResponse);
    },
    function (failedResponse) {
      console.log("Notification Post Failed: ", failedResponse);
      alert("Notification Post Failed:\n" + JSON.stringify(failedResponse));
    }
  );
});
    
    
    
    
}, false);
