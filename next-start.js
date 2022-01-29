const cli = require('next/dist/cli/next-start');

const readline = require('readline').createInterface({
  input: require('fs').createReadStream('.env.production.local'),
});

readline.on('line', (line) => {
  const envline = line.split('=');

  if (envline.length === 2 && envline[0] === 'APP_PORT') {
    const APP_PORT = envline[1];
  
    cli.nextStart([
      '-p', APP_PORT || 8000,
    ]);
  }
});