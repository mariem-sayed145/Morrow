const http = require('http');

const urls = [
  '/',
  '/css/styles.css',
  '/js/main.js',
  '/assets/images/hero.jpg',
  '/assets/images/story.jpg',
  '/assets/images/product-house-blend.jpg',
  '/assets/images/product-sunrise-ethiopia.jpg',
  '/assets/images/product-slow-sunday.jpg',
  '/assets/images/roastery.jpg',
  '/assets/images/journal-morning-brew.jpg',
  '/assets/images/journal-origins.jpg',
  '/assets/images/journal-slow-pour.jpg'
];

async function checkUrl(url) {
  return new Promise((resolve) => {
    http.get({ host: 'localhost', port: 4040, path: url }, (res) => {
      let len = 0;
      res.on('data', chunk => len += chunk.length);
      res.on('end', () => {
        resolve({
          url,
          status: res.statusCode,
          type: res.headers['content-type'],
          bytes: len
        });
      });
    }).on('error', (err) => {
      resolve({ url, error: err.message });
    });
  });
}

(async () => {
  console.log('Testing Morrow Coffee Roasters endpoints:');
  for (const u of urls) {
    const res = await checkUrl(u);
    console.log(`${res.status || 'ERR'} | ${res.type || ''} | ${res.bytes || 0} bytes | ${res.url}`);
  }
})();
