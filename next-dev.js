const cli = require('next/dist/cli/next-dev');

const readline = require('readline').createInterface({
  input: require('fs').createReadStream('.env'),
});

readline.on('line', (line) => {
  const envline = line.split('=');

  if (envline.length === 2 && envline[0] === 'PORT') {
    const PORT = envline[1];
  
    cli.nextDev([
      '-p', PORT || 8000,
      // '-H', process.env.HOSTNAME || '0.0.0.0',
    ]);
  }
});