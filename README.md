# svg-diplomacy

To set up:

- Clone with `git clone git@github.com:hawkrives/svg-diplomacy.git`
- `npm install`
- Create `app/data/parse-api-key.json`
	- It should look like `{"app_id": "", "js_key": ""}`, where the values of `app_id` and `js_key` are the respective keys from Parse.
- Create `backend/config/global.json`
	- It should look like
	```
	{
		"applications": {
			"app_name": {
				"applicationId": "",
				"masterKey": ""
			},
			"_default": {
				"link": "app_name"
			}
		}
	}
	```
	Replace `app_name` with the name of the Parse app, and supply the `applicationId` and `masterKey` from the Parse app in the matching fields above.
- Run `parse deploy` from within the `backend/` directory to push the cloud code to the parse app.
- `make build` (or `make watch`)

## Random Notes
If you feel like node_modules is getting really big, try this:

- Go into the folder
- Run `make node-shrink`
- Install `dmn` (`npm i -g dmn`)
- Run `dmn clean`

`make node-shrink` runs two commands: `npm dedupe` and `npm prune`. `npm dedupe` runs through NPM's conflict resolution algorithm and takes extra time to de-duplicate packages inside node_modules. `dmn` looks through the packages that are installed and removes extraneous files; tests, docs, etc. I haven't experienced a problem with either of them yet, and they usually represent about a two-fold decrease in the size of my node_modules folder. `npm prune` removes things that aren't explicitly required in the `package.json`.
