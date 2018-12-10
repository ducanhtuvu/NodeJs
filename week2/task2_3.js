const fs = require('fs');
const formatDistance = require('date-fns/formatDistance');
const viLocale = require('date-fns/locale/vi');
const format = require('date-fns/format')
const XLSX = require('xlsx');


var data
var text;
try {
      data = fs.readFileSync('./products.json', 'utf8');
      text = JSON.parse(data);
} catch (err) {
      console.log(err);
}

console.log('Total of product : ' + Object.keys(text).length);
function FormatNumberLength(num, length) {
      var r = "" + num;
      while (r.length < length) {
            r = "0" + r;
      }
      return r;
}

function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function* values(obj) {
      for (let prop of Object.keys(obj))
            yield obj[prop];
}
var arr = Array.from(values(text));
var index = 1;

arr.forEach(function (element) {
      element['dateUpdated'] = new Date(element[`dateUpdated`]).toISOString().replace(/T/, ' ').replace(/\..+/, '');
      var numb = FormatNumberLength(index, 3);
      var name = element[`name`];
      element['price'] = numberWithCommas(element['price']);
      var today = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
      var fromnow = formatDistance(
            element[`dateUpdated`],
            today,
            { locale: viLocale}
      )

      //Task 3
      
      element['update'] = format(element[`dateUpdated`], 'MM/dd/yyyy');
      delete element['dateUpdated'];

      //console.log(`${numb} - ${name} - ${element['price']}VND - Cập nhật cách đây: ${fromnow}`);
      index++;
});

function createXLSX(objJson) {
      // create 'worksheet' object from json
      const ws = XLSX.utils.json_to_sheet(objJson);

      // Optional: config columns width (character length)
      ws['!cols'] = [{ width: 20 }, { width: 15 }, { width: 20 }, { width: 20 }, { width: 20 }];


//       // create 'workbook' object (which contains multiple sheet)
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Products');

      // convert to Microsoft EXCEL workbook and write to a Buffer object
     const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
      fs.writeFile('product.xlsx', buf , err =>{
            console.log('write success')
      })
}

  createXLSX(arr);