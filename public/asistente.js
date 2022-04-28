
      if (annyang) {
      
        annyang.setLanguage("es-MX");

        var voices;

        var utter = new SpeechSynthesisUtterance();
        utter.rate = 1;
        utter.pitch = 1;
        utter.lang = 'es-MX';

        //carga de voz del asistente
        window.speechSynthesis.onvoiceschanged = function(){
          voices = window.speechSynthesis.getVoices();
          console.log(voices);
        };

        registro.

        annyang.addCallback('result', function(phrases){
          console.log("creo que dijiste: ", phrases[0]);
          console.log("But then again , it could be any of the following: ", phrases);
        });
      
        // Let's define our first command. First the text we expect, and then the function it should call
        var commands = {
          'ayuda asistente': function() {
            utter.text = 'En esta seccion se muestran las categorías de los diferentes eventos a elegir';
            utter.voice = voices[1];
            window.speechSynthesis.speak(utter);
            console.log(utter);
          },

          'leer categorías': function() {
            utter.text = 'Con mucho gusto. bodas, luna de miel, despedidas, aniversario, primea comunion y bautizo, graduaciones, beibi chauwer, 15 años, y otros';
            utter.voice = voices[1];
            window.speechSynthesis.speak(utter);
            console.log(utter);
          },

          'iniciar sesión': function() {
            utter.text = 'introduce tu i-meil y tu contraseña, si olvidaste tu contraseña da click en, recuperar contraseña, si eres nuevo da click, en crear una cuenta ';
            utter.voice = voices[1];
            window.speechSynthesis.speak(utter);
            window.location.assign('login');
            console.log(utter);
          },

          'registrarse': function() {
            utter.text = 'registro, selecciona tu estatus, introduce tu i-meil y crea una contraseña';
            utter.voice = voices[1];
            window.speechSynthesis.speak(utter);
            window.location.assign('auth-register-v1');
            console.log(utter);
          },

          'abrir bodas': function() {
            utter.text = 'abriendo bodas';
            utter.voice = voices[1];
            window.speechSynthesis.speak(utter);
            window.location.assign('/subcategory-list/39c446a5-b517-4972-864b-6f193835e6fd');
            console.log(utter);
          },

          'abrir otros': function() {
            utter.text = 'abriendo otros, sus sub-categorías son: fotografía, y mobiliario... para acceder a algúna díga. abrír, mas el nombre de la subcategoría.';
            utter.voice = voices[1];
            window.speechSynthesis.speak(utter);
            window.location.assign('/subcategory-list/fd4d2bac-802e-484b-8032-aaea9acc1f2b');
            console.log(utter);
          },

          'abrir fotografia': function(){
            utter.text = 'abriendo fotografía';
            utter.voice = voices[1];
            window.speechSynthesis.speak(utter);
            window.location.assign('/provider-list/fd4d2bac-802e-484b-8032-aaea9acc1f2b/a6550da3-e693-44f5-8fa0-225654642aae');
            console.log(utter);
          },

          'abrir mobiliario': function(){
            utter.text = 'abriendo mobiliario';
            utter.voice = voices[1];
            window.speechSynthesis.speak(utter);
            window.location.assign('/provider-list/fd4d2bac-802e-484b-8032-aaea9acc1f2b/9ecd0984-d3e3-4eac-b427-50f4226ebf26');
            console.log(utter);
          },

          'regresar a categorías': function() {
            utter.text = 'regresando a categorías';
            utter.voice = voices[1];
            window.speechSynthesis.speak(utter);
            window.location.assign('/categories-list');
            console.log(utter);
          },

          'registrar usuario':function registrar(funcion){
            utter.text = 'registrando usuario';
            utter.voice = voices[1];
            window.speechSynthesis.speak(utter);
            window.location.assign('/categories-list');
            console.log(utter);
          }

        }
      
        // Add our commands to annyang
        annyang.addCommands(commands);
      
        // Start listening. You can call this here, or attach this call to an event, button, etc.
        annyang.start({autoRestart: true, continuous: true});
      }