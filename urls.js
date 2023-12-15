const fs = require('fs');
const http = require('http');
const https = require('https');
const {URL} = require('url');

if(process.argv.length !==3) {
    console.error("Usage: node urls.js FILENAME");
    process.exit(1);
}

const filename = process.argv[2];
// Read url from the specified file
try{
    const data = fs.readFileSync(filename, 'utf8');
    const urls = data.split('\n').filter(url => url.trim() !== '');

    // Process each URL
    urls.forEach((url) => {
        const parsedUrl = new URL(url);
        const hostname = parsedUrl.hostname;
        const outputFilename = `${hostname}.txt`;

        // Make a GET request to URL
        const protocol = parsedUrl.protocol === 'https:'? https : http;
        protocol.get(url, (response)=> {
            let htmlData = '';

            // Accumulate html data
            response.on('data', (chunk)=>{
                htmlData += chunk;
            });

            // Save html data to a file on request completion
            response.on('end', () => {
                fs.writeFile(outputFilename, htmlData, (err) => {
                    if(err){
                        console.error(`Error writing to ${outputFilename}: ${err.message}`);
                    } else{
                        console.log(`Succesfully wrote ${hostname} to ${outputFilename}`);
                    }
                });
            });
        
        }).on('error', (err) => {
            console.error(`Error downloading ${url}: ${err.message}`);
        });
    });
}catch(err){
    console.error(`Error reading file ${filename}: ${err.message}`);
    process.exit(1);
}