import './post-detail.css'
import MdPost from './post-detail.md';
import * as WinJS from 'winjs'

/**
 * 
 * This is the default state of your page, remember these options are
 * available to you once it ready, you should
 * be able to put arbitrary data here
 **/
export default {
    uri: 'pages/post-detail/post-detail.html',
    label: 'Post Detail',
    async ready(element, options) {
        const post = Object.assign({}, options.post, { resume: MdPost });
        const templateControl = document
            .querySelector(".post-detail__entry-template").winControl;

        // The element to render the template into
        const target = document.querySelector(".post-detail__render-target");
        const template = await templateControl.render(post)
        target.appendChild(template);

        const footerFragment = await WinJS.UI.Fragments
            .renderCopy('fragments/post-footer/post-footer.html');

        document.querySelector('.post-detail__entry-footer')
            .appendChild(footerFragment);
        await WinJS.UI.processAll(target);
    },
}