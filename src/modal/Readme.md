# Modal

## Usage

1.  Inside modal route create a new route and set the element as your component
    which you wish to render inside the modal box.

```javascript
    /app.js
<Route path="modal" element={<ModalWindow />}>
    <Route path="/modal/public-jar/:id" element={<PublicJarModal />} />
    <Route path="/modal/YOUR_MODAL_PATH" element={<YOUR_MODAL_COMPONENT/>} />
</Route>
```

2.  You can open the modal with useModal hook or navigate to the route with
    react-router-dom.
    - useModal has method `.open(path, data)`.\
      `path` - same as `YOUR_MODAL_PATH`\
      `data` - object which will be stored in redux. You can use it to display
      data on modal if needed. Skip it if not needed.

```javascript
import useModal from 'src/hooks/useModal';

function Component() {
  const modal = useModal();
  return <Btn onClick={() => modal.open('YOUR_MODAL_PATH')}>open modal</Btn>;
}
```

3. To force close modal use `close()` method on `useModal` hook or navigate
   backward with react-router-dom

## Info

Modal opens on route `'/modal/[your_modal_route]'` \
Redux modal object saves to \
local storage with redux-persist Redux stores modal object :

```javascript
modal: {
  path: '[your_modal_path]';
  data: {
    foo: 'bar';
  }
}
```

`useModal` hook methods:

- `open(path, data)` - redirects to modal route, sets the previous route as
  background route, and dispatches data to redux. Data object is optional.
- `close()` - redirects to the previous location, or index page if modal was
  open via direct link.\
   \*_we don't clear redux modal data intentionally to be able to open the same modal
  on browser navigation forward._

Modal closes on:

- backdrop click
- browser navigation backward
- cross icon click
- ESC button pressed
- `.close()` method of `useModal()`
