# SimpleJsonValidator
Json Validator for NodeJS

## Installation
You can install this library using npm:

`npm i --save simplejsonvalidator`

## Usage

First you need to create a new JsonValidator instance calling to exported function:

```javascript
const jsonValidator = require('JsonValidator');
const validator = jsonValidator();
```

Then, you can create validators using the 'create' method, which accepts a callback and the validator name

```javascript
validator.create(t => ({
  user: t.string.required,  
  age: t.number,  
  text: t.string.max(10).required,  
}), 'validatorName');  
```

Finally, you can validate any json using 'validate' function:

```javascript
const json = {
  user: 'user',  
  age: 22,  
  text: '123456789',  
};  
validator.validate(json, 'validatorName');  
```

You can also nest objects like this:

```javascript
validator.create(t => ({
  user: t.string.required,
  age: t.number,
  text: t.string.max(10).required,
  data: {
    token: t.string,
  },
}), 'demoValidator');
```

## Types
### String
Validates if type is string. Example:

```javascript
validator.create(t => ({
  key: t.string,
}));
````

You can use this validators in string type:
| Validator     | Explanation        | Example              |
| ------------- | ------------------ |:--------------------:|
| required      | makes key required | t.string.required    |
| max(number)   | maximous limit     | t.string.max(10)     |
| min(number)   | minimous limit     | t.string.min(1)      |

### Number
Validates if type is number. Example:

```javascript
validator.create(t => ({
  key: t.number,
}));
````

You can use this validators in number type:
| Validator     | Explanation                  | Example              |
| ------------- | ---------------------------- |:--------------------:|
| required      | makes key required           | t.number.required    |
| positive      | checks if number is positive | t.number.positive    |
| negative      | checks if number is positive | t.number.negative    |

### Boolean
Validates if type is boolean. Example:

```javascript
validator.create(t => ({
  key: t.boolean,
}));
````

You can use this validators in boolean type:
| Validator     | Explanation        | Example              |
| ------------- | ------------------ |:--------------------:|
| required      | makes key required | t.boolean.required   |

### Array
Validates if type is array. Example:

```javascript
validator.create(t => ({
  key: t.array,
}));
````

You can use this validators in array type:
| Validator             | Explanation                                              | Example                  |
| --------------------- | -------------------------------------------------------- |:------------------------:|
| required              | makes key required                                       | t.array.required         |
| exactLength(number)   | check if array length is exactly the specified length    | t.array.exactLength(20)  |
| lengthLowerTo(number) | check if array length is lower to the specified length   | t.array.lengthLowerTo(9) |
| lengthUpperTo(number) | check if array length is upper to the specified length   | t.array.lengthUpperTo(1) |
| notEmpty              | check if array legnth is not empty                       | t.array.notEmpty         |


