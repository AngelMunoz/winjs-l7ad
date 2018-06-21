import './home.css'
import * as WinJS from 'winjs'

const posts = new WinJS.Binding.List([
  { id: 1, title: 'UWP Apps in Javascript!', tags: 'javascript, uwp', resume: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis felis eu eros egestas semper. Sed blandit elit neque, eu blandit purus scelerisque ultricies. Donec et iaculis odio. Praesent tincidunt, sapien sed consequat laoreet, nunc enim tristique nunc, id rutrum tortor est sed erat.' },
  { id: 2, title: 'Javascript Promises!', tags: 'javascript, promises', resume: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis felis eu eros egestas semper. Sed blandit elit neque, eu blandit purus scelerisque ultricies. Donec et iaculis odio. Praesent tincidunt, sapien sed consequat laoreet, nunc enim tristique nunc, id rutrum tortor est sed erat.' },
  { id: 3, title: 'Typescript Such An Awesome Tool!', tags: 'typescript, tools', resume: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis felis eu eros egestas semper. Sed blandit elit neque, eu blandit purus scelerisque ultricies. Donec et iaculis odio. Praesent tincidunt, sapien sed consequat laoreet, nunc enim tristique nunc, id rutrum tortor est sed erat.' },
  { id: 4, title: 'F# and My Lameness!', tags: 'F#', resume: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis felis eu eros egestas semper. Sed blandit elit neque, eu blandit purus scelerisque ultricies. Donec et iaculis odio. Praesent tincidunt, sapien sed consequat laoreet, nunc enim tristique nunc, id rutrum tortor est sed erat.' },
  { id: 5, title: 'Who Do You Even Try!?', tags: 'discuss', resume: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis felis eu eros egestas semper. Sed blandit elit neque, eu blandit purus scelerisque ultricies. Donec et iaculis odio. Praesent tincidunt, sapien sed consequat laoreet, nunc enim tristique nunc, id rutrum tortor est sed erat.' },
  { id: 6, title: 'Just one More Time!', tags: 'story', resume: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis felis eu eros egestas semper. Sed blandit elit neque, eu blandit purus scelerisque ultricies. Donec et iaculis odio. Praesent tincidunt, sapien sed consequat laoreet, nunc enim tristique nunc, id rutrum tortor est sed erat.' },
  { id: 7, title: 'Live and Let Live!', tags: 'discuss', resume: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis felis eu eros egestas semper. Sed blandit elit neque, eu blandit purus scelerisque ultricies. Donec et iaculis odio. Praesent tincidunt, sapien sed consequat laoreet, nunc enim tristique nunc, id rutrum tortor est sed erat.' },
  { id: 8, title: 'Nope, Keep it Going!', tags: 'nodejs', resume: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis felis eu eros egestas semper. Sed blandit elit neque, eu blandit purus scelerisque ultricies. Donec et iaculis odio. Praesent tincidunt, sapien sed consequat laoreet, nunc enim tristique nunc, id rutrum tortor est sed erat.' },
  { id: 9, title: 'Surrender Forrender!!', tags: 'discuss', resume: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis felis eu eros egestas semper. Sed blandit elit neque, eu blandit purus scelerisque ultricies. Donec et iaculis odio. Praesent tincidunt, sapien sed consequat laoreet, nunc enim tristique nunc, id rutrum tortor est sed erat.' },
])

const snippets = new WinJS.Binding.List([
  // { id: 10, title: 'Generators!', resume: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', tags: 'javascript' },
  // { id: 11, title: 'Promises!', resume: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', tags: 'javascript' },
  // { id: 12, title: 'Typescript Classes!', resume: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', tags: 'typescript' },
  // { id: 13, title: 'Node Streams!', resume: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', tags: 'nodejs' }
]);

WinJS.Namespace.define("Application.Home", {
  posts, snippets
})

/**
 * 
 * This is the default state of your page, remember these options are
 * available to you once it ready, you should
 * be able to put arbitrary data here
 **/
export default {
  uri: 'pages/home/home.html',
  label: 'Home',
  ready(element, options) {
    options = Object.assign({}, options);

    const listviews = document.querySelectorAll('.home__pivot-item div[data-win-control="WinJS.UI.ListView"]');
    for (const listview of listviews) {
      listview.addEventListener("iteminvoked", this._itemInvoked.bind(this), false);
    }
    return WinJS.UI.processAll(element);

  },
  unload() {
    const listviews = document.querySelectorAll('.home__pivot-item div[data-win-control="WinJS.UI.ListView"]');
    for (const listview of listviews) {
      listview.removeEventListener("iteminvoked", this._itemInvoked.bind(this), false);
    }
  },
  async _itemInvoked({ detail }) {
    try {
      const { data, index } = await detail.itemPromise;
      console.log(data, index);
    } catch (error) {
      console.error(error)
    }
  }
}