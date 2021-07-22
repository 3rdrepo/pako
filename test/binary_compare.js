'use strict';

const assert  = require('assert');
const fs      = require('fs');
const path    = require('path');

const pako        = require('../index');
const loadSamples = require('./helpers').loadSamples;

const sample = loadSamples().lorem_en_100k;


// Helper used to compare pako deflate using various options
// with reference values from old node.js zlib.
//
// node.js switched to chromium zlib implementation in version v12.17.0,
// which generates slightly different fixtures.
// https://github.com/nodejs/node/pull/31201
//
// So we use fixtures generated by node.js versions below v12.17.0.
//
function testSample(pako_method, sample, options, filename) {
  const dir = path.join(__dirname, 'fixtures', 'binary_compare');

  const pako_result = pako_method(sample, options);
  const zlib_result = fs.readFileSync(path.join(dir, filename));

  // One more hack: gzip header contains OS code, that can vary.
  // Override OS code if requested. For simplicity, we assume it on fixed
  // position (= no additional gzip headers used)
  if (options.ignore_os) zlib_result[9] = pako_result[9];

  assert.deepStrictEqual(pako_result, new Uint8Array(zlib_result));
}


describe('Deflate defaults', () => {

  it('deflate, no options', () => {
    testSample(pako.deflate, sample, {}, 'deflate.bin');
  });

  it('deflate raw, no options', () => {
    testSample(pako.deflateRaw, sample, {}, 'deflateRaw.bin');
  });

  // OS code in header can vary. Use hack flag to ignore it.
  it('gzip, no options', () => {
    testSample(pako.gzip, sample, { ignore_os: true }, 'gzip.bin');
  });
});


describe('Deflate levels', () => {

  it('level 9', () => {
    testSample(pako.deflate, sample, { level: 9 }, 'deflate_level=9.bin');
  });
  it('level 8', () => {
    testSample(pako.deflate, sample, { level: 8 }, 'deflate_level=8.bin');
  });
  it('level 7', () => {
    testSample(pako.deflate, sample, { level: 7 }, 'deflate_level=7.bin');
  });
  it('level 6', () => {
    testSample(pako.deflate, sample, { level: 6 }, 'deflate_level=6.bin');
  });
  it('level 5', () => {
    testSample(pako.deflate, sample, { level: 5 }, 'deflate_level=5.bin');
  });
  it('level 4', () => {
    testSample(pako.deflate, sample, { level: 4 }, 'deflate_level=4.bin');
  });
  it('level 3', () => {
    testSample(pako.deflate, sample, { level: 3 }, 'deflate_level=3.bin');
  });
  it('level 2', () => {
    testSample(pako.deflate, sample, { level: 2 }, 'deflate_level=2.bin');
  });
  it('level 1', () => {
    testSample(pako.deflate, sample, { level: 1 }, 'deflate_level=1.bin');
  });
  it('level -1 (implicit default)', () => {
    testSample(pako.deflate, sample, { level: -1 }, 'deflate_level=-1.bin');
  });
});


describe('Deflate windowBits', () => {

  it('windowBits 15', () => {
    testSample(pako.deflate, sample, { windowBits: 15 }, 'deflate_windowBits=15.bin');
  });
  it('windowBits 14', () => {
    testSample(pako.deflate, sample, { windowBits: 14 }, 'deflate_windowBits=14.bin');
  });
  it('windowBits 13', () => {
    testSample(pako.deflate, sample, { windowBits: 13 }, 'deflate_windowBits=13.bin');
  });
  it('windowBits 12', () => {
    testSample(pako.deflate, sample, { windowBits: 12 }, 'deflate_windowBits=12.bin');
  });
  it('windowBits 11', () => {
    testSample(pako.deflate, sample, { windowBits: 11 }, 'deflate_windowBits=11.bin');
  });
  it('windowBits 10', () => {
    testSample(pako.deflate, sample, { windowBits: 10 }, 'deflate_windowBits=10.bin');
  });
  it('windowBits 9', () => {
    testSample(pako.deflate, sample, { windowBits: 9 }, 'deflate_windowBits=9.bin');
  });
  it('windowBits 8', () => {
    testSample(pako.deflate, sample, { windowBits: 8 }, 'deflate_windowBits=8.bin');
  });
  it('windowBits -15 (implicit raw)', () => {
    testSample(pako.deflate, sample, { windowBits: -15 }, 'deflateRaw_windowBits=15.bin');
  });

});


describe('Deflate memLevel', () => {

  it('memLevel 9', () => {
    testSample(pako.deflate, sample, { memLevel: 9 }, 'deflate_memLevel=9.bin');
  });
  it('memLevel 8', () => {
    testSample(pako.deflate, sample, { memLevel: 8 }, 'deflate_memLevel=8.bin');
  });
  it('memLevel 7', () => {
    testSample(pako.deflate, sample, { memLevel: 7 }, 'deflate_memLevel=7.bin');
  });
  it('memLevel 6', () => {
    testSample(pako.deflate, sample, { memLevel: 6 }, 'deflate_memLevel=6.bin');
  });
  it('memLevel 5', () => {
    testSample(pako.deflate, sample, { memLevel: 5 }, 'deflate_memLevel=5.bin');
  });
  it('memLevel 4', () => {
    testSample(pako.deflate, sample, { memLevel: 4 }, 'deflate_memLevel=4.bin');
  });
  it('memLevel 3', () => {
    testSample(pako.deflate, sample, { memLevel: 3 }, 'deflate_memLevel=3.bin');
  });
  it('memLevel 2', () => {
    testSample(pako.deflate, sample, { memLevel: 2 }, 'deflate_memLevel=2.bin');
  });
  it('memLevel 1', () => {
    testSample(pako.deflate, sample, { memLevel: 1 }, 'deflate_memLevel=1.bin');
  });

});


describe('Deflate strategy', () => {

  it('Z_DEFAULT_STRATEGY', () => {
    testSample(pako.deflate, sample, { strategy: 0 }, 'deflate_strategy=0.bin');
  });
  it('Z_FILTERED', () => {
    testSample(pako.deflate, sample, { strategy: 1 }, 'deflate_strategy=1.bin');
  });
  it('Z_HUFFMAN_ONLY', () => {
    testSample(pako.deflate, sample, { strategy: 2 }, 'deflate_strategy=2.bin');
  });
  it('Z_RLE', () => {
    testSample(pako.deflate, sample, { strategy: 3 }, 'deflate_strategy=3.bin');
  });
  it('Z_FIXED', () => {
    testSample(pako.deflate, sample, { strategy: 4 }, 'deflate_strategy=4.bin');
  });

});


describe('Deflate RAW', () => {
  // Since difference is only in wrapper, test for store/fast/slow methods are enough
  it('level 4', () => {
    testSample(pako.deflateRaw, sample, { level: 4 }, 'deflateRaw_level=4.bin');
  });
  it('level 1', () => {
    testSample(pako.deflateRaw, sample, { level: 1 }, 'deflateRaw_level=1.bin');
  });

});


describe('Deflate dictionary', () => {

  it('trivial dictionary', () => {
    const dict = Buffer.from('abcdefghijklmnoprstuvwxyz');
    testSample(pako.deflate, sample, { dictionary: dict }, 'deflate_dictionary=trivial.bin');
  });

  it('spdy dictionary', () => {
    const spdyDict = require('fs').readFileSync(require('path').join(__dirname, 'fixtures', 'spdy_dict.txt'));

    testSample(pako.deflate, sample, { dictionary: spdyDict }, 'deflate_dictionary=spdy.bin');
  });
});