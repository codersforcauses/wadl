### Why use Components?

Components improve web development by increasing efficiency and maintainability. They allow for separation of concerns, easier reuse and testing, and promote modular design. Using components results in a more organised, consistent and efficient codebase.

### Props and Emits

Properties (`props`) are data that is passed from the parent to a child component, while events (`emits`) are data that are passed from a child component to its parent.

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

# Dropdown

**What is it?**
Similiar to the default HTML select element, however styled to match the `MultiSelect` and `SearchSelect`

Props:

- `items` Default: **[ "Team Coordinator" ]**
- `placeholder` Default: **Select Role**
- `label` Default: **Team Coordinator**
- `modelValue`
- `color`
- `disabled` Default: **false**

Emits:

- `change`
- `update:modelValue` Parameter: The clicked item

**How to use it?**

```
<Dropdown
  v-model="option"
  :items=["item1", "item 2"]
  placeholder="Select Item"
  color="bg-gold"
  label="My Items"
  :disabled="true"
/>
```

```
const option = ref("");
```

---

# Table

**What is it?**

Renders a table based on the header and data passed. A slot can be used for custom columns.

Props:

- `headers`
- `data`
- `canEdit`
- `noDataText` default: **No teams registered**

Emits:

- `edit` Parameters: editMode, modalVisibility, data

**How to use it?**

```
const headers = [
  {
    key: "name",
    title: "Venue",
  },
  {
    key: "roomNo",
    title: "Room No.",
  },
  {
    key: "capacity",
    title: "Capacity",
  },
];
```

No custom columns required:

```
<Table
  :headers="headers"
  :data="filtering ? store.filteredVenues : store.venues"
  no-data-text="No venues registered"
  :loading="loading"
  @edit="handleEdit"
/>
```

Require custom columns:

```
<Table
  :headers="headers"
  :data="store.teams"
  class="mt-5 mx-auto"
  :can-edit="false"
>
  <template #allocatedTue="{ value }">
    <p>
      <CheckIcon v-if="value" class="w-6 h-6" />
      <XMarkIcon v-else class="w-6 h-6" />
    </p>
  </template>
  <template #allocatedWed="{ value }">
    <p>
      <CheckIcon v-if="value" class="w-6 h-6" />
      <XMarkIcon v-else class="w-6 h-6" />
    </p>
  </template>
  <template #venuePreference="{ value }">
    <p v-for="(ven, idx) in value" :key="idx" class="text-xs">
      {{ idx + 1 }}. {{ ven }}
    </p>
  </template>
</Table>
```

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
A small popup that display information on a successful or unsuccessful request.

Props:

- `modalVisibility` Default **false**
- `header`
- `body` Default **New tournament successfully created**
- `isSuccess` Default **false**

Emits:

- `close`

**How to use it?**

```
const notification = useNotification();
```

```
<Notification
  :modal-visibility="notification.isVisible"
  :is-success="notification.isSuccess"
  :body="notification.message"
  @close="notification.dismiss()"
/>
```

---

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
A modal is a small popup window that displays content on top of the main interface.

Props:

- `modalVisibility` Default: **false**
- `size` Default: **w-7/12**

Emits:

- `close`

**How to use it?**

```
<Modal
    :modal-visibility="modalVisibility"
    size="w-9/12"
    @close="
      () => {
        modalVisibility = false;
      }
    "
  >
  // Add anything you would like to display in the modal goes here
  </Modal>
```

```
const modalVisibility = ref(false);
```

---

# Delete Dialog

**What is it?**
This Delete Dialog builds upon the modal component, it asks for confirmation before deleting an entry. Its purpose is to prevent accidental deletions.
Emits:

- `yes`
- `no`
- `close`

**How to use it?**

```
<DeleteDialog
    :modal-visibility="modalVisibility"
    @close="
      () => {
        modalVisibility = false;
      }
    "
    @yes="
      () => {
        handleSave();
      }
    "
    @no="
      () => {
        handleDelete();
      }
    "
  />
```

```
const modalVisibility = ref(false);

const handleSave = () => { };
const handleDelete = () => { };
```

---

# Loading

**What is it?**

An SVG that is a animated

**How to use it?**

```
<Loading />
```

---

# Admin Button

**What is it?**

A button that includes an icon that are used on the admin dashboard for page navigation

Props:

- `title`
- `link`
- `icon`

**How to use it?**

```
<AdminButton
  title="Tournaments"
  link="admin/tournaments"
  :icon="TrophyIcon"
/>
```

---

# Admin Profile Information

**What is it?**

Displays the logged in users full name and role

Props:

- `username`
- `role`

**How to use it?**

```
<ProfileInfo :username="Coders For Causes" role="Admin" />
```

---

# Home Page Level Button

**What is it?**

A button that display the name of the tournament

Props:

- `text` Default: **tournament**

**How to use it?**

```
<LevelButton :text="tournament.shortName" />
```

---

# Navigation Bar and Home Button

**What are they?**

The home button displays the WADL logo on the navigation bar

**How to use it?**

```
<NavBar />
```

---
