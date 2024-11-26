# Standard Constants / Functions
Refers to constants/functions that are defined in Aiscript from the beginning and can be used anywhere.  
They are also called std constants/functions without standard.

## Syntax
> #Core:v

Represents a standard constant named `Core:v`.

> @Core:type(_v_: value): str

Represents a standard function named `Core:type`.  
It takes one argument of type value (i.e., any type) named `v` and returns a value of type str (string type).

## List

### std

#### @print(_message_: str): void
Displays a string on the screen.

#### @readline(_message_: str): str
Accepts string input.  

### :: Core

#### #Core:v
Type: `str`  
Version of AiScript runtime that's currently running.  

#### @Core:type(_v_: value): str
Get the type name of the value.  

#### @Core:to_str(_v_: value): str
Obtains a string representing a value.  

#### @Core:sleep(_time_: num): void
Wait for the specified time (milliseconds).

#### @Core:abort(_message_: str): never
Aborts the execution.

### :: Util
#### @Util:uuid(): str
Generates new UUID.

### :: Json
#### @Json:stringify(_v_: value): str
Generate JSON string.

#### @Json:parse(_json_: str): value
Parse JSON into object. Returns an error type value (`name`=`'not_json'`) if the argument is not parsable as JSON. 

#### @Json:parsable(_str_: str): bool
Determines if a string can be parsed as JSON. Exists for historical reasons.

### :: Date
#### @Date:now(): num
Returns current date. 

#### @Date:year(_date_?: num): num
Get the year of the time.  
If _date_ is passed, the year corresponding to _date_,  
If not passed, the year of the current time is returned.    

#### @Date:month(_date_?: num): num
Get the month of the time.  
If _date_ is passed, the month corresponding to _date_,  
If not passed, the month of the current time is returned.    

#### @Date:day(_date_?: num): num
Get the day of the current time.  
If _date_ is passed, the day corresponding to _date_,  
If not passed, the day of the current time is returned.

#### @Date:hour(_date_?: num): num
Get the hour of the current time.  
If _date_ is passed, the time corresponding to _date_,  
If not passed, the current time is returned.

#### @Date:minute(_date_?: num): num
Get the minutes of the current time.  
If _date_ is passed, the minute corresponding to _date_,  
If not passed, the minute of the current time is returned.

#### @Date:second(_date_?: num): num
Get the seconds of the current time.  
If _date_ is passed, the second corresponding to _date_,  
If not passed, the second of the current time is returned.

#### @Date:millisecond(_date_?: num): num
Get the milliseconds of the current time.  
If _date_ is passed, the millisecond corresponding to _date_,  
If not passed, the millisecond of the current time is returned.

#### @Date:parse(_date_: str): num
Generates a numeric value representing a date/time from a string that can be interpreted as a date.  
Interpretation depends on [JavaScript's Date constructor](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Date/Date).  
If the argument is not interpretable as a date, it returns a value of type error (`name`=`'not_date'`).

#### @Date:to_iso_str(_date_?: num, _time_offset_?: num): str
Returns a string with _date_ in extended notation ISO format.  
If _date_ is not passed, the current time is used.  
_time_offset_ is the time difference (in minutes) from UTC.  
If _time_offset_ is not passed, the local one is used.

### :: Math
→[Click here](std-math.md)

### :: Num
#### @Num:from_hex(_hex_: str): num
Return number from a hexadecimal string.  

### :: Str
#### #Str:lf
Type: `str`
Line feed (LF).

#### @Str:lt(a: str, b: str): num
Returns -1 if a < b, 0 if a == b, or 1 if a > b.
Can be used as a comparison function for arr.sort.

#### @Str:gt(a: str, b: str): num
Returns -1 if a > b, 0 if a == b, or 1 if a < b.
Can be used as a comparison function for arr.sort.

#### @Str:from_codepoint(codepoint: num): str
Generates characters from Unicode codepoints.  
_codepoint_ must be greater than or equal to 0 and less than or equal to 10FFFFF<sub>16</sub>.

#### @Str:from_unicode_codepoints(_codePoints_: arr&lt;num&gt;): str
Generates characters from an array of numbers representing a sequence of Unicode code points.  
Each element of __codePoints_ must be greater than or equal to 0 and less than or equal to 10FFFFFF<sub>16</sub>.

#### @Str:from_utf8_bytes(_bytes_: arr&lt;num&gt;): str
Generates characters from an array of numbers representing a UTF-8 byte sequence.  
Each element of _bytes_ must be greater than or equal to 0 and less than or equal to 255.
### :: Uri
#### @Uri:encode_full(uri: str): str
Returns a string with uri encoded as a URI. The following characters are not encoded:  
`A-Z a-z 0-9 - _ . ! ~ * ' ( ) ; , / ? : @ & = + $ #`

#### @Uri:encode_component(text: str): str
Returns a string with text encoded as a URI component. The following characters are not encoded:  
`A-Z a-z 0-9 - _ . ! ~ * ' ( )`

#### @Uri:decode_full(encoded_uri: str): str
Returns a string that decodes encoded_uri as an encoded URI.  
Escape sequences corresponding to the following characters are not decoded:  
`; , / ? : @ & = + $ #`

#### @Uri:decode_component(encoded_text: str): str
Returns a string that decodes encoded_text as an encoded URI component.  

### :: Arr
#### @Arr:create(_length_: num, _initial_?: value): arr
Creates an array of length `length`.  
The array will be filled with _initial_ if given, otherwise with `null`.  

### :: Obj
#### @Obj:keys(_v_: obj): arr
#### @Obj:vals(_v_: obj): arr
#### @Obj:kvs(_v_: obj): arr
Returns an array of object keys, values, and key/value pairs.

#### @Obj:get(_v_: obj, _key_: str): value

#### @Obj:set(_v_: obj, _key_: str, _val_: value): null

#### @Obj:has(_v_: obj, _key_: str): bool

#### @Obj:copy(_v_: obj): obj
Generates the copy of the object.

#### @Obj:merge(_o1_: obj, _o2_: obj): obj
Returns a merged version of the two objects.

### :: Error
#### @Error:create(_name_: str, _info_?: value): error
Create error type value.

### :: Async
#### @Async:interval(_interval_: num, _callback_: fn, _immediate_?: bool): fn
Calls the callback function at the specified period.  
Returns a stop function.  

#### @Async:timeout(_delay_: num, _callback_: fn):
Calls the callback function after the specified time has elapsed.  
Returns a stop function as the return value.  
