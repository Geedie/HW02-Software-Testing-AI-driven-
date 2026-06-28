const fs = require("fs");
const path = require("path");

const REPOSITORY_PATH = path.join(
    __dirname,
    "../test/repository/all-testcases.json"
);

const PREFIX = {
    FR01: "TC-REG-",
    FR08: "TC-CHECKOUT-",
    FR10: "TC-OSM-",
    FR16: "TC-IMPORT-",
};

function loadFeature(featureId) {

    if (!fs.existsSync(REPOSITORY_PATH)) {
        throw new Error(`Cannot find ${REPOSITORY_PATH}`);
    }

    const repository = JSON.parse(
        fs.readFileSync(REPOSITORY_PATH, "utf8")
    );

    const prefix = PREFIX[featureId];

    if (!prefix) {
        throw new Error(`Unknown Feature ${featureId}`);
    }

    const cases = repository.filter(tc =>
        tc.id.startsWith(prefix)
    );

    console.log(
        `[Loader] ${featureId} -> ${cases.length} testcase(s)`
    );

    return cases;
}

module.exports = loadFeature;