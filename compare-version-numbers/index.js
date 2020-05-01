const tape = require('tape');

const compareVersions = (aString, bString) => {
    let a = aString.split('.').map(x => Number.parseInt(x));
    let b = bString.split('.').map(x => Number.parseInt(x));

    let maxVersionStringLength = Math.max(a.length, b.length);

    for (let i = 0; i <= maxVersionStringLength; i++) {
        let aValue = a[i] || 0;
        let bValue = b[i] || 0;

        if (aValue > bValue) {
            return 1;
        } else if (aValue < bValue) {
            return -1;
        }
    }

    // versions are identical
    return 0;
};

tape('compare version numbers', function (t) {
    t.plan(4);

    t.equal(compareVersions('1.0.33', '1.0.27'), 1);

    t.equal(compareVersions('0.1', '1.1'), -1);

    t.equal(compareVersions('1.01', '1.001'), 0);

    t.equal(compareVersions('1.0.0', '1.0'), 0);
});