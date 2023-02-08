// add video-JS javascript file to the head of the page
var js = document.createElement("script");
js.src = "https://vjs.zencdn.net/5.19/video.js";
js.async = true;
document.getElementsByTagName("head")[0].appendChild(js);
var Player;
// add the stylesheet for videoJS
var lastClicked = "";
var svjs = document.createElement("link");
svjs.type = "text/css";
svjs.rel = "stylesheet";

var vs = undefined;

var img = new Image();
img.style.position = "absolute";
img.style.top = 0;
img.style.width = 960;
img.style.height = 585;
img.style.zIndex = 1;

svjs.href = "CSS/videoJS/video-js.css";
document.getElementsByTagName("head")[0].appendChild(svjs);

// set global variables
var studio = false;
var designer = false; //loads stylesheet from folder CSS
var id_user = Math.random().toString(36).substr(2, 5); // generate a random user
var videoWidth;
var videoHeight;
var videoCustomWidth;
var ProgramCode;
var ClientCode;
var client_id;
var livelayer = false;

var smartTv = true;
// QR CODE
if (smartTv == true) {
  var QRCode;
  !(function () {
    function a(a) {
      (this.mode = c.MODE_8BIT_BYTE), (this.data = a), (this.parsedData = []);
      for (var b = [], d = 0, e = this.data.length; e > d; d++) {
        var f = this.data.charCodeAt(d);
        f > 65536
          ? ((b[0] = 240 | ((1835008 & f) >>> 18)),
            (b[1] = 128 | ((258048 & f) >>> 12)),
            (b[2] = 128 | ((4032 & f) >>> 6)),
            (b[3] = 128 | (63 & f)))
          : f > 2048
          ? ((b[0] = 224 | ((61440 & f) >>> 12)),
            (b[1] = 128 | ((4032 & f) >>> 6)),
            (b[2] = 128 | (63 & f)))
          : f > 128
          ? ((b[0] = 192 | ((1984 & f) >>> 6)), (b[1] = 128 | (63 & f)))
          : (b[0] = f),
          (this.parsedData = this.parsedData.concat(b));
      }
      this.parsedData.length != this.data.length &&
        (this.parsedData.unshift(191),
        this.parsedData.unshift(187),
        this.parsedData.unshift(239));
    }
    function b(a, b) {
      (this.typeNumber = a),
        (this.errorCorrectLevel = b),
        (this.modules = null),
        (this.moduleCount = 0),
        (this.dataCache = null),
        (this.dataList = []);
    }
    function i(a, b) {
      if (void 0 == a.length) throw new Error(a.length + "/" + b);
      for (var c = 0; c < a.length && 0 == a[c]; ) c++;
      this.num = new Array(a.length - c + b);
      for (var d = 0; d < a.length - c; d++) this.num[d] = a[d + c];
    }
    function j(a, b) {
      (this.totalCount = a), (this.dataCount = b);
    }
    function k() {
      (this.buffer = []), (this.length = 0);
    }
    function m() {
      return "undefined" != typeof CanvasRenderingContext2D;
    }
    function n() {
      var a = !1,
        b = navigator.userAgent;
      return (
        /android/i.test(b) &&
          ((a = !0),
          (aMat = b.toString().match(/android ([0-9]\.[0-9])/i)),
          aMat && aMat[1] && (a = parseFloat(aMat[1]))),
        a
      );
    }
    function r(a, b) {
      for (var c = 1, e = s(a), f = 0, g = l.length; g >= f; f++) {
        var h = 0;
        switch (b) {
          case d.L:
            h = l[f][0];
            break;
          case d.M:
            h = l[f][1];
            break;
          case d.Q:
            h = l[f][2];
            break;
          case d.H:
            h = l[f][3];
        }
        if (h >= e) break;
        c++;
      }
      if (c > l.length) throw new Error("Too long data");
      return c;
    }
    function s(a) {
      var b = encodeURI(a)
        .toString()
        .replace(/\%[0-9a-fA-F]{2}/g, "a");
      return b.length + (b.length != a ? 3 : 0);
    }
    (a.prototype = {
      getLength: function () {
        return this.parsedData.length;
      },
      write: function (a) {
        for (var b = 0, c = this.parsedData.length; c > b; b++)
          a.put(this.parsedData[b], 8);
      },
    }),
      (b.prototype = {
        addData: function (b) {
          var c = new a(b);
          this.dataList.push(c), (this.dataCache = null);
        },
        isDark: function (a, b) {
          if (0 > a || this.moduleCount <= a || 0 > b || this.moduleCount <= b)
            throw new Error(a + "," + b);
          return this.modules[a][b];
        },
        getModuleCount: function () {
          return this.moduleCount;
        },
        make: function () {
          this.makeImpl(!1, this.getBestMaskPattern());
        },
        makeImpl: function (a, c) {
          (this.moduleCount = 4 * this.typeNumber + 17),
            (this.modules = new Array(this.moduleCount));
          for (var d = 0; d < this.moduleCount; d++) {
            this.modules[d] = new Array(this.moduleCount);
            for (var e = 0; e < this.moduleCount; e++)
              this.modules[d][e] = null;
          }
          this.setupPositionProbePattern(0, 0),
            this.setupPositionProbePattern(this.moduleCount - 7, 0),
            this.setupPositionProbePattern(0, this.moduleCount - 7),
            this.setupPositionAdjustPattern(),
            this.setupTimingPattern(),
            this.setupTypeInfo(a, c),
            this.typeNumber >= 7 && this.setupTypeNumber(a),
            null == this.dataCache &&
              (this.dataCache = b.createData(
                this.typeNumber,
                this.errorCorrectLevel,
                this.dataList
              )),
            this.mapData(this.dataCache, c);
        },
        setupPositionProbePattern: function (a, b) {
          for (var c = -1; 7 >= c; c++)
            if (!(-1 >= a + c || this.moduleCount <= a + c))
              for (var d = -1; 7 >= d; d++)
                -1 >= b + d ||
                  this.moduleCount <= b + d ||
                  (this.modules[a + c][b + d] =
                    (c >= 0 && 6 >= c && (0 == d || 6 == d)) ||
                    (d >= 0 && 6 >= d && (0 == c || 6 == c)) ||
                    (c >= 2 && 4 >= c && d >= 2 && 4 >= d)
                      ? !0
                      : !1);
        },
        getBestMaskPattern: function () {
          for (var a = 0, b = 0, c = 0; 8 > c; c++) {
            this.makeImpl(!0, c);
            var d = f.getLostPoint(this);
            (0 == c || a > d) && ((a = d), (b = c));
          }
          return b;
        },
        createMovieClip: function (a, b, c) {
          var d = a.createEmptyMovieClip(b, c),
            e = 1;
          this.make();
          for (var f = 0; f < this.modules.length; f++)
            for (var g = f * e, h = 0; h < this.modules[f].length; h++) {
              var i = h * e,
                j = this.modules[f][h];
              j &&
                (d.beginFill(0, 100),
                d.moveTo(i, g),
                d.lineTo(i + e, g),
                d.lineTo(i + e, g + e),
                d.lineTo(i, g + e),
                d.endFill());
            }
          return d;
        },
        setupTimingPattern: function () {
          for (var a = 8; a < this.moduleCount - 8; a++)
            null == this.modules[a][6] && (this.modules[a][6] = 0 == a % 2);
          for (var b = 8; b < this.moduleCount - 8; b++)
            null == this.modules[6][b] && (this.modules[6][b] = 0 == b % 2);
        },
        setupPositionAdjustPattern: function () {
          for (
            var a = f.getPatternPosition(this.typeNumber), b = 0;
            b < a.length;
            b++
          )
            for (var c = 0; c < a.length; c++) {
              var d = a[b],
                e = a[c];
              if (null == this.modules[d][e])
                for (var g = -2; 2 >= g; g++)
                  for (var h = -2; 2 >= h; h++)
                    this.modules[d + g][e + h] =
                      -2 == g ||
                      2 == g ||
                      -2 == h ||
                      2 == h ||
                      (0 == g && 0 == h)
                        ? !0
                        : !1;
            }
        },
        setupTypeNumber: function (a) {
          for (
            var b = f.getBCHTypeNumber(this.typeNumber), c = 0;
            18 > c;
            c++
          ) {
            var d = !a && 1 == (1 & (b >> c));
            this.modules[Math.floor(c / 3)][
              (c % 3) + this.moduleCount - 8 - 3
            ] = d;
          }
          for (var c = 0; 18 > c; c++) {
            var d = !a && 1 == (1 & (b >> c));
            this.modules[(c % 3) + this.moduleCount - 8 - 3][
              Math.floor(c / 3)
            ] = d;
          }
        },
        setupTypeInfo: function (a, b) {
          for (
            var c = (this.errorCorrectLevel << 3) | b,
              d = f.getBCHTypeInfo(c),
              e = 0;
            15 > e;
            e++
          ) {
            var g = !a && 1 == (1 & (d >> e));
            6 > e
              ? (this.modules[e][8] = g)
              : 8 > e
              ? (this.modules[e + 1][8] = g)
              : (this.modules[this.moduleCount - 15 + e][8] = g);
          }
          for (var e = 0; 15 > e; e++) {
            var g = !a && 1 == (1 & (d >> e));
            8 > e
              ? (this.modules[8][this.moduleCount - e - 1] = g)
              : 9 > e
              ? (this.modules[8][15 - e - 1 + 1] = g)
              : (this.modules[8][15 - e - 1] = g);
          }
          this.modules[this.moduleCount - 8][8] = !a;
        },
        mapData: function (a, b) {
          for (
            var c = -1,
              d = this.moduleCount - 1,
              e = 7,
              g = 0,
              h = this.moduleCount - 1;
            h > 0;
            h -= 2
          )
            for (6 == h && h--; ; ) {
              for (var i = 0; 2 > i; i++)
                if (null == this.modules[d][h - i]) {
                  var j = !1;
                  g < a.length && (j = 1 == (1 & (a[g] >>> e)));
                  var k = f.getMask(b, d, h - i);
                  k && (j = !j),
                    (this.modules[d][h - i] = j),
                    e--,
                    -1 == e && (g++, (e = 7));
                }
              if (((d += c), 0 > d || this.moduleCount <= d)) {
                (d -= c), (c = -c);
                break;
              }
            }
        },
      }),
      (b.PAD0 = 236),
      (b.PAD1 = 17),
      (b.createData = function (a, c, d) {
        for (
          var e = j.getRSBlocks(a, c), g = new k(), h = 0;
          h < d.length;
          h++
        ) {
          var i = d[h];
          g.put(i.mode, 4),
            g.put(i.getLength(), f.getLengthInBits(i.mode, a)),
            i.write(g);
        }
        for (var l = 0, h = 0; h < e.length; h++) l += e[h].dataCount;
        if (g.getLengthInBits() > 8 * l)
          throw new Error(
            "code length overflow. (" + g.getLengthInBits() + ">" + 8 * l + ")"
          );
        for (
          g.getLengthInBits() + 4 <= 8 * l && g.put(0, 4);
          0 != g.getLengthInBits() % 8;

        )
          g.putBit(!1);
        for (;;) {
          if (g.getLengthInBits() >= 8 * l) break;
          if ((g.put(b.PAD0, 8), g.getLengthInBits() >= 8 * l)) break;
          g.put(b.PAD1, 8);
        }
        return b.createBytes(g, e);
      }),
      (b.createBytes = function (a, b) {
        for (
          var c = 0,
            d = 0,
            e = 0,
            g = new Array(b.length),
            h = new Array(b.length),
            j = 0;
          j < b.length;
          j++
        ) {
          var k = b[j].dataCount,
            l = b[j].totalCount - k;
          (d = Math.max(d, k)), (e = Math.max(e, l)), (g[j] = new Array(k));
          for (var m = 0; m < g[j].length; m++) g[j][m] = 255 & a.buffer[m + c];
          c += k;
          var n = f.getErrorCorrectPolynomial(l),
            o = new i(g[j], n.getLength() - 1),
            p = o.mod(n);
          h[j] = new Array(n.getLength() - 1);
          for (var m = 0; m < h[j].length; m++) {
            var q = m + p.getLength() - h[j].length;
            h[j][m] = q >= 0 ? p.get(q) : 0;
          }
        }
        for (var r = 0, m = 0; m < b.length; m++) r += b[m].totalCount;
        for (var s = new Array(r), t = 0, m = 0; d > m; m++)
          for (var j = 0; j < b.length; j++)
            m < g[j].length && (s[t++] = g[j][m]);
        for (var m = 0; e > m; m++)
          for (var j = 0; j < b.length; j++)
            m < h[j].length && (s[t++] = h[j][m]);
        return s;
      });
    for (
      var c = {
          MODE_NUMBER: 1,
          MODE_ALPHA_NUM: 2,
          MODE_8BIT_BYTE: 4,
          MODE_KANJI: 8,
        },
        d = { L: 1, M: 0, Q: 3, H: 2 },
        e = {
          PATTERN000: 0,
          PATTERN001: 1,
          PATTERN010: 2,
          PATTERN011: 3,
          PATTERN100: 4,
          PATTERN101: 5,
          PATTERN110: 6,
          PATTERN111: 7,
        },
        f = {
          PATTERN_POSITION_TABLE: [
            [],
            [6, 18],
            [6, 22],
            [6, 26],
            [6, 30],
            [6, 34],
            [6, 22, 38],
            [6, 24, 42],
            [6, 26, 46],
            [6, 28, 50],
            [6, 30, 54],
            [6, 32, 58],
            [6, 34, 62],
            [6, 26, 46, 66],
            [6, 26, 48, 70],
            [6, 26, 50, 74],
            [6, 30, 54, 78],
            [6, 30, 56, 82],
            [6, 30, 58, 86],
            [6, 34, 62, 90],
            [6, 28, 50, 72, 94],
            [6, 26, 50, 74, 98],
            [6, 30, 54, 78, 102],
            [6, 28, 54, 80, 106],
            [6, 32, 58, 84, 110],
            [6, 30, 58, 86, 114],
            [6, 34, 62, 90, 118],
            [6, 26, 50, 74, 98, 122],
            [6, 30, 54, 78, 102, 126],
            [6, 26, 52, 78, 104, 130],
            [6, 30, 56, 82, 108, 134],
            [6, 34, 60, 86, 112, 138],
            [6, 30, 58, 86, 114, 142],
            [6, 34, 62, 90, 118, 146],
            [6, 30, 54, 78, 102, 126, 150],
            [6, 24, 50, 76, 102, 128, 154],
            [6, 28, 54, 80, 106, 132, 158],
            [6, 32, 58, 84, 110, 136, 162],
            [6, 26, 54, 82, 110, 138, 166],
            [6, 30, 58, 86, 114, 142, 170],
          ],
          G15: 1335,
          G18: 7973,
          G15_MASK: 21522,
          getBCHTypeInfo: function (a) {
            for (
              var b = a << 10;
              f.getBCHDigit(b) - f.getBCHDigit(f.G15) >= 0;

            )
              b ^= f.G15 << (f.getBCHDigit(b) - f.getBCHDigit(f.G15));
            return ((a << 10) | b) ^ f.G15_MASK;
          },
          getBCHTypeNumber: function (a) {
            for (
              var b = a << 12;
              f.getBCHDigit(b) - f.getBCHDigit(f.G18) >= 0;

            )
              b ^= f.G18 << (f.getBCHDigit(b) - f.getBCHDigit(f.G18));
            return (a << 12) | b;
          },
          getBCHDigit: function (a) {
            for (var b = 0; 0 != a; ) b++, (a >>>= 1);
            return b;
          },
          getPatternPosition: function (a) {
            return f.PATTERN_POSITION_TABLE[a - 1];
          },
          getMask: function (a, b, c) {
            switch (a) {
              case e.PATTERN000:
                return 0 == (b + c) % 2;
              case e.PATTERN001:
                return 0 == b % 2;
              case e.PATTERN010:
                return 0 == c % 3;
              case e.PATTERN011:
                return 0 == (b + c) % 3;
              case e.PATTERN100:
                return 0 == (Math.floor(b / 2) + Math.floor(c / 3)) % 2;
              case e.PATTERN101:
                return 0 == ((b * c) % 2) + ((b * c) % 3);
              case e.PATTERN110:
                return 0 == (((b * c) % 2) + ((b * c) % 3)) % 2;
              case e.PATTERN111:
                return 0 == (((b * c) % 3) + ((b + c) % 2)) % 2;
              default:
                throw new Error("bad maskPattern:" + a);
            }
          },
          getErrorCorrectPolynomial: function (a) {
            for (var b = new i([1], 0), c = 0; a > c; c++)
              b = b.multiply(new i([1, g.gexp(c)], 0));
            return b;
          },
          getLengthInBits: function (a, b) {
            if (b >= 1 && 10 > b)
              switch (a) {
                case c.MODE_NUMBER:
                  return 10;
                case c.MODE_ALPHA_NUM:
                  return 9;
                case c.MODE_8BIT_BYTE:
                  return 8;
                case c.MODE_KANJI:
                  return 8;
                default:
                  throw new Error("mode:" + a);
              }
            else if (27 > b)
              switch (a) {
                case c.MODE_NUMBER:
                  return 12;
                case c.MODE_ALPHA_NUM:
                  return 11;
                case c.MODE_8BIT_BYTE:
                  return 16;
                case c.MODE_KANJI:
                  return 10;
                default:
                  throw new Error("mode:" + a);
              }
            else {
              if (!(41 > b)) throw new Error("type:" + b);
              switch (a) {
                case c.MODE_NUMBER:
                  return 14;
                case c.MODE_ALPHA_NUM:
                  return 13;
                case c.MODE_8BIT_BYTE:
                  return 16;
                case c.MODE_KANJI:
                  return 12;
                default:
                  throw new Error("mode:" + a);
              }
            }
          },
          getLostPoint: function (a) {
            for (var b = a.getModuleCount(), c = 0, d = 0; b > d; d++)
              for (var e = 0; b > e; e++) {
                for (var f = 0, g = a.isDark(d, e), h = -1; 1 >= h; h++)
                  if (!(0 > d + h || d + h >= b))
                    for (var i = -1; 1 >= i; i++)
                      0 > e + i ||
                        e + i >= b ||
                        ((0 != h || 0 != i) &&
                          g == a.isDark(d + h, e + i) &&
                          f++);
                f > 5 && (c += 3 + f - 5);
              }
            for (var d = 0; b - 1 > d; d++)
              for (var e = 0; b - 1 > e; e++) {
                var j = 0;
                a.isDark(d, e) && j++,
                  a.isDark(d + 1, e) && j++,
                  a.isDark(d, e + 1) && j++,
                  a.isDark(d + 1, e + 1) && j++,
                  (0 == j || 4 == j) && (c += 3);
              }
            for (var d = 0; b > d; d++)
              for (var e = 0; b - 6 > e; e++)
                a.isDark(d, e) &&
                  !a.isDark(d, e + 1) &&
                  a.isDark(d, e + 2) &&
                  a.isDark(d, e + 3) &&
                  a.isDark(d, e + 4) &&
                  !a.isDark(d, e + 5) &&
                  a.isDark(d, e + 6) &&
                  (c += 40);
            for (var e = 0; b > e; e++)
              for (var d = 0; b - 6 > d; d++)
                a.isDark(d, e) &&
                  !a.isDark(d + 1, e) &&
                  a.isDark(d + 2, e) &&
                  a.isDark(d + 3, e) &&
                  a.isDark(d + 4, e) &&
                  !a.isDark(d + 5, e) &&
                  a.isDark(d + 6, e) &&
                  (c += 40);
            for (var k = 0, e = 0; b > e; e++)
              for (var d = 0; b > d; d++) a.isDark(d, e) && k++;
            var l = Math.abs((100 * k) / b / b - 50) / 5;
            return (c += 10 * l);
          },
        },
        g = {
          glog: function (a) {
            if (1 > a) throw new Error("glog(" + a + ")");
            return g.LOG_TABLE[a];
          },
          gexp: function (a) {
            for (; 0 > a; ) a += 255;
            for (; a >= 256; ) a -= 255;
            return g.EXP_TABLE[a];
          },
          EXP_TABLE: new Array(256),
          LOG_TABLE: new Array(256),
        },
        h = 0;
      8 > h;
      h++
    )
      g.EXP_TABLE[h] = 1 << h;
    for (var h = 8; 256 > h; h++)
      g.EXP_TABLE[h] =
        g.EXP_TABLE[h - 4] ^
        g.EXP_TABLE[h - 5] ^
        g.EXP_TABLE[h - 6] ^
        g.EXP_TABLE[h - 8];
    for (var h = 0; 255 > h; h++) g.LOG_TABLE[g.EXP_TABLE[h]] = h;
    (i.prototype = {
      get: function (a) {
        return this.num[a];
      },
      getLength: function () {
        return this.num.length;
      },
      multiply: function (a) {
        for (
          var b = new Array(this.getLength() + a.getLength() - 1), c = 0;
          c < this.getLength();
          c++
        )
          for (var d = 0; d < a.getLength(); d++)
            b[c + d] ^= g.gexp(g.glog(this.get(c)) + g.glog(a.get(d)));
        return new i(b, 0);
      },
      mod: function (a) {
        if (this.getLength() - a.getLength() < 0) return this;
        for (
          var b = g.glog(this.get(0)) - g.glog(a.get(0)),
            c = new Array(this.getLength()),
            d = 0;
          d < this.getLength();
          d++
        )
          c[d] = this.get(d);
        for (var d = 0; d < a.getLength(); d++)
          c[d] ^= g.gexp(g.glog(a.get(d)) + b);
        return new i(c, 0).mod(a);
      },
    }),
      (j.RS_BLOCK_TABLE = [
        [1, 26, 19],
        [1, 26, 16],
        [1, 26, 13],
        [1, 26, 9],
        [1, 44, 34],
        [1, 44, 28],
        [1, 44, 22],
        [1, 44, 16],
        [1, 70, 55],
        [1, 70, 44],
        [2, 35, 17],
        [2, 35, 13],
        [1, 100, 80],
        [2, 50, 32],
        [2, 50, 24],
        [4, 25, 9],
        [1, 134, 108],
        [2, 67, 43],
        [2, 33, 15, 2, 34, 16],
        [2, 33, 11, 2, 34, 12],
        [2, 86, 68],
        [4, 43, 27],
        [4, 43, 19],
        [4, 43, 15],
        [2, 98, 78],
        [4, 49, 31],
        [2, 32, 14, 4, 33, 15],
        [4, 39, 13, 1, 40, 14],
        [2, 121, 97],
        [2, 60, 38, 2, 61, 39],
        [4, 40, 18, 2, 41, 19],
        [4, 40, 14, 2, 41, 15],
        [2, 146, 116],
        [3, 58, 36, 2, 59, 37],
        [4, 36, 16, 4, 37, 17],
        [4, 36, 12, 4, 37, 13],
        [2, 86, 68, 2, 87, 69],
        [4, 69, 43, 1, 70, 44],
        [6, 43, 19, 2, 44, 20],
        [6, 43, 15, 2, 44, 16],
        [4, 101, 81],
        [1, 80, 50, 4, 81, 51],
        [4, 50, 22, 4, 51, 23],
        [3, 36, 12, 8, 37, 13],
        [2, 116, 92, 2, 117, 93],
        [6, 58, 36, 2, 59, 37],
        [4, 46, 20, 6, 47, 21],
        [7, 42, 14, 4, 43, 15],
        [4, 133, 107],
        [8, 59, 37, 1, 60, 38],
        [8, 44, 20, 4, 45, 21],
        [12, 33, 11, 4, 34, 12],
        [3, 145, 115, 1, 146, 116],
        [4, 64, 40, 5, 65, 41],
        [11, 36, 16, 5, 37, 17],
        [11, 36, 12, 5, 37, 13],
        [5, 109, 87, 1, 110, 88],
        [5, 65, 41, 5, 66, 42],
        [5, 54, 24, 7, 55, 25],
        [11, 36, 12],
        [5, 122, 98, 1, 123, 99],
        [7, 73, 45, 3, 74, 46],
        [15, 43, 19, 2, 44, 20],
        [3, 45, 15, 13, 46, 16],
        [1, 135, 107, 5, 136, 108],
        [10, 74, 46, 1, 75, 47],
        [1, 50, 22, 15, 51, 23],
        [2, 42, 14, 17, 43, 15],
        [5, 150, 120, 1, 151, 121],
        [9, 69, 43, 4, 70, 44],
        [17, 50, 22, 1, 51, 23],
        [2, 42, 14, 19, 43, 15],
        [3, 141, 113, 4, 142, 114],
        [3, 70, 44, 11, 71, 45],
        [17, 47, 21, 4, 48, 22],
        [9, 39, 13, 16, 40, 14],
        [3, 135, 107, 5, 136, 108],
        [3, 67, 41, 13, 68, 42],
        [15, 54, 24, 5, 55, 25],
        [15, 43, 15, 10, 44, 16],
        [4, 144, 116, 4, 145, 117],
        [17, 68, 42],
        [17, 50, 22, 6, 51, 23],
        [19, 46, 16, 6, 47, 17],
        [2, 139, 111, 7, 140, 112],
        [17, 74, 46],
        [7, 54, 24, 16, 55, 25],
        [34, 37, 13],
        [4, 151, 121, 5, 152, 122],
        [4, 75, 47, 14, 76, 48],
        [11, 54, 24, 14, 55, 25],
        [16, 45, 15, 14, 46, 16],
        [6, 147, 117, 4, 148, 118],
        [6, 73, 45, 14, 74, 46],
        [11, 54, 24, 16, 55, 25],
        [30, 46, 16, 2, 47, 17],
        [8, 132, 106, 4, 133, 107],
        [8, 75, 47, 13, 76, 48],
        [7, 54, 24, 22, 55, 25],
        [22, 45, 15, 13, 46, 16],
        [10, 142, 114, 2, 143, 115],
        [19, 74, 46, 4, 75, 47],
        [28, 50, 22, 6, 51, 23],
        [33, 46, 16, 4, 47, 17],
        [8, 152, 122, 4, 153, 123],
        [22, 73, 45, 3, 74, 46],
        [8, 53, 23, 26, 54, 24],
        [12, 45, 15, 28, 46, 16],
        [3, 147, 117, 10, 148, 118],
        [3, 73, 45, 23, 74, 46],
        [4, 54, 24, 31, 55, 25],
        [11, 45, 15, 31, 46, 16],
        [7, 146, 116, 7, 147, 117],
        [21, 73, 45, 7, 74, 46],
        [1, 53, 23, 37, 54, 24],
        [19, 45, 15, 26, 46, 16],
        [5, 145, 115, 10, 146, 116],
        [19, 75, 47, 10, 76, 48],
        [15, 54, 24, 25, 55, 25],
        [23, 45, 15, 25, 46, 16],
        [13, 145, 115, 3, 146, 116],
        [2, 74, 46, 29, 75, 47],
        [42, 54, 24, 1, 55, 25],
        [23, 45, 15, 28, 46, 16],
        [17, 145, 115],
        [10, 74, 46, 23, 75, 47],
        [10, 54, 24, 35, 55, 25],
        [19, 45, 15, 35, 46, 16],
        [17, 145, 115, 1, 146, 116],
        [14, 74, 46, 21, 75, 47],
        [29, 54, 24, 19, 55, 25],
        [11, 45, 15, 46, 46, 16],
        [13, 145, 115, 6, 146, 116],
        [14, 74, 46, 23, 75, 47],
        [44, 54, 24, 7, 55, 25],
        [59, 46, 16, 1, 47, 17],
        [12, 151, 121, 7, 152, 122],
        [12, 75, 47, 26, 76, 48],
        [39, 54, 24, 14, 55, 25],
        [22, 45, 15, 41, 46, 16],
        [6, 151, 121, 14, 152, 122],
        [6, 75, 47, 34, 76, 48],
        [46, 54, 24, 10, 55, 25],
        [2, 45, 15, 64, 46, 16],
        [17, 152, 122, 4, 153, 123],
        [29, 74, 46, 14, 75, 47],
        [49, 54, 24, 10, 55, 25],
        [24, 45, 15, 46, 46, 16],
        [4, 152, 122, 18, 153, 123],
        [13, 74, 46, 32, 75, 47],
        [48, 54, 24, 14, 55, 25],
        [42, 45, 15, 32, 46, 16],
        [20, 147, 117, 4, 148, 118],
        [40, 75, 47, 7, 76, 48],
        [43, 54, 24, 22, 55, 25],
        [10, 45, 15, 67, 46, 16],
        [19, 148, 118, 6, 149, 119],
        [18, 75, 47, 31, 76, 48],
        [34, 54, 24, 34, 55, 25],
        [20, 45, 15, 61, 46, 16],
      ]),
      (j.getRSBlocks = function (a, b) {
        var c = j.getRsBlockTable(a, b);
        if (void 0 == c)
          throw new Error(
            "bad rs block @ typeNumber:" + a + "/errorCorrectLevel:" + b
          );
        for (var d = c.length / 3, e = [], f = 0; d > f; f++)
          for (
            var g = c[3 * f + 0], h = c[3 * f + 1], i = c[3 * f + 2], k = 0;
            g > k;
            k++
          )
            e.push(new j(h, i));
        return e;
      }),
      (j.getRsBlockTable = function (a, b) {
        switch (b) {
          case d.L:
            return j.RS_BLOCK_TABLE[4 * (a - 1) + 0];
          case d.M:
            return j.RS_BLOCK_TABLE[4 * (a - 1) + 1];
          case d.Q:
            return j.RS_BLOCK_TABLE[4 * (a - 1) + 2];
          case d.H:
            return j.RS_BLOCK_TABLE[4 * (a - 1) + 3];
          default:
            return void 0;
        }
      }),
      (k.prototype = {
        get: function (a) {
          var b = Math.floor(a / 8);
          return 1 == (1 & (this.buffer[b] >>> (7 - (a % 8))));
        },
        put: function (a, b) {
          for (var c = 0; b > c; c++)
            this.putBit(1 == (1 & (a >>> (b - c - 1))));
        },
        getLengthInBits: function () {
          return this.length;
        },
        putBit: function (a) {
          var b = Math.floor(this.length / 8);
          this.buffer.length <= b && this.buffer.push(0),
            a && (this.buffer[b] |= 128 >>> this.length % 8),
            this.length++;
        },
      });
    var l = [
        [17, 14, 11, 7],
        [32, 26, 20, 14],
        [53, 42, 32, 24],
        [78, 62, 46, 34],
        [106, 84, 60, 44],
        [134, 106, 74, 58],
        [154, 122, 86, 64],
        [192, 152, 108, 84],
        [230, 180, 130, 98],
        [271, 213, 151, 119],
        [321, 251, 177, 137],
        [367, 287, 203, 155],
        [425, 331, 241, 177],
        [458, 362, 258, 194],
        [520, 412, 292, 220],
        [586, 450, 322, 250],
        [644, 504, 364, 280],
        [718, 560, 394, 310],
        [792, 624, 442, 338],
        [858, 666, 482, 382],
        [929, 711, 509, 403],
        [1003, 779, 565, 439],
        [1091, 857, 611, 461],
        [1171, 911, 661, 511],
        [1273, 997, 715, 535],
        [1367, 1059, 751, 593],
        [1465, 1125, 805, 625],
        [1528, 1190, 868, 658],
        [1628, 1264, 908, 698],
        [1732, 1370, 982, 742],
        [1840, 1452, 1030, 790],
        [1952, 1538, 1112, 842],
        [2068, 1628, 1168, 898],
        [2188, 1722, 1228, 958],
        [2303, 1809, 1283, 983],
        [2431, 1911, 1351, 1051],
        [2563, 1989, 1423, 1093],
        [2699, 2099, 1499, 1139],
        [2809, 2213, 1579, 1219],
        [2953, 2331, 1663, 1273],
      ],
      o = (function () {
        var a = function (a, b) {
          (this._el = a), (this._htOption = b);
        };
        return (
          (a.prototype.draw = function (a) {
            function g(a, b) {
              var c = document.createElementNS("http://www.w3.org/2000/svg", a);
              for (var d in b) b.hasOwnProperty(d) && c.setAttribute(d, b[d]);
              return c;
            }
            var b = this._htOption,
              c = this._el,
              d = a.getModuleCount();
            Math.floor(b.width / d), Math.floor(b.height / d), this.clear();
            var h = g("svg", {
              viewBox: "0 0 " + String(d) + " " + String(d),
              width: "100%",
              height: "100%",
              fill: b.colorLight,
            });
            h.setAttributeNS(
              "http://www.w3.org/2000/xmlns/",
              "xmlns:xlink",
              "http://www.w3.org/1999/xlink"
            ),
              c.appendChild(h),
              h.appendChild(
                g("rect", {
                  fill: b.colorDark,
                  width: "1",
                  height: "1",
                  id: "template",
                })
              );
            for (var i = 0; d > i; i++)
              for (var j = 0; d > j; j++)
                if (a.isDark(i, j)) {
                  var k = g("use", { x: String(i), y: String(j) });
                  k.setAttributeNS(
                    "http://www.w3.org/1999/xlink",
                    "href",
                    "#template"
                  ),
                    h.appendChild(k);
                }
          }),
          (a.prototype.clear = function () {
            for (; this._el.hasChildNodes(); )
              this._el.removeChild(this._el.lastChild);
          }),
          a
        );
      })(),
      p = "svg" === document.documentElement.tagName.toLowerCase(),
      q = p
        ? o
        : m()
        ? (function () {
            function a() {
              (this._elImage.src = this._elCanvas.toDataURL("image/png")),
                (this._elImage.style.display = "block"),
                (this._elCanvas.style.display = "none");
            }
            function d(a, b) {
              var c = this;
              if (
                ((c._fFail = b), (c._fSuccess = a), null === c._bSupportDataURI)
              ) {
                var d = document.createElement("img"),
                  e = function () {
                    (c._bSupportDataURI = !1), c._fFail && _fFail.call(c);
                  },
                  f = function () {
                    (c._bSupportDataURI = !0),
                      c._fSuccess && c._fSuccess.call(c);
                  };
                return (
                  (d.onabort = e),
                  (d.onerror = e),
                  (d.onload = f),
                  (d.src =
                    "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="),
                  void 0
                );
              }
              c._bSupportDataURI === !0 && c._fSuccess
                ? c._fSuccess.call(c)
                : c._bSupportDataURI === !1 && c._fFail && c._fFail.call(c);
            }
            if (this._android && this._android <= 2.1) {
              var b = 1 / window.devicePixelRatio,
                c = CanvasRenderingContext2D.prototype.drawImage;
              CanvasRenderingContext2D.prototype.drawImage = function (
                a,
                d,
                e,
                f,
                g,
                h,
                i,
                j
              ) {
                if ("nodeName" in a && /img/i.test(a.nodeName))
                  for (var l = arguments.length - 1; l >= 1; l--)
                    arguments[l] = arguments[l] * b;
                else
                  "undefined" == typeof j &&
                    ((arguments[1] *= b),
                    (arguments[2] *= b),
                    (arguments[3] *= b),
                    (arguments[4] *= b));
                c.apply(this, arguments);
              };
            }
            var e = function (a, b) {
              (this._bIsPainted = !1),
                (this._android = n()),
                (this._htOption = b),
                (this._elCanvas = document.createElement("canvas")),
                (this._elCanvas.width = b.width),
                (this._elCanvas.height = b.height),
                a.appendChild(this._elCanvas),
                (this._el = a),
                (this._oContext = this._elCanvas.getContext("2d")),
                (this._bIsPainted = !1),
                (this._elImage = document.createElement("img")),
                (this._elImage.style.display = "none"),
                this._el.appendChild(this._elImage),
                (this._bSupportDataURI = null);
            };
            return (
              (e.prototype.draw = function (a) {
                var b = this._elImage,
                  c = this._oContext,
                  d = this._htOption,
                  e = a.getModuleCount(),
                  f = d.width / e,
                  g = d.height / e,
                  h = Math.round(f),
                  i = Math.round(g);
                (b.style.display = "none"), this.clear();
                for (var j = 0; e > j; j++)
                  for (var k = 0; e > k; k++) {
                    var l = a.isDark(j, k),
                      m = k * f,
                      n = j * g;
                    (c.strokeStyle = l ? d.colorDark : d.colorLight),
                      (c.lineWidth = 1),
                      (c.fillStyle = l ? d.colorDark : d.colorLight),
                      c.fillRect(m, n, f, g),
                      c.strokeRect(
                        Math.floor(m) + 0.5,
                        Math.floor(n) + 0.5,
                        h,
                        i
                      ),
                      c.strokeRect(
                        Math.ceil(m) - 0.5,
                        Math.ceil(n) - 0.5,
                        h,
                        i
                      );
                  }
                this._bIsPainted = !0;
              }),
              (e.prototype.makeImage = function () {
                this._bIsPainted && d.call(this, a);
              }),
              (e.prototype.isPainted = function () {
                return this._bIsPainted;
              }),
              (e.prototype.clear = function () {
                this._oContext.clearRect(
                  0,
                  0,
                  this._elCanvas.width,
                  this._elCanvas.height
                ),
                  (this._bIsPainted = !1);
              }),
              (e.prototype.round = function (a) {
                return a ? Math.floor(1e3 * a) / 1e3 : a;
              }),
              e
            );
          })()
        : (function () {
            var a = function (a, b) {
              (this._el = a), (this._htOption = b);
            };
            return (
              (a.prototype.draw = function (a) {
                for (
                  var b = this._htOption,
                    c = this._el,
                    d = a.getModuleCount(),
                    e = Math.floor(b.width / d),
                    f = Math.floor(b.height / d),
                    g = ['<table style="border:0;border-collapse:collapse;">'],
                    h = 0;
                  d > h;
                  h++
                ) {
                  g.push("<tr>");
                  for (var i = 0; d > i; i++)
                    g.push(
                      '<td style="border:0;border-collapse:collapse;padding:0;margin:0;width:' +
                        e +
                        "px;height:" +
                        f +
                        "px;background-color:" +
                        (a.isDark(h, i) ? b.colorDark : b.colorLight) +
                        ';"></td>'
                    );
                  g.push("</tr>");
                }
                g.push("</table>"), (c.innerHTML = g.join(""));
                var j = c.childNodes[0],
                  k = (b.width - j.offsetWidth) / 2,
                  l = (b.height - j.offsetHeight) / 2;
                k > 0 && l > 0 && (j.style.margin = l + "px " + k + "px");
              }),
              (a.prototype.clear = function () {
                this._el.innerHTML = "";
              }),
              a
            );
          })();
    (QRCode = function (a, b) {
      if (
        ((this._htOption = {
          width: 256,
          height: 256,
          typeNumber: 4,
          colorDark: "#000000",
          colorLight: "#ffffff",
          correctLevel: d.H,
        }),
        "string" == typeof b && (b = { text: b }),
        b)
      )
        for (var c in b) this._htOption[c] = b[c];
      "string" == typeof a && (a = document.getElementById(a)),
        (this._android = n()),
        (this._el = a),
        (this._oQRCode = null),
        (this._oDrawing = new q(this._el, this._htOption)),
        this._htOption.text && this.makeCode(this._htOption.text);
    }),
      (QRCode.prototype.makeCode = function (a) {
        (this._oQRCode = new b(
          r(a, this._htOption.correctLevel),
          this._htOption.correctLevel
        )),
          this._oQRCode.addData(a),
          this._oQRCode.make(),
          (this._el.title = a),
          this._oDrawing.draw(this._oQRCode),
          this.makeImage();
      }),
      (QRCode.prototype.makeImage = function () {
        "function" == typeof this._oDrawing.makeImage &&
          (!this._android || this._android >= 3) &&
          this._oDrawing.makeImage();
      }),
      (QRCode.prototype.clear = function () {
        this._oDrawing.clear();
      }),
      (QRCode.CorrectLevel = d);
  })();
}

