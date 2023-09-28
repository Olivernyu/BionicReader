chrome.commands.onCommand.addListener(function(command) {
    if (command === "convert_to_bionic") {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.scripting.executeScript({
                target: {tabId: tabs[0].id},
                func: convertToBionicPage
            });
        });
    }
});

function convertToBionicPage() {
    function convertToBionic(text) {
        if (typeof text == "string") {
            let words = text.split(' ');
            let bionicWords = words.map(word => {
                if (!word.trim().length) {
                    return word;
                }
                let lettersToBold = Math.max(1, Math.ceil(word.length / 3));
                let boldedPart = `<b>${word.substring(0, lettersToBold)}</b>`;
                let restOfWord = word.substring(lettersToBold);
                return boldedPart + restOfWord;
            });
            return bionicWords.join(' ');
        } else {
            return text;
        }
    }

    function processNode(node) {
        if (node.nodeType === 3) {  // Text node
            let bionicText = convertToBionic(node.nodeValue);
            let newElement = document.createElement('span');
            newElement.innerHTML = bionicText;
            node.replaceWith(newElement);
        } else {
            for (var i = 0; i < node.childNodes.length; i++) {
                processNode(node.childNodes[i]);
            }
        }
    }

    processNode(document.body);
}