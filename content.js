// function convertToBionic(text) {
//     // Check if text is a string
//     if (typeof text == "string") {
//         // Split text into words
//         let words = text.split(' ');

//         // Process each word
//         let bionicWords = words.map(word => {
//             // Determine the number of letters to bold, at least one letter
//             if (!word.trim().length) {
//                 return word;
//             }
//             let lettersToBold = Math.max(1, Math.ceil(word.length / 3));

//             // Bold the first lettersToBold letters of the word
//             let boldedPart = `<b>${word.substring(0, lettersToBold)}</b>`;
//             let restOfWord = word.substring(lettersToBold);

//             // Combine the bolded part and the rest of the word
//             return boldedPart + restOfWord;
//         });

//         // Join the processed words back together into a single string
//         return bionicWords.join(' ');
//     } else {
//         // If text is not a string, return it unmodified
//         return text;
//     }
// }
  
// function processNode(node) {
// if (node.nodeType === 3) {  // Text node
//     node.nodeValue = convertToBionic(node.nodeValue);
// } else {
//     for (var i = 0; i < node.childNodes.length; i++) {
//     processNode(node.childNodes[i]);
//     }
// }
// }

// processNode(document.body);
  


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

convertToBionicPage();