var video = document.getElementById("my-player");
video.setAttribute("class", "video-js vjs-fluid vjs-theme-forest");
// video.setAttribute("muted", "muted");
//video.setAttribute("autoplay", true);

function getOffset(el) {
  var _x = 0;
  var _y = 0;
  while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
    _x += el.offsetLeft - el.scrollLeft;
    _y += el.offsetTop - el.scrollTop;
    el = el.offsetParent;
  }
  return { top: _y, left: _x };
}

video.setAttribute("controls", true);

// get the configuration for the video player
var config = JSON.parse(video.getAttribute("data-config"));

document.addEventListener("PClick", (e) => {
  if (e.detail.clickname == lastClicked) {
    lastClicked = "";
    HideAll();
  } else {
    document.getElementById(e.detail.clickname).click();
    lastClicked = e.detail.clickname;
    window.setTimeout(() => {
      if (e.detail.clickname == "ButtonProduct") {
        var ele = document.getElementsByClassName("MenuCellContainerProducts");
        let List = "";
        for (var i = 0; i < ele.length; i++) {
          List =
            List +
            ele[i].id +
            "-" +
            Math.floor(getOffset(document.getElementById(ele[i].id)).left) +
            "-" +
            Math.floor(getOffset(document.getElementById(ele[i].id)).top) +
            ",";
        }
        console.log("List :>> ", List);
        JSProtocol.ProductList(List);
      }
    }, 2000);
  }
});
document.addEventListener("showtag", (e) => {
  if (vs == undefined) {
    vs = document.getElementById("my-player_html5_api");
    const mainContainer = document.getElementById("my-player");
    //mainContainer.appendChild(img);
    //vs.hidden = true;
  }
  //console.log(e.detail.image);
  //alert(e.detail.image);
  img.src = e.detail.image;
  //img.src = "hss";
  Player.currentTime(parseInt(e.detail.time));
  Player.pause();
  var event = new Event("start");
  document.dispatchEvent(event);

  //Player.pause();
  removeElementsByClass("vjs-control-bar");
  removeElementsByClass("vjs-loading-spinner");
});

function removeElementsByClass(className) {
  const elements = document.getElementsByClassName(className);
  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }
}

document.addEventListener("customFocus", (e) => {
  try {
    document.getElementById(e.detail.oldFocus).style.backgroundColor =
      "transparent";
  } catch (error) {
    console.log(error);
  }
  try {
    document.getElementById(e.detail.newFocus).style.backgroundColor = "red";
  } catch (error) {}
  console.log("e.newFocus", e.detail.newFocus);
});

document.addEventListener("test", (e) => {
  console.log(e);
  video.src = e.detail.url;
  console.log("vid", e.detail.url);

  // if the varaible studio is set. else load default
  if (e.detail.studio) {
    studio = e.detail.studio;
  }

  // if the variable desginer is set, else load default
  if (e.detail.designer) {
    designer = e.detail.designer;
  }

  // if the variable width is set, else load default
  if (e.detail.width) {
    videoCustomWidth = e.detail.width;
  }

  // if there is a user connected the system will overwerite the generate
  // user code for analytics and allow tracking on events and results
  if (e.detail.idUser) {
    id_user = e.detail.idUser;
  }

  // get the programcode
  ProgramCode = e.detail.videoId;

  // get the storage reference
  //ClientCode = "tag" + ProgramCode.split("-", 2)[1];
  ClientCode = "tag2081";

  // get the client reference
  client_id = ProgramCode.split("-", 2)[1];
  client_id = "2081";
});

// check if the video is loaded and set the global variables
// and adjust the iframe wrapper to the size of the video unless
// a default size has been specified

function tester() {
  console.log("plays", Player);
  video.play();
}

video.onloadedmetadata = function (e) {
  Player = videojs("my-player");

  var playerId = Player.id_;
  // if the studio setting is not set or set to false we load the plugin in published state
  // as one normal would load it, if a program is published we continue to load
  // else the plugin stops here.
  if (studio == false) {
    videoPublished(ClientCode, ProgramCode, Player, playerId, ProgramCode);
  }

  // if studio is true we load the showtag tool direcly on top of the video
  if (studio == true) {
    console.log("studio loaded");

    loadShowtag(Player, playerId, ProgramCode);
  }

  video.play();
};

// check if the video is published, if video is not published we do not continue
// with loading the rest of the script
function videoPublished(
  ClientCode,
  ProgramCode,
  Player,
  videoPlayerContainer,
  ProgramCode
) {
  console.log("videoPublished FIRED");

  // if the studio setting is not set or set to false we load the plugin in published state
  // as one normal would load it, if a program is published we continue to load
  // else the plugin stops here.

  // we check first if the program exists and is published
  var xhrPublishedPrograms = new XMLHttpRequest();
  xhrPublishedPrograms.open(
    "GET",
    "https://" +
      ClientCode +
      ".azurewebsites.net/api/ProgramsPublished/" +
      client_id,
    true
  );
  xhrPublishedPrograms.send();
  xhrPublishedPrograms.onreadystatechange = processRequestPublishedPrograms;

  function processRequestPublishedPrograms(e) {
    if (
      xhrPublishedPrograms.readyState == 4 &&
      xhrPublishedPrograms.status == 200
    ) {
      var PPData = JSON.parse(xhrPublishedPrograms.responseText);

      console.log(PPData);

      let publishedProgram = PPData.filter(
        (program) => program["ProgramCode"] === ProgramCode
      );

      if (publishedProgram.length == 1) {
        console.log("published programme found");

        // if program is detected then load
        loadShowtag(Player, videoPlayerContainer, ProgramCode);
      }
    }
  }
}

// load the specific player events: PAUSE | PLAY | SKIP | MOUSEOVER
function playerEvents(Player, videoPlayerContainer, settings) {
  // by-pass to get the current time of the video
  var vid = document
    .getElementById(videoPlayerContainer)
    .getElementsByTagName("video")[0];

  // when the mouse is over the video we pause the video
  if (settings.mouseOverPause == 1) {
    var el = document.getElementById(videoPlayerContainer);

    el.addEventListener("mouseover", mouseOver);

    el.addEventListener("mouseleave", mouseOut);

    function mouseOver() {
      Player.pause();
    }

    function mouseOut() {
      Player.play();
    }
  }

  // PLAYING
  Player.on("playing", function (e) {
    //JSProtocol.isPaused(false);
    console.log("video is playing");

    // hide the showtag layer
    document.getElementById("showtagenabled").zIndex = 2;
    document.getElementById("showtagenabled").style.display = "none";

    // show the showtag logo in the bottom right corner for 3 seconds
    document.getElementById("ShowtagLogo").style.display = "block";
    setTimeout(function () {
      document.getElementById("ShowtagLogo").style.display = "none";
    }, 3000);

    // hide elements when video continues play
    HideOnPlay(settings);

    // analytics

    // get the time of the pause and convert it into milisections and match with speed
    var currentTime =
      (Math.floor(vid.currentTime * (1000 / settings.FrameSpeed)) /
        (1000 / settings.FrameSpeed)) *
      1000;

    AnalyticsPlayClicked(currentTime, settings);
  });

  document.addEventListener("start", () => {
    console.log("video is paused");

    // hide all possible interactions on the screen
    HideAll(settings);

    // hide all possible active elements on the screen
    HideAllActive(settings);

    // hide the showtag logo
    document.getElementById("ShowtagLogo").style.display = "none";

    // show the showtag layer
    document.getElementById("showtagenabled").style.display = "block";
    document.getElementById("showtagenabled").style.zIndex = 2;
    // get the time of the pause and convert it into milisections and match with speed
    var currentTime =
      (Math.floor(Player.currentTime() * (1000 / settings.FrameSpeed)) /
        (1000 / settings.FrameSpeed)) *
      1000;

    console.log("currentTime: " + currentTime);

    // if there are product tags connected check if there is information for this time segment
    if (settings.ProductsInProgram != 0) {
      ProductTags(currentTime, settings);
    }

    // if there are celebrities connected check if there is information for this time segment
    if (settings.CelebritiesInProgram != 0) {
      CelebrityTags(currentTime, settings);
    }

    // if there is music connected to the video check if there is music for the time segment
    if (settings.MusicInProgram != 0) {
      MusicInFrame(currentTime, settings);
    }

    // if there are forms present in the video check if a form exists for the time segment
    if (settings.FormInProgram != 0) {
      FormInFrame(currentTime, settings);
    }

    // if there are banner connected to the video, check if a banner exists for the time segment
    if (settings.BannersInProgram != 0) {
      BannersInFrame(currentTime, settings);
    }

    // analytics
    AnalyticsPauseClicked(currentTime, settings);
  });

  Player.on("pause", function (e) {
    //JSProtocol.isPaused(true);
  });

  //PAUSE
  // Player.on("pause", function (e) {
  //   console.log("video is paused");

  //   // hide all possible interactions on the screen
  //   HideAll(settings);

  //   // hide all possible active elements on the screen
  //   HideAllActive(settings);

  //   // hide the showtag logo
  //   document.getElementById("ShowtagLogo").style.display = "none";

  //   // show the showtag layer
  //   document.getElementById("showtagenabled").style.display = "block";

  //   // get the time of the pause and convert it into milisections and match with speed
  //   var currentTime =
  //     (Math.floor(Player.currentTime() * (1000 / settings.FrameSpeed)) /
  //       (1000 / settings.FrameSpeed)) *
  //     1000;

  //   console.log("currentTime: " + currentTime);

  //   // if there are product tags connected check if there is information for this time segment
  //   if (settings.ProductsInProgram != 0) {
  //     ProductTags(currentTime, settings);
  //   }

  //   // if there are celebrities connected check if there is information for this time segment
  //   if (settings.CelebritiesInProgram != 0) {
  //     CelebrityTags(currentTime, settings);
  //   }

  //   // if there is music connected to the video check if there is music for the time segment
  //   if (settings.MusicInProgram != 0) {
  //     MusicInFrame(currentTime, settings);
  //   }

  //   // if there are forms present in the video check if a form exists for the time segment
  //   if (settings.FormInProgram != 0) {
  //     FormInFrame(currentTime, settings);
  //   }

  //   // if there are banner connected to the video, check if a banner exists for the time segment
  //   if (settings.BannersInProgram != 0) {
  //     BannersInFrame(currentTime, settings);
  //   }

  //   // analytics
  //   AnalyticsPauseClicked(currentTime, settings);
  // });

  // SEEKING
  Player.on("seeking", function (e) {
    console.log("video is seeking");

    // hide the showtag layer
    document.getElementById("showtagenabled").style.display = "none";

    // show the showtag logo in the bottom right corner for 3 seconds
    document.getElementById("ShowtagLogo").style.display = "block";
    setTimeout(function () {
      document.getElementById("ShowtagLogo").style.display = "none";
    }, 3000);
  });

  // FULL SCREEN DETECTION
  document.addEventListener("fullscreenchange", function () {
    checkFullscreen(vid);
  });
}

// detect if the player goes on fullscreen, then hide the showtag layer and resize it
// according to screen size in ratio to the video size, bars will be place vertical
// or horizontal next to the video
function checkFullscreen(vid) {
  //TEST VIDEO: Width 1920
  //TEST VIDEO: Height 1080

  var original_video_width = vid.videoWidth; //get the original width
  console.log("original_video_width: " + original_video_width);

  var original_video_height = vid.videoHeight; //get the original height
  console.log("original_video_height: " + original_video_height);

  showtagenabled.style.display = "none";

  HideAll(settings);

  var containerWidth = vid.clientWidth;

  console.log("containerWidth: " + containerWidth);

  var containerHeight = vid.clientHeight;

  console.log("containerHeight: " + containerHeight);

  var screen_width = screen.width;

  console.log("screen_width: " + screen_width);

  var screen_height = screen.height;

  console.log("screen_height: " + screen_height);

  var videoAspectRatio = (original_video_width / original_video_height)
    .toString()
    .match(/^-?\d+(?:\.\d{0,2})?/)[0]; //16:9 = 1.77 movie: 2.4

  // console.log("videoAspectRatio: " + videoAspectRatio);

  var screenAspectRatio = (screen_width / screen_height)
    .toString()
    .match(/^-?\d+(?:\.\d{0,2})?/)[0]; //

  // console.log("screenAspectRatio: " + screenAspectRatio);

  if (document.fullscreenElement) {
    if (screenAspectRatio == videoAspectRatio) {
      // screen
      // 1920 x 1080 = 1.77

      // video
      // 1920 x 1080 = 1.77 YES

      console.log("screenAspectRatio == videoAspectRatio");

      console.log("videoAspectRatio: " + videoAspectRatio);
      console.log("screenAspectRatio: " + screenAspectRatio);

      // screen and video will fill 100%

      document.getElementById("showtagenabled").style.width = screen_width;
      document.getElementById("showtagenabled").style.height = screen_height;
    } else if (screenAspectRatio >= videoAspectRatio) {
      // screenAspectRatio >= videoAspectRatio

      // screen
      // 3440 x 1440 = 2.38
      // 1920 x 1080 = 1.77
      // 1920 x 1200 = 1.6

      // video
      // 1920 x 1080 = 1.77 YES
      // 720 x 1280 = 0.56 (iphone video portait) YES

      // OFFSET LEFT AND RIGHT

      console.log("screenAspectRatio >= videoAspectRatio");

      console.log("videoAspectRatio: " + videoAspectRatio);
      console.log("screenAspectRatio: " + screenAspectRatio);

      console.log("screen has a bigger aspect ratio");

      // GET THE ORIGINAL VIDEO WIDTH AND CALCULATE THE FACTOR WITH THE SCREEN RESOLUTION
      var factor = screen_height / original_video_height;
      console.log(factor);

      // MULTIPLY THE HEIGHT OF THE ORIGINAL VIDEO WITH THE FACTOR
      var new_video_width = original_video_width * factor;
      console.log(new_video_width);

      // SUBSTRACT THE NEW_VIDEO_HEIGHT FROM THE SCREENHEIGHT
      var offsetTotal = screen_width - new_video_width;
      console.log(offsetTotal);

      // DIVIDE THE OFFSET TOTAL BY 2 TO GET THE BLACK BARS
      var offset_left = offsetTotal / 2;

      document.getElementById("showtagenabled").style.width = new_video_width;
      document.getElementById("showtagenabled").style.height = screen_height;
      document.getElementById("showtagenabled").style.left = offset_left + "px";
    } else if (screenAspectRatio <= videoAspectRatio) {
      // screen
      // 3440 x 1440 = 2.38
      // 1920 x 1080 = 1.77
      // 1920 x 1200 = 1.6

      // video
      // 1920 x 800 = 2.4

      console.log("screenAspectRatio <= videoAspectRatio");

      console.log("videoAspectRatio: " + videoAspectRatio);
      console.log("screenAspectRatio: " + screenAspectRatio);

      // here the screen height is more as the video height

      // GET THE ORIGINAL VIDEO WIDTH AND CALCULATE THE FACTOR WITH THE SCREEN RESOLUTION
      var factor = screen_width / original_video_width;
      // 2.6875 = 3440 / 1280

      // MULTIPLY THE HEIGHT OF THE ORIGINAL VIDEO WITH THE FACTOR
      var new_video_height = original_video_height * factor;
      // 3.225 = 1200 * 2.6875

      // SUBSTRACT THE NEW_VIDEO_HEIGHT FROM THE SCREENHEIGHT
      var offsetTotal = screen_height - new_video_height;

      // DIVIDE THE OFFSET TOTAL BY 2 TO GET THE BLACK BARS
      var offset_top = offsetTotal / 2;

      document.getElementById("showtagenabled").style.width = screen_width;
      document.getElementById("showtagenabled").style.height = new_video_height;
      document.getElementById("showtagenabled").style.top = offset_top + "px";
    } else {
    }
  } else {
    console.log("Normal");

    // this would be the default load [WORKS FINE]

    document.getElementById("showtagenabled").style.width = containerWidth;
    document.getElementById("showtagenabled").style.height = containerHeight;
    document.getElementById("showtagenabled").style.top = "0px";
    document.getElementById("showtagenabled").style.left = "0px";
  }
}

