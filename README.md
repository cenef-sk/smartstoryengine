# Smart Story Engine #

Simple interpreter for smart stories.

## Installation

<code>npm install</code>.

## Test the software

<code>npm run test</code>.

## Simple engine loop

```typescript
  import { SmartStoryEngine } from "./app/SmartStoryEngine";

  let engine = SmartStoryEngine.tellTheStory(story);
  while (engine.hasNext()){
    let next = engine.next();
    if(next instanceof Message) {
      console.log(next.message)
    }
  }
  console.log("END.")
```
## More

More complex example see in **app.ts**

## License

[MIT](https://github.com/nishanths/license/blob/master/LICENSE)
