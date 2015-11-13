(function() {
    //=====>OUTERHTML=====
    jQuery.fn.outerHTML = function() {
        return jQuery('<div />').append(this.eq(0).clone()).html();
    };
    //======/OUTERHTML=====
    //
    //=====>LIBRARY=====
    var lib = {};
    lib = {
        colours: ["red", "orange", "blue", "green", "grey"],
        getWordClass: function(id) {
            var colours = lib.colours;
            return colours[id] + "Word";
        },
        createWordElement: function(colourID, content, isNew) {
            var innerText = $.trim(content);
            var getWordClass = lib.getWordClass
            var classAttribute = getWordClass(colourID) + " word" + (isNew ? " new" : "");
            var el = $('<span></span>').attr("class", classAttribute).text(innerText);
            return el.outerHTML();
        },
        render: function(data) {
            var createWordElement = lib.createWordElement;
            var toRender = "";
            var index = 0;
            for(var _item in data) {
                var item = data[_item];
                var colourID = item.colourID;
                var content = item.content;
                var isNew = index == Object.keys(data).length - 1;
                toRender += createWordElement(colourID, content, isNew);
                index++;
            }
            return toRender;
        },
        checkTurn: function(path, colourID) {
            var turn = path.turn;
            return turn == colourID;
        },
        focusTextfield: function() {
            $('#enterTextHere').removeAttr("disabled").trigger("focus");
        },
        disableTextfield: function() {
            $('#enterTextHere').val("").attr("disabled", "true");
        },
        textfieldEnterHandler: function(cb) {
            var data = $('#enterTextHere').val();
            var postWord = lib.postWord;
            $('#enterTextHere').addClass("animated bounce");
            setTimeout(function() {
                cb();
                $('#enterTextHere').val("");
            }, 300);
            $('#enterTextHere').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                $(this).removeClass("animated bounce");
            });
        },
        getFBPath: function() {
            return "data/game/" + location.hash.split("#")[1].toLowerCase();
        },
        createValuesArray: function(obj) {
            var array = $.map(obj, function(value, index) {
                return [value];
            });
            return array;
        }
    };
    //=====/LIBRARY=====
    window.ktsgLib = lib;
})();