// adjust the video container is a custom width has been set, we adjust it to the videoWrapper
function adjustSizevideoPlayerContainer(videoCustomWidth) {
  var videoWrapper = window.parent.document.getElementById("videoWrapper");

  // overrule the basic setting of dimensions of the video
  if (videoCustomWidth) {
    videoWidth = videoCustomWidth;
  } else {
    videoWidth = video.videoWidth + "px";
  }

  console.log(video.videoHeight + "px");

  videoWrapper.style.width = videoWidth;
  videoWrapper.style.height = video.videoHeight + "px";
  videoWrapper.setAttribute("scrolling", "no");
  videoWrapper.setAttribute("frameborder", "0");
}

// SHOWTAG BELOW

// SET GLOBAL VARIABLES FOR SHOWTAG
var ProductData = [];
var ProductDetailsData = [];
var ProductDataCustom = [];
var CelebrityData = [];
var CelebrityDetailsData = [];
var celebrityVideos = [];
var MusicData = [];
var currentTime;
var lengthOfVideo;
var PollData = [];
var CelebrityVideoOverviewdata = [];

// load showtag layer and check all the settings
async function loadShowtag(Player, videoPlayerContainer, ProgramCode) {
  const settings = await getProgramDetails(ProgramCode);

  // we resize the iframe to the video's exact width and height
  adjustSizevideoPlayerContainer(videoCustomWidth);

  // creation of the showtag interaction layer
  showtagLayer(videoPlayerContainer);

  // creation of the showtag logo in the bottom right of the screen
  showtagLogo(videoPlayerContainer);

  // creation of the showtag layer containers
  showtagContainers(videoPlayerContainer);

  // creation of the active elements on top of the video with the timer function
  showtagActiveElemets(settings, Player, videoPlayerContainer);

  // SWITCHES

  // VARIABLES
  var CustomShoppingList = 0,
    customTopButtonLinkText = "",
    customTopButtonLink = "",
    ProductsInProgram = "",
    CelebritiesInProgram = "",
    CustomCelebritiesInProgram = "",
    CustomProductsInProgram = "",
    LivePoll = "",
    MusicInProgram = "",
    activeMenuButton01 = "",
    activeMenuButton02 = "",
    activeMenuButton03 = "",
    activeMenuButton04 = "",
    activeMenuButton05 = "",
    celebrityVideoOverview = "",
    livelayer = false;
  var FavoritesActivated = false;
  var CustomShoppingList = false;
  var ProductsInProgram = "";
  var CelebritiesInProgram = "";
  var ProgramInformationActive = false;
  var livelayer = false;
  var buttonOverLive = false;
  var mouseOverPauseVideo = false;
  var mouseOverLiveVideo = false;
  var executedSkip = false;
  var executedForm = false;
  var executedPauseTo = false;
  var executedBanner = false;
  var executedCallToAction = false;

  //creation of the live button when the video is player to show the layer
  if (settings.buttonOverLive == 1) {
    buttonOverlive(videoPlayerContainer);
  }

  // set live layer to true if any of these are true
  if (settings.buttonOverLive == 1 || settings.mouseOverLive == 1) {
    livelayer = true;
  }

  if (settings.customTopButtonLinkVisible == 1) {
    CustomShoppingList = 1;

    customTopButtonLinkText = settings.customTopButtonLinkText;

    customTopButtonLink = settings.customTopButtonLink;
  }

  if (settings.ProductTopButtonText != "disabled") {
    if (settings.ProductsInProgram != 0) {
      ProductsInProgram =
        '<div id="ButtonProduct" class="defaultMenuButton" style="pointer-events:initial; user-select: none;">' +
        settings.ProductTopButtonText +
        '<div id="ButtonProductLoader" class="defaultMenuLoader" style="display:none;"></div><div class="defaultMenuExtra"></div></div>';
    }
  }

  if (settings.CelebrityTopButtonText != "disabled") {
    if (settings.CelebritiesInProgram != 0) {
      CelebritiesInProgram =
        '<div id="ButtonCelebrity" class="defaultMenuButton" style="pointer-events:initial; user-select: none;">' +
        settings.CelebrityTopButtonText +
        '<div id="ButtonCelebrityLoader" class="defaultMenuLoader" style="display:none;"></div><div class="defaultMenuExtra"></div></div>';
    }
  }

  if (settings.customCelebrityTopButton == 1) {
    if (settings.CelebritiesInProgram != 0) {
      CustomCelebritiesInProgram =
        '<div id="ButtonCustomCelebrity" class="defaultMenuButton" style="pointer-events:initial; user-select: none;">' +
        settings.customCelebrityTopButtonText +
        '<div id="ButtonCustomCelebrityLoader" class="defaultMenuLoader" style="display:none;"></div><div class="defaultMenuExtra"></div></div>';
    }
  }

  if (settings.celebrityVideoOverview == 1) {
    if (settings.CelebritiesInProgram != 0) {
      celebrityVideoOverview =
        '<div id="ButtonCelebrityVideoOverview" class="defaultMenuButton" style="pointer-events:initial; user-select: none;">' +
        settings.celebrityVideoOverviewText +
        '<div id="ButtonCelebrityVideoOverviewLoader" class="defaultMenuLoader" style="display:none;"></div><div class="defaultMenuExtra"></div></div>';
    }
  }

  if (settings.customTopButton == 1) {
    CustomProductsInProgram =
      '<div id="ButtonCustomProduct" class="defaultMenuButton" style="pointer-events:initial; user-select: none;">' +
      settings.customTopButtonText +
      '<div id="ButtonCustomProductLoader" class="defaultMenuLoader" style="display:none;"></div><div class="defaultMenuExtra"></div></div>';
  }

  if (settings.livePollsTopButton == 1) {
    LivePoll =
      '<div id="ButtonLivePoll" class="defaultMenuButton" style="pointer-events:initial; user-select: none;">' +
      settings.livePollsTopButtonText +
      '<div id="ButtonLivePollLoader" class="defaultMenuLoader" style="display:none;"></div> <div id="ButtonLivePollExtra"></div><div class="defaultMenuExtra"></div></div>';
  }

  if (settings.musicTopButtonText != "disabled") {
    if (settings.MusicInProgram != 0) {
      MusicInProgram =
        '<div id="ButtonMusic" class="defaultMenuButton" style="pointer-events:initial; user-select: none;">' +
        settings.musicTopButtonText +
        '<div id="ButtonMusicLoader" class="defaultMenuLoader" style="display:none;"></div><div class="defaultMenuExtra"></div></div>';
    }
  }

  if (settings.activeMenuButton01 == 1) {
    activeMenuButton01 =
      '<div id="activeMenuButton01" style="pointer-events:initial" class="defaultMenuButton" onclick="window.open(&#39;' +
      settings.activeMenuButton01url +
      '&#39;)">' +
      settings.activeMenuButton01text +
      '<div class="defaultMenuExtra"></div></div>';
  }

  if (settings.activeMenuButton02 == 1) {
    activeMenuButton02 =
      '<div id="activeMenuButton02" style="pointer-events:initial" class="defaultMenuButton" onclick="window.open(&#39;' +
      settings.activeMenuButton02url +
      '&#39;)">' +
      settings.activeMenuButton02text +
      '<div class="defaultMenuExtra"></div></div>';
  }

  if (settings.activeMenuButton03 == 1) {
    activeMenuButton03 =
      '<div id="activeMenuButton03" style="pointer-events:initial" class="defaultMenuButton" onclick="window.open(&#39;' +
      settings.activeMenuButton03url +
      '&#39;)">' +
      settings.activeMenuButton03text +
      '<div class="defaultMenuExtra"></div></div>';
  }

  if (settings.activeMenuButton04 == 1) {
    activeMenuButton04 =
      '<div id="activeMenuButton04" style="pointer-events:initial" class="defaultMenuButton" onclick="window.open(&#39;' +
      settings.activeMenuButton04url +
      '&#39;)">' +
      settings.activeMenuButton04text +
      '<div class="defaultMenuExtra"></div></div>';
  }

  if (settings.activeMenuButton05 == 1) {
    activeMenuButton05 =
      '<div id="activeMenuButton05" style="pointer-events:initial" class="defaultMenuButton" onclick="window.open(&#39;' +
      settings.activeMenuButton05url +
      '&#39;)">' +
      settings.activeMenuButton05text +
      '<div class="defaultMenuExtra"></div></div>';
  }

  // STYLESHEET SECTION

  if (designer != true) {
    console.log("designer off");

    if (settings.customStyleSheet == 1) {
      // LOAD THE STYLE SHEET (CUSTOM)
      var ss = document.createElement("link");
      ss.type = "text/css";
      ss.rel = "stylesheet";
      ss.href = settings.styleSheetUrl;
      document.getElementsByTagName("head")[0].appendChild(ss);
    }

    if (settings.customStyleSheet == null || settings.customStyleSheet == 0) {
      // LOAD THE STYLE SHEET (DEFAULT)
      var ssd = document.createElement("link");
      ssd.type = "text/css";
      ssd.rel = "stylesheet";
      ssd.href =
        "https://" +
        ClientCode +
        ".blob.core.windows.net/api/Stylesheets/showtagenabled.css";
      document.getElementsByTagName("head")[0].appendChild(ssd);
    }
  }

  if (designer == true) {
    console.log("designer on");

    // LOAD THE STYLE SHEET (CUSTOM)
    var ss = document.createElement("link");
    ss.type = "text/css";
    ss.rel = "stylesheet";
    ss.href = "CSS/showtagenabled.css";
    document.getElementsByTagName("head")[0].appendChild(ss);
  }

  if (settings.mouseOverLive == 1) {
    var el = document.getElementById(videoPlayerContainer);

    el.addEventListener("mouseover", mouseOver);

    el.addEventListener("mouseleave", mouseOut);

    function mouseOver() {
      document.getElementById("showtagenabled").style.display = "block";
    }

    function mouseOut() {
      document.getElementById("showtagenabled").style.display = "none";
    }
  }

  // this gathers all the above switches to create the menu
  // and handles the clicks on the buttons

  if (settings.topBarVisible == 1) {
    // SHOW THE TOPBAR
    var TopBar = document.createElement("div");
    TopBar.id = "ButtonContainer";
    TopBar.className = "ButtonContainer";
    TopBar.style = "position:absolute; z-index:100;";
    TopBar.innerHTML =
      "" +
      CelebritiesInProgram +
      CustomCelebritiesInProgram +
      ProductsInProgram +
      CustomProductsInProgram +
      MusicInProgram +
      LivePoll +
      celebrityVideoOverview +
      '<div id="activeButtonContainer">' +
      activeMenuButton01 +
      activeMenuButton02 +
      activeMenuButton03 +
      activeMenuButton04 +
      activeMenuButton05 +
      "</div>" +
      "</div>";

    document.getElementById("showtagenabled").appendChild(TopBar);

    // this will hide the buttonMenu and show a button on the screen
    // click the button and the menu becomes visible
    var minimizeButton = document.createElement("div");
    minimizeButton.id = "minimizeButtonContainer";
    minimizeButton.className = "minimizeButtonContainer";
    minimizeButton.style = "position:absolute; display:none;";
    minimizeButton.innerHTML =
      "" + '<div id="minimizeText">' + settings.menuMinimizeText + "</div>";
    document.getElementById("showtagenabled").appendChild(minimizeButton);

    if (settings.ProductTopButtonText != "disabled") {
      if (settings.ProductsInProgram != 0) {
        document.getElementById("ButtonProduct").onclick = function () {
          GetAllProducts(settings, ProgramCode);
        };
      }
    }

    if (settings.CelebrityTopButtonText != "disabled") {
      if (settings.CelebritiesInProgram != 0) {
        if (livelayer == true) {
          var switchCMC = false;

          document.getElementById("ButtonCelebrity").onclick = function () {
            var id = document.getElementById("CelebrityMenuContainer");

            if (id != null) {
              if (switchCMC == false) {
                id.style.display = "none";

                switchCMC = true;
              } else {
                id.style.display = "block";

                switchCMC = false;
              }
            } else {
              GetAllCelebrities(0, settings, ProgramCode);
            }
          };
        } else {
          document.getElementById("ButtonCelebrity").onclick = function () {
            GetAllCelebrities(0, settings, ProgramCode);
          };
        }
      }
    }

    if (settings.customCelebrityTopButton == 1) {
      if (settings.CelebritiesInProgram != 0) {
        if (livelayer == true) {
          var switchCCMC = false;

          document.getElementById("ButtonCustomCelebrity").onclick =
            function () {
              var id = document.getElementById("CelebrityCustomMenuContainer");

              if (id != null) {
                if (switchCCMC == false) {
                  id.style.display = "none";

                  switchCCMC = true;
                } else {
                  id.style.display = "block";

                  switchCCMC = false;
                }
              } else {
                GetAllCelebrities(1, settings, ProgramCode);
              }
            };
        } else {
          document.getElementById("ButtonCustomCelebrity").onclick =
            function () {
              GetAllCelebrities(1, settings, ProgramCode);
            };
        }
      }

      // SAVE CLICK TO ANALYTICS
      var productAnalyticsClickExternalLink = document.getElementsByClassName(
        "productexternallink"
      );

      for (var i = 0; i < productAnalyticsClickExternalLink.length; i++) {
        productAnalyticsClickExternalLink[i].onclick = function () {
          AnalyticsProductExternalLink(DivIdProduct, settings);
        };
      }
    }

    if (settings.customTopButton == 1) {
      document.getElementById("ButtonCustomProduct").onclick = function () {
        GetAllCustomProducts(settings, ProgramCode);

        AnalyticsMenuCustomProduct(settings);
      };
    }

    if (settings.livePollsTopButton == 1) {
      document.getElementById("ButtonLivePoll").onclick = function () {
        GetLivePoll(settings, ProgramCode);
      };
    }

    if (settings.musicTopButtonText != "disabled") {
      document.getElementById("ButtonMusic").onclick = function () {
        GetAllMusic(settings, ProgramCode);
      };
    }

    // OLD VERSION COULD BE REMOVED
    if (settings.favoriteButtonsActivated == 1) {
      document.getElementById("ButtonFavorites").onclick = function () {
        GetFavoriteCelebrities();
      };
    }

    if (settings.celebrityVideoOverview == 1) {
      if (settings.CelebritiesInProgram != 0) {
        if (livelayer == true) {
          var switchCMC = false;

          document.getElementById("ButtonCelebrityVideoOverview").onclick =
            function () {
              var id = document.getElementById(
                "CelebrityVideoOverviewContainer"
              );

              if (id != null) {
                if (switchCMC == false) {
                  id.style.display = "none";

                  switchCMC = true;
                } else {
                  id.style.display = "block";

                  switchCMC = false;

                  GetCelebrityVideoOverview(settings, ProgramCode);
                }
              } else {
                GetCelebrityVideoOverview(settings, ProgramCode);
              }
            };
        } else {
          document.getElementById("ButtonCelebrityVideoOverview").onclick =
            function () {
              GetCelebrityVideoOverview(settings, ProgramCode);
            };
        }
      }
    }

    // analytics
    if (settings.activeMenuButton01 == 1) {
      document.getElementById("activeMenuButton01").onclick = function () {
        AnalyticsMenuActiveButton(settings.activeMenuButton01text, settings);
      };
    }

    if (settings.activeMenuButton02 == 1) {
      document.getElementById("activeMenuButton02").onclick = function () {
        AnalyticsMenuActiveButton(settings.activeMenuButton02text, settings);
      };
    }

    if (settings.activeMenuButton03 == 1) {
      document.getElementById("activeMenuButton03").onclick = function () {
        AnalyticsMenuActiveButton(settings.activeMenuButton03text, settings);
      };
    }

    if (settings.activeMenuButton04 == 1) {
      document.getElementById("activeMenuButton04").onclick = function () {
        AnalyticsMenuActiveButton(settings.activeMenuButton04text, settings);
      };
    }

    if (settings.activeMenuButton05 == 1) {
      document.getElementById("activeMenuButton05").onclick = function () {
        AnalyticsMenuActiveButton(settings.activeMenuButton05text, settings);
      };
    }
  }

  playerEvents(Player, videoPlayerContainer, settings);
}

// get the video settings
function getProgramDetails(ProgramCode) {
  return new Promise((resolve) => {
    if (studio == true) {
      url =
        "https://tagapi.azurewebsites.net/api/Prepare/Program/" + ProgramCode;
    } else {
      url =
        "https://" +
        ClientCode +
        ".azurewebsites.net/api/Program/" +
        ProgramCode +
        "/" +
        id_user +
        "/" +
        client_id;
    }

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.send();
    xhr.onreadystatechange = processRequest;

    function processRequest(e) {
      if (xhr.readyState == 4 && xhr.status == 200) {
        console.log(JSON.parse(xhr.responseText));

        resolve(JSON.parse(xhr.responseText));
      }
    }
  });
}

// creation of the showtag interaction layer
function showtagLayer(videoPlayerContainer) {
  console.log(videoPlayerContainer);

  var video = document.getElementById(videoPlayerContainer);

  var video_width = video.offsetWidth + "px";

  var video_height = video.offsetHeight + "px";

  // CREATE THE SHOWTAG LAYER
  var showtagenabledLayer = document.createElement("div");
  showtagenabledLayer.setAttribute("id", "showtagenabled");
  showtagenabledLayer.setAttribute(
    "style",
    "position:absolute;top:0px;pointer-events:none; overflow:hidden; display:none;"
  );
  showtagenabledLayer.style.width = video_width;
  showtagenabledLayer.style.height = video_height;
  document
    .getElementById(videoPlayerContainer)
    .appendChild(showtagenabledLayer);
}

