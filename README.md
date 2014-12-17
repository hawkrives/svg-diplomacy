# svg-diplomacy

## To run the game locally:

- Clone the repository: `git clone git@github.com:hawkrives/svg-diplomacy.git`
- Run `make`

## To work on the backend:

- Create `backend/config/global.json`

It should look something like:

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

## Random Notes
If you feel like node_modules is getting really big, try running `make shrink`.
