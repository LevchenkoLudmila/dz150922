const express = require('express');
const multer = require('multer');
const ajv = require('ajv');
const { default: Ajv } = require('ajv');

const server = express();

server.set('view engine', 'ejs');
server.set('views', './views');

server.use(express.static('./public'));

server.get('/', (req, res) => {
   res.render('index');
});

server.post('/', async (req, res) => {
   
   const schema ={
      type: 'object',
      properties: {
         name: { type: 'string'},
         surname: { type: 'string'},
         DataBirthday: { type: 'integer'},
      },
      required: ['name','surname','DataBirthday'],
      addionalPropertios: false
   };
   const ajv = new Ajv();

   const validate = ajv.complite(schema);
   const valid = validate(req.body);

   if (!valid){
      naxt();
      return;
   }
   const result = {status: 'invalid data', payload: validate.errors};
   res.json( result );
});

server.listen(3000, () => {
   console.log('server work');
});