// creation of the showtag logo in the bottom right of the screen
function showtagLogo(videoPlayerContainer) {
  // CREATE THE SHOWTAG LOGO LAYER
  var ShowtagLogo = document.createElement("div");
  ShowtagLogo.setAttribute("id", "ShowtagLogo");
  ShowtagLogo.innerHTML =
    '<img style="position:absolute; width: 60px; height: 55px; right: 10px; bottom: 45px; opacity: 1; pointer-events: none;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA4CAYAAABZjWCTAAAACXBIWXMAADIjAAAyIwHN55PYAAAYO2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDggNzkuMTY0MDM2LCAyMDE5LzA4LzEzLTAxOjA2OjU3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wOkNyZWF0ZURhdGU9IjIwMTgtMDctMThUMjA6NDQ6NDArMDI6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjAtMDMtMjVUMDk6MjI6MDkrMDE6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIwLTAzLTI1VDA5OjIyOjA5KzAxOjAwIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjUzMzViZjQ1LWJjNDctNjI0NS05YzliLThlYmNhOWZiOTM0OCIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjg2MTc3YzFhLTE2MWYtZjc0Zi1iM2JiLTE3OWI1ZjRhNDU5YSIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjE5ZDI3MjEwLWNjM2QtOWI0OC05N2VkLTQyYjYwNzhlYzEyYiI+IDxwaG90b3Nob3A6RG9jdW1lbnRBbmNlc3RvcnM+IDxyZGY6QmFnPiA8cmRmOmxpPjAyNTM0NzRENjZGRjRCNEZDN0I3ODM2NjNDQjgzQkJFPC9yZGY6bGk+IDxyZGY6bGk+MEUwMzM3MkY3RkI3OUExMTZFRTQzRkVERUY1Qzk2RTg8L3JkZjpsaT4gPHJkZjpsaT4xNDkxNzNGM0FGMDc0OTk0RTlGRDdCQTAyN0I4NjREMTwvcmRmOmxpPiA8cmRmOmxpPjE2ODJDMUJFMDlCODVGODQ3M0Y1QzY5ODBBNjcwRUVFPC9yZGY6bGk+IDxyZGY6bGk+MUMzMjE3RjM2ODA0NDVBNzk1QkZDNjRCQ0JEODJBNEM8L3JkZjpsaT4gPHJkZjpsaT4xRDVERURGMEFBM0Y5MjkxQ0M4NTI2OTY2MUQ0MEI3NDwvcmRmOmxpPiA8cmRmOmxpPjIzMjNBRTdEODJERTZGRkIxQ0U4NzQwOUNFRDZBM0MwPC9yZGY6bGk+IDxyZGY6bGk+MjQxRjREN0JEQjcxQUU4MjNEOTBBMUQwOTA4ODc0RDc8L3JkZjpsaT4gPHJkZjpsaT4yNzU5Q0JBMDcwQkI2M0VGN0I4OEUyRTg5NTZFNzQxODwvcmRmOmxpPiA8cmRmOmxpPjI4Njk0QUMyQjVFRUJBN0UyNUM5RUM3OTA3MUUzMTk0PC9yZGY6bGk+IDxyZGY6bGk+MkNEOTk3N0Y0Q0RGM0I4NDQ0RjNGNzBEQkU5MkY0ODA8L3JkZjpsaT4gPHJkZjpsaT40N0I2NjE5QzFCNEM2RDBENTgwNkI0ODA0QUQ0M0Y4MDwvcmRmOmxpPiA8cmRmOmxpPjRENzcyNUYwQ0VCMjlGRUM1NTA0RkQ0NjkwMzI0RjQwPC9yZGY6bGk+IDxyZGY6bGk+NTFCNjRCQTM4QUVEOTcwOEVCOUFCRjhERDZGMEQ0Q0U8L3JkZjpsaT4gPHJkZjpsaT41MzlBRDBFRkRGQzU4N0U5MzM0NjgyMkEyMjFCQkQwQTwvcmRmOmxpPiA8cmRmOmxpPjVBNUEyOUUyQzI1MzMzNkY4REFFRjVGQThENjFCNTgwPC9yZGY6bGk+IDxyZGY6bGk+NjY2RDI4RDkyQkE4QTVDRjhGMkJBQTI3RkJBRDQxN0I8L3JkZjpsaT4gPHJkZjpsaT42NkE1MTk3NkU3M0QxNDI1RjEyOEM3ODNBNDgwOURDODwvcmRmOmxpPiA8cmRmOmxpPjgzNDZDQ0M4Q0RCMTdCM0U1MEI0MDVDOUNDNUQ2NThEPC9yZGY6bGk+IDxyZGY6bGk+OEJDNThGMDY5MzY3RTk5MTYyMUM1Q0NGNEFCM0VEODk8L3JkZjpsaT4gPHJkZjpsaT45MjE0MDdBOEY1QzE3NDk4NEU0MTE3QUU5MzkxNENDRjwvcmRmOmxpPiA8cmRmOmxpPjk2RUQ1OUU5MzIyNjc4N0Q0MUEyMUM1OTc4NzE2MEVCPC9yZGY6bGk+IDxyZGY6bGk+OUI1QjFFMUQ1ODU2M0JDQ0NFQUQ5NTFCNjVCQzVDMjI8L3JkZjpsaT4gPHJkZjpsaT5BNjFGMjdCMUIyMTA2NDQ0Njg0RDNEMERDQjMyRTVBQzwvcmRmOmxpPiA8cmRmOmxpPkFBQjNFNDQwRDhBM0JCNzNGNTA3Qjk3RUM5M0JGMEFEPC9yZGY6bGk+IDxyZGY6bGk+QjE4ODY3NjE3QzMwQjlGNjVFODk2RjM0NkJGRjIwNjI8L3JkZjpsaT4gPHJkZjpsaT5CODU5QzJDRUZEMDVGM0NBQzYyQzhENUFBQTQzOTI5MTwvcmRmOmxpPiA8cmRmOmxpPkJFQzM1NjJDNjAzMTgwREFBNDdGNTE0QTE2QjkzNEFGPC9yZGY6bGk+IDxyZGY6bGk+QkZCRTg2MTlBMDYzRTA3QjM0NEY5NkU1NTYyRDVGNjM8L3JkZjpsaT4gPHJkZjpsaT5DMDU3ODlGQkVEQzIyQzJGQkFDN0ZERDVERjQ5MzlENjwvcmRmOmxpPiA8cmRmOmxpPkM0Qzg4NDY4NDdDMjgxOTM0N0Q5QTcxRjZGMUNDMzc1PC9yZGY6bGk+IDxyZGY6bGk+Q0Q2NEQzNEIwOEZEODcyOUQ5QUJFNTRBOTk4NkQyMDE8L3JkZjpsaT4gPHJkZjpsaT5GRDdGMzdEN0QzMDk2OUVENTAxQUE3MTk2RDMxRERFQTwvcmRmOmxpPiA8cmRmOmxpPmFkb2JlOmRvY2lkOnBob3Rvc2hvcDoxMmZmNTRmZC01ZmNiLTExN2EtOTQzYy1iYWJiOGQ3ZGVmNmE8L3JkZjpsaT4gPHJkZjpsaT54bXAuZGlkOjE5ZDI3MjEwLWNjM2QtOWI0OC05N2VkLTQyYjYwNzhlYzEyYjwvcmRmOmxpPiA8cmRmOmxpPnhtcC5kaWQ6M2JjOGE4ZGEtMWZiMi1jNDQ0LThlMmMtNTMyZTFkNjJkZTY2PC9yZGY6bGk+IDxyZGY6bGk+eG1wLmRpZDo0MTIxMjNFMTZFRTcxMUUzQkNFNkY1OUYxNDYzMjY4MzwvcmRmOmxpPiA8cmRmOmxpPnhtcC5kaWQ6NDdjODE4NTYtMmQyMi01ODQ3LTgyNDEtZjk1ODdhZjllN2ZkPC9yZGY6bGk+IDxyZGY6bGk+eG1wLmRpZDo1MDI0MUZGRTVFNDQxMUU1ODZGMTk1ODU4OTZERDFFODwvcmRmOmxpPiA8cmRmOmxpPnhtcC5kaWQ6NzI0YjQyYTYtMmZhNi0yMTRhLWE1MmQtYTQxNWJkN2QwN2JlPC9yZGY6bGk+IDxyZGY6bGk+eG1wLmRpZDo4NGJkYTg1Mi0xNTg4LTkxNDQtOWQ1My0wOGNjNjQxNTViZWI8L3JkZjpsaT4gPHJkZjpsaT54bXAuZGlkOjhDRTM0NzQyNjA4NDExRTY4NjM3RjlGMTI2N0M0REVFPC9yZGY6bGk+IDxyZGY6bGk+eG1wLmRpZDo5OGIzY2FiMS0wYzdhLTdmNDAtOTM2Zi1iY2NlMDVmOTBmOWI8L3JkZjpsaT4gPHJkZjpsaT54bXAuZGlkOkJCODM1RERBQTY0QTExRTI5MEQ1OTE0MTM2OEMyNjk0PC9yZGY6bGk+IDxyZGY6bGk+eG1wLmRpZDpjMzU2ZWI4Yi1hYzk0LWYxNGMtODI5ZC1iMmI2M2YyODBiZTU8L3JkZjpsaT4gPHJkZjpsaT54bXAuZGlkOmM5NzEzMzg1LWY3YmEtMGU0MC04OTliLTM0ODg0NTZmYjE0NDwvcmRmOmxpPiA8L3JkZjpCYWc+IDwvcGhvdG9zaG9wOkRvY3VtZW50QW5jZXN0b3JzPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjE5ZDI3MjEwLWNjM2QtOWI0OC05N2VkLTQyYjYwNzhlYzEyYiIgc3RFdnQ6d2hlbj0iMjAxOC0wNy0xOFQyMDo0NDo0MCswMjowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6YWM4MDE5ZGEtYTYyYS03MTQ1LTgzYjEtMzQ0ODhkZDlkMTE2IiBzdEV2dDp3aGVuPSIyMDE4LTA3LTE4VDIxOjA1OjUwKzAyOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo3ZDQyZTIyNS03NTA4LTMyNDYtYjhmOC0wODgyY2JmODljODYiIHN0RXZ0OndoZW49IjIwMTgtMDgtMjVUMTA6Mjc6MTYrMDI6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNvbnZlcnRlZCIgc3RFdnQ6cGFyYW1ldGVycz0iZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL3BuZyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iZGVyaXZlZCIgc3RFdnQ6cGFyYW1ldGVycz0iY29udmVydGVkIGZyb20gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCB0byBpbWFnZS9wbmciLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjFkMWFjNzNjLThiNTMtMjM0ZS1iNmY5LTE0MTA0NmMxYzBiYyIgc3RFdnQ6d2hlbj0iMjAxOC0wOC0yNVQxMDoyNzoxNiswMjowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MjQ3ZDAzOTMtZTg1MS1mODRlLWFiZjktNjM1OTFlM2IxZWM5IiBzdEV2dDp3aGVuPSIyMDE4LTA5LTEyVDE3OjEzOjQ1KzAyOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjb252ZXJ0ZWQiIHN0RXZ0OnBhcmFtZXRlcnM9ImZyb20gaW1hZ2UvcG5nIHRvIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3AiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImRlcml2ZWQiIHN0RXZ0OnBhcmFtZXRlcnM9ImNvbnZlcnRlZCBmcm9tIGltYWdlL3BuZyB0byBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDowZDg2NThlYi1hYjM5LWRkNGEtODhmMi01MjYwMDYzMDQyMWQiIHN0RXZ0OndoZW49IjIwMTgtMDktMTJUMTc6MTM6NDUrMDI6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmY4YjQ5ZTMyLWUwYjUtNzM0MC1iYmZjLTJlYjQ5ZTVhMjNmNCIgc3RFdnQ6d2hlbj0iMjAyMC0wMy0yNVQwOToyMjowOSswMTowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIxLjAgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjb252ZXJ0ZWQiIHN0RXZ0OnBhcmFtZXRlcnM9ImZyb20gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCB0byBpbWFnZS9wbmciLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImRlcml2ZWQiIHN0RXZ0OnBhcmFtZXRlcnM9ImNvbnZlcnRlZCBmcm9tIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3AgdG8gaW1hZ2UvcG5nIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo1MzM1YmY0NS1iYzQ3LTYyNDUtOWM5Yi04ZWJjYTlmYjkzNDgiIHN0RXZ0OndoZW49IjIwMjAtMDMtMjVUMDk6MjI6MDkrMDE6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMS4wIChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ZjhiNDllMzItZTBiNS03MzQwLWJiZmMtMmViNDllNWEyM2Y0IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjE5ZDI3MjEwLWNjM2QtOWI0OC05N2VkLTQyYjYwNzhlYzEyYiIgc3RSZWY6b3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjE5ZDI3MjEwLWNjM2QtOWI0OC05N2VkLTQyYjYwNzhlYzEyYiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PvhtZS4AAAfySURBVGje5VoJbFVFFP2yFIMsiamURYKKikFEFAMoIBiRKkpRCKCBirYishWQ0pZNFgUFg7JHVEQQkFUim5Q0gqggiOyLFmURylaQXRYp35nkTDje3vf+/01p0jrJ+f+9e+/Mm/PeLHfuTCAYDAaKGF4w+M5gtb3pbzCUMMbgS4OvgPkGk6EbaTAHmCjyTYJ8ppBbfGgw12AhyrR2H5B+uMFsyD8h+Th63mSST4FsOsksj1JEsK+90NJ+g3nAJqE7CGjpT4NsD10mKjQP5ct0wKNcr+fZZx0RsvL8Fe3PWVLuNKihfOrGpHeyHqLgLqS7QvJlBtWUMu8yWAubSySvTXn7kvwlkteFrAbJLI+yfuTuIWWiQZJBZYNk6HeQfoAglwJ5BYN/FHuLNIM3hOwEbOvjvqTBecjiyS4WMqsrAVm3cMmdIMV4ymS/wimlsiMEuWGQ25dxDbLakEUZbCXbL6icDpANJtkGyB4hWUXIfiHZvHDJnSVFE4w4MjG5VIMLeJMXqAlVhu1xso1XynqA9K4PufuVkNnraIPbcJ1jsArXlsjlSJplvGgyTQ1mkH4r6ezXKEOIEuTWku0ChVxP0h+GrBLuvzHIwvVAaso/GSzBdQtRXkhyNvVTOn8adLvCmGccuW9JtkohN5T0WyBrg3s7dXyO6+8NZpHc5eudF3I2bTfoY1COjI8a/E33LxpkGCzFfztBjvvGJOUZbUm/F7I+uG9t8DquD9kJGdcdDRrhemEk5K4pFVhKxsupH1iMFbbvC3LnyLaBUnYF6GJodF1AI24M9cf1NKgUNygt+ltYX24MJtoDmHR7kPEeg6t0P0gUnkbkciBrT/bDMCIfoK8cEH3atoxbSPcQ5Fmi6T+jvCxfcgd9+lFLZRLvKgrvrEziFw3u8ym3rVLJh0mfRPJoD7kvOU7D4ZfVxByVCJ+Qk/2a3WkuCtLo2B0dXqaP4WHca3A/Kpfh4aatQjnd0c9dWgFZD0w9WsrlftnhPwGz/TvoyK3Qqd80GG3QCzad0fxSMZQnEHpCniLktoxRqFgcXl4a+mg3YevsU2GTRPJ+JO+l5IuHd/MfchJRGCXtJy6Wj0uREniz5Qpq+RNAvygK6aJfn1uHoX95HpCBPmixRtGnkz5crEX/S6dyVuBZazA9rIfX4lI5jVxOIV99bwYP9cvtg8dxEnNRpGAvP1nR/xZhZeOwMt8Eh9qVcxgu4Gr4nFVgv82PXCYWm3lNq2nQ8BqmW4ZB6lU4C+GmFsi33Y/cbgyveU1bUOCTPjZLQxCbH+Ezj1FeX3LHUbHpcIfs/zQ0jSvKZD0VNtMRTOqNAkf7VOYvH2KLfGIyUzG39UOAajn84CXhkgvCIdUefFo88DkPu5Ig4NJhJYDTUMmndYer8Eu96lRVxGVCktMm19LKkugVjwc2F3YzlZXDbCWf7KNXhH8ZDkKSK69kKquQS/B4wGglGlZLyOzS5mbK00r5agPyMBXcUHJRFMVyqRqtxzg1oHxfK80xOg/kdt1IcrHC5pxPs5ugvHGXNnj0r888MB42624kufeEzWaf4NAZ0v0qdHOVsuuHmBICtHzKd3IlxborCLJO30apUFXoMoV8kVKHej7ETogAVL6Ta648lCPXtyt6F2HbrewXyDpUx5fJQNCpQMnJUfKQUs5eYZOlRIxdetBn4KhdkOSKK01yoVLOMI++8pgin+lDrklBkmsWpoOs9Zv2HlOFjEYz6hYkuXeF7qhHpcoocdFMj60wl2bAU+EKty4ociUoxu83lDssUwjcKgK+WjqNgWe/EojNd3KJPqNkbx9y7RT7RNLPzeNyK8/zXHmlsF4+OzcVfMhVU+zPCM8/Tpke/NIPyPdjKHIBH4d4IiGGdlZZ3jkMH3CIyDPFw86G1B/HwDIWtmMR02xJW10Om7zIXYWiNRassYTm2CSsRWgEXQMhrwX7WA80QySb7esYPC3sHkVkugq+tstj/+8AsTsha4g67wcP33B6YU+5wunJiCQNQZx/SCHDUNQ/mXZ3PcPpRQb2ZzE5poUZixEW+f/0ubMU37AhvmzgODyCy4gR5lAh2SLS5cKDxz08jCzhDJxHmWeVFbysgxvNTyGadtqDmO/O6k4RvHExjnXoqHcTwUqYIlxajMk4CpsTLqXAr+QTdZdQ8VLB3CcSkoPXD6c52K3kj8R2sn32rEjIbaWMI4A/EKtwGcbRhB9DBXcI6me0niDfcRSu36IyEjzcsY7Y5X0bL9Qd4bAyPg+WHi45dzqov0/IoBi8+zpYbbs4owul10DYwaVnaVnzs8FN2DS57LEi6Ab5RiF/SiyP3N5E40jJMaxsJa7dwbWR8CqqI5/TWw/dHaxxRwg7ifKiIb/gQU463qUg74j7bAoBBnCYICJy9fD5h8OxnUYFdyGH2q2iRwSvn0xoiuvB5NI5j38C+mUHCkUke3y5TpigP4X8ecgv4X5/MPf5lrDIDRQPdJXfR2/cnSAKwsezazt7/qQidDWhixPNKUDNLoDDBedRh5zg9XMv2yjPNdqfOIWXHCvGgJDkNirN0r65OWK91Z6+1B6l7bsljK30y7QudGXOwianfNZi0b8DFP5LUuSvRTJa2hBBKtZriYCdBn5Hf9tFuzcpGAF3I0zHxxfTsTQ5guBsfzTPVIown1SetQP2Vt6V5MewpElDcx1EdQlJriilXBv+znvwwzmf+3Nh2BcEsoTDEPgXLuErG7ejm9AAAAAASUVORK5CYII=" />';
  ShowtagLogo.setAttribute("style", "height: 100%;");
  document.getElementById(videoPlayerContainer).appendChild(ShowtagLogo);
}

//create the containers in the showtag layer
function showtagContainers(videoPlayerContainer) {
  // ACTIVE BANNERS
  var BannerActive = document.createElement("div");
  BannerActive.setAttribute("id", "ShowtagActiveBanner");
  BannerActive.setAttribute("style", "display: none");
  document.getElementById(videoPlayerContainer).appendChild(BannerActive);

  // PAUSE TO
  var PauseToActive = document.createElement("div");
  PauseToActive.setAttribute("id", "ShowtagActivePauseTo");
  PauseToActive.setAttribute("style", "display: none");
  document.getElementById(videoPlayerContainer).appendChild(PauseToActive);

  // ACTIVE FORMS
  var FormsActive = document.createElement("div");
  FormsActive.setAttribute("id", "ShowtagActiveForms");
  FormsActive.setAttribute("style", "display: none");
  document.getElementById(videoPlayerContainer).appendChild(FormsActive);

  // ACTIVE CALL-TO-ACTION
  var CalltoactionActive = document.createElement("div");
  CalltoactionActive.setAttribute("id", "ShowtagActiveCalltoaction");
  CalltoactionActive.setAttribute("style", "display: none");
  document.getElementById(videoPlayerContainer).appendChild(CalltoactionActive);

  var CalltoActionDetailsDynamicActive = document.createElement("div");
  CalltoActionDetailsDynamicActive.setAttribute(
    "id",
    "ShowtagActiveCalltoactionDetails"
  );
  CalltoActionDetailsDynamicActive.setAttribute("style", "display: none");
  document
    .getElementById(videoPlayerContainer)
    .appendChild(CalltoActionDetailsDynamicActive);

  // ACTIVE SKIP
  var SkipActive = document.createElement("div");
  SkipActive.setAttribute("id", "ShowtagActiveSkip");
  SkipActive.setAttribute("style", "display: none");
  document.getElementById(videoPlayerContainer).appendChild(SkipActive);

  // the following containers are added to the showtag enabled layer
  var showtagenabled = document.getElementById("showtagenabled");

  // CELEBRITY
  var CelebrityContainerDynamic = document.createElement("div");
  CelebrityContainerDynamic.id = "Celebrity";
  showtagenabled.appendChild(CelebrityContainerDynamic);

  // CELEBRITY SECOND GROUP
  var CelebrityCustomContainerDynamic = document.createElement("div");
  CelebrityCustomContainerDynamic.id = "CelebrityCustom";
  showtagenabled.appendChild(CelebrityCustomContainerDynamic);

  // CELEBRITY TAGS
  var CelebrityTagsDynamic = document.createElement("div");
  CelebrityTagsDynamic.id = "CelebrityTag";
  showtagenabled.appendChild(CelebrityTagsDynamic);

  // CELEBRITY DETAILS
  var CelebrityDetailsDynamic = document.createElement("div");
  CelebrityDetailsDynamic.id = "CelebrityDetails";
  showtagenabled.appendChild(CelebrityDetailsDynamic);

  // CELEBRITY VIDEO
  var CelebrityVideoDynamic = document.createElement("div");
  CelebrityVideoDynamic.id = "CelebrityVideo";
  showtagenabled.appendChild(CelebrityVideoDynamic);

  // CELEBRITY VIDEO OVERVIEW
  var CelebrityVideoOverviewDynamic = document.createElement("div");
  CelebrityVideoOverviewDynamic.id = "CelebrityVideoOverview";
  showtagenabled.appendChild(CelebrityVideoOverviewDynamic);

  // PRODUCT
  var ProductContainerDynamic = document.createElement("div");
  ProductContainerDynamic.id = "Product";
  showtagenabled.appendChild(ProductContainerDynamic);

  // PRODUCT TAGS
  var ProductTagsDynamic = document.createElement("div");
  ProductTagsDynamic.id = "ProductTag";
  showtagenabled.appendChild(ProductTagsDynamic);

  // PRODUCT DETAILS
  var ProductDetailsDynamic = document.createElement("div");
  ProductDetailsDynamic.id = "ProductDetails";
  showtagenabled.appendChild(ProductDetailsDynamic);

  // CUSTOM PRODUCT DETAILS
  var CustomProductContainerDynamic = document.createElement("div");
  CustomProductContainerDynamic.id = "ProductDetailsCustom";
  showtagenabled.appendChild(CustomProductContainerDynamic);

  // BANNER
  var BannerDynamic = document.createElement("div");
  BannerDynamic.id = "Banner";
  showtagenabled.appendChild(BannerDynamic);

  // BANNER TRANSPAREN VIDEO
  var BannerTVideoDynamic = document.createElement("div");
  BannerTVideoDynamic.id = "BannerTransparenVideo";
  showtagenabled.appendChild(BannerTVideoDynamic);

  // BANNER IMAGE
  var BannerImageDynamic = document.createElement("div");
  BannerImageDynamic.id = "BannerImage";
  showtagenabled.appendChild(BannerImageDynamic);

  // FORM
  var FormsDynamic = document.createElement("div");
  FormsDynamic.id = "Form";
  showtagenabled.appendChild(FormsDynamic);

  // POLL
  var PollDynamic = document.createElement("div");
  PollDynamic.id = "LivePoll";
  showtagenabled.appendChild(PollDynamic);

  // MUSIC TAG
  var MusicDynamic = document.createElement("div");
  MusicDynamic.id = "Music";
  showtagenabled.appendChild(MusicDynamic);

  // CELEBRITY
  var FavoriteContainerDynamic = document.createElement("div");
  FavoriteContainerDynamic.id = "Favorite";
  showtagenabled.appendChild(FavoriteContainerDynamic);

  // PROGRAM INFORMATION
  var ProgramInformationDynamic = document.createElement("div");
  ProgramInformationDynamic.id = "ProgramInformation";
  showtagenabled.appendChild(ProgramInformationDynamic);
}

//creation of the live button
function buttonOverlive(videoPlayerContainer) {
  var LiveLayerActive = document.createElement("div");
  LiveLayerActive.setAttribute("id", "ShowtagLiveLayer");
  LiveLayerActive.innerHTML =
    '<div class="skipContainer" style="position:absolute; user-select:none; pointer-events:initial;">showtag</div>';

  document.getElementById(videoPlayerContainer).appendChild(LiveLayerActive);

  document.getElementById("ShowtagLiveLayer").onclick = function () {
    myFunction();
  };

  function myFunction() {
    var x = document.getElementById("showtagenabled");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }
}

//active elements on top
function showtagActiveElemets(settings, Player, videoPlayerContainer) {
  var executedSkip = false;
  var executedForm = false;
  var executedPauseTo = false;
  var executedBanner = false;
  var executedCallToAction = false;

  var livelayer = false;

  if (settings.buttonOverLive == 1 || settings.mouseOverLive == 1) {
    livelayer = true;
  }

  if (
    livelayer == false &&
    (settings.ActiveBannersInProgram == 1 ||
      settings.ActiveFormsInProgram == 1 ||
      settings.ActiveCalltoActionInProgram == 1 ||
      settings.ActivePauseToShop == 1 ||
      settings.ActiveSkipInto == 1)
  ) {
    // SKIP INTRO

    if (settings.ActiveSkipInto == 1) {
      if (studio == true) {
        url =
          "https://tagapi.azurewebsites.net/api/Prepare/activeSkipIntro/" +
          settings.ProgramCode;
      } else {
        url =
          "https://" +
          ClientCode +
          ".azurewebsites.net/api/Active/skip/" +
          settings.ProgramCode;
      }

      var xhrActiveForms = new XMLHttpRequest();
      xhrActiveForms.open("GET", url, true);
      xhrActiveForms.send();
      xhrActiveForms.onreadystatechange = processRequestActiveForm;

      var ActiveSkip = [];

      function processRequestActiveForm(e) {
        if (xhrActiveForms.readyState == 4 && xhrActiveForms.status == 200) {
          ActiveSkip = JSON.parse(xhrActiveForms.responseText);
          SkipActiveContent = document.createElement("div");
        }
      }
    }

    function ActiveSkipTime(currentTime) {
      for (i = 0; i < ActiveSkip.length; i++) {
        if (
          currentTime >= ActiveSkip[i].TimeIn &&
          currentTime <= ActiveSkip[i].TimeOut
        ) {
          DrawSkip(ActiveSkip[i]);
        }

        if (currentTime == ActiveSkip[i].TimeOut) {
          document.getElementById("ShowtagActiveSkip").style.display = "none";

          document.getElementById("ShowtagActiveSkip").innerHTML = "";

          executedSkip = false;
        }
      }
    }

    var DrawSkip = (function () {
      return function DrawSkip(item) {
        if (!executedSkip) {
          executedSkip = true;

          document.getElementById("ShowtagActiveSkip").style.display = "block";

          SkipActiveContent.innerHTML =
            "" +
            '<div id="skip_' +
            item.id_skip_intro +
            '" class="skipContainer" style="position:absolute; user-select:none; pointer-events:initial;">' +
            item.SkipText +
            "</div>";

          document
            .getElementById("ShowtagActiveSkip")
            .appendChild(SkipActiveContent);

          document.getElementById("skip_" + item.id_skip_intro).onclick =
            function () {
              var time = item.Duration / 1000;

              Player.currentTime(time);

              executedSkip = false;
            };
        }
      };
    })();

    // FORM

    if (settings.ActiveFormsInProgram == 1) {
      if (studio == true) {
        url =
          "https://tagapi.azurewebsites.net/api/Prepare/activeformsinprogram/" +
          settings.ProgramCode;
      } else {
        url =
          "https://" +
          ClientCode +
          ".azurewebsites.net/api/Active/Form/" +
          settings.ProgramCode;
      }

      var xhrActiveForms = new XMLHttpRequest();
      xhrActiveForms.open("GET", url, true);
      xhrActiveForms.send();
      xhrActiveForms.onreadystatechange = processRequestActiveForm;

      var ActiveForms = [];

      function processRequestActiveForm(e) {
        if (xhrActiveForms.readyState == 4 && xhrActiveForms.status == 200) {
          ActiveForms = JSON.parse(xhrActiveForms.responseText);
          FormsActiveContent = document.createElement("div");
        }
      }
    }

    function ActiveFormTime(currentTime) {
      for (i = 0; i < ActiveForms.length; i++) {
        if (
          currentTime >= ActiveForms[i].timeIn &&
          currentTime <= ActiveForms[i].timeOut
        ) {
          DrawForm(ActiveForms[i]);
        }

        if (currentTime == ActiveForms[i].timeOut) {
          document.getElementById("ShowtagActiveForms").style.display = "none";

          document.getElementById("ShowtagActiveForms").innerHTML = "";

          executedForm = false;
        }
      }
    }

    var DrawForm = (function () {
      return function DrawForm(item) {
        if (!executedForm) {
          executedForm = true;

          document.getElementById("ShowtagActiveForms").style.display = "block";

          FormsActiveContent.innerHTML =
            "" +
            '<iFrame class="FormIframe" src="' +
            item.url +
            '" style="width: ' +
            item.w +
            "%; height: " +
            item.h +
            "%; top: " +
            item.y +
            "%; left:" +
            item.x +
            '%; position: absolute;"></iFrame>' +
            '<img class="FormImage" src="https://' +
            ClientCode +
            ".blob.core.windows.net/images/form/" +
            item.image +
            '" style="width: ' +
            item.image_w +
            "%; height:auto; top: " +
            item.image_y +
            "%; left:" +
            item.image_x +
            '%; position: absolute; pointer-events:none;" />';

          document
            .getElementById("ShowtagActiveForms")
            .appendChild(FormsActiveContent);
        }
      };
    })();

    // PAUSE TO

    if (settings.ActivePauseToShop == 1) {
      if (studio == true) {
        url =
          "https://tagapi.azurewebsites.net/api/Prepare/activepauseto/" +
          settings.ProgramCode;
      } else {
        url =
          "https://" +
          ClientCode +
          ".azurewebsites.net/api/Active/PauseTO/" +
          settings.ProgramCode;
      }

      var xhrActivePauseto = new XMLHttpRequest();
      xhrActivePauseto.open("GET", url, true);
      xhrActivePauseto.send();
      xhrActivePauseto.onreadystatechange = processRequestActivePauseTo;

      var ActivePauseTo = [];

      function processRequestActivePauseTo(e) {
        if (
          xhrActivePauseto.readyState == 4 &&
          xhrActivePauseto.status == 200
        ) {
          ActivePauseTo = JSON.parse(xhrActivePauseto.responseText);
          PauseToActiveContent = document.createElement("div");
        }
      }
    }

    function ActivePauseTime(currentTime) {
      for (i = 0; i < ActivePauseTo.length; i++) {
        if (
          currentTime >= ActivePauseTo[i].TimeIn &&
          currentTime <= ActivePauseTo[i].TimeOut
        ) {
          drawPauseTo(ActivePauseTo[i]);
        }

        if (currentTime == ActivePauseTo[i].TimeOut) {
          document.getElementById("ShowtagActivePauseTo").style.display =
            "none";

          document.getElementById("ShowtagActivePauseTo").innerHTML = "";

          executedPauseTo = false;
        }
      }
    }

    var drawPauseTo = (function () {
      return function drawPauseTo(item) {
        if (!executedPauseTo) {
          executedPauseTo = true;

          document.getElementById("ShowtagActivePauseTo").style.display =
            "block";

          PauseToActiveContent.innerHTML =
            '<div id="pauseto_' +
            item.id_program_pausetoshop +
            '" style="width: ' +
            item.Width +
            "%; height: auto; top: " +
            item.Y +
            "%; left:" +
            item.X +
            '%; position: absolute;">' +
            '<img src="https://' +
            ClientCode +
            ".showtagenabled.com/images/pauseto/" +
            item.Image +
            '" style="width: 100%; height: auto" />' +
            "</div>";

          document
            .getElementById("ShowtagActivePauseTo")
            .appendChild(PauseToActiveContent);
        }
      };
    })();

    // BANNER

    if (settings.ActiveBannersInProgram == 1) {
      if (studio == true) {
        url =
          "https://tagapi.azurewebsites.net/api/Prepare/activeBannersInProgram/" +
          settings.ProgramCode;
      } else {
        url =
          "https://" +
          ClientCode +
          ".azurewebsites.net/api/Active/Banners/" +
          settings.ProgramCode;
      }

      var xhrActiveBanner = new XMLHttpRequest();
      xhrActiveBanner.open("GET", url, true);
      xhrActiveBanner.send();
      xhrActiveBanner.onreadystatechange = processRequestActiveBanner;

      var ActiveBanners = [];

      function processRequestActiveBanner(e) {
        if (xhrActiveBanner.readyState == 4 && xhrActiveBanner.status == 200) {
          ActiveBanners = JSON.parse(xhrActiveBanner.responseText);
          BannerActiveContent = document.createElement("div");
        }
      }
    }

    function ActiveBannersTime(currentTime) {
      for (i = 0; i < ActiveBanners.length; i++) {
        if (
          currentTime >= ActiveBanners[i].TimeIn &&
          currentTime <= ActiveBanners[i].TimeOut
        ) {
          drawbanner(ActiveBanners[i]);
        }

        if (currentTime == ActiveBanners[i].TimeOut) {
          document.getElementById("ShowtagActiveBanner").style.display = "none";

          document.getElementById("ShowtagActiveBanner").innerHTML = "";

          executedBanner = false;
        }
      }
    }

    var drawbanner = (function () {
      return function drawbanner(banner) {
        if (!executedBanner) {
          executedBanner = true;

          console.log("draw banner");

          document.getElementById("ShowtagActiveBanner").style.display =
            "block";

          BannerActiveContent.innerHTML =
            '<div id="banner_' +
            banner.id_banner +
            '" style="width: ' +
            banner.Width +
            "%; height: auto; top: " +
            banner.BannerY +
            "%; left:" +
            banner.BannerX +
            '%; position: absolute;">' +
            '<img src="https://' +
            ClientCode +
            ".showtagenabled.com/images/banner/" +
            banner.URL +
            '" style="width: 100%; height: auto;" />' +
            '<a style="width: ' +
            banner.LinkWidth +
            "%; height: " +
            banner.LinkHeight +
            "%; top: " +
            banner.LinkY +
            "%; left:" +
            banner.LinkX +
            '%; position: absolute; pointer-events: initial; cursor:pointer"' +
            'href="' +
            banner.LinkUrl +
            '" target="_blank"></a>' +
            "</div>";

          document
            .getElementById("ShowtagActiveBanner")
            .appendChild(BannerActiveContent);
        }
      };
    })();

    // CALL TO ACTION

    if (settings.ActiveCalltoActionInProgram == 1) {
      if (studio == true) {
        url =
          "https://tagapi.azurewebsites.net/api/Prepare/activecalltoactioninprogram/" +
          settings.ProgramCode;
      } else {
        url =
          "https://" +
          ClientCode +
          ".azurewebsites.net/api/Active/Calltoaction/" +
          settings.ProgramCode;
      }

      var xhrActiveCalltoAction = new XMLHttpRequest();
      xhrActiveCalltoAction.open("GET", url, true);
      xhrActiveCalltoAction.send();
      xhrActiveCalltoAction.onreadystatechange = processRequestActiveBanner;

      var ActiveCalltoAction = [];
      function processRequestActiveBanner(e) {
        if (
          xhrActiveCalltoAction.readyState == 4 &&
          xhrActiveCalltoAction.status == 200
        ) {
          ActiveCalltoAction = JSON.parse(xhrActiveCalltoAction.responseText);
          CalltoActionActiveContent = document.createElement("div");
        }
      }
    }

    function ActiveCalltoActionTime(currentTime) {
      for (i = 0; i < ActiveCalltoAction.length; i++) {
        if (
          currentTime >= ActiveCalltoAction[i].TimeIn &&
          currentTime <= ActiveCalltoAction[i].TimeOut
        ) {
          drawCallToAction(i);

          AnalyticsCallToActionView(settings, currentTime);
        }

        if (currentTime == ActiveCalltoAction[i].TimeOut) {
          document.getElementById("ShowtagActiveCalltoaction").style.display =
            "none";

          document.getElementById("ShowtagActiveCalltoaction").innerHTML = "";

          executedCallToAction = false;
        }
      }
    }

    var drawCallToAction = (function () {
      return function drawCallToAction(item) {
        if (!executedCallToAction) {
          executedCallToAction = true;

          document.getElementById("ShowtagActiveCalltoaction").style.display =
            "block";

          CalltoActionActiveContent.innerHTML =
            "" +
            '<img id="calltoaction_' +
            ActiveCalltoAction[item].id +
            '" class="CalltoActionImage" style="top: ' +
            ActiveCalltoAction[item].Y +
            "%; left:" +
            ActiveCalltoAction[item].X +
            "%; width: " +
            ActiveCalltoAction[item].Width +
            '%; height:auto; position:absolute" src="https://' +
            ClientCode +
            ".showtagenabled.com/images/calltoaction/" +
            ActiveCalltoAction[item].image +
            '"/>';

          document
            .getElementById("ShowtagActiveCalltoaction")
            .appendChild(CalltoActionActiveContent);

          document.getElementById(
            "calltoaction_" + ActiveCalltoAction[item].id
          ).onclick = function () {
            var iFrame = document.getElementById(
              "calltoactionIframe_" + ActiveCalltoAction[item].id
            );

            //console.log(iFrame);

            if (iFrame == null) {
              CallToActionDetails(item);
            } else {
              var Switch = iFrame.style.display != "none";

              if (Switch == true) {
                iFrame.style.display = "none";
              } else {
                iFrame.style.display = "block";
              }
            }
          };

          function CallToActionDetails(item) {
            document.getElementById(
              "ShowtagActiveCalltoactionDetails"
            ).style.display = "block";

            Player.pause();

            CalltoActionDetailsContent = document.createElement("div");

            CalltoActionDetailsContent.innerHTML =
              "" +
              '<iframe  id="calltoactionIframe_' +
              ActiveCalltoAction[item].id +
              '" class="CalltoActioniFrame" src="' +
              ActiveCalltoAction[item].MessageUrl +
              '" style="top: ' +
              ActiveCalltoAction[item].MessageY +
              "%; left:" +
              ActiveCalltoAction[item].MessageX +
              "%; width: " +
              ActiveCalltoAction[item].MessageWidth +
              "%; height:" +
              ActiveCalltoAction[item].MessageHeight +
              '%; position:absolute;">' +
              "</iframe>";

            document
              .getElementById("ShowtagActiveCalltoactionDetails")
              .appendChild(CalltoActionDetailsContent);
          }
        }
      };
    })();

    // TIMER

    var vid = document
      .getElementById(videoPlayerContainer)
      .getElementsByTagName("video")[0];

    function TimeLoop() {
      var currentTime;

      vid.ontimeupdate = function () {
        currentTime =
          (Math.floor(vid.currentTime * (1000 / settings.FrameSpeed)) /
            (1000 / settings.FrameSpeed)) *
          1000;

        console.log(currentTime);

        if (settings.ActiveBannersInProgram == 1) {
          ActiveBannersTime(currentTime);
        }

        if (settings.ActivePauseToShop == 1) {
          ActivePauseTime(currentTime);
        }

        if (settings.ActiveSkipInto == 1) {
          ActiveSkipTime(currentTime);
        }

        if (settings.ActiveCalltoActionInProgram == 1) {
          ActiveCalltoActionTime(currentTime);
        }

        if (settings.ActiveFormsInProgram == 1) {
          ActiveFormTime(currentTime);
        }
      };
    }

    var intervalID;

    Player.onended = function (e) {
      clearInterval(intervalID);
    };

    Player.on("playing", function () {
      //JSProtocol.isPaused(false);
      intervalID = setInterval(TimeLoop, 100);
    });

    Player.on("pause", function () {
      clearInterval(intervalID);
    });
  }
}

