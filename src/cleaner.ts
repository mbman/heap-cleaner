import {GraphManager} from "./graph-manager";
import {readFileSync, writeFileSync} from 'fs';

const run = async () => {
    const jsonData = await readFileSync('./sample/sample_heap_dump.json', 'utf-8');
    const graphManager = new GraphManager(JSON.parse(jsonData));
    const jsonOutput = graphManager.exportGraphToJson();
    await writeFileSync('./output.heapsnapshot', jsonOutput, {encoding: 'utf-8'})
    console.log("See output in output.heapsnapshot");
}
run().then();


