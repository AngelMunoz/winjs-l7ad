# WinJS Intrinsics

Outside of some generic styles applied to `<body>` and `<html>`, WinJS does not globally style any browser controls such as `<button>`, or apply any font styles. Instead, you must opt-in to styling for each element you create, similar to Twitter Bootstrap.

## Typography
As a first step, it's recommended to always at least put the `win-type-body` class on `<body>` which will opt you in to the basic body text styles and font fallbacks for text in your page. 

There are two layers of typography classes available for use. 

### Headers
Apply these classes to `<h1>`-`<h6>` elements or any other text element. 
- `win-h1`
- `win-h2`
- `win-h3`
- `win-h4`
- `win-h5`
- `win-h6`

### Full type ramp
These are lower level typography classes that the h1-h6 classes are based on, and can be applied to any element. These are useful when you know the semantic meaning of the element you are styling, or when the text style you need is not covered by the 6 header classes, such as the caption style. 
- `win-type-header`
- `win-type-subheader`
- `win-type-title`
- `win-type-subtitle`
- `win-type-base`
- `win-type-body`
- `win-type-caption`

### Links
Use the `win-link` class on `<a>` elements to apply Windows styling.

### Code
Use the `win-code` class on `<pre>` and `<code>` elements to apply Windows styling.

### Ellipsis
Use the `win-type-ellipsis` class on an overflowing element to get a '...' text-overflow style.

## Controls

### Buttons
Use the button classes on `<button>` or button `<input>` elements. 

- `win-button` - Base button class
- `win-button-primary` - Add this class to a button in addition to `win-button` to make it stand out
- `win-button-file` - Add this class to a button in addition to `win-button` when its type is `file`

**Examples**
```html
<button class='win-button'>Default button</button>
<input type='button' class='win-button win-button-primary' value='Primary button' />
<input type='file' class='win-button win-button-file' />
```
### Text inputs
Apply the `win-textbox` class to text `<input>` elements to apply Windows styling to the element. There is also a `win-textarea` class for `<textarea>` elements.

**Examples**
```html
<input type='text' class='win-textbox' />
<input type='password' class='win-textbox' />
<textarea class='win-textarea' />
```

### Select dropdown
Apply the `win-dropdown` class to `<select>` elements to apply Windows styling. This has limited functionality outside of IE. 

### Checkbox and radio buttons
Apply the `win-checkbox` and `win-radio` classes to these elements to apply Windows styling.

**Examples**
```html
<input type='checkbox' class='win-checkbox' />
<input type='radio' class='win-radio' />
```

### Progress
Use the `win-progress-bar` class on `<progress>` elements to apply Windows styling. 

**Progress ring (IE/Edge only for now)**

In IE/Edge, you can apply the `win-progress-ring` class to a `<progress>` to get the Windows animated ring loader. 

### Range
Use the `win-slider` class on `<input type='range'>` elements to apply Windows styling. In IE, you can also add the `win-vertical` class to create a vertical slider. 

```js
function registerApp(app) {
    this.register(app);
}
```

```python
class Point:
    pass
```

```csharp
Console.WriteLine('Stuff')
```