Player.on("playing", function () {
  //JSProtocol.isPaused(false);
});

// minimize the menu if there are tags on the screen or as default
function buttonContainerMinimize(source, settings) {
  document.getElementById("minimizeButtonContainer").style.display = "none";

  // this will hide the buttonMenu and show a button on the screen
  // click the button and the menu becomes visible

  // will always load in minimize state
  if (settings.menuMinimize == 1) {
    document.getElementById("ButtonContainer").style.display = "none";

    document.getElementById("minimizeButtonContainer").style.display = "block";
  }

  // will only load as minimized if there are tags on the screen (celebrity or product)
  if (settings.menuMinimizeTag == 1 && source == "tag") {
    document.getElementById("ButtonContainer").style.display = "none";

    document.getElementById("minimizeButtonContainer").style.display = "block";
  }

  // set the click for the button
  if (settings.menuMinimize == 1 || settings.menuMinimizeTag == 1) {
    document.getElementById("minimizeButtonContainer").onclick = function () {
      document.getElementById("ButtonContainer").style.display = "block";

      document.getElementById("minimizeButtonContainer").style.display = "none";

      // this hides the product details if they are open and the menu is clicked
      document.getElementById("ProductDetails").style.display = "none";
    };
  }

  // check if the minimize function is turned on for the button menu

  let my_pnga = getComputedStyle(document.documentElement).getPropertyValue(
    "--buttonContainerBackground"
  );

  if (my_pnga) {
    document.getElementById("ButtonContainer").style.backgroundImage =
      'url("CSS/stylesheet/' + my_pnga + "?a=" + Math.random() + '")';
  }
}

// HIDE ON PLAY
function HideOnPlay(settings) {
  // destroy the product tags
  document.getElementById("ProductTag").innerHTML = "";

  // destroy the celebrity tags
  document.getElementById("CelebrityTag").innerHTML = "";

  // destroy the celebrity details
  document.getElementById("CelebrityDetails").innerHTML = "";
}

// HIDE ALL LAYERS ETC. - FULL RESET
function HideAll(settings) {
  document.getElementById("Product").style.display = "none";

  document.getElementById("ProductDetails").style.display = "none";

  document.getElementById("ProductDetailsCustom").style.display = "none";

  // document.getElementById('ProductTag').style.display = "none";

  // document.getElementById('CelebrityTag').style.display = "none";

  document.getElementById("Celebrity").style.display = "none";

  document.getElementById("CelebrityCustom").style.display = "none";

  document.getElementById("CelebrityDetails").style.display = "none";

  document.getElementById("CelebrityVideo").style.display = "none";

  document.getElementById("CelebrityVideoOverview").style.display = "none";

  document.getElementById("Banner").style.display = "none";

  document.getElementById("BannerImage").style.display = "none";

  document.getElementById("BannerTransparenVideo").style.display = "none";

  document.getElementById("LivePoll").style.display = "none";

  document.getElementById("Music").style.display = "none";

  document.getElementById("Form").style.display = "none";

  document.getElementById("Favorite").style.display = "none";

  document.getElementById("ProgramInformation").style.display = "none";
  if (settings) {
    if (settings.CelebrityVideoInProgram == 1) {
      document.getElementById("CelebrityVideo").innerHTML = "";
    }
  }
}

function HideAllActive(settings) {
  document.getElementById("ShowtagActiveSkip").style.display = "none";

  document.getElementById("ShowtagActiveSkip").innerHTML = "";

  document.getElementById("ShowtagActivePauseTo").style.display = "none";

  document.getElementById("ShowtagActivePauseTo").innerHTML = "";

  document.getElementById("ShowtagActiveBanner").style.display = "none";

  document.getElementById("ShowtagActiveBanner").innerHTML = "";

  document.getElementById("ShowtagActiveForms").style.display = "none";

  document.getElementById("ShowtagActiveForms").innerHTML = "";

  document.getElementById("ShowtagActiveCalltoaction").style.display = "none";

  document.getElementById("ShowtagActiveCalltoaction").innerHTML = "";

  document.getElementById("ShowtagActiveCalltoactionDetails").style.display =
    "none";

  document.getElementById("ShowtagActiveCalltoactionDetails").innerHTML = "";
}

// CELEBRITY
// when the viewer clicks the menu button we request all celebrities that are tagged in the video
function GetAllCelebrities(group, settings, ProgramCode) {
  var livelayer = false;

  // set live layer to true if any of these are true
  if (settings.buttonOverLive == 1 || settings.mouseOverLive == 1) {
    livelayer = true;
  }

  if (livelayer == false) {
    HideAll(settings);

    HideAllActive(settings);
  }

  // this prevents to download the data again
  if (CelebrityDetailsData.length == 0) {
    if (group == 1) {
      document.getElementById("ButtonCustomCelebrityLoader").style.display =
        "block";
    } else {
      document.getElementById("ButtonCelebrityLoader").style.display = "block";
    }

    if (studio == true) {
      url =
        "https://tagapi.azurewebsites.net/api/Prepare/celebritiesInProgram/" +
        settings.ProgramCode;
    } else {
      url =
        "https://" +
        ClientCode +
        ".azurewebsites.net/api/Menu/CelebritiesInProgram/" +
        settings.ProgramCode +
        "/" +
        id_user +
        "/" +
        client_id;
    }

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.send();

    xhr.onreadystatechange = processRequest;

    function processRequest(e) {
      if (xhr.readyState == 4 && xhr.status == 200) {
        CelebrityDetailsData = JSON.parse(xhr.responseText);

        CreateCelebrityDetails(group, settings);
      }
    }
  } else {
    CreateCelebrityDetails(group, settings);
  }
}
// create the celebrity details
function CreateCelebrityDetails(group, settings) {
  var celebrityVideoArray = [];

  if (settings.deactivateProgramDetails == 1) {
    if (studio == true) {
      url =
        "https://tagapi.azurewebsites.net/api/Prepare/CelebrityVideoAllinProgram/" +
        settings.ProgramCode;
    } else {
      // EWALD

      url =
        "https://" +
        ClientCode +
        ".azurewebsites.net/api/Menu/CelebritiesInProgram/" +
        settings.ProgramCode +
        "/" +
        id_user +
        "/" +
        client_id;
    }

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.send();

    xhr.onreadystatechange = processRequest;

    function processRequest(e) {
      if (xhr.readyState == 4 && xhr.status == 200) {
        celebrityVideoArray = JSON.parse(xhr.responseText);

        DrawCelebrityContent(group, celebrityVideoArray, settings);
      }
    }
  } else {
    var celebrityVideoArray = [];

    DrawCelebrityContent(group, celebrityVideoArray, settings);
  }
}
// show on the screen
function DrawCelebrityContent(group, dataCvideo, settings) {
  var dynamic = "";

  if (group == 0) {
    var celebrityGroup =
      '<div class="MenuContainer" id="CelebrityMenuContainer" style="pointer-events: initial; position:absolute">';
  }

  if (group == 1) {
    var celebrityGroup =
      '<div class="MenuContainer" id="CelebrityCustomMenuContainer" style="pointer-events: initial; position:absolute">';
  }

  for (i = 0; i < CelebrityDetailsData.length; i++) {
    if (
      CelebrityDetailsData[i].customGroup == group ||
      CelebrityDetailsData[i].customGroup == null
    ) {
      if (settings.deactivateProgramDetails == 1) {
        if (
          CelebrityDetailsData[i].Description == null ||
          CelebrityDetailsData[i].Description == ""
        ) {
          Description = "";
        } else {
          Description =
            '<div class="MenuCelCelebrityDescription">' +
            CelebrityDetailsData[i].Description +
            "</div>";
        }

        if (
          CelebrityDetailsData[i].BirthDate == null ||
          CelebrityDetailsData[i].BirthDate == ""
        ) {
          BirthDate = "";
        } else {
          BirthDate =
            '<div class="MenuCelCelebrityBirthplace">' +
            CelebrityDetailsData[i].BirthDate +
            "</div>";
        }

        if (
          CelebrityDetailsData[i].BirthPlace == null ||
          CelebrityDetailsData[i].BirthPlace == ""
        ) {
          BirthPlace = "";
        } else {
          BirthPlace =
            '<div class="MenuCelCelebrityBirthDate">' +
            CelebrityDetailsData[i].BirthPlace +
            "</div>";
        }

        var celebrityExtras = "" + Description + BirthDate + BirthPlace;

        if (settings.CelebrityVideoInProgram == 1) {
          var CVDynamic = "";

          var CVideo = "";

          if (
            dataCvideo.find(
              (x) => x.id_celebrity == CelebrityDetailsData[i].id_celebrity
            )
          ) {
            for (y = 0; y < dataCvideo.length; y++) {
              if (
                dataCvideo[y].id_celebrity ==
                CelebrityDetailsData[i].id_celebrity
              ) {
                CVDynamic +=
                  "" +
                  '<div id="' +
                  dataCvideo[y].id_celebrityVideo +
                  '" class="CelebrityVideoThumb">' +
                  '<img class="CelebrityVideoThumbImage" src="https://' +
                  ClientCode +
                  ".showtagenabled.com/video/" +
                  dataCvideo[y].thumbUrl +
                  '" />' +
                  "</div>";
              }
            }

            CVideo =
              '<div class="CelebrityVideoContainer" style="position: relative; pointer-events:initial;">' +
              CVDynamic +
              "</div>";
          }
        } else {
          var CVideo = "";
        }
      } else {
        var celebrityExtras = "";

        var CVideo = "";
      }

      dynamic +=
        '<div id="celebrityScroll_' +
        CelebrityDetailsData[i].id_celebrity +
        '" class="MenuCellContainerCelebrities">' +
        '<div class="MenuCellBackground">' +
        '<img src="https://' +
        ClientCode +
        ".showtagenabled.com/images/" +
        CelebrityDetailsData[i].CelebrityImage +
        '" />' +
        "</div>" +
        '<div class="MenuCellName" style="position:absolute; user-select:none;">' +
        CelebrityDetailsData[i].Name +
        "</div>" +
        celebrityExtras +
        CVideo +
        "</div>";
    }
  }

  var celebritymenuContainer =
    "" +
    celebrityGroup +
    '<div class="MenuContainerScroll" style=" pointer-events: initial; position:relative">' +
    dynamic +
    "</div>" +
    "</div>";

  if (group == 0) {
    document.getElementById("Celebrity").innerHTML = celebritymenuContainer;

    document.getElementById("Celebrity").style.display = "block";

    document.getElementById("ButtonCelebrityLoader").style.display = "none";

    // in case the celebrity as an aminiated png we reload the background each time
    let pnga_celebrity = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--scrollContainerBackgroundCelebrity");

    if (pnga_celebrity) {
      document.getElementById("CelebrityMenuContainer").style.backgroundImage =
        'url("CSS/stylesheet/' + pnga_celebrity + "?a=" + Math.random() + '")';
    }
  }

  if (group == 1) {
    document.getElementById("CelebrityCustom").innerHTML =
      celebritymenuContainer;

    document.getElementById("CelebrityCustom").style.display = "block";

    document.getElementById("ButtonCustomCelebrityLoader").style.display =
      "none";

    // in case the celebrity as an aminiated png we reload the background each time
    let pnga_celebrityCustom = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--scrollContainerBackgroundCustomCelebrity");

    if (pnga_celebrityCustom) {
      document.getElementById(
        "CelebrityCustomMenuContainer"
      ).style.backgroundImage =
        'url("CSS/stylesheet/' +
        pnga_celebrityCustom +
        "?a=" +
        Math.random() +
        '")';
    }
  }

  var MenuContainerCelebrity = document.getElementsByClassName(
    "MenuCellContainerCelebrities"
  );

  if (settings.deactivateProgramDetails == 0) {
    for (var i = 0; i < MenuContainerCelebrity.length; i++) {
      MenuContainerCelebrity[i].onclick = function () {
        CelebrityClicked(this, 0, settings);
      };
    }
  }

  if (
    settings.customStyleSheet != 1 &&
    settings.ProgramInformationActive == 1 &&
    settings.topBarVisible == 1
  ) {
    document.getElementById("CelebrityMenuContainer").style.left = "unset";

    document.getElementById("CelebrityMenuContainer").style.right = "1.5vw";
  }

  // CLICK THE CELEBRITY VIDEO
  if (settings.CelebrityVideoInProgram == 1) {
    var CelebrityVideoClicked = document.getElementsByClassName(
      "CelebrityVideoThumb"
    );

    for (var i = 0; i < CelebrityVideoClicked.length; i++) {
      CelebrityVideoClicked[i].onclick = function () {
        CelebrityVideo(this);
      };
    }

    // CELEBRITY VIDEO

    function CelebrityVideo(Video) {
      var DivIdCelebrityVideo = Video.id;
      var videoDetails = clebrityVideoArray.find(
        (x) => x.id_celebrityVideo == DivIdCelebrityVideo
      );

      document.getElementById("CelebrityVideo").style.display = "Block";

      CelebrityVideoDynamic.innerHTML =
        "" +
        '<div class="CelebrityVideoPlayer" style="pointer-events: none; position:absolute; z-index:1000000000" id="CelebrityVideoPlayer">' +
        '<video style="pointer-events:initial;" id="VideoInVideo" muted controls controlsList="nofullscreen nodownload noremoteplayback" src="https://' +
        ClientCode +
        ".showtagenabled.com/video/" +
        videoDetails.videoUrl +
        '"></video> ' +
        '<div id="CelebrityVideoClose" style="pointer-events:initial;"></div>' +
        "</div>";

      document
        .getElementById("CelebrityVideo")
        .appendChild(CelebrityVideoDynamic);

      document.getElementById("CelebrityVideoClose").onclick =
        CloseVideoInVideo;
    }

    function CloseVideoInVideo() {
      document.getElementById("CelebrityVideoPlayer").style.display = "none";

      document.getElementById("CelebrityVideo").innerHTML = "";
    }
  }
}
// when the viewer clicks a celebrity tag or a celebrity item in the menu scroll section
function CelebrityClicked(CelebrityClicked, time, settings) {
  var livelayer = false;

  // set live layer to true if any of these are true
  if (settings.buttonOverLive == 1 || settings.mouseOverLive == 1) {
    livelayer = true;
  }

  if (livelayer == false) {
    HideAll(settings);

    HideAllActive(settings);
  }

  // extract the id
  var DivIdCelebrity = CelebrityClicked.id.split("_", 2)[1]; //celebrity_

  if (CelebrityDetailsData.length == 0) {
    var CelebrityDetails = CelebrityTagData.find(
      (x) => x.id_celebrity == DivIdCelebrity
    );
  } else {
    var CelebrityDetails = CelebrityDetailsData.find(
      (x) => x.id_celebrity == DivIdCelebrity
    );
  }

  // SEND TO ANALYTICS
  AnalyticsCelebrityDetailsView(DivIdCelebrity, settings, time);

  var url;

  if (time == 0) {
    if (studio == true) {
      url =
        "https://tagapi.azurewebsites.net/api/Prepare/CelebrityVideoAll/" +
        settings.ProgramCode +
        "/" +
        DivIdCelebrity;

      // when the user has defined in the settings that the scroll menu should not be closed
      // we set the scroll menu back to visible again depending on the celebrity group
      if (settings.scrollSectionVisible == 1) {
        if (CelebrityDetails.customGroup == 0) {
          document.getElementById("Celebrity").style.display = "block";
        } else {
          document.getElementById("CelebrityCustom").style.display = "block";
        }
      }

      var CelebrityVP =
        '<div class="CelebrityDetails" id="CelebrityDetailsID" style="position: absolute; pointer-events: none; user-select: none; z-index:100;">' +
        '<div id="CelebrityDetailsClose" class="CelebrityDetailsClose" style="pointer-events:initial;"></div>';
    } else {
      url =
        "https://" +
        ClientCode +
        ".azurewebsites.net/api/Celebrity/Video/" +
        DivIdCelebrity +
        "/" +
        settings.ProgramCode +
        "/0/" +
        id_user;

      // when the user has defined in the settings that the scroll menu should not be closed
      // we set the scroll menu back to visible again depending on the celebrity group
      if (settings.scrollSectionVisible == 1) {
        if (CelebrityDetails.customGroup == 0) {
          document.getElementById("Celebrity").style.display = "block";
        } else {
          document.getElementById("CelebrityCustom").style.display = "block";
        }
      }

      var CelebrityVP =
        '<div class="CelebrityDetails" id="CelebrityDetailsID" style="position: absolute; pointer-events: none; user-select: none; z-index:100;">' +
        '<div id="CelebrityDetailsClose" class="CelebrityDetailsClose" style="pointer-events:initial;"></div>';
    }
  } else {
    //click from tag

    // EWALD

    if (studio == true) {
      url =
        "https://tagapi.azurewebsites.net/api/Prepare/CelebrityVideoSpecific/" +
        settings.ProgramCode +
        "/" +
        time +
        "/" +
        DivIdCelebrity;

      console.log(CelebrityDetails.X);

      if (CelebrityDetails.X < 50) {
        // tag on the left side of the screen

        var CelebrityVP =
          '<div class="CelebrityDetailsRight" id="CelebrityDetailsID" style="position: absolute; pointer-events: none; user-select: none; z-index:100;">' +
          '<div id="CelebrityDetailsClose" class="CelebrityDetailsCloseRight" style="pointer-events:initial;"></div>';
      } else {
        // tag on the right side of the screen

        var CelebrityVP =
          '<div class="CelebrityDetailsLeft" id="CelebrityDetailsID" style="position: absolute; pointer-events: none; user-select: none; z-index:100;">' +
          '<div id="CelebrityDetailsClose" class="CelebrityDetailsCloseLeft" style="pointer-events:initial;"></div>';
      }
    } else {
      url =
        "https://" +
        ClientCode +
        ".azurewebsites.net/api/Celebrity/Video/" +
        DivIdCelebrity +
        "/" +
        settings.ProgramCode +
        "/" +
        time +
        "/" +
        id_user;

      console.log(CelebrityDetails.X);

      if (CelebrityDetails.X < 50) {
        // tag on the left side of the screen

        var CelebrityVP =
          '<div class="CelebrityDetailsRight" id="CelebrityDetailsID" style="position: absolute; pointer-events: none; user-select: none; z-index:100;">' +
          '<div id="CelebrityDetailsClose" class="CelebrityDetailsCloseRight" style="pointer-events:initial;"></div>';
      } else {
        // tag on the right side of the screen

        var CelebrityVP =
          '<div class="CelebrityDetailsLeft" id="CelebrityDetailsID" style="position: absolute; pointer-events: none; user-select: none; z-index:100;">' +
          '<div id="CelebrityDetailsClose" class="CelebrityDetailsCloseLeft" style="pointer-events:initial;"></div>';
      }
    }
  }

  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.send();

  xhr.onreadystatechange = processRequest;

  function processRequest(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var celebrityVideos = JSON.parse(xhr.responseText);

      document.getElementById("CelebrityDetails").innerHTML = "";

      var CelebVideo = "";

      var CelebVideoDynamic = "";

      var FavoriteCelebrity = "";

      if (CelebrityDetails.BirthName != null) {
        var BirthName = CelebrityDetails.BirthName;
      } else {
        var BirthName = "";
      }
      if (CelebrityDetails.BirthDate != null) {
        var BirthDate = CelebrityDetails.BirthDate;
      } else {
        var BirthDate = "";
      }
      if (CelebrityDetails.BirthPlace != null) {
        var BirthPlace = CelebrityDetails.BirthPlace;
      } else {
        BirthPlace = "";
      }

      if (celebrityVideos.length > 0) {
        for (i = 0; i < celebrityVideos.length; i++) {
          CelebVideoDynamic +=
            "" +
            '<div id="celebrityVideo_' +
            celebrityVideos[i].id_celebrityVideo +
            '" class="CelebrityVideoThumb" style="pointer-events: initial">' +
            '<img class="CelebrityVideoThumbImage" src="https://' +
            ClientCode +
            ".showtagenabled.com/video/" +
            celebrityVideos[i].thumbUrl +
            '" />' +
            '<div class="CelebrityThumbPlaybutton"></div>' +
            "</div>";
        }

        CelebVideo =
          '<div class="CelebrityVideoContainer" id="CelebrityVideoContainer" style="position: absolute; pointer-events:none;"><div class="CelebrityVideoScroll" style="pointer-events:initial;">' +
          CelebVideoDynamic +
          "</div></div>";
      }

      if (settings.favoriteButtonsActivated == 1) {
        FavoriteCelebrity =
          "" +
          '<div class="CelebrityFavoriteIcon" id="Celebrity' +
          DivIdCelebrity +
          '" style="position: absolute;"></div>' +
          '<div class="CelebrityFavoriteIconRemove" id="Remove' +
          DivIdCelebrity +
          '" style="position: absolute; display:none;"></div>';
      } else {
        FavoriteCelebrity = "";
      }

      if (CelebrityDetails.Instragram != null) {
        instagram =
          '<div class="CelebrityInstagram" style="position: absolute; pointer-events: initial">' +
          '<div class="CelebrityInstagramImage"></div>' +
          '<a style="text-decoration: none;" href="https://www.instagram.com/' +
          CelebrityDetails.Instragram +
          '" target="_blank" class="CelebrityInstagramText">' +
          CelebrityDetails.Instragram +
          "</a>" +
          "</div>";
      } else {
        instagram = "";
      }

      if (CelebrityDetails.Description != null) {
        description = CelebrityDetails.Description;
      } else {
        description = "";
      }

      var CDDynamic = document.createElement("div");
      CDDynamic.id = "celebrity_" + CelebrityDetails.id_celebrity;
      CDDynamic.innerHTML =
        "" +
        CelebrityVP +
        '<div class="CelebrityName" style="position: absolute;">' +
        CelebrityDetails.Name +
        "</div>" +
        '<img class="CelebrityImage" style="position: absolute;" src="https://' +
        ClientCode +
        ".showtagenabled.com/images/" +
        CelebrityDetails.CelebrityImage +
        '" />' +
        FavoriteCelebrity +
        '<div class="CelebrityExtra" style="position: absolute;"></div>' +
        '<div class="CelebrityPersonalia" style="position: absolute;">' +
        BirthName +
        "</br >" +
        BirthDate +
        "</br >" +
        BirthPlace +
        "</br >" +
        "</div >" +
        '<div class="CelebrityDescription" style="position:absolute; pointer-events: initial;">' +
        description +
        "</div>" +
        instagram +
        CelebVideo +
        "</div>";

      document.getElementById("CelebrityDetails").appendChild(CDDynamic);

      document.getElementById("CelebrityDetails").style.display = "block";

      // in case the celebrity as an aminiated png we reload the background each time
      let pnga_celebrity_details = getComputedStyle(
        document.documentElement
      ).getPropertyValue("--celebrityDetails");

      if (pnga_celebrity_details) {
        document.getElementById("CelebrityDetailsID").style.backgroundImage =
          'url("CSS/stylesheet/' +
          pnga_celebrity_details +
          "?a=" +
          Math.random() +
          '")';
      }

      // CLICK THE CELEBRITY VIDEO
      if (celebrityVideos.length > 0) {
        // in case the celebrity as an aminiated png we reload the background each time
        let pnga_celebrity_video_scroll = getComputedStyle(
          document.documentElement
        ).getPropertyValue("--celebrityDetailsVideoScroll");

        if (pnga_celebrity_video_scroll) {
          document.getElementById(
            "CelebrityVideoContainer"
          ).style.backgroundImage =
            'url("CSS/stylesheet/' +
            pnga_celebrity_video_scroll +
            "?a=" +
            Math.random() +
            '")';
        }

        var CelebrityVideoClicked = document.getElementsByClassName(
          "CelebrityVideoThumb"
        );

        for (var i = 0; i < CelebrityVideoClicked.length; i++) {
          CelebrityVideoClicked[i].onclick = function () {
            CelebrityVideo(
              this,
              CelebrityClicked,
              celebrityVideos,
              time,
              settings
            );
          };
        }
      }

      // CLICK THE FAVORITE ICON
      if (settings.favoriteButtonsActivated == 1) {
        // CLICK THE CELEBRITY FAVORITE ICON (ADD)

        var CelebrityFavoriteIcon = document.getElementsByClassName(
          "CelebrityFavoriteIcon"
        );

        for (var i = 0; i < CelebrityFavoriteIcon.length; i++) {
          CelebrityFavoriteIcon[i].onclick = function () {
            CelebrityFavoriteIconClicked(DivIdCelebrity, settings.ProgramCode);
          };
        }

        // CLICK THE CELEBRITY FAVORITE ICON (REMOVE)

        var CelebrityFavoriteIconRemove = document.getElementsByClassName(
          "CelebrityFavoriteIconRemove"
        );

        for (var i = 0; i < CelebrityFavoriteIconRemove.length; i++) {
          CelebrityFavoriteIconRemove[i].onclick = function () {
            CelebrityFavoriteRemove(DivIdCelebrity, settings.ProgramCode);
          };
        }
      }
    }
  }
}
// when viewer clicks the favorite button we store this in the database
function CelebrityFavoriteIconClicked(id_celebrity, ProgramCode) {
  var Celebrity = "Celebrity" + id_celebrity;
  var removeCelebrity = "Remove" + id_celebrity;

  if (studio == true) {
    url =
      "https://" +
      ClientCode +
      ".azurewebsites.net/api/User/Favorites/AddCelebrity/" +
      id_celebrity +
      "/" +
      ProgramCode +
      "/studiotest";
  } else {
    url =
      "https://" +
      ClientCode +
      ".azurewebsites.net/api/User/Favorites/AddCelebrity/" +
      id_celebrity +
      "/" +
      ProgramCode +
      "/" +
      id_user;
  }

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("POST", url);
  xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xmlhttp.send(JSON.stringify());

  document.getElementById(Celebrity).style.display = "none";
  document.getElementById(removeCelebrity).style.display = "block";
}
// when the viewer clicks the favorite button we update this in the database
function CelebrityFavoriteRemove(id_celebrity, ProgramCode) {
  var Celebrity = "Celebrity" + id_celebrity;
  var removeCelebrity = "Remove" + id_celebrity;

  if (studio == true) {
    url =
      "https://" +
      ClientCode +
      ".azurewebsites.net/api/User/Favorites/DeleteCelebrity/" +
      id_celebrity +
      "/studiotest";
  } else {
    url =
      "https://" +
      ClientCode +
      ".azurewebsites.net/api/User/Favorites/DeleteCelebrity/" +
      id_celebrity +
      "/" +
      id_user;
  }

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("DELETE", url);
  xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xmlhttp.send(JSON.stringify());

  document.getElementById(removeCelebrity).style.display = "none";
  document.getElementById(Celebrity).style.display = "block";
}
// check if there is tag information for this time segment
function CelebrityTags(currentTime, settings) {
  if (studio == true) {
    url =
      "https://tagapi.azurewebsites.net/api/Prepare/celebrities/" +
      settings.ProgramCode +
      "/" +
      currentTime;
  } else {
    url =
      "https://" +
      ClientCode +
      ".azurewebsites.net/api/Celebrity/" +
      settings.ProgramCode +
      "/" +
      currentTime +
      "/" +
      id_user;
  }

  var xhrCelebrity = new XMLHttpRequest();
  xhrCelebrity.open("GET", url, true);
  xhrCelebrity.send();
  xhrCelebrity.onreadystatechange = processRequest;

  function processRequest(e) {
    if (xhrCelebrity.readyState == 4 && xhrCelebrity.status == 200) {
      Celebrities = JSON.parse(xhrCelebrity.responseText);

      if (Celebrities.length != 0) {
        ShowCelebrityTags(Celebrities, settings, currentTime);
      }
    }
  }
}

