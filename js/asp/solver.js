/**
 * @author Kate
 */

console.log(Gringo);
console.log(Clasp);

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
                let newFactSets = result.Witnesses.map((soln) => {
                    return soln.Value.filter(f => facts.indexOf(f) < 0)
                })

                callback(newFactSets);


            } else {
                console.warn("no solutions");
            }
        });
    });
};