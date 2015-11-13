(function() {
    var enterGameCode = $('#enterGameCode');
    enterGameCode.keydown(function(e) {
        if(e.keyCode == 13) {
            e.preventDefault();
            var content = enterGameCode.val();
            location.assign("/game#" + content);
        }
    });
})();