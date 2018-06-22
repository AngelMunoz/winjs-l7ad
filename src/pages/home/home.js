import './home.css'
import * as WinJS from 'winjs'
import PostDetail from "../post-detail/post-detail";

const posts = new WinJS.Binding.List([
  { id: 1, title: 'UWP Apps in Javascript!', tags: [{ name: 'javascript' }, { name: 'uwp' }], resume: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis felis eu eros egestas semper.' },
  { id: 2, title: 'Javascript Promises!', tags: [{ name: 'javascript' }, { name: 'promises' }], resume: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis felis eu eros egestas semper.' },
  { id: 3, title: 'Typescript Such An Awesome Tool!', tags: [{ name: 'typescript' }, { name: 'tools' }], resume: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis felis eu eros egestas semper.' },
  { id: 4, title: 'F# and My Lameness!', tags: [{ name: 'F#' }], resume: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis felis eu eros egestas semper.' },
  { id: 5, title: 'Who Do You Even Try!?', tags: [{ name: 'discuss' }], resume: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis felis eu eros egestas semper.' },
  { id: 6, title: 'Just one More Time!', tags: [{ name: 'story' }], resume: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis felis eu eros egestas semper.' },
  { id: 7, title: 'Live and Let Live!', tags: [{ name: 'discuss' }], resume: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis felis eu eros egestas semper.' },
  { id: 8, title: 'Nope, Keep it Going!', tags: [{ name: 'nodejs' }], resume: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis felis eu eros egestas semper.' },
  { id: 9, title: 'Surrender Forrender!!', tags: [{ name: 'discuss' }], resume: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis felis eu eros egestas semper.' },
])

const snippets = new WinJS.Binding.List([
  { id: 10, title: 'Generators!', resume: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', tags: [{ name: 'javascript' }] },
  { id: 11, title: 'Promises!', resume: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', tags: [{ name: 'javascript' }] },
  { id: 12, title: 'Typescript Classes!', resume: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', tags: [{ name: 'typescript' }] },
  { id: 13, title: 'Node Streams!', resume: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', tags: [{ name: 'nodejs' }] }
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

      // TODO: replace with an http find method
      const post = await Promise.resolve(posts.filter(p => p.id === data.id).pop())

      const pageData = Object.assign({}, PostDetail, { post })
      WinJS.Navigation.navigate(PostDetail.uri, ...pageData);
    } catch (error) {
      console.error(error)
    }
  }
}