// if tags exist for the time segment show them on the screen
function ShowCelebrityTags(Celebrities, settings, currentTime) {
  // minimize the menu option

  let Cel = "";

  buttonContainerMinimize("tag", settings);

  CelebrityTagData = Celebrities;

  document.getElementById("CelebrityTag").style.display = "block";

  document.getElementById("CelebrityTag").innerHTML = "";

  var dynamic = "";

  for (i = 0; i < Celebrities.length; i++) {
    Cel =
      Cel +
      "celebrity_" +
      Celebrities[i].id_celebrity +
      "-" +
      Celebrities[i].X +
      "-" +
      Celebrities[i].Y +
      ",";

    if (settings.deactivateTagHoover == 1) {
      hoverLeft =
        '<div class="CelebrityTagTextLeft tagText" style="text-align:left; float: left; margin-left: 10px; display:block">' +
        Celebrities[i].Name +
        "</div>";

      hoverRight =
        '<div class="CelebrityTagTextRight tagText" style="right: 10px; position:absolute; text-align:right; display:block">' +
        Celebrities[i].Name +
        "</div>";
    } else {
      hoverLeft =
        '<div class="CelebrityTagTextLeft tagText" style="text-align:left; float: left; margin-left: 10px;">' +
        Celebrities[i].Name +
        "</div>";

      hoverRight =
        '<div class="CelebrityTagTextRight tagText" style="right: 10px; position:absolute; text-align:right;">' +
        Celebrities[i].Name +
        "</div>";
    }

    if (Celebrities[i].X < 80) {
      dynamic +=
        '<div style="top:' +
        Celebrities[i].Y +
        "%; left:" +
        Celebrities[i].X +
        '%; position:absolute; z-index:10;">' +
        '<div id="celebrity_' +
        Celebrities[i].id_celebrity +
        '" class="CelebrityTag tag" style="float: left; pointer-events: initial;"></div>' +
        hoverLeft +
        "</div>";
    } else {
      dynamic +=
        '<div style="top:' +
        Celebrities[i].Y +
        "%; left:" +
        Celebrities[i].X +
        '%; position:absolute; z-index: 10;">' +
        '<div id="celebrity_' +
        Celebrities[i].id_celebrity +
        '" class="CelebrityTag tag" style="position:absolute; pointer-events: initial;"></div>' +
        hoverRight +
        "</div>";
    }
  }

  var CelebrityTagsContent = document.createElement("div");

  CelebrityTagsContent.id = "CelebritiesTagContainer";

  CelebrityTagsContent.innerHTML = dynamic;

  document.getElementById("CelebrityTag").appendChild(CelebrityTagsContent);

  var CelebrityTag = document.getElementsByClassName("CelebrityTag");

  for (var i = 0; i < CelebrityTag.length; i++) {
    CelebrityTag[i].onclick = function () {
      CelebrityClicked(this, currentTime, settings);
    };
  }

  JSProtocol.Celebrities(Cel);
}

// CELEBRITY VIDEO

// celebrity video loaded from celebrity details
function CelebrityVideo(
  celebrityVideo,
  celeb,
  celebrityVideos,
  time,
  settings
) {
  console.log(celebrityVideo);

  console.log(celeb);

  var DivIdCelebrity = celeb.id.split("_", 2)[1];

  console.log(DivIdCelebrity);

  document.getElementById("CelebrityVideo").innerHTML = "";

  document.getElementById("CelebrityDetails").style.display = "none";

  var DivIdCelebrityVideo = celebrityVideo.id.split("_", 2)[1];

  console.log(celebrityVideo.id);

  console.log(celebrityVideos);

  var videoDetails = celebrityVideos.find(
    (x) => x.id_celebrityVideo == DivIdCelebrityVideo
  );

  var CVDynamic = document.createElement("div");

  CVDynamic.innerHTML =
    "" +
    '<div id="CelebrityVideoPlayer" class="CelebrityVideoPlayer" style="pointer-events: none; position:absolute; z-index:100">' +
    '<video style="pointer-events: initial" id="VideoInVideo" controls controlsList="nofullscreen nodownload noremoteplayback" src="https://' +
    ClientCode +
    ".showtagenabled.com/video/" +
    videoDetails.videoUrl +
    '"></video> ' +
    '<div id="CelebrityVideoClose" style="pointer-events: initial"></div>' +
    "</div>";

  document.getElementById("CelebrityVideo").appendChild(CVDynamic);

  // delay video playback for 1 second

  var celebVideo = document.getElementById("VideoInVideo");

  setTimeout(function () {
    celebVideo.play();
  }, 1000);

  document.getElementById("CelebrityVideo").style.display = "Block";

  document.getElementById("CelebrityVideoClose").onclick = CloseVideoInVideo;

  document.getElementById("CelebrityVideo").style.display = "Block";

  document.getElementById("CelebrityVideoClose").onclick = CloseVideoInVideo;

  // in case the celebrity as an aminiated png we reload the background each time
  let pnga_celebrity_video_player = getComputedStyle(
    document.documentElement
  ).getPropertyValue("--celebrityDetailsVideoPlayer");

  if (pnga_celebrity_video_player) {
    document.getElementById("CelebrityVideoPlayer").style.backgroundImage =
      'url("CSS/stylesheet/' +
      pnga_celebrity_video_player +
      "?a=" +
      Math.random() +
      '")';
  }

  function CloseVideoInVideo() {
    console.log(celeb);

    document.getElementById("CelebrityVideoPlayer").style.display = "none";

    document.getElementById("CelebrityVideo").innerHTML = "";

    CelebrityClicked(celeb, time, settings);
  }
}
// when the viewer clicks the menu button we show all connected videos
function GetCelebrityVideoOverview(settings, ProgramCode) {
  var livelayer = false;

  // set live layer to true if any of these are true
  if (settings.buttonOverLive == 1 || settings.mouseOverLive == 1) {
    livelayer = true;
  }

  if (livelayer == false) {
    HideAll(settings);

    HideAllActive(settings);
  } else {
    CelebrityVideoOverviewdata = []; // THIS WILL INVOKE A RELOAD ON THE DATA EACH TIME
  }

  if (CelebrityVideoOverviewdata.length == 0) {
    if (studio == true) {
      url =
        "https://tagapi.azurewebsites.net/api/Prepare/CelebrityVideoAllinProgram/" +
        settings.ProgramCode;
    } else {
      // EWALD

      url =
        "https://tagapi.azurewebsites.net/api/Prepare/CelebrityVideoAllinProgram/" +
        settings.ProgramCode;

      //url = 'https://' + ClientCode + '.azurewebsites.net/api/Menu/CelebritiesInProgram/' + settings.ProgramCode + '/' + id_user + '/' + client_id
    }

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.send();

    xhr.onreadystatechange = processRequest;

    function processRequest(e) {
      if (xhr.readyState == 4 && xhr.status == 200) {
        CelebrityVideoOverviewdata = JSON.parse(xhr.responseText);

        console.log(CelebrityVideoOverviewdata);

        var CVODynamic = "";

        document.getElementById("CelebrityVideoOverview").innerHTML = "";

        for (i = 0; i < CelebrityVideoOverviewdata.length; i++) {
          CVODynamic +=
            "" +
            '<div id="' +
            CelebrityVideoOverviewdata[i].id_celebrityVideo +
            '" class="CelebrityVideoThumb">' +
            '<img class="CelebrityVideoThumbImage" src="https://' +
            ClientCode +
            ".showtagenabled.com/video/" +
            CelebrityVideoOverviewdata[i].thumbUrl +
            '" />' +
            '<div class="CelebrityThumbPlaybutton" style="position: absolute;"></div>' +
            '<div class="CelebrityVideoName" style="position: absolute;">' +
            CelebrityVideoOverviewdata[i].videoName +
            "</div>" +
            "</div>";
        }

        document.getElementById("CelebrityVideoOverview").innerHTML =
          "" +
          '<div id="CelebrityVideoOverviewContainer" class="MenuContainer" style="position: absolute; pointer-events:none; z-index:100;">' +
          '<div class="MenuContainerScroll" style="position:absolute; pointer-events:initial">' +
          CVODynamic +
          "</div>" +
          "</div>";
      }

      document.getElementById("CelebrityVideoOverview").style.display = "block";

      // in case an aminiated png we reload the background each time
      let pnga_celebrity_video_overview = getComputedStyle(
        document.documentElement
      ).getPropertyValue("--scrollContainerBackgroundCelebrityVideoOverview");

      if (pnga_celebrity_video_overview) {
        document.getElementById(
          "CelebrityVideoOverviewContainer"
        ).style.backgroundImage =
          'url("CSS/stylesheet/' +
          pnga_celebrity_video_overview +
          "?a=" +
          Math.random() +
          '")';
      }

      // CLICK THE CELEBRITY VIDEO

      if (settings.CelebrityVideoInProgram == 1) {
        var CelebrityVideoClicked = document.getElementsByClassName(
          "CelebrityVideoThumb"
        );

        console.log(CelebrityVideoClicked);

        for (var i = 0; i < CelebrityVideoClicked.length; i++) {
          CelebrityVideoClicked[i].onclick = function () {
            CelebrityVideoOverviewPlayer(this, settings);
          };
        }
      }
    }
  } else {
    console.log("loaded from buffer");

    // load from buffer if video's already have been downloaded once

    document.getElementById("CelebrityVideoOverview").style.display = "block";

    // in case an aminiated png we reload the background each time
    let pnga_celebrity_video_overview = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--scrollContainerBackgroundCelebrityVideoOverview");

    if (pnga_celebrity_video_overview) {
      document.getElementById(
        "CelebrityVideoOverviewContainer"
      ).style.backgroundImage =
        'url("CSS/stylesheet/' +
        pnga_celebrity_video_overview +
        "?a=" +
        Math.random() +
        '")';
    }
  }
}
// play the video's from the celebrity video overview
function CelebrityVideoOverviewPlayer(CelebrityVideo, settings) {
  console.log(CelebrityVideo);

  document.getElementById("CelebrityVideo").innerHTML = "";

  var DivIdCelebrityVideo = CelebrityVideo.id;

  var videoDetails = CelebrityVideoOverviewdata.find(
    (x) => x.id_celebrityVideo == DivIdCelebrityVideo
  );

  var CVDynamic = document.createElement("div");

  CVDynamic.innerHTML =
    "" +
    '<div id="CelebrityVideoPlayer" class="CelebrityVideoPlayer" style="pointer-events: initial; position:absolute; z-index:1000000000">' +
    '<video id="VideoInVideo" controls controlsList="nofullscreen nodownload noremoteplayback" src="https://' +
    ClientCode +
    ".showtagenabled.com/video/" +
    videoDetails.videoUrl +
    '"></video> ' +
    '<div id="CelebrityVideoClose"></div>' +
    "</div>";

  document.getElementById("CelebrityVideo").appendChild(CVDynamic);

  document.getElementById("CelebrityVideo").style.display = "block";

  // in case an aminiated png we reload the background each time

  let pnga_celebrity_video_player = getComputedStyle(
    document.documentElement
  ).getPropertyValue("--celebrityVideoOverviewPlayer");

  if (pnga_celebrity_video_player) {
    document.getElementById("CelebrityVideoPlayer").style.backgroundImage =
      'url("CSS/stylesheet/' +
      pnga_celebrity_video_player +
      "?a=" +
      Math.random() +
      '")';
  }

  // delay video playback for 1 second

  var celebVideo = document.getElementById("VideoInVideo");

  setTimeout(function () {
    celebVideo.play();
  }, 1000);

  document.getElementById("CelebrityVideoClose").onclick = CloseVideoInVideo;

  // close the celebrity video
  function CloseVideoInVideo() {
    document.getElementById("CelebrityVideoPlayer").style.display = "none";

    document.getElementById("CelebrityVideo").innerHTML = "";
  }
}

// PRODUCTS
// when the viewer clicks the product button in the menu we show all the products in a scroll
function GetAllProducts(settings, ProgramCode) {
  var livelayer = false;

  // set live layer to true if any of these are true
  if (settings.buttonOverLive == 1 || settings.mouseOverLive == 1) {
    livelayer = true;
  }

  if (livelayer == false) {
    HideAll(settings);

    HideAllActive(settings);
  }

  if (ProductData.length == 0) {
    var ButtonCelebrityLoader = document.getElementById(
      "ButtonProductLoader"
    ).style;
    ButtonCelebrityLoader.opacity = 1;
    (function fade() {
      (ButtonCelebrityLoader.opacity += 0.1) > 0
        ? (ButtonCelebrityLoader.display = "block")
        : setTimeout(fade, 40);
    })();

    if (studio == true) {
      url =
        "https://tagapi.azurewebsites.net/api/Prepare/productsInProgram/" +
        settings.ProgramCode;
    } else {
      url =
        "https://" +
        ClientCode +
        ".azurewebsites.net/api/Menu/productsinprogram/" +
        settings.ProgramCode +
        "/" +
        id_user +
        "/" +
        client_id;
    }

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.send();

    xhr.onreadystatechange = processRequest;

    function processRequest(e) {
      if (xhr.readyState == 4 && xhr.status == 200) {
        ProductDetailsData = JSON.parse(xhr.responseText);

        ProductListing(settings, ProductDetailsData);
      }
    }
  } else {
    ProductListing(settings, ProductDetailsData);
  }
}
// create the product scroll listing for the menu
function ProductListing(settings, ProductDetailsData) {
  document.getElementById("Product").innerHTML = "";

  var dynamic = "";

  for (i = 0; i < ProductDetailsData.length; i++) {
    if (ProductDetailsData[i].ProductCustomGroup == false) {
      dynamic +=
        '<div id="' +
        ProductDetailsData[i].id_product +
        '"class="MenuCellContainerProducts">' +
        '<div class="MenuCellBackground">' +
        '<img src="https://' +
        ClientCode +
        ".showtagenabled.com/images/" +
        ProductDetailsData[i].ProductImage +
        '" />' +
        '<div class="MenuCellName" style="position:absolute; user-select:none;">' +
        ProductDetailsData[i].ProductName +
        "</div>" +
        "</div>" +
        "</div>";
    }
  }

  var ProductContainerContent = document.createElement("div");
  ProductContainerContent.innerHTML =
    "" +
    '<div class="MenuContainer" id="ProductMenuContainer" style="pointer-events: initial; position:absolute">' +
    '<div class="MenuContainerScroll" style=" pointer-events: initial; position:relative">' +
    dynamic +
    "</div>" +
    "</div>";

  document.getElementById("Product").appendChild(ProductContainerContent);

  document.getElementById("Product").style.display = "block";

  document.getElementById("ButtonProductLoader").style.display = "none";

  var TopContainerCelProducts = document.getElementsByClassName(
    "MenuCellContainerProducts"
  );

  for (var i = 0; i < TopContainerCelProducts.length; i++) {
    TopContainerCelProducts[i].onclick = function () {
      ProductClicked(this, settings, 0);
    };
  }

  if (
    settings.customStyleSheet != 1 &&
    settings.ProgramInformationActive == 1 &&
    settings.topBarVisible == 1
  ) {
    document.getElementById("ProductMenuContainer").style.left = "unset";
    document.getElementById("ProductMenuContainer").style.right = "1.5vw";
  }
}
// when the viewer clicks a product tag or a product in the product scroll we show the details
function ProductClicked(ClickedProduct, settings, currentTime) {
  HideAll(settings);

  HideAllActive(settings);

  var url;
  var ProductDetails;
  var DivIdProduct;
  var sourceTag = false;

  if (ProductDetailsData[0].ProductId) {
    // if the viewer clicked a product tag

    DivIdProduct = ClickedProduct.id;

    ProductDetails = ProductDetailsData.find(
      (x) => x.ProductId == DivIdProduct
    );

    sourceTag = true;
  } else {
    // if the viewer clicked a product from the menu

    DivIdProduct = ClickedProduct.id;

    ProductDetails = ProductDetailsData.find(
      (x) => x.id_product == DivIdProduct
    );
  }

  // SEND TO ANALYTICS
  AnalyticsProductDetailsView(DivIdProduct, settings, currentTime);

  document.getElementById("ProductDetails").innerHTML = "";

  // if the viewer clicked a product tag
  if (sourceTag == true) {
    if (ProductDetails.X < 50) {
      // tag on the left side of the screen

      console.log("product details right side");

      var productVP =
        '<div class="ProductDetailsRight" id="ProductDetailsID" style="position: absolute; pointer-events: none; user-select: none; z-indez:100;">' +
        '<div id="ProductDetailsClose" class="ProductDetailsCloseRight" style="pointer-events:initial;"></div>';
    } else {
      // tag on the right side of the screen

      console.log("product details left side");

      var productVP =
        '<div class="ProductDetailsLeft" id="ProductDetailsID" style="position: absolute; pointer-events: none; user-select: none;z-indez:100;">' +
        '<div id="ProductDetailsClose" class="ProductDetailsCloseLeft" style="pointer-events:initial;"></div>';
    }
  } else {
    // user clicked a product in the menu

    var productVP =
      '<div class="ProductDetails" id="ProductDetailsID" style="position: absolute; pointer-events: none; user-select: none;z-indez:100;">' +
      '<div id="ProductDetailsClose" class="ProductDetailsClose" style="pointer-events:initial;"></div>';
  }

  if (settings.favoriteButtonsActivated == 1) {
    FavoriteProduct =
      "" +
      '<div class="productFavoriteIcon" id="Product' +
      DivIdProduct +
      '" style="position: absolute; style="pointer-events:initial;"></div>' +
      '<div class="productFavoriteIconRemove" id="RemoveProduct' +
      DivIdProduct +
      '" style="position: absolute; display: none; style="pointer-events:initial;"></div>';
  } else {
    FavoriteProduct = "";
  }

  if (ProductDetails.BrandName != null || ProductDetails.BrandName != "") {
    brandName = ProductDetails.BrandName;
  } else {
    brandName = "";
  }

  if (ProductDetails.UrlName != null && ProductDetails.ButtonText != null) {
    externallinkContainer =
      "" +
      '<div class="productExternalLinkContainer" style="position:absolute; pointer-events:initial;">' +
      '<div class="productexternallink"><a style="text-decoration: none;" href="' +
      ProductDetails.Url +
      '" target="_blank" class="" title="">' +
      ProductDetails.ButtonText +
      "<br /><span>" +
      ProductDetails.UrlName +
      "</span></a></div>" +
      "</div>";
  } else {
    externallinkContainer = "";
  }

  var PDDynamic = document.createElement("div");
  PDDynamic.innerHTML =
    "" +
    productVP +
    '<div class="ProductName" style="position: absolute;"><span id="brandName">' +
    brandName +
    "</span> " +
    ProductDetails.ProductName +
    "</div>" +
    '<div class="ProductImageBackground" style="position: absolute;"><img class="ProductImage" src="https://' +
    ClientCode +
    ".showtagenabled.com/images/" +
    ProductDetails.ProductImage +
    '"/>' +
    FavoriteProduct +
    "</div > " +
    '<div class="ProductExtra" style="position: absolute;"></div>' +
    '<div class="productdescription" style="position:absolute; style="pointer-events:initial;">' +
    ProductDetails.ProductDescription +
    "</div>" +
    externallinkContainer +
    "</div>";

  document.getElementById("ProductDetails").appendChild(PDDynamic);

  document.getElementById("ProductDetails").style.display = "block";

  // close the product details
  var closeDiv = document.getElementById("ProductDetailsClose");
  closeDiv.onclick = function () {
    document.getElementById("ProductDetailsID").style.display = "none";
  };

  // this loads the various options if the there would be an animated png background used
  if (sourceTag == true) {
    if (ProductDetails.X < 50) {
      // tag on the left side of the screen

      let pnga_product_details_right = getComputedStyle(
        document.documentElement
      ).getPropertyValue("--productDetailsContainerRight");

      if (pnga_product_details_right) {
        document.getElementById("ProductDetailsID").style.backgroundImage =
          'url("CSS/stylesheet/' +
          pnga_product_details_right +
          "?a=" +
          Math.random() +
          '")';
      }
    } else {
      // tag on the right side of the screen

      let pnga_product_details_left = getComputedStyle(
        document.documentElement
      ).getPropertyValue("--productDetailsContainerLeft");

      if (pnga_product_details_left) {
        document.getElementById("ProductDetailsID").style.backgroundImage =
          'url("CSS/stylesheet/' +
          pnga_product_details_left +
          "?a=" +
          Math.random() +
          '")';
      }
    }
  } else {
    // product detals loaded from the menu

    let pnga_product_details = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--productDetailsContainer");

    if (pnga_product_details) {
      document.getElementById("ProductDetailsID").style.backgroundImage =
        'url("CSS/stylesheet/' +
        pnga_product_details +
        "?a=" +
        Math.random() +
        '")';
    }
  }

  if (
    settings.customStyleSheet != 1 &&
    settings.ProgramInformationActive == 1
  ) {
    document.getElementById("ProductDetailsID").style.left = "unset";

    document.getElementById("ProductDetailsID").style.right = "1.5vw";
  }

  // SAVE CLICK TO ANALYTICS
  var productAnalyticsClickExternalLink = document.getElementsByClassName(
    "productexternallink"
  );

  for (var i = 0; i < productAnalyticsClickExternalLink.length; i++) {
    productAnalyticsClickExternalLink[i].onclick = function () {
      AnalyticsProductExternalLink(DivIdProduct, settings);
    };
  }

  if (settings.favoriteButtonsActivated == 1) {
    // CLICK THE PRODUCT FAVORITE ICON (ADD)

    var productFavoriteIcon = document.getElementsByClassName(
      "productFavoriteIcon"
    );

    for (var i = 0; i < productFavoriteIcon.length; i++) {
      productFavoriteIcon[i].onclick = function () {
        ProductFavoriteIconClicked(DivIdProduct, settings.ProgramCode);
      };
    }

    // CLICK THE PRODUCT FAVORITE ICON (REMOVE)

    var productFavoriteIconRemove = document.getElementsByClassName(
      "productFavoriteIconRemove"
    );

    for (var i = 0; i < productFavoriteIconRemove.length; i++) {
      productFavoriteIconRemove[i].onclick = function () {
        ProductFavoriteRemove(DivIdProduct, settings.ProgramCode);
      };
    }
  }
}
// when the user clicks the favorite icon we add this to the database (runs over API) SHARED WITH CUSTOM PRODUCTS
function ProductFavoriteIconClicked(id_product, ProgramCode) {
  var Product = "Product" + id_product;
  var removeProduct = "RemoveProduct" + id_product;

  if (studio == true) {
    url =
      "https://" +
      ClientCode +
      ".azurewebsites.net/api/User/Favorites/AddProduct/" +
      id_product +
      "/" +
      ProgramCode +
      "/studiotest";
  } else {
    url =
      "https://" +
      ClientCode +
      ".azurewebsites.net/api/User/Favorites/AddProduct/" +
      id_product +
      "/" +
      ProgramCode +
      "/" +
      id_user;
  }

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("POST", url);
  xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xmlhttp.send(JSON.stringify());

  document.getElementById(Product).style.display = "none";
  document.getElementById(removeProduct).style.display = "block";
}
// when the user clicks the favorite icon in the product details (runs over API to update database) SHARED WITH CUSTOM PRODUCTS
function ProductFavoriteRemove(id_product, ProgramCode) {
  var Product = "Product" + id_product;
  var removeProduct = "RemoveProduct" + id_product;

  if (studio == true) {
    url =
      "https://" +
      ClientCode +
      ".azurewebsites.net/api/User/Favorites/DeleteProduct/" +
      id_product +
      "/studiotest";
  } else {
    url =
      "https://" +
      ClientCode +
      ".azurewebsites.net/api/User/Favorites/DeleteProduct/" +
      id_product +
      "/" +
      id_user;
  }

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("DELETE", url);
  xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xmlhttp.send(JSON.stringify());

  document.getElementById(removeProduct).style.display = "none";
  document.getElementById(Product).style.display = "block";
}
// check if product tags exist for this time segment
function ProductTags(currentTime, settings) {
  if (studio == true) {
    url =
      "https://tagapi.azurewebsites.net/api/Prepare/Products/" +
      settings.ProgramCode +
      "/" +
      currentTime;
  } else {
    url =
      "https://" +
      ClientCode +
      ".azurewebsites.net/api/Products/" +
      settings.ProgramCode +
      "/" +
      currentTime +
      "/" +
      id_user;
  }

  var xhrProducts = new XMLHttpRequest();
  xhrProducts.open("GET", url, true);
  xhrProducts.send();
  xhrProducts.onreadystatechange = processRequest;

  function processRequest(e) {
    if (xhrProducts.readyState == 4 && xhrProducts.status == 200) {
      var Products = JSON.parse(xhrProducts.responseText);

      // if products are found we continue with the loading of the actual product tags on the screen

      if (Products.length != 0) {
        ShowProductTags(Products, settings, currentTime);
      }
    }
  }
}
// show the product tags on the screen if they exist
function ShowProductTags(Products, settings, currentTime) {
  let Prod = "";
  // minimize the menu option
  buttonContainerMinimize("tag", settings);

  ProductDetailsData = Products;

  // show the product tag layer
  document.getElementById("ProductTag").style.display = "block";

  // clear any old data that might be present
  document.getElementById("ProductTag").innerHTML = "";

  var dynamic = "";

  for (i = 0; i < Products.length; i++) {
    Prod =
      Prod +
      Products[i].ProductId +
      "-" +
      Math.floor(Products[i].X) +
      "-" +
      Math.floor(Products[i].Y) +
      ",";
    if (Products[i].X < 10) {
      console.log(Products[i]);

      // check if there a brand connected for this tag
      if (Products[i].BrandName != "NULL") {
        // check if the user want to show the logo image in the product tag
        if (settings.tagShowBrandLogo == 1) {
          // https://tag2081.blob.core.windows.net/images/brandlogo/LEGO_logo-700x700.png

          tagBrandLeft =
            '<img class="ProductTagLeftImage deactivateTagHover" src="https://tag2081.blob.core.windows.net/images/' +
            Products[i].BrandLogoImage +
            '">';
        } else {
          tagBrandLeft =
            '<div class="ProductBrandLeft deactivateTagHover" style="float: left; pointer-events: initial">' +
            Products[i].BrandName +
            "</div>";
        }
      } else {
        tagBrandLeft = "";
      }

      if (settings.deactivateProgramDetails == 1) {
        tagButton =
          '<div class="ProductTagButton"><a style="text-decoration: none; pointer-events:initial;" href="' +
          Products[i].Url +
          '" target="_blank" >' +
          Products[i].ButtonText +
          "<span> " +
          Products[i].UrlName +
          "</span></a></div>";
      } else {
        tagButton = "";
      }

      dynamic +=
        "" +
        '<div style = "top:' +
        Products[i].Y +
        "%; left:" +
        Products[i].X +
        '%; position:absolute; z-index:1;">' +
        '<div class="ProductTagLeft ProductTag tag" style="pointer-events: initial;" id="' +
        Products[i].ProductId +
        '">' +
        "</div>" +
        tagBrandLeft +
        '<div class="ProductTextLeft deactivateTagHover tagText">' +
        Products[i].ProductName +
        tagButton +
        "</div>" +
        "</div>";
    } else {
      // product tag close to the right edge of the screen

      if (Products[i].BrandName != "NULL") {
        // check if the user want to show the logo image in the product tag
        if (settings.tagShowBrandLogo == 1) {
          // https://tag2081.blob.core.windows.net/images/brandlogo/LEGO_logo-700x700.png

          tagBrandRight =
            '<img class="ProductTagRightImage deactivateTagHover" src="https://tag2081.blob.core.windows.net/images/' +
            Products[i].BrandLogoImage +
            '">';
        } else {
          tagBrandRight =
            '<div class="ProductBrandRight deactivateTagHover" style="pointer-events: initial; position: absolute">' +
            Products[i].BrandName +
            "</div>";
        }
      } else {
        tagBrandRight = "";
      }

      if (settings.deactivateProgramDetails == 1) {
        tagButton =
          '<div class="ProductTagButton"><a style="text-decoration: none; pointer-events:initial;" href="' +
          Products[i].Url +
          '" target="_blank" >' +
          Products[i].ButtonText +
          "<span> " +
          Products[i].UrlName +
          "</span></a></div>";
      } else {
        tagButton = "";
      }

      dynamic +=
        "" +
        '<div style = "top:' +
        Products[i].Y +
        "%; left:" +
        Products[i].X +
        '%; position:absolute; z-index:10;">' +
        '<div class="ProductTagRight ProductTag tag" style="pointer-events: initial;" id="' +
        Products[i].ProductId +
        '">' +
        "</div>" +
        tagBrandRight +
        '<div class="ProductTextRight deactivateTagHover tagText">' +
        Products[i].ProductName +
        tagButton +
        "</div>" +
        "</div>";
    }
  }

  ProductTagsContent = document.createElement("div");

  ProductTagsContent.id = "ProductsTagContainer";

  ProductTagsContent.innerHTML = dynamic;

  document.getElementById("ProductTag").appendChild(ProductTagsContent);

  // turn of the tag hover from code and make the brand name or image with
  // the product name directly visible on the screen
  if (
    settings.deactivateTagHoover == 1 ||
    settings.deactivateProgramDetails == 1
  ) {
    console.log("i run deactivate hover");

    var DeactivateHover = document.getElementsByClassName("deactivateTagHover");

    for (var i = 0; i < DeactivateHover.length; i++) {
      DeactivateHover[i].style.display = "block";
    }
  }

  // get the click on the tag but deactivate when ProgramDetails are deactivated
  if (
    settings.deactivateProgramDetails != 1 &&
    settings.deactivateProgramDetails != 1
  ) {
    var ProductTag = document.getElementsByClassName("ProductTag");

    for (var i = 0; i < ProductTag.length; i++) {
      ProductTag[i].onclick = function () {
        ProductClicked(this, settings, currentTime);
      };
    }
  }
  JSProtocol.Products(Prod);
}

