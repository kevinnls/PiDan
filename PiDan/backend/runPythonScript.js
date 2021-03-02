/* runPythonScript
 *
 * this module can ONLY:
 *	- run a python script in headless mode
 *	- log stdout and stderr to console
 *	- return true | false
 * this module cannot:
 *  - return output
 *  - return error
 *  - provide input to the script
 *
 * AUTHOR:
 * kevinnls <kevin.nl.samuel@gmail.com> :
 *  - https://github.com/kevinnls
 *  - https://twitter.com/kevinnlsamuel
 *
 * REVISED ON:
 * 19 February 2021
 *
 * licensed under WTFPL, but do let me know
 * if you see ways to improve. i am only learning
 *
 * LICENSE:
  DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
                    Version 2, December 2004

 Copyright (C) 2004 Sam Hocevar <sam@hocevar.net>

 Everyone is permitted to copy and distribute verbatim or modified
 copies of this license document, and changing it is allowed as long
 as the name is changed.

            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
   TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

  0. You just DO WHAT THE FUCK YOU WANT TO.
*/

const { spawn } = require("child_process");

class runPythonScript {
  constructor(pyArgs, jsonResponse) {
    try {
      if (typeof pyArgs === "string") {
        this.args = [pyArgs];
      } else if (Array.isArray(pyArgs)) {
        this.args = pyArgs;
      } else {
        throw "ARG_TypeMismatch";
        return;
      }
    } catch (err) {
      this.constructor.printError(err);
    }
    return this.run();
  }

  static printUsage() {
    console.log(`USAGE: ${runPythonScript.name}( pyArgs ); \
		\n\tpyArgs\t\t - "/path/to/file" OR ["array", "of, "args"]`);
  }
  static printError(err) {
    if (err === "ARG_TypeMismatch") {
      console.error(`ERR: arguments mismatched \n`);
      this.printUsage();
    }
  }

  run() {
    const pyChild = spawn("python", this.args);
    pyChild.stdout.on("data", (data) => {
      console.log(`py stdout: ${data}`);
    });
    pyChild.stderr.on("data", (data) => {
      console.log(`py stderr: ${data}`);
    });
    pyChild.on("close", (code) => {
      if (code === 0) return true;
      else return false;
    });
  }
}

module.exports = { runPythonScript };
