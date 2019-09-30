const tape = require('tape');

function reverseWords(string) {
    return string.split(' ')
        .map(word => word.split('').reverse().join(''))
        .join(' ');
}


tape('reverseWords', function (t) {
    t.plan(1);

    t.equal(reverseWords("The cat in the hat"), "ehT tac ni eht tah");
});