// CUSTOM PRODUCTS
// when the viewer clicks the custom product button (second group) we show all products in scroll
function GetAllCustomProducts(settings, ProgramCode) {
  var livelayer = false;

  // set live layer to true if any of these are true
  if (settings.buttonOverLive == 1 || settings.mouseOverLive == 1) {
    livelayer = true;
  }

  if (livelayer == false) {
    HideAll(settings);

    HideAllActive(settings);
  }

  if (ProductDataCustom.length == 0) {
    var ButtonCustomProductLoader = document.getElementById(
      "ButtonCustomProductLoader"
    ).style;
    ButtonCustomProductLoader.opacity = 1;
    (function fade() {
      (ButtonCustomProductLoader.opacity += 0.1) > 0
        ? (ButtonCustomProductLoader.display = "block")
        : setTimeout(fade, 40);
    })();

    if (studio == true) {
      url =
        "https://tagapi.azurewebsites.net/api/Prepare/customProductsInProgram/";
    } else {
      url =
        "https://" +
        ClientCode +
        ".azurewebsites.net/api/Menu/CustomProductsInProgram/" +
        settings.ProgramCode +
        "/" +
        id_user +
        "/" +
        client_id;
    }

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url + ProgramCode, true); // PUBLISH VERSION ADD: ID_USER
    xhr.send();

    xhr.onreadystatechange = processRequest;

    function processRequest(e) {
      if (xhr.readyState == 4 && xhr.status == 200) {
        ProductDataCustom = JSON.parse(xhr.responseText);

        CustomProductListing(settings, ProductDataCustom);
      }
    }
  } else {
    CustomProductListing(settings, ProductDataCustom);
  }
}
// create the scroll listing for the menu
function CustomProductListing(settings, ProductDataCustom) {
  document.getElementById("Product").innerHTML = "";

  var dynamic = "";

  var shoppingList = "";

  if (CustomShoppingList == 1) {
    shoppingList =
      '<div class="MenuShoppingListButton" style="pointer-events: initial; position: absolute;user-select: none;"><a style="text-decoration: none;" href="' +
      customTopButtonLink +
      '" target="_blank">' +
      customTopButtonLinkText +
      "</a></div>";
  }

  for (i = 0; i < ProductDataCustom.length; i++) {
    if (settings.deactivateProgramDetails == 1) {
      if (
        ProductDataCustom[i].ProductDescription == null ||
        ProductDataCustom[i].ProductDescription == ""
      ) {
        ProductDescription = "";
      } else {
        ProductDescription =
          '<div class="MenuCelCustomProductDescription">' +
          ProductDataCustom[i].ProductDescription +
          "</div>";
      }

      if (ProductDataCustom[i].Url == null || ProductDataCustom[i].Url == "") {
        Url = "";
      } else {
        Url =
          '<div class="MenuCelcustomProductButtontext"><a href="' +
          ProductDataCustom[i].Url +
          '" target="_blank">' +
          ProductDataCustom[i].ButtonText +
          "</a></div>";
      }

      if (
        ProductDataCustom[i].BrandName == null ||
        ProductDataCustom[i].BrandName == ""
      ) {
        BrandName = "";
      } else {
        BrandName =
          '<div class="MenuCelCelebrityBrandname">' +
          ProductDataCustom[i].BrandName +
          "</div>";
      }

      var customProductExtras = "" + ProductDescription + Url + BrandName;
    } else {
      var customProductExtras = "";
    }

    dynamic +=
      '<div id="' +
      ProductDataCustom[i].id_product +
      '" class="MenuCellContainerCustomProducts">' +
      '<div class="MenuCellBackground">' +
      '<img src="https://' +
      ClientCode +
      ".showtagenabled.com/images/" +
      ProductDataCustom[i].ProductImage +
      '" />' +
      "</div>" +
      '<div class="MenuCellName" style="position:absolute; user-select:none;">' +
      ProductDataCustom[i].ProductName +
      "</div>" +
      customProductExtras +
      "</div>";
  }

  var CustomProductContainer = document.createElement("div");
  CustomProductContainer.innerHTML =
    "" +
    '<div class="MenuContainer" id="CustomProductMenuContainerID" style="pointer-events: initial; position:absolute">' +
    '<div class="MenuContainerScroll" style=" pointer-events: initial; position:relative">' +
    dynamic +
    "</div>" +
    shoppingList +
    "</div>";

  document.getElementById("Product").appendChild(CustomProductContainer);

  document.getElementById("Product").style.display = "block";

  document.getElementById("ButtonCustomProductLoader").style.display = "none";

  var TopContainerCelCustomProducts = document.getElementsByClassName(
    "MenuCellContainerCustomProducts"
  );

  if (
    settings.customStyleSheet != 1 &&
    settings.ProgramInformationActive == 1 &&
    settings.topBarVisible == 1
  ) {
    document.getElementById("CustomProductMenuContainerID").style.left =
      "unset";

    document.getElementById("CustomProductMenuContainerID").style.right =
      "1.5vw";
  }

  if (settings.deactivateProgramDetails == 0) {
    for (var i = 0; i < TopContainerCelCustomProducts.length; i++) {
      TopContainerCelCustomProducts[i].onclick = function () {
        CustomProductClicked(this, settings);
      };
    }
  }
}
// when the viewer clicks a product tag or a product in the custom product scroll (menu)
function CustomProductClicked(ClickedCustomProduct, settings) {
  HideAll(settings);

  var DivIdProduct;

  DivIdProduct = ClickedCustomProduct.id;

  var SelectedCustomProductDetails = ProductDataCustom.find(
    (x) => x.id_product == DivIdProduct
  );

  var xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    "https://" +
      client +
      ".azurewebsites.net/api/Products/SimilarProducts/" +
      SelectedCustomProductDetails.id_product,
    true
  );
  xhr.send();

  xhr.onreadystatechange = processRequest;

  function processRequest(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var similarProducts = JSON.parse(xhr.responseText); // USED ONLY FOR THE ANALYTICS

      document.getElementById("ProductDetails").innerHTML = "";

      if (settings.favoriteButtonsActivated == 1) {
        FavoriteProduct =
          "" +
          '<div class="productFavoriteIcon" id="Product' +
          DivIdProduct +
          '" style="position: absolute;"></div>' +
          '<div class="productFavoriteIconRemove" id="RemoveProduct' +
          DivIdProduct +
          '" style="position: absolute; display: none;"></div>';
      } else {
        FavoriteProduct = "";
      }

      if (
        SelectedCustomProductDetails.BrandName != null ||
        SelectedCustomProductDetails.BrandName != ""
      ) {
        brandName = SelectedCustomProductDetails.BrandName;
      } else {
        brandName = "";
      }

      if (
        SelectedCustomProductDetails.UrlName != null &&
        SelectedCustomProductDetails.ButtonText != null
      ) {
        externallinkContainer =
          "" +
          '<div class="productExternalLinkContainer" style="position:absolute">' +
          '<div class="productexternallink"><a style="text-decoration: none;" href="' +
          SelectedCustomProductDetails.Url +
          '" target="_blank" class="" title="">' +
          SelectedCustomProductDetails.ButtonText +
          "<br /><span>" +
          SelectedCustomProductDetails.UrlName +
          "</span></a></div>" +
          "</div>";
      } else {
        externallinkContainer = "";
      }

      var PDDynamic = document.createElement("div");
      PDDynamic.innerHTML =
        "" +
        '<div id="CustomProductDetaildID" class="ProductDetails"  style="position: absolute; pointer-events: initial; user-select: none;">' +
        '<div class="ProductName" style="position: absolute;">' +
        brandName +
        " " +
        SelectedCustomProductDetails.ProductName +
        "</div>" +
        '<div class="ProductImageBackground" style="position: absolute;"><img class="ProductImage" src="https://' +
        ClientCode +
        ".showtagenabled.com/images/" +
        SelectedCustomProductDetails.ProductImage +
        '"/>' +
        FavoriteProduct +
        "</div > " +
        '<div class="ProductExtra" style="position: absolute;"></div>' +
        '<div class="productdescription" style="position:absolute;">' +
        SelectedCustomProductDetails.ProductDescription +
        "</div>" +
        externallinkContainer +
        "</div>";

      document.getElementById("ProductDetails").appendChild(PDDynamic);

      document.getElementById("ProductDetails").style.display = "block";

      // SAVE CLICK TO ANALYTICS
      var productAnalyticsClickExternalLink = document.getElementsByClassName(
        "productexternallink"
      );

      for (var i = 0; i < productAnalyticsClickExternalLink.length; i++) {
        productAnalyticsClickExternalLink[i].onclick = function () {
          AnalyticsProductExternalLink(DivIdProduct, settings);
        };
      }

      if (
        settings.customStyleSheet != 1 &&
        settings.ProgramInformationActive == 1
      ) {
        document.getElementById("CustomProductDetaildID").style.left = "unset";

        document.getElementById("CustomProductDetaildID").style.right = "1.5vw";
      }

      if (settings.favoriteButtonsActivated == 1) {
        // CLICK THE PRODUCT FAVORITE ICON (ADD)

        var productFavoriteIcon = document.getElementsByClassName(
          "productFavoriteIcon"
        );

        for (var i = 0; i < productFavoriteIcon.length; i++) {
          productFavoriteIcon[i].onclick = function () {
            ProductFavoriteIconClicked(DivIdProduct, settings.ProgramCode);
          };
        }

        // CLICK THE PRODUCT FAVORITE ICON (REMOVE)

        var productFavoriteIconRemove = document.getElementsByClassName(
          "productFavoriteIconRemove"
        );

        for (var i = 0; i < productFavoriteIconRemove.length; i++) {
          productFavoriteIconRemove[i].onclick = function () {
            ProductFavoriteRemove(DivIdProduct, settings.ProgramCode);
          };
        }
      }
    }
  }
}

// MUSIC
// when the viewer clicks the music button in the menu we show all music of the video in a scroll
function GetAllMusic(settings, ProgramCode) {
  var livelayer = false;

  // set live layer to true if any of these are true
  if (settings.buttonOverLive == 1 || settings.mouseOverLive == 1) {
    livelayer = true;
  }

  if (livelayer == false) {
    HideAll(settings);

    HideAllActive(settings);
  }

  if (MusicData.length == 0) {
    document.getElementById("ButtonMusicLoader").style.display = "block";

    if (studio == true) {
      url =
        "https://tagapi.azurewebsites.net/api/Prepare/musicinprogram/" +
        ProgramCode;
    } else {
      url =
        "https://" +
        ClientCode +
        ".azurewebsites.net/api/Menu/musicinprogram/" +
        settings.ProgramCode +
        "/" +
        id_user +
        "/" +
        client_id;
    }

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true); // PUBLISH VERSION ADD: ID_USER
    xhr.send();

    xhr.onreadystatechange = processRequest;

    function processRequest(e) {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var MusicData = JSON.parse(xhr.responseText);

        document.getElementById("Music").innerHTML = "";

        var dynamic = "";

        for (i = 0; i < MusicData.length; i++) {
          dynamic +=
            '<div id="' +
            MusicData[i].id +
            '" class="MenuCellContainerMusic">' +
            '<div class="MenuCellBackground">' +
            '<img src="https://' +
            ClientCode +
            ".showtagenabled.com/images/music/" +
            MusicData[i].image +
            '" />' +
            "</div>" +
            '<div class="MenuCellName" style="position:absolute; user-select:none;">' +
            MusicData[i].artist +
            '<div class="MenuCellSong"> - ' +
            MusicData[i].song +
            "</div>" +
            "</div>" +
            '<div class="MenuCellMusicUrlContainer">' +
            '<a href="' +
            MusicData[i].url +
            '" target="_blank" style="text-decoration: none;" class="analyticsMusicClick" id="' +
            MusicData[i].id +
            '">' +
            '<div class="MenuCellMusicUrlName">' +
            MusicData[i].url_text +
            "</div>" +
            '<div class="MenuCellMusicUrl">' +
            MusicData[i].url_name +
            "</div>" +
            "</div>" +
            "</a>" +
            "</div>";
        }

        var MDynamic = document.createElement("div");
        MDynamic.innerHTML =
          "" +
          '<div class="MenuContainer" id="MusicMenuContainer" style="pointer-events: initial; position:absolute">' +
          '<div class="MenuContainerScroll" style=" pointer-events: initial; position:relative" id="MusicContainerScroll">' +
          dynamic +
          "</div>" +
          "</div>";

        document.getElementById("Music").appendChild(MDynamic);

        document.getElementById("Music").style.display = "block";

        document.getElementById("ButtonMusicLoader").style.display = "none";

        // ANALYTICS

        var TopContainerCelMusic = document.getElementsByClassName(
          "analyticsMusicClick"
        );

        for (var i = 0; i < TopContainerCelMusic.length; i++) {
          TopContainerCelMusic[i].onclick = function () {
            AnalyticsMusicExternalLink(this.id, settings, "menu");
          };
        }
      }
    }
  } else {
    document.getElementById("Music").style.display = "block";
  }
}
// when user clicks the favorite music icon we store in the database (runs over API) [DEACTIVATED]
function MusicFavoriteIconClicked(id_music, ProgramCode) {
  //console.log(id_music)
  var Music = "Music" + id_music;
  var removeMusic = "RemoveMusic" + id_music;

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open(
    "POST",
    "https://" +
      ClientCode +
      ".azurewebsites.net/api/User/Favorites/AddMusic/" +
      id_music +
      "/" +
      ProgramCode +
      "/" +
      id_user
  );
  xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xmlhttp.send(JSON.stringify());

  document.getElementById(Music).style.display = "none";
  document.getElementById(removeMusic).style.display = "block";
}
// when user clicks favorite button we update the setting in database [DEACTIVATED]
function MusicFavoriteRemove(id_music, ProgramCode) {
  var Music = "Music" + id_music;
  var removeMusic = "RemoveMusic" + id_music;

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open(
    "DELETE",
    "https://" +
      ClientCode +
      ".azurewebsites.net/api/User/Favorites/DeleteMusic/" +
      id_music +
      "/" +
      id_user
  );
  xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xmlhttp.send(JSON.stringify());

  document.getElementById(removeMusic).style.display = "none";
  document.getElementById(Music).style.display = "block";
}
// check if music exist for the time segment
function MusicInFrame(currentTime, settings) {
  if (studio == true) {
    url =
      "https://tagapi.azurewebsites.net/api/Prepare/Music/" +
      settings.ProgramCode +
      "/" +
      currentTime;
  } else {
    url =
      "https://" +
      ClientCode +
      ".azurewebsites.net/api/Music/" +
      settings.ProgramCode +
      "/" +
      currentTime +
      "/" +
      id_user;
  }

  var xhrMusic = new XMLHttpRequest();
  xhrMusic.open("GET", url, true);
  xhrMusic.send();
  xhrMusic.onreadystatechange = processRequest;

  function processRequest(e) {
    if (xhrMusic.readyState == 4 && xhrMusic.status == 200) {
      Music = JSON.parse(xhrMusic.responseText);

      if (Music.length != 0) {
        ShowMusic(Music, settings, currentTime);
      }
    }
  }
}
// show music connected to time segment
function ShowMusic(Music, settings, currentTime) {
  document.getElementById("Music").innerHTML = "";

  document.getElementById("Music").style.display = "block";

  MusicContent = document.createElement("div");

  MusicContent.id = "music_" + Music[0].id;
  MusicContent.className = "MusicContainer";
  MusicContent.style.top = Music[0].y + "%";
  MusicContent.style.left = Music[0].x + "%";
  MusicContent.style.width = Music[0].w + "%";
  MusicContent.style.height = "auto";
  MusicContent.style.position = "absolute";

  MusicContent.innerHTML =
    "" +
    '<img class="musicImage" src="https://' +
    ClientCode +
    ".showtagenabled.com/images/music/" +
    Music[0].image +
    '"/>' +
    '<div class="musicUrlButton" style="pointer-events: initial; user-select: none;" id="click_' +
    Music[0].id +
    '"><a style="text-decoration: none;" href="' +
    Music[0].url +
    '" target="_blank">' +
    '<div class="musicUrlText">' +
    Music[0].song +
    "</div>" +
    '<div class="musicUrlName">' +
    Music[0].artist +
    "</div>" +
    "</a></div>";

  document.getElementById("Music").appendChild(MusicContent);

  // ANALYTICS SECTION

  // SEEN ON SCREEN
  AnalyticsMusicView(settings, currentTime, Music[0].id);

  // CLICK EXTERNAL LINK

  document.getElementById("click_" + Music[0].id).onclick = function () {
    AnalyticsMusicExternalLink(Music[0].id, settings, "frame");
  };
}

