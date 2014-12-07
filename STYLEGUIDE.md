# Styleguide

## [jscs] - the JavaScript Code Style checker
[jscs]: https://github.com/jscs/node-jscs

`jscs` is a code style checker.

Our rules are as follows:


### requireSpaceBeforeKeywords

Requires space before keyword.

##### Valid

```js
} else {
    x++;
}
```

##### Invalid

```js
}else {
    x++;
}
```

### requireSpaceAfterKeywords

Requires space after keyword.

#### Keywords

```js
"requireSpaceAfterKeywords": [
    "do",
    "for",
    "if",
    "else",
    "switch",
    "case",
    "try",
    "catch",
    "void",
    "while",
    "with",
    "return",
    "typeof"
]
```

##### Valid

```js
return true;
```

##### Invalid

```js
if(x) {
    x++;
}
```

### requireSpaceBeforeBlockStatements

Requires space before block statements (for loops, control structures).

#### Example

```js
"requireSpaceBeforeBlockStatements": true
```

##### Valid

```js
if (cond) {
    foo();
}

for (var e in elements) {
    bar(e);
}

while (cond) {
    foo();
}
```

##### Invalid

```js
if (cond){
    foo();
}

for (var e in elements){
    bar(e);
}

while (cond){
    foo();
}
```

### requireParenthesesAroundIIFE

Requires parentheses around immediately invoked function expressions.

##### Valid

```js
var a = (function(){ return 1; })();
var b = (function(){ return 2; }());
var c = (function(){ return 3; }).call(this, arg1);
var d = (function(){ return 3; }.call(this, arg1));
var e = (function(){ return d; }).apply(this, args);
var f = (function(){ return d; }.apply(this, args));
```

##### Invalid

```js
var a = function(){ return 1; }();
var c = function(){ return 3; }.call(this, arg1);
var d = function(){ return d; }.apply(this, args);
```


### requireSpacesInConditionalExpression

Requires space before and after `?` or `:` in conditional expressions.

##### Valid

```js
var a = b ? c : d;
```

##### Invalid

```js
var a = b? c : d;
var a = b ?c : d;
var a = b ? c: d;
var a = b ? c :d;
```

### disallowSpacesInCallExpression

Disallows space before `()` in call expressions.

##### Valid

```js
var x = foobar();
```

##### Invalid

```js
var x = foobar ();
```


### disallowMultipleVarDecl

Disallows multiple `var` declaration (except for-loop, and occurrences where all variables are not defined).

##### Valid

```js
var a, b;
var x = 1;
var y = 2;

for (var i = 0, j = arr.length; i < j; i++) {}
```

##### Invalid

```js
var x = 1,
    y = 2;

var x, y = 2, z;
```

### requireBlocksOnNewline

Requires blocks to begin and end with a newline

##### Valid

```js
if (true) {
    doSomething();
    doSomethingElse();
}
if (true) { doSomething(); }
var abc = function() {};
```

##### Invalid

```js
if (true) { doSomething(); doSomethingElse(); }
```

### disallowPaddingNewlinesInBlocks

Disallows blocks from beginning and ending with 2 newlines.

##### Valid

```js
if (true) {
    doSomething();
}
if (true) {doSomething();}
var abc = function() {};
```

##### Invalid

```js
if (true) {

    doSomething();

}
```

### disallowEmptyBlocks

Disallows empty blocks (except for catch blocks).

##### Valid

```js
if ( a == b ) { c = d; }
try { a = b; } catch( e ){}
```

##### Invalid

```js
if ( a == b ) { } else { c = d; }
```

### disallowSpacesInsideArrayBrackets

Disallows space after opening array square bracket and before closing.

##### Valid for mode `"nested"`

```js
var x = [ [1] ];
```

##### Invalid

```js
var x = [ [ 1 ] ];
```

### disallowQuotedKeysInObjects

Disallows quoted keys in object if possible.

##### Valid for mode `true`

```js
var x = { a: { default: 1 } };
```

##### Invalid

```js
var x = {'a': 1};
```

### disallowSpaceAfterObjectKeys

Disallows space after object keys.

##### Valid
```js
var x = {a: 1};
```
##### Invalid
```js
var x = {a : 1};
```

### requireCommaBeforeLineBreak

Requires commas as last token on a line in lists.

##### Valid

```js
var x = {
    one: 1,
    two: 2
};
var y = { three: 3, four: 4};
```

##### Invalid

```js
var x = {
    one: 1
    , two: 2
};
```

### requireOperatorBeforeLineBreak

Requires operators to appear before line breaks and not after.

```js
"requireOperatorBeforeLineBreak": [
    "?",
    "=",
    "+",
    "-",
    "/",
    "*",
    "==",
    "===",
    "!=",
    "!==",
    ">",
    ">=",
    "<",
    "<="
]
```

##### Valid

```js
x = y ? 1 : 2;
x = y ?
    1 : 2;
```

##### Invalid

```js
x = y
    ? 1 : 2;
```

### disallowSpaceAfterPrefixUnaryOperators

Requires sticking unary operators to the right.

##### Valid

```js
x = !y; y = ++z;
```

##### Invalid

```js
x = ! y; y = ++ z;
```

### disallowSpaceBeforePostfixUnaryOperators

