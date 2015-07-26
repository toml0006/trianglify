require('colors')

try {
  require('canvas')
  console.log('\n\nTrianglify has been installed successfully with SVG, canvas, and PNG support.')
} catch (e) {
  console.log('\n\nTrianglify has been installed successfully with SVG support.\n'.yellow +
    'For canvas and PNG support, you will need to install Cairo & node-canvas\n'.cyan +
    'On OSX, you can install node-canvas and Cairo with the following commands:`\n\n'.cyan +
    '    brew install cairo\n' +
    '    PKG_CONFIG_PATH=/usr/local/lib/pkgconfig:/opt/X11/lib/pkgconfig npm install -S canvas\n\n' +
    'See https://github.com/Automattic/node-canvas for more info'.cyan)
}
