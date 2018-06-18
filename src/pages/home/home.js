import './home.css'
import * as WinJS from 'winjs'

const posts = new WinJS.Binding.List([
  { title: 'UWP Apps in Javascript!', resume: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis felis eu eros egestas semper. Sed blandit elit neque, eu blandit purus scelerisque ultricies. Donec et iaculis odio. Praesent tincidunt, sapien sed consequat laoreet, nunc enim tristique nunc, id rutrum tortor est sed erat.' },
  { title: 'Javascript Promises!', resume: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis felis eu eros egestas semper. Sed blandit elit neque, eu blandit purus scelerisque ultricies. Donec et iaculis odio. Praesent tincidunt, sapien sed consequat laoreet, nunc enim tristique nunc, id rutrum tortor est sed erat.' },
  { title: 'Typescript Such An Awesome Tool!', resume: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis felis eu eros egestas semper. Sed blandit elit neque, eu blandit purus scelerisque ultricies. Donec et iaculis odio. Praesent tincidunt, sapien sed consequat laoreet, nunc enim tristique nunc, id rutrum tortor est sed erat.' },
  { title: 'F# and My Lameness!', resume: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis felis eu eros egestas semper. Sed blandit elit neque, eu blandit purus scelerisque ultricies. Donec et iaculis odio. Praesent tincidunt, sapien sed consequat laoreet, nunc enim tristique nunc, id rutrum tortor est sed erat.' },
  { title: 'Who Do You Even Try!?', resume: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis felis eu eros egestas semper. Sed blandit elit neque, eu blandit purus scelerisque ultricies. Donec et iaculis odio. Praesent tincidunt, sapien sed consequat laoreet, nunc enim tristique nunc, id rutrum tortor est sed erat.' },
  { title: 'Just one More Time!', resume: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis felis eu eros egestas semper. Sed blandit elit neque, eu blandit purus scelerisque ultricies. Donec et iaculis odio. Praesent tincidunt, sapien sed consequat laoreet, nunc enim tristique nunc, id rutrum tortor est sed erat.' },
  { title: 'Live and Let Live!', resume: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis felis eu eros egestas semper. Sed blandit elit neque, eu blandit purus scelerisque ultricies. Donec et iaculis odio. Praesent tincidunt, sapien sed consequat laoreet, nunc enim tristique nunc, id rutrum tortor est sed erat.' },
  { title: 'Nope, Keep it Going!', resume: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis felis eu eros egestas semper. Sed blandit elit neque, eu blandit purus scelerisque ultricies. Donec et iaculis odio. Praesent tincidunt, sapien sed consequat laoreet, nunc enim tristique nunc, id rutrum tortor est sed erat.' },
  { title: 'Surrender Forrender!!', resume: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis felis eu eros egestas semper. Sed blandit elit neque, eu blandit purus scelerisque ultricies. Donec et iaculis odio. Praesent tincidunt, sapien sed consequat laoreet, nunc enim tristique nunc, id rutrum tortor est sed erat.' },
])

const snippets = new WinJS.Binding.List([
  { title: 'Generators!', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', language: 'javascript' },
  { title: 'Promises!', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', language: 'javascript' },
  { title: 'Typescript Classes!', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', language: 'typescript' },
  { title: 'Node Streams!', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', language: 'nodejs' }
]);

WinJS.Namespace.define("Application.Home" {
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
  init(element, options) {
    /**
     * Use Fragments Like you would use "Components" in any other app 
     * just remember these are kind of low level, 
     * so you might still have to do some fancy stuff by hand
     **/
    WinJS.UI.Fragments
      .render('fragments/home/content.html')
      .done((fragment) => element.appendChild(fragment));
  },
  ready(element, options) {
    this.options = options = Object.assign({}, options);
    WinJS.UI.processAll(element).done();

  }
}