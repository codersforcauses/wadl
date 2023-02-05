### Props and Emits

Properties (`props`) are data that is passed from a parent component to a child component, while events (`emits`) are data that are passed from a child component to its parent.

# Button

**What is it?**

Allows all our buttons to have a consistent style across all pages.

Props:

- `buttonText`
- `buttonColor` Default: **primary**
- `size` Default: **large**
- `textColor` Default: **text-black**
- `loading` Default: **false**

**How to use it?**

```
<Button
  button-text="Reject"
  button-color="bg-light-red"
  text-color="text-dark-red"
  size="small"
  :loading=true
  @click="handleClick"
/>
```

A function that handles the click event

```
const handleClick = () => { };
```

---

# Chip

**What is it?**

The chip component is utilized within the multi-select component as a compact representation of selected items, featuring an icon for communicating with the parent component when pressed.

Props:

- `text`
- `bgColor` Default: **bg-gold**
- `textColor` Default: **text-black**
- `size`Small, **Medium** - Default, Large

Emits:

- `removeChip` Parameters: Chip Text

**How to use it?**

```
<Chip :text="item" @remove-chip="removeChip" />
```

When the icon on the chip component is clicked, it will pass the text that is displayed on the chip

```
const removeChip = (item) => { };
```

---

# Multi Select

**What is it?**

The component displays a list of items and allows multi-selection, returning the chosen items to the parent.

Props:

- `items` Default: **[ "Novice", "Junior", "Senior" ]**
- `placeholder` Default: **Select levels**
- `selectedChips`

Emits:

- `change` Parameters: Array of Chip text

**How to use it?**

```
<Multiselect
  :items="['Item 1', 'item 2', 'item 3']"
  placeholder="Select Items"
  @change="updateSelectedItems"
  />
```

This function displays a list of selected items

```
const updateSelectedItems = (items) => { };
```

---

# Search Select

**What is it?**
The component displays a list of items and allows you to search for an items and return it to the parent after selection.

Props:

- `items`
- `placeholder` Default: **School Name**
- `label` Default: **School Name**
- `modelValue`

Emits:

- `info` Parameter: The clicked list item
- `update:modelValue` Parameter: The typed input

**How to use it?**

```
<SearchSelect
  v-model="name"
  placeholder="Select Name"
  label="List of Names"
  :items="['Name 1', 'Name 2', 'Name 3']"
  @info="getInfo"
/>

```

```
const info = ref("");

const getInfo = (item) => {
  info.value = item.name;
};

```

---

# Table

**What is it?**

**How to use it?**

---

# Search Bar

**What is it?**

The search bar filters the data in a table based on a search term entered into the text input.

Emits:

- `handleFilter` Parameter: The inputted text

**How to use it?**

```
<SearchBar @handle-filter="handleFilter" />
```

This function should update the data that passed into the table component

```
const handleFilter = () => { };
```

---

# Tabs

**What is it?**

When a tab is clicked it passes the label to the parent so that the relevant information can be displayed.

Props:

- `tabs`
- `fontSize`

Emits:

- `handleTab` Parameter: Tab label

**How to use it?**

```
<Tabs :tabs="tabs" font-size="text-xl" @handle-tab="handleTabClicked" />
```

Setup tab labels and default active state

```
const tabs = [
  { label: "Novice", active: false },
  { label: "Junior", active: true },
  { label: "Senior", active: false },
];
```

A function that is used to get the tab thats been clicked

```

const handleTabClicked = (tab) => { };
```

---

# Notifications

**What is it?**

**How to use it?**

# Form Field

**What is it?**

Props:

- `label`
- `modelValue`
- `placeholder`
- `type` Default: **text**
- `disabled` Default: **false**
- `color`

Emits:

- `update:modelValue` Parameter: Inputted text

**How to use it?**

```
<FormField
  v-model="email"
  label="Email"
  type="email"
  placeholder="Enter Email"
  :color="!isValid ? 'border-red-500' : ''"/>
```

```
const email = ref("");
```

---

# Header

**What is it?**

Text that is used to describe the current page

Props:

- `titleText`
- `hasLine` Default: **true**

**How to use it?**

```
<Header title-text="Tournaments" />
```

---

# Modal

**What is it?**

**How to use it?**

# Delete Dialog

**What is it?**

**How to use it?**

---

# Admin Button

**What is it?**

**How to use it?**

# Admin Profile Information

**What is it?**

**How to use it?**

# Home Page Level Button

What is it?

How to use it?

# Navigation Bar and Home Button

What are they?

How to use them?
