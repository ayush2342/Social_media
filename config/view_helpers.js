const env = require('./enviornment');
const fs = require('fs');
const path = require('path');


module.exports = (app) => {
    app.locals.assetPath = function(filePath){
        if (env.name == 'development'){
            return '/' + filePath;
        }

        const startString = filePath.split('/')[0];

        filePath= 'D:\\Web Development\\NodeWs\\social_Code\\assets\\' + changeBackslashToForward(filePath);
        
        return '/' + startString + '/' + JSON.parse(fs.readFileSync(path.join(__dirname, '../public/rev-manifest.json')))[filePath];
    }
}

function changeBackslashToForward(str) {
    return str.replace('/','\\');
  }
  
