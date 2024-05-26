
# HTML and CSS Style Guides

- HTML5 attributes can start with data- (data-quantity, data-price)

- CSS uses hyphens in property-names (font-size)


# JavaScript Style Guides

## Variable Names

- Variable and function names written as camelCase
- All names start with a letter
- Global variables written in UPPERCASE (We don't, but it's quite common)
- Constants (like PI) written in UPPERCASE

```
firstName = "John";
lastName = "Doe";

price = 19.90;
tax = 0.20;

fullPrice = price + (price * tax);
```

## Spaces Around Operators

- Please, always put spaces around operators ( = + - * / ), and after commas

```
let x = y + z;
const myArray = ["Volvo", "Saab", "Fiat"];
```

## Code Indentation

- Please, Always use 2 spaces for indentation of code blocks

## Statement Rules:

### General rules for simple statements

- Always end a simple statement with a semicolon

```
const cars = ["Volvo", "Saab", "Fiat"];

const person = {
  firstName: "John",
  lastName: "Doe",
  age: 50,
  eyeColor: "blue"
};
```

### General rules for complex (compound) statements

- Put the opening bracket at the end of the first line
- Use one space before the opening bracket
- Put the closing bracket on a new line, without leading spaces
- Do not end a complex statement with a semicolon

```
function toCelsius(fahrenheit) {
  return (5 / 9) * (fahrenheit - 32);
}
```

```
for (let i = 0; i < 5; i++) {
  x += i;
}
```

```
if (time < 20) {
  greeting = "Good day";
} else {
  greeting = "Good evening";
}
```

## Object Rules

- Place the opening bracket on the same line as the object name
- Use colon plus one space between each property and its value
- Use quotes around string values, not around numeric values
- Do not add a comma after the last property-value pair
- Place the closing bracket on a new line, without leading spaces
- Always end an object definition with a semicolon

```
const person = {
  firstName: "John",
  lastName: "Doe",
  age: 50,
  eyeColor: "blue"
};
```

Short objects can be written compressed, on one line, using spaces only between properties, like this:

```
const person = {firstName:"John", lastName:"Doe", age:50, eyeColor:"blue"};
```

## Line Length < 80
- For readability, avoid lines longer than 80 characters
- If a JavaScript statement does not fit on one line, the best place to break it, is after an operator or a comma

```
document.getElementById("demo").innerHTML =
"Hello Dolly.";
```


# React style guide

## Basic rules

- Only include one React component per file
 - However, multiple Stateless or Pure Components are allowed per file
- Always use JSX syntax

## Naming

- **Extensions**: Use .tsx extension for React components
- **Filename**: Use PascalCase for filenames. For example, ReservationCard.tsx
- **Reference naming**: Use PascalCase for React components and camelCase for their instances

```
// component
import FooBar from './FooBar';

// instance
const foobar = <FooBar />;
```
- **Hooks**: Use camelCase for React hooks
  
```
export const UseFoo = () => { ... }
```

- **Props Naming**: Avoid using DOM component prop names for different purposes

```
<Foo variant="fancy" />
```

## Quotes

- Always use double quotes (") for JSX attributes, but single quotes (') for all other JS. eslint: jsx-quotes

```
<Foo bar="bar" />
<Foo style={{ left: '20px' }} />
```

## Props

- Always use camelCase for prop names, or PascalCase if the prop value is a React component
```
<Foo
  userName="hello"
  phoneNumber={12345678}
  Component={SomeComponent}
/>
```

- Avoid using an array index as key prop, prefer a stable id

  ```
  todos.map((todo) => <Todo {...todo} key={todo.id} />);
  ```

## JSX

- Wrap JSX tags in parentheses when they span more than one line

```
  export const Foo = () => {
  return (
    <Bar>
      <Baz />
    </Bar>
  );
};
```
- Always self-close tags that have no children

```
<Foo variant="stuff" />
```
- If your component has multiline properties, close its tag on a new line

```
<Foo
  bar="bar"
  baz="baz"
/>
```






