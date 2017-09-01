"use strict";
// The node builtin filesystem library.
var fs = require('fs');
var validator = require('validator')
var columnify = require('columnify')

var JSON_FILE = 'data.json'
// If data.json file doesn't exist, create an empty one
ensureFileExists();
// This is where our Address Book is stored.
var data = JSON.parse(fs.readFileSync(JSON_FILE));



//PART1: PARSING COMMAND LINE ARGUMENTS
//To access what was typed into the command line, use process.argv
// If no arguments are specified print help.
if (process.argv.length === 2 || process.argv === "help" || process.argv === "-h") {
  console.log("\n\tUsage: addressBook [options] [command]\n\n\n" +"\tOptions:\n" + "\t\t-h, --help   Show this help message and quit"+"\n\n\n\tCommands:\n" + "\t\tadd       Create Contact\n" + "\t\tdisplay   Display all contacts in directory\n" + "\t\tupdate    Update existing contact\n");
}

var argv = process.argv
//console.log(process.argv) //UNCOMMENT TO SEE WHAT PROCESS.ARGV IS BEFORE WE SPLICE
argv.splice(0,2); //remove 'node' and path from args, NOTE: splicing modifies process.argv, so you will not need to do this again!



//TODO: Implement parseCommand()
/**
* Using process.argv, find and return the command. The command will be the first argument the user types. The possible commands are add, update, display, delete, help
* $ node addressBook.js add Moose 123   ----> 'add'
* $ node addressBook.js                ----> ''
* @param  {}
* @return {[string]}     Return the command or "" if there was no command.
*/
function parseCommand() {
  // YOUR CODE HERE
  var args = process.argv

  if(args.length == 0){
      return ""
  } else{
      return args[0]
  }
}

//store the command and execute its corresponding function
var input = parseCommand()
switch(input){
    case "add":
        addContact();
        break;
    case "update":
        updateContact();
        break;
    case "delete":
        deleteContact()
        break;
    case "display":
        displayContacts();
        break;
    case "help":
        break
    default:
        console.log('No actions provided');
}



//----------------- PART 2 ---------------------//
//Implement displayContacts()
/**
* Display the contacts in the address book in the format "Name: ContactName  Phone Number: ContactNumber"
* If the contact does not have a phone number listed, you should display "Name: ContactName  Phone Number: -None-"
* $ node addressBook.js display   ----> Name: Ricky  Phone Number: 123
                                        Name: Moose  Phone Number: 456
                                        Name: Graham  Phone Number: -None-
* @param  {}
* @return {[string]}     Return the command or "" if there was no command.
*/


function displayContacts(){
    //YOUR CODE HERE

    // console.log(columnify(data)); //UNCOMMENT

    var output = columnify(data, {
        minWidth: 20,
        dataTransform: function(contactData) {
            // console.log(contact, typeof contact)
            if(parseInt(contactData)===-1){
                return '-None-'
            }
            return contactData
        },
        config: {
            name: {
                headingTransform: function(heading) {
                    return "CONTACT_NAME"
                }
            },
            number: {
                headingTransform: function(heading) {
                    return "PHONE_NUMBER"

                }
            }
        }
    })

    console.log(output);
}



//----------------- PART 3 ---------------------//
//TODO: Write a function to create a new contact
// Example: This is a function that is called to create a new contact.
// Calling `node add contactName contactNumber ` must call our function addContact.
// it should get the name and number of the Contact from process.argv
//You should only create a new contact if a name is provided
//if no number is provided, store -1 as their number
function addContact() {
  var args = process.argv.slice(1,process.argv.length)//getRemainingArgs()
  if(args){
      var name = args[0]
    //   var number = "abc123"
      var number = args[1] || "-1"
      if(name &&  validator.isAlpha(name) && validator.isNumeric(number)){

          data.push({
            name: name,
            number: parseInt(number)
          });
          console.log("Added contact named: "+ name + ", with id: " + data.length +", and number: " + number);
      } else {
          console.log('No contact name provided');
      }
  }

}


//----------------- PART 4 ---------------------//
//TODO: Write a function to update
// Example: This is a function that is called to create a new contact.
// Calling `node add contactName contactNumber ` must call our function addContact.
// it should get the name and number of the Contact from process.argv
//You should only create a new contact if a name is provided
//if no number is provided, store -1 as their number
function updateContact(){
    var args = process.argv.slice(1,process.argv.length)//getRemainingArgs()
    if(args){
        var contact = args[0]

      //   var number = "abc123"
        var number = args[1] || "-1"
        if(name &&  validator.isAlpha(name) && validator.isNumeric(number)){

            data.push({
              name: name,
              number: parseInt(number)
            });
            console.log("Added contact named: "+ name + ", with id: " + data.length +", and number: " + number);
        } else {
            console.log('No contact name provided');
        }
    }
}

function deleteContact(){
    return
}



// Write function showTasks(). It is be called when the program is called like
// 'node addressBook.js show' or 'node addressBook.js show -i 3'
// This function should output the appropriate TO-Do tasks using console.log().
// The format of the output should be exactly:
// Task #ID Priority PRIORITY: NAME
//
// Note:
// - if there is a flag value for id, the program should only display that task
// - it there is no flag id, the program should return all tasks.
// - the id of a task is its index in 'data' + 1, we count ids up from 1.
//
// ex.
//  data = [{name: "Do Laundry", priority: 3},
//          {name: "Clean dishes", priority: 2},
//          {name:"Call Mark", priority: 1}]

//  node addressBook.js show -i 2 -> "Task #2 Priority 2: Clean Dishes"
//  node addressBook.js show ->
//            "Task #1 Priority 3: Do Laundry
//             Task #2 Priority 2: Clean Dishes
//             Task #3 Priority 1: Call Mark"
function showTasks(){
  // YOUR CODE HERE
  if(program.id){
    var id = program.id-1;
    console.log("Task #"+(program.id)+" Priority "+data[id].priority+ ": "+data[id].name)
  }else{
    for (var i=0; i<data.length; i++){
      console.log("Task #"+(i+1)+" Priority "+data[i].priority+ ": "+data[i].name)
    }
  }
}


// Write a function that is called when the command `node addressBook.js delete -i 3`
// is run. Take the id from program.id and delete the element with that index from 'data'.
// Hint: use splice() here too!
// function deleteTask(){
//   // YOUR CODE HERE
//   if(program.id){
//     var id = program.id-1;
//     if (id>=0 && id<data.length){
//       data.splice(id, 1);
//       console.log("Deleted task with id: "+program.id)
//     }
//   } else{
//     console.log("No task specified")
//   }
// }

// ---Utility functions---

// We use these functions to read and modify our JSON file.
function writeFile(data) {
  fs.writeFileSync(JSON_FILE, JSON.stringify(data, null, 2));
}

function ensureFileExists() {
  if (! fs.existsSync(JSON_FILE)) {
    writeFile([]);
  }
}


// This command writes  our tasks to the disk
writeFile(data);


//export functions for spec
module.exports = {
    parseCommand: parseCommand
}
