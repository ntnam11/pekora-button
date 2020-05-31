# Pekora button

Pekora button

[Homepage](https://ntnam11.github.io/pekora-button)

Related Links:

* [Usada Pekora's Youtube channel](https://www.youtube.com/channel/UC1DCedRgGHBdm81E1llLhOQ)

* [Usada Pekora's Twitter](https://twitter.com/usadapekora)

Other buttons:

* [Aqua Button](https://aquaminato.moe/)

* [Fubuki Button](https://sfubuki.moe/)

## Contributing

Please fork this project for modification, and after completing the modification, initiate a Pull Request in this project.

### Add / Modify Peko Button

A Peko Button need two files:
* A MP3 file put in `/public/voices`
* A JSON file put in `/public/meta`, with the following definitions:

    ```json
    {
        "file": "MP3-file-name-here",
        "category": "Category number here",
        "name": {
            "en": "English button name",
            "ja": "Japanese button name",
        },
        "url": "Youtube-source-URL-with-t=timestamp"
    }
    ```

For category numbers, check out `public/categories.json`. It doesn't matter if the category number is of type `string` or `number`. You can also create a new one (if it's used widely enough)

For `name`, new languages can be added (i.e: `vn`). Check the `src/lang` folder for consistency. English will be used as default for unknown translation names.

Optional:
* The JSON file should have the same name with the MP3 one (for maintainability).
* Normalize audio voices to 100% (I'll implement a volume balancer soon)

If you are modifying voice/meta, delete the original files after modification.

### Site translation

The site's language is defined in `src/lang` folder.

Any translation/contribution is welcome :D.

## Deploying a local development environment (copied from Aqua Button)

This site is developed using VueJS.

To deploy a local development environment, first install the latest version of Node. Then follow these steps:

1. Clone the code.

2. Go to the code directory and run `npm install`.

3. Run `npm run serve`. During the code modification process, this local development server can immediately reflect the results of the modification.

4. To compile the files for deployment, run `npm run build`, which will generate the `dist` directory. This site is completely static, you can directly deploy the entire `dist` directory.

> To contribute your code to this project, you don't have to compile locally. After passing the test in the development server and pushing it to Github, you can directly require a Pull Request to this project.

## What's next

* More Peko Buttons

* Code refactoring (currently messy af imo)

* Context menu

* Volume balancer

* A .moe domain :D

* ...

## LICENSE

Program: MIT

Audio: According to the [Hololive secondary creation licence](https://www.hololive.tv/terms).

This project is a work of enthusiasts and is not related to the hololive official.

## Special Thanks

This project is inspired by [Aqua Button](https://github.com/zyzsdy/aqua-button) - [Homepage](https://aquaminato.moe)

## Afterwords

Well, I thought about forking & modifying aqua-button (by replacing with Pekora's voices), but I think I can make some major improvements for it. Therefore, I re-created the page from scratch.

This is my first VueJS/GitHub Page project too. I really hope to receive feedbacks/contributions. Thank you!
