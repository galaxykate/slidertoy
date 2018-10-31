/**
 * @author Kate
 */

console.log(Gringo);
console.log(Clasp);

function parseFact(fact) {
    let i = fact.indexOf("(");

    let params = fact.substring(i + 1, fact.length - 1).split(",")
    let key = fact.substring(0, i)
    let not = false
    if (key.charAt(0) === "-") {
        not = true
        key = key.substring(1)
        console.log("NOT", key)
    }


    return {
        raw: fact,
        params: params,
        key: fact.substring(0, i),
        not: not
    }
}

function groundAndSolve(rules, facts, callback) {



    let code = "%rules\n" + rules + "\n\n%facts\n" + facts.map(f => f + ".").join("\n");

    console.log(code)
    var width = 10;
    var grounderArgs = ["-c", "width=" + width];
    var solverArgs = ["--sign-def=3", "--heu=vsids", "--seed=" + (2 << 30 * Math.random() | 0)];

    console.log("grounding...");
    Gringo.groundAsync([code, grounderArgs], function(program) {
        console.log("solving...");
        Clasp.solveAsync([program, solverArgs], function(result) {
            console.log("done");
            // button.property("disabled", false);
            if (result.Witnesses) {
                // Ignore all previous facts
                let newFactSets = result.Witnesses.map((soln) => {
                    return soln.Value.filter(f => facts.indexOf(f) < 0)
                })

                let processedSets = newFactSets.map(set => {
                    return set.map(fact => parseFact(fact))
                })
                callback(processedSets);


            } else {
                console.warn("no solutions");
            }
        });
    });
};