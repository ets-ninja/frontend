# Hooks usage

## use Request

### Parametrs

```javascript
sendRequest(url, method = 'GET', body = null)
```

### Usage

```javascript

import request from '../../hooks/useRequest'
  
const [isSuccessful, setIsSuccessful] = useState(false);

    try {
      await sendRequest(`url`, 'POST', data);
    } catch (err) {
      return;
    }

```
