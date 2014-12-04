# svg-diplomacy

To set up:

- Clone with `git clone git@github.com:hawkrives/svg-diplomacy.git`
- `npm install -g gulp`
- `npm install`
- Create `app/data/parse-api-key.json`
	- It should look like `{"app_id": "", "js_key": ""}`, where `app_id` and `js_key` are the respective keys from Parse.
- Create `backend/config/global.json`
	- It should look like `{"applications":{"app_name":{"applicationId": "", "masterKey": ""},"_default": {"link": "app_name"}}}`, replacing `app_name` with the name of the parse app, and supplying the `applicationId` and `masterKey` from the parse app.
- `gulp build` (or `gulp watch`)

## Random Notes
If you feel like node_modules is getting really big, try this:

- Go into the folder
- Run `npm dedupe`
- Install `dmn` (`npm i -g dmn`)
- Run `dmn clean`

`npm dedupe` runs through NPM's conflict resolution algorithm and takes extra time to de-duplicate packages inside node_modules. `dmn` looks through the packages that are installed and removes extraneous files; tests, docs, etc. I haven't experienced a problem with either of them yet, and they usually represent about a two-fold decrease in the size of my node_modules folder.
