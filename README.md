# Honey Money App Frontend
<img src="https://static.vecteezy.com/system/resources/previews/002/521/570/original/cartoon-cute-bee-holding-a-honey-comb-signboard-showing-victory-hand-vector.jpg" width="400"/>

### Install client dependencies.

```

npm i

```

## Sentry logger usage

### Error handling

```javascript

import * as Sentry from "@sentry/react";

try {
  aFunctionThatMightFail();
} catch (err) {
  Sentry.captureException(err);
}

```

### Bare message template

```javascript

import * as Sentry from "@sentry/react";

Sentry.captureMessage("Something went wrong");

```

