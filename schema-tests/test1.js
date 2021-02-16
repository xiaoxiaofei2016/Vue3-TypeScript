// Node.js require:
const Ajv = require("ajv").default

const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      format: 'email'
    },
    pets: {
      type: 'array',
      items: {
        type: 'string',
        format: 'isDog'
      }
    }
  }
}

const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}

ajv.addFormat('isDog', (data) => {
  return data === 'dog'
})

const validate = ajv.compile(schema);
const valid = validate({
  name: '1233',
  pets: [
    'dog'
  ]
});
if (!valid) console.log(validate.errors);
