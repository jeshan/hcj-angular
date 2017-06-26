/* eslint-disable no-var */
var rimraf = require('rimraf');
var chalk = require('chalk');
var prompt = require('prompt');

var chalkSuccess = chalk.green;
var chalkWarn = chalk.red;

/* eslint-disable no-console */

console.log(chalkSuccess('Dependencies installed.'));

prompt.start();

console.log(chalkWarn('WARNING:  Preparing to delete local git repository...'));
prompt.get([{name: 'deleteGit', description: 'Delete the git repository?  [Y/n]'}], function(err, result) {
  var deleteGit = result.deleteGit.toUpperCase();

  if (err) {
    process.exit(1);
  }

  function updatePackage() {
    // remove all setup scripts from the 'tools' folder
    console.log(chalkSuccess('\nSetup complete! Cleaning up...\n'));
    rimraf('./tools/setup', error => {
      if (error) throw new Error(error);
    });
  }

  if (deleteGit.match(/^N.*/)) {
    updatePackage();
  } else {
    // remove the original git repository
    rimraf('.git', error => {
      if (error) throw new Error(error);
      console.log(chalkSuccess('Original Git repository removed.\n'));
      updatePackage();
    });
  }
});