Requires sticking unary operators to the left.

##### Valid

```js
x = y++; y = z--;
```

##### Invalid

```js
x = y ++; y = z --;
```

### requireSpaceBeforeBinaryOperators

Disallows sticking binary operators to the left.

##### Valid

```js
x !== y;
```

##### Invalid

```js
x!== y;
```

### requireSpaceAfterBinaryOperators

Disallows sticking binary operators to the right.

##### Valid

```js
x + y;
```

##### Invalid

```js
x +y;
```

### disallowImplicitTypeConversion

Disallows implicit type conversion.

##### Valid

```js
x = Boolean(y);
x = Number(y);
x = String(y);
x = s.indexOf('.') !== -1;
```

##### Invalid

```js
x = !!y;
x = +y;
x = '' + y;
x = ~s.indexOf('.');
```

### requireCamelCaseOrUpperCaseIdentifiers

Requires identifiers to be camelCased or UPPERCASE_WITH_UNDERSCORES

##### Valid

```js
var camelCase = 0;
var CamelCase = 1;
var _camelCase = 2;
var camelCase_ = 3;
var UPPER_CASE = 4;
```

##### Invalid

```js
var lower_case = 1;
var Mixed_case = 2;
var mixed_Case = 3;
```

### disallowMultipleLineStrings

Disallows strings that span multiple lines without using concatenation.

##### Valid
```js
var x = "multi" +
        "line";
var y = "single line";
```

##### Invalid
```js
var x = "multi \
        line";
```

### disallowMixedSpacesAndTabs

Requires lines to spaces after tabs only for alignment.

##### Valid example

```js
\tvar foo = "blah blah";
\t\svar foo = "blah blah";
\s\s\s\svar foo = "blah blah";
\t/**
\t\s*
\t\s*/ //a single space to align the star in a multi-line comment is allowed
```

##### Invalid example

```js
\s\tsvar foo = "blah blah";
```

### disallowTrailingWhitespace

Requires all lines to end on a non-whitespace character

##### Valid

```js
var foo = "blah blah";
```

##### Invalid

```js
var foo = "blah blah"; //<-- whitespace character here
```

### requireTrailingComma

Requires an extra comma following the final element of an array or object literal, unless it has only one element or is contained on a single line.

##### Valid

```js
var car = [1, 2, 3];
var dar = {a: "a", b: "b"};
```

##### Invalid

```js
var foo = [1, 2, 3];
var bar = {a: "a", b: "b"}
```

### requireKeywordsOnNewLine

Requires placing keywords on a new line.

##### Valid

```js
if (x < 0) {
    x++;
}
else {
    x--;
}
```

##### Invalid

```js
if (x < 0) {
    x++;
} else {
    x--;
}
```

### requireLineFeedAtFileEnd

Requires placing line feed at file end.

### requireCapitalizedConstructors

Requires constructors to be capitalized (except for `this`)

##### Valid

```js
var a = new B();
var c = new this();
```

##### Invalid

```js
var d = new e();
```

### requireDotNotation

Requires member expressions to use dot notation when possible

##### Valid

```js
var a = b[c];
var a = b.c;
var a = b[c.d];
var a = b[1];
var a = b['while']; //reserved word
```

##### Invalid

```js
var a = b['c'];
```

### disallowYodaConditions

Requires the variable to be the left hand operator when doing a boolean comparison

##### Valid

```js
if (a == 1) {
    return
}
```

##### Invalid

```js
if (1 == a) {
    return
}
```

### requireSpaceAfterLineComment

Requires that a line comment (`//`) be followed by a space.

##### Valid

```js
// A comment
/*A comment*/
//# sourceURL=filename.js
//= require something
```

##### Invalid

```js
//A comment
```

### disallowNewlineBeforeBlockStatements

Disallows newline before opening curly brace of all block statements.

##### Valid

```js
function good(){
    var obj = {
        val: true
    };

    return {
        data: obj
    };
}

if (cond){
    foo();
}

for (var e in elements){
    bar(e);
}

while (cond){
    foo();
}
```

##### Invalid

```js
function bad()
{
    var obj =
    {
        val: true
    };

    return {
        data: obj
    };
}

if (cond)
{
    foo();
}

for (var e in elements)
{
    bar(e);
}

while (cond)
{
    foo();
}
```

### validateLineBreaks

Option to check line break characters; they must be "LF", unix-style.

##### Valid
```js
var x = 1;<LF>
x++;
```

##### Invalid
```js
var x = 1;<CRLF>
x++;
```

### validateQuoteMarks

Requires all quote marks to be '.

##### Valid example

```js
var x = 'x';
```

##### Invalid example

```js
var x = "x", y = 'y';
```

### validateIndentation

Validates indentation for switch statements and block statements – must be indented with a tab character.

##### Valid example for mode "\t"

```js
if (a) {
    b=c;
    function(d) {
        e=f;
    }
}
```

##### Invalid example for mode "\t"

```js
if (a) {
     b=c;
function(d) {
           e=f;
 }
}
```

### validateParameterSeparator

Enable validation of separators between function parameters. Will ignore newlines.

##### Valid

```js
function a(b, c) {}
```

##### Invalid

```js
function a(b , c) {}
```
