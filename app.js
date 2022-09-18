const express = require('express');
const upload = require('multer')();
const Ajv = require('ajv');
// const { default: Ajv } = require('ajv');

const server = express();

server.set('view engine', 'ejs');
server.set('views', './views');

server.use(express.static('./public'));

server.get('/', (req, res) => {
   res.render('index');
});

server.post('/formUser', upload.none(), async (req, res, next) => {
   
   console.log(req.body);
   const obj = req.body;
   const pattern = /^(0?[1-9]|[12][0-9]|3[01])[\-\s\/\.](0?[1-9]|1[012])[\-\s\/\.](19|20)?[0-9]{2}$/;

   const testData = pattern.test(obj.dataBirthday);
   const schema = {
      type: 'object',
      properties: {
         name: { type: 'string'},
         surname: { type: 'string'},
         dataBirthday: { type: 'string'},
      },
      required: ['name','surname','dataBirthday'],
      additionalProperties: false
   };
   const ajv = new Ajv();

   const validate = ajv.compile(schema);
   const valid = validate(req.body);
   
   if (!valid){
      const result = {status: 'invalid data', payload: validate.errors};
      res.json( result );
      return;
   }
   if(testData !== true){
      console.log( 'invalid dataBirthdey');
   }
   
   res.json( {status: 'ok'} );
});

server.listen(3000, () => {
   console.log('server work');
});