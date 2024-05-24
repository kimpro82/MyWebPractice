/**
 * hello_world("console.log")
 * 2024.05.23
 *
 * Demonstrates dynamically calling a function by its name,
 * passing the name of the currently executing function as an argument.
 *
 * Note: Using the `new Function` constructor can pose security risks.
 *
 * @param funcName Name of the function to be called
 * @example
 *     helloWorld("console.log")
 *     // Output:
 *     // helloWorld
 */

function helloWorld(funcName: string): void {
    /**
     * Dynamically calls the given function using its name.
     * The name of the current executing function is passed as an argument.
     *
     * @param funcName Name of the function to be called
     */
    const currentFuncName = helloWorld.name;
    const func = new Function(`return ${funcName}`)();
    func(currentFuncName);
}

// Dynamically executes the console.log function
helloWorld("console.log");
