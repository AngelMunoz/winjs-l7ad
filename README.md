# Winjs-l7ad

This is a small repo of WinJS I'm working on, I will try to use/develop it as a starter/template and perhaps the base for the WinJS UWP template I have.

Mostly I'm using this repo to practice stuff that I'm not used to do (like dome manipulation, manual event listeners, etc) because I tend to use new and cool things
like Vue, Aurelia or such frameworks, WinJS is a library in the ranges of jQuery, so while it has some cool widgets, there are still some sopts
where you wouldn't do that on the framework you use, like rendering partial templates (attaching/appending them to the DOM, etc)

Also I won't be using anything like bootstrap (perhaps bulma since it's just css and shiny colors) so much of my CSS will have to be manual

so in terms of learning/working this will be as much as vanilla js as I can (I'll try to keep it that way)


## Structure
```
src
  fragments
    <names of fragments>
  managers
    <scripts dedicated to do some managing>
  pages
    <the pages of the app>
  main.js
  tsconfig.json
fuse.js
index.js
package.json
```

### Fragments
This is a cool place, this is the place where I'll put html files and some js files they will work as "components" conceptually  speaking
because there are no components here (unless I add some polymer stuff but neh not today), but I will try to follow standards like if they were web components

### Managers
This is a cool directory, personally my favorite, because here will be most of the code that will relate on how the system/application works and how it should do things
for example the StorageManager, could be used in a UWP context and a Web Browser context so it should know how to handle saves on both contexts. 
The EventManager is nothing more than a Map of EventEmitters so I guess if needed you could use it to namespace your event emitters instead of sharing a global one

### Pages
This is where most of the html should be, and as organized as possible; think of it  as if it were modules, and try to keep stuff together

### Main
the main file is a good one also. Here we register routes, do some initialization and I hope some day to have some sort of plugin like interface so we can turn on/off managers/plugins we need like

### Fuse
This is a small script that helps me do my job, think of it like gulp/webpack on steroids (my opinion) absolutely fast and super easy to read/modify it uses fuse-box


## Thoughts
This is just a practice, or sample repo if anyone that comes accros wants to review it I'd be glad to hear opinions, and feedback.


Cheers!
Angel D. Munoz