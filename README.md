# umbraco-custom-elements

Needed a way to show seperate save button / view on website button in different places in the back office. Umbraco allows you to add javascript files in the package.manifest file that are included when deployed. 

Tried to make it generic as possible for adding new elements. The way it works is the uce_main.js file is added to umbraco via the package.manifest in the App_Plugins folder. 

This reads a json file that lists all the html files that should be injected into the backend.
