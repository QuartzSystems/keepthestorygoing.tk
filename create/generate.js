(function() {
    var chain = new Foswig(2); //Create Markov Chain
    var dictionary = {
        "encyclopedia": 0,
        "deadly": 0,
        "foolish": 0,
        "kimjong": 0,
        "dongerish": 0,
        "swaggy": 0,
        "weird": 0,
        "orange": 0,
        "psychologist": 0,
        "doctor": 0,
        "pediatrician": 0,
        "printed": 0,
        "green": 0,
        "pink": 0,
        "haxord": 0,
        "bing": 0,
        "bastard": 0,
        "bastardly": 0,
        "spooky":0,
        "doot":0,
        "mr":0,
        "skype":0,
        "chrome":0,
        "percent":0,
        "percent":0,
        "thirty":0,
        "pedo":0,
        "bear":0,
        "swiggity":0,
        "swoogity":0,
        "1":0,
        "2":0,
        "3":0,
        "4":0
    }; //Register dictionary
    chain.addWordsToChain(Object.keys(dictionary));
    var capitaliseFirstLetter = function(word) { //for camelCase purposes
        var wordSplit = word.split("");
        wordSplit[0] = wordSplit[0].toUpperCase();
        return wordSplit.join("");
    };
    var getWord = function() {
        return chain.generateWord(3, 7, true); //Generate word with min. len of 3 and max. len of 7 which can be a word.
    };
    var getWords = function(number) {
        if(number <= 0) { //Whoops
            return "";
        } else if(number == 1) {
            return getWord();
        } else {
            var str = ""; //to be returned
            for(var i = 0; i <= number; i++) { //loop through the #
                if(i == 0) {
                    str += getWord(); //camel
                } else {
                    str += capitaliseFirstLetter(getWord()); //Case
                }
            }
            return str;
        }
    };
    location.assign("/game#" + getWords(Math.random() * (4 - 1) + 1)); //redirect to generated game.
})();