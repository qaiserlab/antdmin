const cli = require('next/dist/cli/next-dev');

const readline = require('readline').createInterface({
  input: require('fs').createReadStream('.env'),
});

readline.on('line', (line) => {
  const envline = line.split('=');

  if (envline.length === 2 && envline[0] === 'APP_PORT') {
    const APP_PORT = envline[1];
  
    cli.nextDev([
      '-p', APP_PORT || 8000,
    ]);
  }
});