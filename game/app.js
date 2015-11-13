(function() {
    var lib = ktsgLib;
    var fbPath = lib.getFBPath();
    var fb = new Firebase("http://ktsg.firebaseio.com/");
    var gamePath = fb.child(fbPath);
    var colourID;
    var play = function() {
        var cachedPath = {};
        console.log(colourID);
        gamePath.on("value", function(_pathVal) {
            $('#enterTextHere').off("keydown");
            var pathVal = _pathVal.val();
            var users = (pathVal.users ? pathVal.users : {});
            var usersArray = lib.createValuesArray(users);
            //reload colourID
            if(usersArray.indexOf(fb.getAuth().uid) != -1) {
                colourID = usersArray.indexOf(fb.getAuth().uid);
                var colour = lib.getWordClass(colourID);
                $('#youAre').text("You are " + lib.colours[colourID] + ".").attr("class", colour);
            } else {
                location.reload();
            }
            var numUsers = usersArray.length;
            console.log(pathVal.turn);
            if(pathVal.turn == colourID) {
                lib.focusTextfield();
                console.log("YOUR TURN");
                $('#itIs').text("It is your turn.");
                //SUBMITTING STUFF.
                var tfeCallback = function() {
                    gamePath.child("words").push({
                        colourID: colourID,
                        content: $.trim($('#enterTextHere').val())
                    }, function() {
                        if(numUsers <= pathVal.turn + 1) {
                            gamePath.child("turn").set(0);
                        } else {
                            gamePath.child("turn").set(pathVal.turn + 1);
                        }
                    });
                };
                $('#enterTextHere').keydown(function(e) {
                    if(e.keyCode == 13 && $.trim($(this).val()) != "") {
                        $('#enterTextHere').off("keydown");
                        e.preventDefault();
                        lib.textfieldEnterHandler(tfeCallback);
                    } else if(e.keyCode == 32) {
                        e.preventDefault();
                    } else if($(this).val().includes(" ")) {
                        $(this).val($(this).val().split(" ").join(""))
                    }
                });
            } else {
                lib.disableTextfield();
                $('#itIs').html("It is <span class='" + lib.getWordClass(pathVal.turn) + "'>" + lib.colours[pathVal.turn] + "</span>'s turn.");
            }
            if(pathVal.words != cachedPath.words) {
                $('#content').html(lib.render(lib.createValuesArray(pathVal.words)));
            }
            //SET CACHE
            cachedPath = pathVal;
        });
    };
    var create = function() {
        var path = {
            turn: 0,
        };
        gamePath.set(path, function() {
            colourID = 0;
            play();
        });
    };
    var intro;
    intro = function() {
        gamePath.once("value", function(_initialData) { //initial snapshot
            var initialData = _initialData.val();
            if(!initialData) {
                create(); //create new game
            } else {
                var users = (initialData.users ? initialData.users : {}); //users directory
                var usersArray = lib.createValuesArray(users); //flatten
                if(usersArray.indexOf(fb.getAuth().uid) != -1) { //find UID in users
                    colourID = usersArray.indexOf(fb.getAuth().uid); //get colourID
                    play();
                } else {
                    gamePath.child("users").push(fb.getAuth().uid, function() {
                        intro(); //add and reload
                    }).onDisconnect().remove(); //remove on kill
                }
            }
        });
    };
    if(!fb.getAuth()) {
        fb.authAnonymously(function(error, authData) {
            if(!error) intro();
            if(error) console.log(error);
        });
    } else {
        intro();
    }
})();