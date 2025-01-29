# Stackoverflow Card

Get dynamically generated StackOverflow stats on your readmes.

Use the HTML `img` tag:

```markdown
<img height="137px"
  src="https://stackoverflow-card.vercel.app/?userID=353337"
/>
```
Or use the Markdown image syntax:

```
![StackOverflow Card](https://stackoverflow-card.vercel.app/?userID=353337)
```

<img height="137px"
  src="https://stackoverflow-card.vercel.app/?userID=353337"
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

### Themes
With built-in themes, you can customize the look of the card.

Use `&theme=THEME_NAME` parameter like so:
```
![StackOverflow Card](https://stackoverflow-card.vercel.app/?userID=353337&theme=dracula)
```
<details>
<summary>Show example</summary>
  
![StackOverflow Card](https://stackoverflow-card.vercel.app/?userID=353337&theme=dracula)

</details>

#### All built-in themes
StackOverflow Card comes with several built-in themes (E.g. `dracula`, `stackoverflowdark`, `stackoverflowdark`, `gruvboxdark`, `gruvboxlight`, `solarizeddark`, `solarizedlight`, `tomorrownight`, `tomorrow`).

See [here](https://github.com/nschloe/stackoverflow-card/blob/main/src/themes.js) for all available themes.

Some card examples can be found [here](https://github.com/nschloe/stackoverflow-card/blob/main/themes.md).

#### Use GitHub's theme context tag

You can use [GitHub's theme context](https://github.blog/changelog/2021-11-24-specify-theme-context-for-images-in-markdown/) to make the card match the user's GitHub theme automatically. Just add #gh-dark-mode-only or #gh-light-mode-only at the end of an image link. This tells GitHub how to show the card to users with a light or dark theme preference.

```
[![StackOverflow Card Light](https://stackoverflow-card.vercel.app/?userID=353337&theme=tomorrow#gh-light-mode-only)](https://stackoverflow-card.vercel.app/?userID=353337&theme=tomorrow#gh-light-mode-only)
[![StackOverflow Card Dark](https://stackoverflow-card.vercel.app/?userID=353337&theme=dracula#gh-dark-mode-only)](https://stackoverflow-card.vercel.app/?userID=353337&theme=dracula#gh-dark-mode-only)
```
<details>
<summary>Show example</summary>

[![StackOverflow Card Light](https://stackoverflow-card.vercel.app/?userID=353337&theme=tomorrow#gh-light-mode-only)](https://stackoverflow-card.vercel.app/?userID=353337&theme=tomorrow#gh-light-mode-only)
[![StackOverflow Card Dark](https://stackoverflow-card.vercel.app/?userID=353337&theme=dracula#gh-dark-mode-only)](https://stackoverflow-card.vercel.app/?userID=353337&theme=dracula#gh-dark-mode-only)

</details>

#### Use GitHub's new media feature

You can also use [GitHub's new media feature](https://github.blog/changelog/2022-05-19-specify-theme-context-for-images-in-markdown-beta/) in HTML to control how cards appear in light or dark themes. This is done using the `picture` element in combination with the `prefers-color-scheme` media feature.

```html
<picture>
  <source
    srcset="https://stackoverflow-card.vercel.app/?userID=353337&theme=tomorrow"
    media="(prefers-color-scheme: light), (prefers-color-scheme: no-preference)"
  />
  <source
    srcset="https://stackoverflow-card.vercel.app/?userID=353337&theme=dracula"
    media="(prefers-color-scheme: dark)"
  />
  <img src="https://stackoverflow-card.vercel.app/?userID=353337&theme=dracula" />
</picture>
```

<details>
<summary>Show example</summary>

<picture>
  <source
    srcset="https://stackoverflow-card.vercel.app/?userID=353337&theme=tomorrow"
    media="(prefers-color-scheme: light), (prefers-color-scheme: no-preference)"
  />
  <source
    srcset="https://stackoverflow-card.vercel.app/?userID=353337&theme=dracula"
    media="(prefers-color-scheme: dark)"
  />
  <img src="https://stackoverflow-card.vercel.app/?userID=353337&theme=dracula" />
</picture>

</details>

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
