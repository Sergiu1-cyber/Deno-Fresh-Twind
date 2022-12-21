// Copyright 2018-2022 the Deno authors. All rights reserved. MIT license.
// Copyright the Browserify authors. MIT License.
// Ported from https://github.com/browserify/path-browserify/
// This module is browser compatible.
// Alphabet chars.
export const CHAR_UPPERCASE_A = 65; /* A */ 
export const CHAR_LOWERCASE_A = 97; /* a */ 
export const CHAR_UPPERCASE_Z = 90; /* Z */ 
export const CHAR_LOWERCASE_Z = 122; /* z */ 
// Non-alphabetic chars.
export const CHAR_DOT = 46; /* . */ 
export const CHAR_FORWARD_SLASH = 47; /* / */ 
export const CHAR_BACKWARD_SLASH = 92; /* \ */ 
export const CHAR_VERTICAL_LINE = 124; /* | */ 
export const CHAR_COLON = 58; /* : */ 
export const CHAR_QUESTION_MARK = 63; /* ? */ 
export const CHAR_UNDERSCORE = 95; /* _ */ 
export const CHAR_LINE_FEED = 10; /* \n */ 
export const CHAR_CARRIAGE_RETURN = 13; /* \r */ 
export const CHAR_TAB = 9; /* \t */ 
export const CHAR_FORM_FEED = 12; /* \f */ 
export const CHAR_EXCLAMATION_MARK = 33; /* ! */ 
export const CHAR_HASH = 35; /* # */ 
export const CHAR_SPACE = 32; /*   */ 
export const CHAR_NO_BREAK_SPACE = 160; /* \u00A0 */ 
export const CHAR_ZERO_WIDTH_NOBREAK_SPACE = 65279; /* \uFEFF */ 
export const CHAR_LEFT_SQUARE_BRACKET = 91; /* [ */ 
export const CHAR_RIGHT_SQUARE_BRACKET = 93; /* ] */ 
export const CHAR_LEFT_ANGLE_BRACKET = 60; /* < */ 
export const CHAR_RIGHT_ANGLE_BRACKET = 62; /* > */ 
export const CHAR_LEFT_CURLY_BRACKET = 123; /* { */ 
export const CHAR_RIGHT_CURLY_BRACKET = 125; /* } */ 
export const CHAR_HYPHEN_MINUS = 45; /* - */ 
export const CHAR_PLUS = 43; /* + */ 
export const CHAR_DOUBLE_QUOTE = 34; /* " */ 
export const CHAR_SINGLE_QUOTE = 39; /* ' */ 
export const CHAR_PERCENT = 37; /* % */ 
export const CHAR_SEMICOLON = 59; /* ; */ 
export const CHAR_CIRCUMFLEX_ACCENT = 94; /* ^ */ 
export const CHAR_GRAVE_ACCENT = 96; /* ` */ 
export const CHAR_AT = 64; /* @ */ 
export const CHAR_AMPERSAND = 38; /* & */ 
export const CHAR_EQUAL = 61; /* = */ 
// Digits
export const CHAR_0 = 48; /* 0 */ 
export const CHAR_9 = 57; /* 9 */ 
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3N0ZEAwLjEyOC4wL3BhdGgvX2NvbnN0YW50cy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAxOC0yMDIyIHRoZSBEZW5vIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuIE1JVCBsaWNlbnNlLlxuLy8gQ29weXJpZ2h0IHRoZSBCcm93c2VyaWZ5IGF1dGhvcnMuIE1JVCBMaWNlbnNlLlxuLy8gUG9ydGVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2Jyb3dzZXJpZnkvcGF0aC1icm93c2VyaWZ5L1xuLy8gVGhpcyBtb2R1bGUgaXMgYnJvd3NlciBjb21wYXRpYmxlLlxuXG4vLyBBbHBoYWJldCBjaGFycy5cbmV4cG9ydCBjb25zdCBDSEFSX1VQUEVSQ0FTRV9BID0gNjU7IC8qIEEgKi9cbmV4cG9ydCBjb25zdCBDSEFSX0xPV0VSQ0FTRV9BID0gOTc7IC8qIGEgKi9cbmV4cG9ydCBjb25zdCBDSEFSX1VQUEVSQ0FTRV9aID0gOTA7IC8qIFogKi9cbmV4cG9ydCBjb25zdCBDSEFSX0xPV0VSQ0FTRV9aID0gMTIyOyAvKiB6ICovXG5cbi8vIE5vbi1hbHBoYWJldGljIGNoYXJzLlxuZXhwb3J0IGNvbnN0IENIQVJfRE9UID0gNDY7IC8qIC4gKi9cbmV4cG9ydCBjb25zdCBDSEFSX0ZPUldBUkRfU0xBU0ggPSA0NzsgLyogLyAqL1xuZXhwb3J0IGNvbnN0IENIQVJfQkFDS1dBUkRfU0xBU0ggPSA5MjsgLyogXFwgKi9cbmV4cG9ydCBjb25zdCBDSEFSX1ZFUlRJQ0FMX0xJTkUgPSAxMjQ7IC8qIHwgKi9cbmV4cG9ydCBjb25zdCBDSEFSX0NPTE9OID0gNTg7IC8qIDogKi9cbmV4cG9ydCBjb25zdCBDSEFSX1FVRVNUSU9OX01BUksgPSA2MzsgLyogPyAqL1xuZXhwb3J0IGNvbnN0IENIQVJfVU5ERVJTQ09SRSA9IDk1OyAvKiBfICovXG5leHBvcnQgY29uc3QgQ0hBUl9MSU5FX0ZFRUQgPSAxMDsgLyogXFxuICovXG5leHBvcnQgY29uc3QgQ0hBUl9DQVJSSUFHRV9SRVRVUk4gPSAxMzsgLyogXFxyICovXG5leHBvcnQgY29uc3QgQ0hBUl9UQUIgPSA5OyAvKiBcXHQgKi9cbmV4cG9ydCBjb25zdCBDSEFSX0ZPUk1fRkVFRCA9IDEyOyAvKiBcXGYgKi9cbmV4cG9ydCBjb25zdCBDSEFSX0VYQ0xBTUFUSU9OX01BUksgPSAzMzsgLyogISAqL1xuZXhwb3J0IGNvbnN0IENIQVJfSEFTSCA9IDM1OyAvKiAjICovXG5leHBvcnQgY29uc3QgQ0hBUl9TUEFDRSA9IDMyOyAvKiAgICovXG5leHBvcnQgY29uc3QgQ0hBUl9OT19CUkVBS19TUEFDRSA9IDE2MDsgLyogXFx1MDBBMCAqL1xuZXhwb3J0IGNvbnN0IENIQVJfWkVST19XSURUSF9OT0JSRUFLX1NQQUNFID0gNjUyNzk7IC8qIFxcdUZFRkYgKi9cbmV4cG9ydCBjb25zdCBDSEFSX0xFRlRfU1FVQVJFX0JSQUNLRVQgPSA5MTsgLyogWyAqL1xuZXhwb3J0IGNvbnN0IENIQVJfUklHSFRfU1FVQVJFX0JSQUNLRVQgPSA5MzsgLyogXSAqL1xuZXhwb3J0IGNvbnN0IENIQVJfTEVGVF9BTkdMRV9CUkFDS0VUID0gNjA7IC8qIDwgKi9cbmV4cG9ydCBjb25zdCBDSEFSX1JJR0hUX0FOR0xFX0JSQUNLRVQgPSA2MjsgLyogPiAqL1xuZXhwb3J0IGNvbnN0IENIQVJfTEVGVF9DVVJMWV9CUkFDS0VUID0gMTIzOyAvKiB7ICovXG5leHBvcnQgY29uc3QgQ0hBUl9SSUdIVF9DVVJMWV9CUkFDS0VUID0gMTI1OyAvKiB9ICovXG5leHBvcnQgY29uc3QgQ0hBUl9IWVBIRU5fTUlOVVMgPSA0NTsgLyogLSAqL1xuZXhwb3J0IGNvbnN0IENIQVJfUExVUyA9IDQzOyAvKiArICovXG5leHBvcnQgY29uc3QgQ0hBUl9ET1VCTEVfUVVPVEUgPSAzNDsgLyogXCIgKi9cbmV4cG9ydCBjb25zdCBDSEFSX1NJTkdMRV9RVU9URSA9IDM5OyAvKiAnICovXG5leHBvcnQgY29uc3QgQ0hBUl9QRVJDRU5UID0gMzc7IC8qICUgKi9cbmV4cG9ydCBjb25zdCBDSEFSX1NFTUlDT0xPTiA9IDU5OyAvKiA7ICovXG5leHBvcnQgY29uc3QgQ0hBUl9DSVJDVU1GTEVYX0FDQ0VOVCA9IDk0OyAvKiBeICovXG5leHBvcnQgY29uc3QgQ0hBUl9HUkFWRV9BQ0NFTlQgPSA5NjsgLyogYCAqL1xuZXhwb3J0IGNvbnN0IENIQVJfQVQgPSA2NDsgLyogQCAqL1xuZXhwb3J0IGNvbnN0IENIQVJfQU1QRVJTQU5EID0gMzg7IC8qICYgKi9cbmV4cG9ydCBjb25zdCBDSEFSX0VRVUFMID0gNjE7IC8qID0gKi9cblxuLy8gRGlnaXRzXG5leHBvcnQgY29uc3QgQ0hBUl8wID0gNDg7IC8qIDAgKi9cbmV4cG9ydCBjb25zdCBDSEFSXzkgPSA1NzsgLyogOSAqL1xuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDBFQUEwRTtBQUMxRSxpREFBaUQ7QUFDakQsNkRBQTZEO0FBQzdELHFDQUFxQztBQUVyQyxrQkFBa0I7QUFDbEIsT0FBTyxNQUFNLGdCQUFnQixHQUFHLEVBQUUsQ0FBQyxDQUFDLE9BQU87QUFDM0MsT0FBTyxNQUFNLGdCQUFnQixHQUFHLEVBQUUsQ0FBQyxDQUFDLE9BQU87QUFDM0MsT0FBTyxNQUFNLGdCQUFnQixHQUFHLEVBQUUsQ0FBQyxDQUFDLE9BQU87QUFDM0MsT0FBTyxNQUFNLGdCQUFnQixHQUFHLEdBQUcsQ0FBQyxDQUFDLE9BQU87QUFFNUMsd0JBQXdCO0FBQ3hCLE9BQU8sTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDLENBQUMsT0FBTztBQUNuQyxPQUFPLE1BQU0sa0JBQWtCLEdBQUcsRUFBRSxDQUFDLENBQUMsT0FBTztBQUM3QyxPQUFPLE1BQU0sbUJBQW1CLEdBQUcsRUFBRSxDQUFDLENBQUMsT0FBTztBQUM5QyxPQUFPLE1BQU0sa0JBQWtCLEdBQUcsR0FBRyxDQUFDLENBQUMsT0FBTztBQUM5QyxPQUFPLE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQyxDQUFDLE9BQU87QUFDckMsT0FBTyxNQUFNLGtCQUFrQixHQUFHLEVBQUUsQ0FBQyxDQUFDLE9BQU87QUFDN0MsT0FBTyxNQUFNLGVBQWUsR0FBRyxFQUFFLENBQUMsQ0FBQyxPQUFPO0FBQzFDLE9BQU8sTUFBTSxjQUFjLEdBQUcsRUFBRSxDQUFDLENBQUMsUUFBUTtBQUMxQyxPQUFPLE1BQU0sb0JBQW9CLEdBQUcsRUFBRSxDQUFDLENBQUMsUUFBUTtBQUNoRCxPQUFPLE1BQU0sUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVE7QUFDbkMsT0FBTyxNQUFNLGNBQWMsR0FBRyxFQUFFLENBQUMsQ0FBQyxRQUFRO0FBQzFDLE9BQU8sTUFBTSxxQkFBcUIsR0FBRyxFQUFFLENBQUMsQ0FBQyxPQUFPO0FBQ2hELE9BQU8sTUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFDLENBQUMsT0FBTztBQUNwQyxPQUFPLE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQyxDQUFDLE9BQU87QUFDckMsT0FBTyxNQUFNLG1CQUFtQixHQUFHLEdBQUcsQ0FBQyxDQUFDLFlBQVk7QUFDcEQsT0FBTyxNQUFNLDZCQUE2QixHQUFHLEtBQUssQ0FBQyxDQUFDLFlBQVk7QUFDaEUsT0FBTyxNQUFNLHdCQUF3QixHQUFHLEVBQUUsQ0FBQyxDQUFDLE9BQU87QUFDbkQsT0FBTyxNQUFNLHlCQUF5QixHQUFHLEVBQUUsQ0FBQyxDQUFDLE9BQU87QUFDcEQsT0FBTyxNQUFNLHVCQUF1QixHQUFHLEVBQUUsQ0FBQyxDQUFDLE9BQU87QUFDbEQsT0FBTyxNQUFNLHdCQUF3QixHQUFHLEVBQUUsQ0FBQyxDQUFDLE9BQU87QUFDbkQsT0FBTyxNQUFNLHVCQUF1QixHQUFHLEdBQUcsQ0FBQyxDQUFDLE9BQU87QUFDbkQsT0FBTyxNQUFNLHdCQUF3QixHQUFHLEdBQUcsQ0FBQyxDQUFDLE9BQU87QUFDcEQsT0FBTyxNQUFNLGlCQUFpQixHQUFHLEVBQUUsQ0FBQyxDQUFDLE9BQU87QUFDNUMsT0FBTyxNQUFNLFNBQVMsR0FBRyxFQUFFLENBQUMsQ0FBQyxPQUFPO0FBQ3BDLE9BQU8sTUFBTSxpQkFBaUIsR0FBRyxFQUFFLENBQUMsQ0FBQyxPQUFPO0FBQzVDLE9BQU8sTUFBTSxpQkFBaUIsR0FBRyxFQUFFLENBQUMsQ0FBQyxPQUFPO0FBQzVDLE9BQU8sTUFBTSxZQUFZLEdBQUcsRUFBRSxDQUFDLENBQUMsT0FBTztBQUN2QyxPQUFPLE1BQU0sY0FBYyxHQUFHLEVBQUUsQ0FBQyxDQUFDLE9BQU87QUFDekMsT0FBTyxNQUFNLHNCQUFzQixHQUFHLEVBQUUsQ0FBQyxDQUFDLE9BQU87QUFDakQsT0FBTyxNQUFNLGlCQUFpQixHQUFHLEVBQUUsQ0FBQyxDQUFDLE9BQU87QUFDNUMsT0FBTyxNQUFNLE9BQU8sR0FBRyxFQUFFLENBQUMsQ0FBQyxPQUFPO0FBQ2xDLE9BQU8sTUFBTSxjQUFjLEdBQUcsRUFBRSxDQUFDLENBQUMsT0FBTztBQUN6QyxPQUFPLE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQyxDQUFDLE9BQU87QUFFckMsU0FBUztBQUNULE9BQU8sTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDLENBQUMsT0FBTztBQUNqQyxPQUFPLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQyxDQUFDLE9BQU8ifQ==