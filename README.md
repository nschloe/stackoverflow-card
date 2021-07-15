# Stackoverflow Card

Get dynamically generated StackOverflow stats on your readmes.

```markdown
<img height="137px"
  src="https://stackoverflow-card.vercel.app/?userID=353337&theme=dracula"
/>
```
<img height="137px"
  src="https://stackoverflow-card.vercel.app/?userID=353337&theme=dracula"
/>

You have to provide a valid `userID`. Apart from that, StackOverflow Card supports
several options (with their default values):
```
showLogo: true
theme: [stackoverflow-dark, stackoverflow-light, dracula, ...]
showBorder: true
showIcons: true
showAnimations: true
```
See [here](https://github.com/nschloe/stackoverflow-card/blob/main/src/themes.js) for
all available themes. Some examples
[here](https://github.com/nschloe/stackoverflow-card/blob/main/themes.md).

### Development

Start
```
nodemon index.js
```
and point a browser to
```
http://localhost:3000/?userID=353337&theme=stackoverflow-dark
```
with the desired options.


### License
This software is published under the [GPLv3 license](https://www.gnu.org/licenses/gpl-3.0.en.html).
