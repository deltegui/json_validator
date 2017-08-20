# JsonValidator
Json Validator for NodeJS

## Usage

First you need to create a new JsonValidator instance calling to exported function:

`
const jsonValidator = require('JsonValidator');
const validator = jsonValidator();
`

Then, you can create validators using the 'create' method, which accepts a callback and the validator name

`
validator.create(t => ({  
  user: t.string.required,  
  age: t.number,  
  text: t.string.max(10).required,  
}), 'validatorName');  
`

Finally, you can validate any json using 'validate' function:

`
const json = {  
  user: 'user',  
  age: 22,  
  text: '123456789',  
};  
validator.validate(json, 'validatorName');  
`