// LIVEPOLL
// when the viewer clicks the livepoll button we show the livepoll on the screen
function GetLivePoll(settings, ProgramCode) {
  var livelayer = false;

  // set live layer to true if any of these are true
  if (settings.buttonOverLive == 1 || settings.mouseOverLive == 1) {
    livelayer = true;
  }

  if (livelayer == false) {
    HideAll(settings);

    HideAllActive(settings);
  }

  if (studio == true) {
    url =
      "https://tagapi.azurewebsites.net/api/Prepare/livepollinprogram/" +
      settings.ProgramCode;
  } else {
    url =
      "https://" +
      ClientCode +
      ".azurewebsites.net/api/Menu/LivePoll/" +
      settings.ProgramCode +
      "/" +
      id_user +
      "/" +
      client_id;
  }

  var dataresult = [];

  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.send();
  xhr.onreadystatechange = processRequest;
  function processRequest(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
      PollData = JSON.parse(xhr.responseText);
    }

    if (studio != true) {
      loadLivePollResults();
    } else {
      createLivePoll();
    }
  }

  function loadLivePollResults() {
    var xhr2 = new XMLHttpRequest();
    xhr2.open(
      "GET",
      "https://" +
        ClientCode +
        ".azurewebsites.net/api/interactions/LivePoll/result/" +
        settings.ProgramCode,
      true
    );
    xhr2.send();
    xhr2.onreadystatechange = processRequest;
    function processRequest(e) {
      if (xhr2.readyState == 4 && xhr.status == 200) {
        dataresult = JSON.parse(xhr2.responseText);

        createLivePoll();
      }
    }
  }

  function createLivePoll() {
    document.getElementById("LivePoll").innerHTML = "";

    var dynamic = "";

    if (studio != true) {
      var TotalPollVotes = 0;

      // calculate the total number of votes the set the max
      for (i = 0; i < dataresult.length; i++) {
        TotalPollVotes += dataresult[i].Votes;
      }

      // create each poll item
      for (i = 0; i < PollData.length; i++) {
        var ThisVote = dataresult.find(
          (x) => x.LivePollItemCode == PollData[i].LivePollItemCode
        );

        if (!ThisVote) {
          var calculation = 0;
        } else {
          var calculation = (ThisVote.Votes / TotalPollVotes) * 100;

          calculation = calculation.toFixed(0);
        }

        dynamic +=
          '<div id="id-LPitem_' +
          PollData[i].LivePollItemCode +
          '" class="PollItem" style="pointer-events: none;">' +
          '<div class="PollItemBar"><div class="PollItemBarResult" style="height:' +
          calculation +
          '%"></div></div>' +
          '<div class="PollItemBarResultnumber" style="position:absolute">' +
          calculation +
          "%</div>" +
          '<div class="PollItem-Imagebackground">' +
          '<img class="PollItem-Image" src="https://' +
          ClientCode +
          ".showtagenabled.com/images/" +
          PollData[i].LivePollItemImage +
          '" />' +
          "</div>" +
          '<div class="PollItem-name" style="position:absolute">' +
          PollData[i].LivePollItemName +
          "</div>" +
          '<div class="PollItem-Votebutton" style="position:absolute; pointer-events: initial;">' +
          PollData[i].VoteButtonText +
          "</div>" +
          "</div>";
      }
    } else {
      var TotalPollVotes = 75;

      for (i = 0; i < PollData.length; i++) {
        // REMOVE FOR PUBLISH VERSION

        if (i == 0) {
          number = Math.floor(Math.random() * 100) + 1;

          totalProcessed = number;

          calculation = number;
        }

        if (i > 0 && i < PollData.length - 1) {
          if (PollData.length > 2) {
            calculate = 100 - totalProcessed;

            number = Math.floor(Math.random() * calculate) + 1;

            totalProcessed = totalProcessed + number;

            calculation = number;
          }
        }

        if (i == PollData.length - 1) {
          var lastOne = 100 - totalProcessed;

          calculation = lastOne;
        }

        dynamic +=
          '<div id="id-LPitem_' +
          PollData[i].LivePollItemCode +
          '" class="PollItem" style="pointer-events: none;">' +
          '<div class="PollItemBar"><div class="PollItemBarResult" style="height:' +
          calculation +
          '%"></div></div>' +
          '<div class="PollItemBarResultnumber">' +
          calculation +
          "%</div>" +
          '<div class="PollItem-Imagebackground">' +
          '<img class="PollItem-Image" src="https://' +
          ClientCode +
          ".showtagenabled.com/images/" +
          PollData[i].LivePollItemImage +
          '" />' +
          "</div>" +
          '<div class="PollItem-name">' +
          PollData[i].LivePollItemName +
          "</div>" +
          '<div class="PollItem-Votebutton" style="pointer-events: initial;">' +
          PollData[i].VoteButtonText +
          "</div>" +
          "</div>";
      }
    }

    var LPDynamic = document.createElement("div");

    LPDynamic.innerHTML =
      '<div class="PollContainer" style="pointer-events:none; position: absolute; top:0; bottom: 0; left: 0; right:0; overflow:hidden;">' +
      '<div class="Poll-title" style="position:absolute">' +
      PollData[0].LivePollTitle +
      "</div>" +
      '<div class="Poll-LivePollDescription" style="position:absolute">' +
      PollData[0].LivePollDescription +
      "</div>" +
      '<div class="PollItem-Container" style="position:absolute;">' +
      dynamic +
      "</div>" +
      '<div class="PollItemVoteConfirmation" id="VoteConfirm">' +
      '<div class="PollItemVoteConfirmationText" style="position:absolute">' +
      PollData[0].VoteConfirmText +
      "</div>" +
      "</div>" +
      "</div>";

    document.getElementById("LivePoll").appendChild(LPDynamic);

    document.getElementById("LivePoll").style.display = "block";

    var PollItemsClick = document.getElementsByClassName("PollItem");

    for (var i = 0; i < PollItemsClick.length; i++) {
      PollItemsClick[i].onclick = function () {
        PollItemClicked(this, settings, PollData);
      };
    }
  }
}
// GET THE RESULTS OF THE LIVEPOLL
function PollItemClicked(ClickedPollItem, settings, PollData) {
  document.getElementById("VoteConfirm").style.display = "block";

  DivIdProduct = ClickedPollItem.id.split("_").pop();

  var SelectedPollItem = PollData.find(
    (x) => x.LivePollItemCode == DivIdProduct
  );

  var allPollItems = document.getElementsByClassName("PollItem");

  for (var i = 0; i < allPollItems.length; i++) {
    allPollItems[i].classList.remove("PollItem-votedcolor");
  }

  document
    .getElementById("id-LPitem_" + SelectedPollItem.LivePollItemCode)
    .classList.add("PollItem-votedcolor");

  if (studio != true) {
    // post the result of the vote the the client database
    // each viewer can only vote once for a livepoll item (possible to vote for another item)
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open(
      "POST",
      "https://" +
        ClientCode +
        ".azurewebsites.net/api/interactions/LivePoll/vote/" +
        SelectedPollItem.LivePollItemCode +
        "/" +
        id_user +
        "/" +
        settings.ProgramCode
    );
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify());
  }
}

//FORM
// check if there is a form for the time segment
function FormInFrame(currentTime, settings) {
  if (studio == true) {
    url =
      "https://tagapi.azurewebsites.net/api/Prepare/Forms/" +
      settings.ProgramCode +
      "/" +
      currentTime;
  } else {
    url =
      "https://" +
      ClientCode +
      ".azurewebsites.net/api/Form/" +
      settings.ProgramCode +
      "/" +
      currentTime +
      "/" +
      id_user;
  }

  var xhrForm = new XMLHttpRequest();
  xhrForm.open("GET", url, true);
  xhrForm.send();
  xhrForm.onreadystatechange = processRequest;

  function processRequest(e) {
    if (xhrForm.readyState == 4 && xhrForm.status == 200) {
      Forms = JSON.parse(xhrForm.responseText);

      if (Forms.length != 0) {
        ShowForm(Forms, settings, currentTime);
      }
    }
  }
}
// if a form exist for the time segment show it on the screen
function ShowForm(Forms, settings, currentTime) {
  document.getElementById("Form").innerHTML = "";

  document.getElementById("Form").style.display = "block";

  FormsContent = document.createElement("div");

  FormsContent.id = "form_" + Forms[0].id;

  // send to analytics
  AnalyticsFormView(settings, currentTime);

  if (Forms[0].image != null) {
    var FormImage =
      '<img class="FormImage" src="https://' +
      ClientCode +
      ".showtagenabled.com/images/form/" +
      Forms[0].image +
      '" style="width: ' +
      Forms[0].image_w +
      "%; height:auto; top: " +
      Forms[0].image_y +
      "%; left:" +
      Forms[0].image_x +
      '%; position: absolute; pointer-events:none;" />';
  } else {
    var FormImage = "<div></div>";
  }

  FormsContent.innerHTML =
    '<iFrame class="FormIframe" src="' +
    Forms[0].url +
    '" style="pointer-events:initial; width: ' +
    Forms[0].w +
    "%; height: " +
    Forms[0].h +
    "%; top: " +
    Forms[0].y +
    "%; left:" +
    Forms[0].x +
    '%; position: absolute;">' +
    "</iFrame>" +
    FormImage;

  document.getElementById("Form").appendChild(FormsContent);
}

//BANNER
// check if there are banners for the time segment
function BannersInFrame(currentTime, settings) {
  document.getElementById("Banner").style.display = "block";

  if (studio == true) {
    url =
      "https://tagapi.azurewebsites.net/api/Prepare/Banners/" +
      settings.ProgramCode +
      "/" +
      currentTime;
  } else {
    url =
      "https://" +
      ClientCode +
      ".azurewebsites.net/api/Banners/" +
      settings.ProgramCode +
      "/" +
      currentTime +
      "/" +
      id_user;
  }

  var xhrBanner = new XMLHttpRequest();
  xhrBanner.open("GET", url, true);
  xhrBanner.send();

  xhrBanner.onreadystatechange = processRequest;

  function processRequest(e) {
    if (xhrBanner.readyState == 4 && xhrBanner.status == 200) {
      var Banner = JSON.parse(xhrBanner.responseText);

      if (Banner.length != 0) {
        BannerImage(Banner, currentTime, settings);

        BannerVideoTransparent(Banner, currentTime, settings);

        BannerVideo(Banner, currentTime, settings);
      }
    }
  }
}
// show banner image on the screen
function BannerImage(data, currentTime, settings) {
  document.getElementById("BannerImage").innerHTML = "";

  // loop over all the banners
  for (i = 0; i < data.length; i++) {
    // check if the banner is an image
    if (data[i].BannerType == 0) {
      AnalyticsBannerView(data[i].id_banner, settings, currentTime);

      BIDynamic = document.createElement("div");

      BIDynamic = document.createElement("div");

      BIDynamic.innerHTML =
        '<div id="banner_' +
        data[i].id_banner +
        '" style="width: ' +
        data[i].Width +
        "%; height:auto; top: " +
        data[i].BannerY +
        "%; left:" +
        data[i].BannerX +
        '%; position: absolute; pointer-events: initial; cursor:default;">' +
        '<img src="https://' +
        ClientCode +
        ".showtagenabled.com/images/banner/" +
        data[i].URL +
        '" style="width: 100%; height: auto;" style="pointer-events: initial; cursor:default"/>' +
        '<a class="analyticsBannerClick" id="' +
        data[i].id_banner +
        '" style="width: ' +
        data[i].LinkWidth +
        "%; height: " +
        data[i].LinkHeight +
        "%; top: " +
        data[i].LinkY +
        "%; left:" +
        data[i].LinkX +
        '%; position: absolute; pointer-events: initial; cursor:pointer"' +
        'href="' +
        data[i].LinkUrl +
        '" target="_blank"></a>' +
        "</div>";

      document.getElementById("BannerImage").appendChild(BIDynamic);

      document.getElementById("BannerImage").style.display = "block";

      // ANALYTICS

      var TopContainerCelBanner = document.getElementsByClassName(
        "analyticsBannerClick"
      );

      for (var i = 0; i < TopContainerCelBanner.length; i++) {
        TopContainerCelBanner[i].onclick = function () {
          AnalyticsBannerExternalLink(this.id, settings);
        };
      }
    }
  }
}
// show if the banner is a video banner
function BannerVideo(data, currentTime, settings) {
  document.getElementById("Banner").innerHTML = "";

  for (i = 0; i < data.length; i++) {
    if (data[i].BannerType == 1 && data[i].Transparent == 0) {
      AnalyticsBannerView(data[i].id_banner, settings, currentTime);

      BDynamic = document.createElement("div");
      BDynamic.id = "banner_" + data[i].id_banner;
      BDynamic.innerHTML =
        "" +
        '<div style = "width: ' +
        data[i].Width +
        "%; top: " +
        data[i].BannerY +
        "%; left:" +
        data[i].BannerX +
        '%; position: absolute; pointer-events: initial; cursor:default;" > ' +
        '<video autoplay loop crossorigin="anonymous" src="https://' +
        ClientCode +
        ".showtagenabled.com/video/banner/" +
        data[i].URL +
        '" style="width: 100%;" style="pointer-events: initial; cursor:default"></video>' +
        '<a class="analyticsBannerClick" id="' +
        data[i].id_banner +
        '" style="width: ' +
        data[i].LinkWidth +
        "%; height: " +
        data[i].LinkHeight +
        "%; top: " +
        data[i].LinkY +
        "%; left:" +
        data[i].LinkX +
        '%; position: absolute; pointer-events: initial; cursor:pointer" href="' +
        data[i].LinkUrl +
        '" target="_blank"></a>' +
        "</div>";

      document.getElementById("Banner").appendChild(BDynamic);

      document.getElementById("Banner").style.display = "block";

      // ANALYTICS

      var TopContainerCelBanner = document.getElementsByClassName(
        "analyticsBannerClick"
      );

      for (var i = 0; i < TopContainerCelBanner.length; i++) {
        TopContainerCelBanner[i].onclick = function () {
          AnalyticsBannerExternalLink(this.id, settings);
        };
      }
    }
  }
}
// show if the banner is a transparent video banner
function BannerVideoTransparent(data, currentTime, settings) {
  // loop over the banners
  for (i = 0; i < data.length; i++) {
    // check if a banner is a transparent video banner
    if (data[i].BannerType == 1 && data[i].Transparent == 1) {
      AnalyticsBannerView(data[i].id_banner, settings, currentTime);

      drawTransparentBanner(data[i]);
    }
  }

  function drawTransparentBanner(data) {
    console.log(data);

    document.getElementById("BannerTransparenVideo").innerHTML = "";

    var source = "";

    var loop = "";

    function getVideoDimensionsOf(url) {
      return new Promise(function (resolve) {
        let video = document.createElement("video");

        video.addEventListener(
          "loadedmetadata",
          function () {
            // retrieve dimensions
            let height = this.videoHeight;
            let width = this.videoWidth;

            // send back result
            resolve({
              height: height,
              width: width,
              url: video.src,
            });
          },
          false
        );

        video.src = url;
      });
    }

    getVideoDimensionsOf(
      "https://" + ClientCode + ".showtagenabled.com/video/banner/" + data.URL
    ).then(({ width, height, url }) => {
      Canvas_height = height / 2;

      buildTransparenVideo(width, Canvas_height, height, url);
    });

    if (data.Repeat == 0) {
      loop = "loop";
    } else {
      loop = "";
    }

    function buildTransparenVideo(
      Canvas_width,
      Canvas_height,
      Canvas_height_alfa,
      url
    ) {
      BannerTVideoDynamic = document.createElement("div");

      BannerTVideoDynamic.innerHTML =
        "" +
        '<div style="width: ' +
        data.Width +
        "%; margin-left:" +
        data.BannerX +
        "%; top:" +
        data.BannerY +
        '%; position:absolute; pointer-events:none; z-index:10000">' +
        '<a class="analyticsBannerClick" id="' +
        data.id +
        '" style="width: ' +
        data.LinkWidth +
        "%; height: " +
        data.LinkHeight +
        "%; top: " +
        data.LinkY +
        "%; left:" +
        data.LinkX +
        '%; position: absolute; pointer-events: initial; cursor:pointer"' +
        'href="' +
        data.LinkUrl +
        '" target="_blank"></a>' +
        '<video id="Transparentvideo' +
        data.id +
        '" style="display:none;" autoplay ' +
        loop +
        ' crossorigin="anonymous"></video>' +
        '<canvas width="' +
        Canvas_width +
        '" height="' +
        Canvas_height_alfa +
        '" id="buffer' +
        data.id +
        '" style="display: none;"></canvas>' +
        '<canvas width="' +
        Canvas_width +
        '" height="' +
        Canvas_height +
        '" id="output' +
        data.id +
        '" style="display: inline-block; width:100%"></canvas>' +
        "</div>";

      document
        .getElementById("BannerTransparenVideo")
        .appendChild(BannerTVideoDynamic);

      document.getElementById("BannerTransparenVideo").style.display = "block";

      source = document.createElement("source");

      source.setAttribute("type", "video/mp4");

      source.setAttribute("src", url);

      var outputCanvas = document.getElementById("output" + data.id);

      var output = outputCanvas.getContext("2d");

      var bufferCanvas = document.getElementById("buffer" + data.id);

      var buffer = bufferCanvas.getContext("2d");

      var Bannervideo = document.getElementById("Transparentvideo" + data.id);

      Bannervideo.style.width = "100%";

      var width = outputCanvas.width;

      var height = outputCanvas.height;

      var interval;

      function processFrame() {
        buffer.drawImage(Bannervideo, 0, 0);

        var image = buffer.getImageData(0, 0, width, height),
          imageData = image.data,
          alphaData = buffer.getImageData(0, height, width, height).data;

        for (var i = 3, len = imageData.length; i < len; i = i + 4) {
          imageData[i] = alphaData[i - 1];
        }

        output.putImageData(image, 0, 0, 0, 0, width, height);
      }

      Bannervideo.addEventListener(
        "play",
        function () {
          clearInterval(interval);

          interval = setInterval(processFrame, 0);
        },
        false
      );

      Bannervideo.addEventListener(
        "ended",
        function () {
          if (data.Repeat == 1) {
            // VIDEO LOOP IS OFF

            document.getElementById("BannerTransparenVideo").innerHTML = "";
          }
        },
        false
      );

      var theID = document.getElementById("Transparentvideo" + data.id);

      theID.appendChild(source);

      // ANALYTICS

      var TopContainerCelBanner = document.getElementsByClassName(
        "analyticsBannerClick"
      );

      for (var i = 0; i < TopContainerCelBanner.length; i++) {
        TopContainerCelBanner[i].onclick = function () {
          AnalyticsBannerExternalLink(this.id, settings);
        };
      }
    }
  }
}

// ANALYTICS

// ANALYTICS CLICK ON ELEMENTS

// [OK] SAVE THE CLICK ON THE PRODUCT EXTERNAL LINK
// "api/Analytics/productExternalLink/{ProgramCode}/{id_product}/{id_user}/{id_client}"
function AnalyticsProductExternalLink(id_product, settings) {
  if (studio != true) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open(
      "POST",
      "https://" +
        ClientCode +
        ".azurewebsites.net/api/Analytics/productExternalLink/" +
        settings.ProgramCode +
        "/" +
        id_product +
        "/" +
        id_user +
        "/" +
        client_id
    );
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify());
  }
}

// [OK} SAVE THE CLICK ON THE BANNER EXTERNAL LINK
// "api/Analytics/bannerExternalLink/{ProgramCode}/{id_banner}/{id_user}/{id_client}"
function AnalyticsBannerExternalLink(id_banner, settings) {
  if (studio != true) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open(
      "POST",
      "https://" +
        ClientCode +
        ".azurewebsites.net/api/Analytics/bannerExternalLink/" +
        settings.ProgramCode +
        "/" +
        id_banner +
        "/" +
        id_user +
        "/" +
        client_id
    );
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify());
  }
}

// [OK] SAVE THE CLICK ON THE MUSIC EXTERNAL LINK
// "api/Analytics/musicExternalLink/{ProgramCode}/{id_music}/{id_user}/{id_client}/{origin}"
function AnalyticsMusicExternalLink(id_music, settings, origin) {
  if (studio != true) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open(
      "POST",
      "https://" +
        ClientCode +
        ".azurewebsites.net/api/Analytics/musicExternalLink/" +
        settings.ProgramCode +
        "/" +
        id_music +
        "/" +
        id_user +
        "/" +
        client_id +
        "/" +
        origin
    );
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify());
  }
}

// [OK] SAVE THE CLICK ON THE CALL-TO-ACTION BUTTON
// "api/Analytics/Calltoactionclick/{id_calltoaction}/{ProgramCode}/{Time}/{id_user}/{id_client}"
function AnalyticsCallToActionLinkclick(
  id_calltoaction,
  settings,
  currentTime
) {
  if (studio != true) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open(
      "POST",
      "https://" +
        ClientCode +
        ".azurewebsites.net/api/Analytics/celebrityDetails/" +
        id_calltoaction +
        "/" +
        settings.ProgramCode +
        "/" +
        currentTime +
        "/" +
        id_user +
        "/" +
        client_id
    );
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify());
  }
}

// ANALYTICS VIEW

// [OK] SAVE THE VIEW FOR CELEBRITY DETAILS (SEEN ON SCREEN)
// "api/Analytics/celebrityDetails/{id_celebrity}/{ProgramCode}/{id_user}/{id_client}/{time}"
function AnalyticsCelebrityDetailsView(id_celebrity, settings, currentTime) {
  if (studio != true) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open(
      "POST",
      "https://" +
        ClientCode +
        ".azurewebsites.net/api/Analytics/celebrityDetails/" +
        id_celebrity +
        "/" +
        settings.ProgramCode +
        "/" +
        id_user +
        "/" +
        client_id +
        "/" +
        currentTime
    );
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify());
  }
}

// [OK} SAVE THE VIEW FOR PRODUCT DETAILS (SEEN ON SCREEN)
// "api/Analytics/productDetails/{id_product}/{ProgramCode}/{id_user}/{id_client}/{Time}"
function AnalyticsProductDetailsView(id_product, settings, currentTime) {
  if (studio != true) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open(
      "POST",
      "https://" +
        ClientCode +
        ".azurewebsites.net/api/Analytics/productDetails/" +
        id_product +
        "/" +
        settings.ProgramCode +
        "/" +
        id_user +
        "/" +
        client_id +
        "/" +
        currentTime
    );
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify());
  }
}

// [OK] SAVE THE VIEW OF A FORM (SEEN ON SCREEN)
// "api/Analytics/form/{ProgramCode}/{time}/{id_user}/{id_client}"
function AnalyticsFormView(settings, currentTime) {
  if (studio != true) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open(
      "POST",
      "https://" +
        ClientCode +
        ".azurewebsites.net/api/Analytics/form/" +
        settings.ProgramCode +
        "/" +
        currentTime +
        "/" +
        id_user +
        "/" +
        client_id
    );
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify());
  }
}

// [OK]SAVE THE VIEW OF BANNER (SEEN ON SCREEN)
// "api/Analytics/banner/{id_banner}/{ProgramCode}/{time}/{id_user}/{id_client}"
function AnalyticsBannerView(id_banner, settings, currentTime) {
  if (studio != true) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open(
      "POST",
      "https://" +
        ClientCode +
        ".azurewebsites.net/api/Analytics/banner/" +
        id_banner +
        "/" +
        settings.ProgramCode +
        "/" +
        currentTime +
        "/" +
        id_user +
        "/" +
        client_id
    );
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify());
  }
}

// [OK] SAVE THE VIEW OF CALL TO ACTION (SEEN ON SCREEN)
// "api/Analytics/calltoaction/{ProgramCode}/{time}/{id_user}/{id_client}"
function AnalyticsCallToActionView(settings, currentTime) {
  if (studio != true) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open(
      "POST",
      "https://" +
        ClientCode +
        ".azurewebsites.net/api/Analytics/calltoaction/" +
        settings.ProgramCode +
        "/" +
        currentTime +
        "/" +
        id_user +
        "/" +
        client_id
    );
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify());
  }
}

// [OK] SAVE THE VIEW OF MUSIC (SEEN ON SCREEN) ON TIME SEGMENT
// "api/Analytics/music/{ProgramCode}/{time}/{id_user}/{id_client}/{id_music}"
function AnalyticsMusicView(settings, currentTime, id_music) {
  if (studio != true) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open(
      "POST",
      "https://" +
        ClientCode +
        ".azurewebsites.net/api/Analytics/music/" +
        settings.ProgramCode +
        "/" +
        currentTime +
        "/" +
        id_user +
        "/" +
        client_id +
        "/" +
        id_music
    );
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify());
  }
}

// ANALYTICS MENU

// [OK] SAVE THE CLICK MENU DIRECT ACTION BUTTON
// "api/Analytics/menuactivebutton/{id_button}/{ProgramCode}/{id_user}/{id_client}"
function AnalyticsMenuActiveButton(id_button, settings) {
  if (studio != true) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open(
      "POST",
      "https://" +
        ClientCode +
        ".azurewebsites.net/api/Analytics/menuactivebutton/" +
        id_button +
        "/" +
        settings.ProgramCode +
        "/" +
        id_user +
        "/" +
        client_id
    );
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify());
  }
}

// [OK] SAVE THE CLICK MENU CUSTOM PRODUCT
// "api/Analytics/customproductlink/{ProgramCode}/{id_user}/{id_client}"
function AnalyticsMenuCustomProduct(settings) {
  if (studio != true) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open(
      "POST",
      "https://" +
        ClientCode +
        ".azurewebsites.net/api/Analytics/customproductlink/" +
        settings.ProgramCode +
        "/" +
        id_user +
        "/" +
        client_id
    );
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify());
  }
}

// ANALYTICS VIDEO IN VIDEO INTERACTIONS

// SAVE IF THE CELEBRITY VIDEO IS WATCHED FOR A TIME SEGMENT
// "api/Analytics/celebrityVideoWatch/{id_CelebrityVideo}/{ProgramCode}/{Time}/{id_user}"
function AnalyticsVideoInVideoStart(id_CelebrityVideo, settings, currentTime) {
  if (studio != true) {
    // do we need this?

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open(
      "POST",
      "https://" +
        ClientCode +
        ".azurewebsites.net/api/Analytics/celebrityVideoWatch/" +
        id_CelebrityVideo +
        "/" +
        settings.ProgramCode +
        "/" +
        currentTime +
        "/" +
        id_user
    );
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify());
  }
}

// SAVE IF THE CELEBRITY VIDEO IS CLOSED FOR A TIME SEGMENT
// "api/Analytics/celebrityVideoClose/{id_CelebrityVideo}/{ProgramCode}/{Time}/{id_user}"
function AnalyticsVideoClosed(id_CelebrityVideo, settings, currentTime) {
  if (studio != true) {
    // do we need this?

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open(
      "POST",
      "https://" +
        ClientCode +
        ".azurewebsites.net/api/Analytics/celebrityVideoClose/" +
        id_CelebrityVideo +
        "/" +
        settings.ProgramCode +
        "/" +
        currentTime +
        "/" +
        id_user
    );
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify());
  }
}

// ANALYTICS PLAYER INTERACTIONS

// [OK] SAVE THE CLICK ON THE PLAY BUTTON
// "api/Analytics/play/{ProgramCode}/{Time}/{id_user}/{id_client}"
function AnalyticsPlayClicked(currentTime, settings) {
  if (studio != true) {
    // do we need this?

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open(
      "POST",
      "https://" +
        ClientCode +
        ".azurewebsites.net/api/Analytics/play/" +
        settings.ProgramCode +
        "/" +
        currentTime +
        "/" +
        id_user +
        "/" +
        client_id
    );
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify());
  }
}

// [OK] SAVE THE CLICK ON THE PAUSE BUTTON
// "api/Analytics/pause/{ProgramCode}/{Time}/{id_user}/{id_client}"
function AnalyticsPauseClicked(currentTime, settings) {
  if (studio != true) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open(
      "POST",
      "https://" +
        ClientCode +
        ".azurewebsites.net/api/Analytics/pause/" +
        settings.ProgramCode +
        "/" +
        currentTime +
        "/" +
        id_user +
        "/" +
        client_id
    );
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify());
  }
}

// SAVE THE CLICK ON THE SKIP BUTTON
// "api/Analytics/skip/{id_skip}/{ProgramCode}/{id_user}/{id_client}"
function AnalyticsSkipClicked(id_skip, settings) {
  if (studio != true) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open(
      "POST",
      "https://" +
        ClientCode +
        ".azurewebsites.net/api/Analytics/skip/" +
        id_skip +
        "/" +
        settings.ProgramCode +
        "/" +
        id_user +
        "/" +
        client_id
    );
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify());
  }
}
