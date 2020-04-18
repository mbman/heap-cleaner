import {GraphManager} from "./graph-manager";
import {readFileSync, writeFileSync} from 'fs';


// focusOnNode (by id)
const run = async () => {
    console.log('reading file - start!');
     const jsonData = await readFileSync('./sample/leak_33937_7599.heapsnapshot', 'utf-8');
    //const jsonData = await readFileSync('./sample/original_leak_heapsnapshot_12297_4321.heapsnapshot', 'utf-8');
   // const jsonData = await readFileSync('./output.heapsnapshot', 'utf-8');
    console.log('reading file - end!');

    const graphManager = new GraphManager(JSON.parse(jsonData));
    graphManager.deleteNodesWithName('getActiveSandbox', 'shouldApplyPatch', 'createProxyInternal', 'createProxy');
  //  graphManager.deleteNodesWithName('system');
    //graphManager.focusOnNode(
    // 61543, 37875);
    graphManager.focusOnNode(33937, 7599);
    //graphManager.focusOnNode(12297, 4321);
    const jsonOutput = graphManager.exportGraphToJson();
    await writeFileSync('./output.heapsnapshot', jsonOutput, {encoding: 'utf-8'});
    console.log("See output in output.heapsnapshot");
};


// noinspection JSUnusedLocalSymbols
const compare = async () => {
    const origJson = JSON.parse(await readFileSync('./sample/sample_heap_dump.heapsnapshot', 'utf-8'));
    const outputJson = JSON.parse(await readFileSync('./output.heapsnapshot', 'utf-8'));
    const traverse = origJson.edges;
    for (let i = 0; i < traverse.length; i++) {
       if (traverse[i] != outputJson.edges[i]) {
           debugger;
       }
    }

}

run().then();



